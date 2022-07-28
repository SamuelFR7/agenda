import React from 'react'
import type { AppProps } from 'next/app'

import { GlobalStyle } from '../styles/Global'
import { AuthProvider } from '../contexts/AuthContext'
import { PeopleProvider } from '../contexts/PeopleContext'
import { ChakraProvider } from '@chakra-ui/react'
import { chakraTheme } from '../styles/Theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ChakraProvider theme={chakraTheme}>
        <AuthProvider>
          <PeopleProvider>
            <Component {...pageProps} />
            <GlobalStyle />
          </PeopleProvider>
        </AuthProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
