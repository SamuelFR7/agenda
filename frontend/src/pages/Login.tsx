import React, { FormEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { toast, Toaster } from 'react-hot-toast'
import { useCookies } from 'react-cookie'

import api from '../services/api'

import { LoginContainer, LoginForm, LoginButton, LoginInput } from '../styles/pages/Login'
import Logo from '../assets/logo.svg'

const Home: React.FC = () => {
  const history = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookie] = useCookies(['cookie-name'])
  const [logged, setLogged] = useState(false)

  const token = cookies.token

  useEffect(() => {
    async function Check () {
      try {
        await api.get('/user/check', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
      } catch (error) {
        return setLogged(false)
      }
      return setLogged(true)
    }
    Check()
  }, [token])

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()
    try {
      const { data } = await api.post('/user/login', {
        email: email.toUpperCase(),
        password: password
      })
      const token = data
      setCookie('token', token, { maxAge: 86400 })
      history.push('/')
    } catch (error) {
      toast.error('Usuário ou senha incorretos')
    }
  }

  if (logged) {
    history.push('/')
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
