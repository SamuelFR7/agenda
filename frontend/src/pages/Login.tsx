import React, { FormEvent, useContext, useState } from 'react'
import Head from 'next/head'

import { GetServerSideProps } from 'next'

import { parseCookies } from 'nookies'

import { Button, Flex, Stack } from '@chakra-ui/react'
import toast, { Toaster } from 'react-hot-toast'
import { AuthContext } from '../contexts/AuthContext'
import { Input } from '../components/Form/input'

export interface IUser {
  email: string
  password: string
}

export default function Home() {
  const { SignIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignIn(e: FormEvent) {
    e.preventDefault()
    toast.promise(SignIn(email.toUpperCase(), password), {
      loading: 'Entrando...',
      success: <b>Sucesso</b>,
      error: <b>Usuário ou senha incorretos!</b>,
    })
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Toaster position="top-center" reverseOrder={false} />
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxWidth={360}
          p="8"
          border="1px"
          borderColor="gray.200"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSignIn}
        >
          <Stack spacing={4}>
            <Input
              name="user"
              label="Usuário"
              focusBorderColor="green.500"
              _hover={{ bgColor: 'gray.50' }}
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name="password"
              label="Senha"
              focusBorderColor="green.500"
              type="password"
              _hover={{ bgColor: 'gray.50' }}
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>

          <Button type="submit" marginTop={6} size="lg" colorScheme="green">
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
