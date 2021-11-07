import React from 'react'
import type { AppProps } from 'next/app'

import { GlobalStyle } from '../styles/Global'
import { AuthProvider } from '../contexts/AuthContext'
import { PeopleProvider } from '../contexts/PeopleContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <>
        <AuthProvider>
          <PeopleProvider>
            <Component {...pageProps} />
            <GlobalStyle />
          </PeopleProvider>
        </AuthProvider>
      </>
  )
}

export default MyApp
