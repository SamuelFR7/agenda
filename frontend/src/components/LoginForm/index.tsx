import React, { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import { toast, Toaster } from 'react-hot-toast'
import { Container, Content } from './styles'

export interface IData {
  email: string,
  password: string,
  e: FormEvent
}

export function LoginForm () {
  const { SignIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignIn ({ email, password, e }: IData) {
    e.preventDefault()
    toast.promise(
      SignIn(email.toUpperCase(), password),
      {
        loading: 'Entrando...',
        success: <b>Sucesso</b>,
        error: <b>Usuário ou senha incorretos!</b>
      }
    )
  }

  return (
        <Container>
          <Toaster
            position="top-left"
            reverseOrder={false}
            />
            <Content>
            <form onSubmit={(e) => handleSignIn({ email, password, e })}>
                <input
                  placeholder="Usuário"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <input
                  placeholder="Senha"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            </Content>
        </Container>
  )
}
