import React from 'react'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../contexts/AuthContext'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { Header } from '../components/Header'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../services/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Header />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
