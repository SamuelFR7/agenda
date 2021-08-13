import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { toast, Toaster } from 'react-hot-toast'
import { parseCookies } from 'nookies'
import { useForm } from 'react-hook-form'

import api from '../services/api'

import { LoginContainer, LoginForm, LoginInput, LoginButton } from '../styles/pages/Login'
import { IUser } from './Login'

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm()

  async function handleRegister (data: IUser) {
    try {
      await api.post('/user/register', {
        email: data.email.toUpperCase(),
        password: data.password
      })
      toast.success('Usuário registrado com sucesso')
    } catch (error) {
      toast.error('Email ou usuário já registrado')
    }
  }

  return (
          <LoginContainer>
            <Head>
              <title>Registrar</title>
            </Head>
              <Toaster
                  position="top-left"
                  reverseOrder={false}
              />
              <LoginForm onSubmit={handleSubmit(handleRegister)}>
                  <LoginInput
                  {...register('email')}
                  placeholder="Usuário"
                  type="text"
                  required={true}
                  />
                  <LoginInput
                  {...register('password')}
                  placeholder="Senha"
                  type="password"
                  required={true}
                  />
                  <LoginButton type="submit">Registrar</LoginButton>
              </LoginForm>
          </LoginContainer>
  )
}

export default Register

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
