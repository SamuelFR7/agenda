import React, { createContext, ReactNode, useState } from 'react'
import { api } from '../services/apiClient'
import { destroyCookie, setCookie } from 'nookies'
import Router from 'next/router'

type User = {
  email: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  user: User
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  destroyCookie(undefined, 'agenda.token')
  destroyCookie(undefined, 'agenda.refreshToken')

  Router.push('/Login')
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/users/session', {
      email,
      password,
    })

    const { token, refresh_token, user } = response.data
    setUser(user)

    setCookie(undefined, 'agenda.token', token, {
      maxAge: 60 * 30 * 24 * 30, // 30 days
      path: '/',
    })
    setCookie(undefined, 'agenda.refreshToken', refresh_token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
