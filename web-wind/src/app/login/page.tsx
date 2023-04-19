'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/Form/Input'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/services/api'
import { setCookie } from 'nookies'
import { useRouter } from 'next/navigation'

const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
})

type SignInSchemaType = z.infer<typeof signInSchema>

interface SignInResponse {
  user: {
    username: string
  }
  token: string
}

export default function LoginPage() {
  const router = useRouter()
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  })

  const signInMutation = useMutation({
    mutationFn: async (credentials: SignInSchemaType) => {
      return api
        .post<SignInResponse>('/users/session', credentials)
        .then((res) => res.data)
    },
    onSuccess: ({ token }) => {
      setCookie(undefined, 'agendav2.token', token, {
        maxAge: 60 * 24, // 1 Day
        path: '/',
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      router.push('/')
    },
  })

  const handleSignIn: SubmitHandler<SignInSchemaType> = async (values) => {
    signInMutation.mutate(values)
  }

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="w-full max-w-[360px] p-8 bg-gray-50 shadow-md rounded-md flex flex-col gap-4"
      >
        <Input
          error={errors.email}
          {...register('email')}
          type="text"
          label="Usuário"
          placeholder="Seu usuário"
        />
        <Input
          error={errors.password}
          {...register('password')}
          type="password"
          label="Senha"
          placeholder="Sua senha"
        />
        <button
          disabled={isLoading}
          type="submit"
          className="disabled:cursor-not-allowed w-full h-[40px] rounded-md bg-emerald-400 hover:bg-emerald-500 font-medium text-white"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
