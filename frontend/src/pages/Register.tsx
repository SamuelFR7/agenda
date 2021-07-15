import React, { useEffect, useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import { useCookies } from 'react-cookie'

import api from '../services/api'

import { LoginContainer, LoginForm, LoginInput, LoginButton } from '../styles/pages/Login'
import { LoaderContainer, Loader } from '../styles/pages/Loader'

export default function Register () {
  const history = useHistory()
  const [cookies] = useCookies(['cookie-name'])
  const adminAuth = cookies.adminToken
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function Check () {
      try {
        await api.post('/user/admin/check', {
          adminAuth
        })
        setLoading(false)
      } catch (error) {
        history.push('/')
      }
    }
    Check()
  }, [adminAuth, history])

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()
    try {
      await api.post('/user/register', {
        adminAuth,
        email: email.toUpperCase(),
        password
      })
      toast.success('Usuário registrado com sucesso')
      setEmail('')
      setPassword('')
    } catch (error) {
      toast.error('Email ou usário já registrado')
      setEmail('')
      setPassword('')
    }
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
