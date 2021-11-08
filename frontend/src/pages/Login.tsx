import React from 'react'
import Head from 'next/head'

import { GetServerSideProps } from 'next'

import { parseCookies } from 'nookies'

import { LoginForm } from '../components/LoginForm'
import { LoginHeader } from '../components/LoginHeader'

export interface IUser {
  email: string,
  password: string
}

export default function Home () {
  return (
        <>
          <Head>
            <title>Login</title>
          </Head>
            <LoginHeader />
            <LoginForm />
        </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
