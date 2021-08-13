import React from 'react'
import type { AppProps } from 'next/app'

import { GlobalStyle } from '../styles/Global'
import { AuthProvider } from '../contexts/AuthContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <>
        <AuthProvider>
          <Component {...pageProps} />
          <GlobalStyle />
        </AuthProvider>
      </>
  )
}

export default MyApp
