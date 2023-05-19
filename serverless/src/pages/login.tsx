import { GetServerSideProps } from 'next'
import { signIn } from 'next-auth/react'
import { FormEvent } from 'react'
import { getServerAuthSession } from '~/server/auth'

export default function LoginPage() {
  const handleSignIn = (e: FormEvent) => {
    e.preventDefault()
    signIn('auth0', {
      callbackUrl: '/',
    })
  }

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-[360px] p-8 bg-white shadow-sm rounded-md flex flex-col gap-4"
      >
        <button
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
