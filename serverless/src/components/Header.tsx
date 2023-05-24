import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

const Header = () => {
  const { asPath } = useRouter()

  const isLogin = asPath === '/login'

  return (
    <div className="bg-emerald-400 text-white w-full px-4">
      <div className="w-full max-w-[1290px] mx-auto flex justify-between items-center py-3">
        <h1 className="text-3xl font-bold">Agenda</h1>
        {!isLogin && (
          <button
            className="bg-emerald-600 hover:bg-emerald-700 font-medium px-2 py-1 rounded-md"
            type="button"
            onClick={() => signOut()}
          >
            Sair
          </button>
        )}
      </div>
    </div>
  )
}

export { Header }
