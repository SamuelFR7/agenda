import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function Home() {
  return <h1 className="text-emerald-500">Hello</h1>
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
