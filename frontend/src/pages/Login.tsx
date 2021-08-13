import React, { FormEvent, useState, useContext } from 'react'

import Head from 'next/head'

import { toast, Toaster } from 'react-hot-toast'

import { parseCookies } from 'nookies'

import { LoginContainer, LoginForm, LoginButton, LoginInput } from '../styles/pages/Login'
import Logo from '../assets/logo.svg'
import { AuthContext } from '../contexts/AuthContext'
import { GetServerSideProps } from 'next'

const Home: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { SignIn } = useContext(AuthContext)

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()
    try {
      await SignIn(email.toUpperCase(), password)
    } catch (error) {
      toast.error('Usuário ou senha incorretos')
    }
  }

  return (
        <LoginContainer>
          <Head>
            <title>Login</title>
          </Head>
            <Toaster
            position="top-left"
            reverseOrder={false}
            />
            <LoginForm onSubmit={handleSubmit}>
                <Logo></Logo>
                <LoginInput
                placeholder="Usuário"
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <LoginInput
                placeholder="Senha"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <LoginButton type="submit">Entrar</LoginButton>
            </LoginForm>
        </LoginContainer>
  )
}

export default Home

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
