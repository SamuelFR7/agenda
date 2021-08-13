import React, { useContext } from 'react'
import Head from 'next/head'
import { AuthContext } from '../contexts/AuthContext'
import { GetServerSideProps } from 'next'

import { toast, Toaster } from 'react-hot-toast'
import { parseCookies } from 'nookies'
import { useForm } from 'react-hook-form'

import { LoginContainer, LoginForm, LoginButton, LoginInput } from '../styles/pages/Login'
import Logo from '../assets/logo.svg'

export interface IUser {
  email: string,
  password: string
}

const Home: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const { SignIn } = useContext(AuthContext)

  async function handleSignIn (data: IUser) {
    try {
      await SignIn(data.email.toUpperCase(), data.password)
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
            <LoginForm onSubmit={handleSubmit(handleSignIn)}>
                <Logo></Logo>
                <LoginInput
                {...register('email')}
                placeholder="Usuário"
                type="text"
                />
                <LoginInput
                {...register('password')}
                placeholder="Senha"
                type="password"
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
