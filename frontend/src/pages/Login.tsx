import React, { useEffect, useState, FormEvent } from 'react'

import { toast, Toaster } from 'react-hot-toast'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

import api from '../services/api'

import logo from '../assets/logo.svg'
import { LoginContainer, LoginForm, LoginInput, LoginButton } from '../styles/pages/Login'
import { LoaderContainer, Loader } from '../styles/pages/Loader'

export default function Login () {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logged, setLogged] = useState(false)
  const [cookies, setCookie] = useCookies(['cookie-name'])
  const [loading, setLoading] = useState(true)

  const token = cookies.token
  useEffect(() => {
    async function Check () {
      try {
        await api.get('/user/check', {
          headers: {
            authorization: token
          }
        })
        setLogged(true)
      } catch (error) {
        setLogged(false)
        setLoading(false)
      }
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
      if (data.adminToken) {
        setCookie('adminToken', data.adminToken, { maxAge: 86400 })
      }
      const token = data.token
      setCookie('token', token, { maxAge: 86400 })
      history.push('/main')
    } catch (error) {
      toast.error('Usuário ou senha incorretos')
    }
  }

  if (logged) {
    history.push('/main')
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
            <Toaster
            position="top-left"
            reverseOrder={false}
            />
            <LoginForm onSubmit={handleSubmit}>
                <img src={logo} alt="acs"></img>
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
