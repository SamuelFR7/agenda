import classNames from 'classnames'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-[1200px] bg-white shadow-sm rounded-md p-4">
        <h2 className="font-medium text-xl">Contatos</h2>
        <div className="w-full flex items-center justify-between mt-4">
          <input
            className={classNames(
              'bg-slate-100 w-[83%] px-3 py-2 rounded-md shadow-sm',
              'focus:placeholder:px-1 placeholder:duration-200',
              'disabled:cursor-not-allowed',
              'focus:outline-none focus:ring-1',
              'border border-transparent focus:border-emerald-500 focus:ring-emerald-500',
            )}
            placeholder="Pesquisar Contato"
          />
          <button className="w-[15%] bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-2 rounded-md">
            Novo Contato
          </button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)
  const token = cookies['agendav2.token']

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
