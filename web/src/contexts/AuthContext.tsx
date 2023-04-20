import React, { createContext, ReactNode, useState } from 'react'
import { api } from '@/services/api'
import { destroyCookie, setCookie } from 'nookies'
import Router from 'next/router'

type User = {
  username: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  user?: User | null
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

interface SignInResponse {
  user: {
    username: string
  }
  token: string
}

const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  destroyCookie(undefined, 'agendav2.token')

  Router.push('/Login')
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>()
  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post<SignInResponse>('/users/session', {
      email,
      password,
    })

    const { token, user } = response.data
    setUser(user)

    setCookie(undefined, 'agendav2.token', token, {
      maxAge: 60 * 30 * 24, // 1 day
      path: '/',
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    Router.push('/')
  }

  async function signOut() {
    destroyCookie(undefined, 'agendav2.token')
    setUser(null)

    Router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
