import React, { useContext } from 'react'
import Head from 'next/head'

import { Button, Flex, Stack, useColorModeValue } from '@chakra-ui/react'
import { AuthContext } from '../contexts/AuthContext'
import { Input } from '../components/Form/input'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast, { Toaster } from 'react-hot-toast'
import { withSSRGuest } from '../utils/withSSRGuest'

interface ISignInFormData {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Usuário obrigatório'),
  password: yup.string().required('Senha obrigatória'),
})

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  })
  const { errors } = formState
  const { signIn } = useContext(AuthContext)

  const handleSignIn: SubmitHandler<ISignInFormData> = async (values) => {
    await toast.promise(
      signIn({ email: values.email.toUpperCase(), password: values.password }),
      {
        loading: 'Entrando...',
        success: <b>Sucesso</b>,
        error: <b>Usuário ou senha incorretos!</b>,
      }
    )
  }

  const ButtonsBg = useColorModeValue('green.400', 'green.600')
  const borderColor = useColorModeValue('gray.200', 'gray.400')

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Toaster position="bottom-center" reverseOrder={false} />
      <Flex h="80vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxWidth={360}
          p="8"
          border="1px"
          borderColor={borderColor}
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={4}>
            <Input
              error={errors.email}
              {...register('email')}
              name="email"
              label="Usuário"
            />
            <Input
              error={errors.password}
              {...register('password')}
              name="password"
              label="Senha"
              type="password"
            />
          </Stack>

          <Button
            type="submit"
            marginTop={6}
            size="lg"
            colorScheme="green"
            bg={ButtonsBg}
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  }
})
