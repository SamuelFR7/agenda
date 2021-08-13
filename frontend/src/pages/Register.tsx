import React, { useState, FormEvent } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import api from '../services/api'

import { LoginContainer, LoginForm, LoginInput, LoginButton } from '../styles/pages/Login'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()
    try {
      await api.post('/user/register', {
        email: email.toUpperCase(),
        password
      })
      toast.success('Usuário registrado com sucesso')
      setEmail('')
      setPassword('')
    } catch (error) {
      toast.error('Email ou usuário já registrado')
      setEmail('')
      setPassword('')
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
              <LoginForm onSubmit={handleSubmit}>
                  <LoginInput
                  placeholder="Usuário"
                  type="text"
                  value={email}
                  required={true}
                  onChange={e => setEmail(e.target.value)}
                  />
                  <LoginInput
                  placeholder="Senha"
                  type="password"
                  value={password}
                  required={true}
                  onChange={e => setPassword(e.target.value)}
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
