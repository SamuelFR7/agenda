import React from 'react'

import Head from 'next/head'

import { parseCookies } from 'nookies'

import { GetServerSideProps } from 'next'
import { Header } from '../components/Header'
import { Dashboard } from '../components/Dashboard'

export default function Home() {
  return (
    <>
      <Head>
        <title>Agenda</title>
      </Head>
      <Header />
      <Dashboard />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
