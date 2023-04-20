import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/Form/Input'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { useAuth } from '@/components/hooks/useAuth'

const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
})

type SignInSchemaType = z.infer<typeof signInSchema>

export default function LoginPage() {
  const { signIn } = useAuth()
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  })

  const handleSignIn: SubmitHandler<SignInSchemaType> = async (values) => {
    await signIn({
      email: values.email,
      password: values.password,
    })
  }

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="w-full max-w-[360px] p-8 bg-white shadow-sm rounded-md flex flex-col gap-4"
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)
  const token = cookies['agendav2.token']

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
