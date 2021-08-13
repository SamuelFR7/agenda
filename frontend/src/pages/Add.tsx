import React, { FormEvent } from 'react'

import { useRouter } from 'next/router'
import Head from 'next/head'

import { useForm } from 'react-hook-form'

import InputMask from 'react-input-mask'

import api from '../services/api'

import { FormContainer, FormContent, InputBox, ButtonReturn } from '../styles/pages/Add'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { IPerson } from '.'

const Add: React.FC = () => {
  const history = useRouter()
  const { register, handleSubmit } = useForm()

  async function handleAdd ({ RazaoSocial, Endereco, Email, Telefone1, Telefone1Contato, Telefone2, Telefone2Contato, Telefone3, Telefone3Contato, Telefone4, Telefone4Contato, Telefone5, Telefone5Contato, Observacoes }: IPerson) {
    await api.post('/add', {
      RazaoSocial: RazaoSocial.toUpperCase(),
      Endereco: Endereco.toUpperCase(),
      Email: Email.toLowerCase(),
      Telefone1: Telefone1.replace('_', ''),
      Telefone1Contato: Telefone1Contato.toUpperCase(),
      Telefone2: Telefone2.replace('_', ''),
      Telefone2Contato: Telefone2Contato.toUpperCase(),
      Telefone3: Telefone3.replace('_', ''),
      Telefone3Contato: Telefone3Contato.toUpperCase(),
      Telefone4: Telefone4.replace('_', ''),
      Telefone4Contato: Telefone4Contato.toUpperCase(),
      Telefone5: Telefone5.replace('_', ''),
      Telefone5Contato: Telefone5Contato.toUpperCase(),
      Observacoes: Observacoes.toUpperCase()
    })
    history.push('/')
  }

  function handleReturn (e: FormEvent) {
    e.preventDefault()
    history.push('/')
  }

  return (
          <FormContainer>
            <Head>
              <title>Adicionar</title>
            </Head>
              <ButtonReturn onClick={handleReturn}>Retornar</ButtonReturn>
              <FormContent>
                      <form onSubmit={handleSubmit(handleAdd)}>
                          <input {...register('RazaoSocial')} placeholder="Nome" required={true} />
                          <input {...register('Endereco')} placeholder="Endereço" />
                          <input {...register('Email')} placeholder="Email" />
                          <InputBox>
                          <InputMask {...register('Telefone1')} mask="(99) 99999-9999" placeholder="Telefone 1" required={true} />
                          <input {...register('Telefone1Contato')} className="inputBoxField" placeholder="Contato 1" />
                          </InputBox>
                          <InputBox>
                          <InputMask {...register('Telefone2')} mask="(99) 99999-9999" placeholder="Telefone 2" />
                          <input {...register('Telefone2Contato')} placeholder="Contato 2" />
                          </InputBox>
                          <InputBox>
                          <InputMask {...register('Telefone3')} mask="(99) 99999-9999" placeholder="Telefone 3" />
                          <input {...register('Telefone3Contato')} placeholder="Contato 3" />
                          </InputBox>
                          <InputBox>
                          <InputMask {...register('Telefone4')} mask="(99) 99999-9999" placeholder="Telefone 4" />
                          <input {...register('Telefone4Contato')} placeholder="Contato 4" />
                          </InputBox>
                          <InputBox>
                          <InputMask {...register('Telefone5')} mask="(99) 99999-9999" placeholder="Telefone 5" />
                          <input {...register('Telefone5Contato')} placeholder="Contato 5" />
                          </InputBox>
                          <input {...register('Observacoes')} placeholder="Observações" />
                          <button type="submit">Adicionar</button>
                      </form>
              </FormContent>
          </FormContainer>
  )
}

export default Add

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
