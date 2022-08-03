import React from 'react'
import Document, { NextScript, Html, Head, Main } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import { theme } from '../styles/theme'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.initalColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
