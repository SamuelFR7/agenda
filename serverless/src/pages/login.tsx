import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSideProps } from 'next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '~/components/Form/Input'
import { getServerAuthSession } from '~/server/auth'

const signInSchema = z.object({
  username: z.string().toUpperCase(),
  password: z.string(),
})

type SignInSchemaType = z.infer<typeof signInSchema>

export default function LoginPage() {
  const { query } = useRouter()
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
    setError,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  })
  const handleSignIn: SubmitHandler<SignInSchemaType> = async (values) => {
    signIn('credentials', values, {
      callbackUrl: '/',
    })
  }

  useEffect(() => {
    if (query.error) {
      setError('username', {
        message: 'Usuário ou senha incorretos',
      })
      setError('password', {
        message: 'Usuário ou senha incorretos',
      })
    }
  }, [query, setError])

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="w-full max-w-[360px] p-8 bg-white shadow-sm rounded-md flex flex-col gap-4"
      >
        <Input
          error={errors.username}
          {...register('username')}
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
  const session = await getServerAuthSession(ctx)

  if (session) {
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
