import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Header } from '@/components/Header'
import { AuthProvider } from '@/contexts/AuthContext'
import Head from 'next/head'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Agenda</title>
      </Head>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Component {...pageProps} />
        </QueryClientProvider>
      </AuthProvider>
    </>
  )
}
