import React, { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { toast, Toaster } from 'react-hot-toast'
import { useCookies } from 'react-cookie'
import Head from 'next/head'

import api from '../services/api'

import { LoginContainer, LoginForm, LoginInput, LoginButton } from '../styles/pages/Login'
import { LoaderContainer, Loader } from '../styles/Loader'

const Register: React.FC = () => {
  const history = useRouter()
  const [cookies] = useCookies(['cookie-name'])
  const token = cookies.token
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState(true)

  useEffect(() => {
    async function Check () {
      try {
        await api.get('/user/check/admin', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
      } catch (error) {
        return setAdmin(false)
      }
      return setLoading(false)
    }
    Check()
  }, [token])

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()
    try {
      await api.post('/user/register', {
        email: email.toUpperCase(),
        password
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
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

  if (!admin) {
    history.push('/')
  }

  if (loading) {
    return (
          <LoaderContainer>
              <Loader></Loader>
          </LoaderContainer>
    )
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
