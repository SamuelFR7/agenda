import React, { useEffect, useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import { useCookies } from 'react-cookie'
import api from '../services/api'

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
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    )
  }

  return (
        <div className="login-container">
            <Toaster
                position="top-left"
                reverseOrder={false}
            />
            <form onSubmit={handleSubmit}>
                <input
                placeholder="Usuário"
                type="text"
                value={email}
                required={true}
                onChange={e => setEmail(e.target.value)}
                />
                <input
                placeholder="Senha"
                type="password"
                value={password}
                required={true}
                onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
  )
}
