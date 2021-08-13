import React, { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

import api from '../../services/api'
import InputMask from 'react-input-mask'
import { useForm } from 'react-hook-form'

import { FormContainer, FormContent, InputBox, ButtonReturn } from '../../styles/pages/Add'
import { LoaderContainer, Loader } from '../../styles/Loader'

import { IPerson } from '../'

const Edit: React.FC = () => {
  const history = useRouter()
  const { register, handleSubmit } = useForm()
  const { id } = history.query

  if (!id) {
    return null
  }

  const [person, setPerson] = useState<IPerson>({
    _id: '',
    RazaoSocial: '',
    Email: '',
    Observacoes: '',
    Endereco: '',
    Telefone1: '',
    Telefone2: '',
    Telefone3: '',
    Telefone4: '',
    Telefone5: '',
    Telefone1Contato: '',
    Telefone2Contato: '',
    Telefone3Contato: '',
    Telefone4Contato: '',
    Telefone5Contato: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPerson () {
      const { data } = await api.get<IPerson>(`/show/${id}`)
      setPerson(data)
      setLoading(false)
    }
    loadPerson()
  }, [id])

  async function handleEdit ({ RazaoSocial, Endereco, Email, Telefone1, Telefone1Contato, Telefone2, Telefone2Contato, Telefone3, Telefone3Contato, Telefone4, Telefone4Contato, Telefone5, Telefone5Contato, Observacoes }: IPerson) {
    await api.patch('/update', {
      id,
      RazaoSocial: RazaoSocial.toUpperCase(),
      Telefone1: Telefone1.replace('_', ''),
      Telefone2: Telefone2.replace('_', ''),
      Telefone3: Telefone3.replace('_', ''),
      Telefone4: Telefone4.replace('_', ''),
      Telefone5: Telefone5.replace('_', ''),
      Telefone1Contato: Telefone1Contato.toUpperCase(),
      Telefone2Contato: Telefone2Contato.toUpperCase(),
      Telefone3Contato: Telefone3Contato.toUpperCase(),
      Telefone4Contato: Telefone4Contato.toUpperCase(),
      Telefone5Contato: Telefone5Contato.toUpperCase(),
      Email: Email.toLowerCase(),
      Endereco: Endereco.toUpperCase(),
      Observacoes: Observacoes.toUpperCase()
    })
    history.push('/')
  }

  function handleReturn (e: FormEvent) {
    e.preventDefault()
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
        <FormContainer>
          <Head>
            <title>Editar</title>
          </Head>
            <ButtonReturn onClick={handleReturn}>Retornar</ButtonReturn>
            <FormContent>
            <form onSubmit={handleSubmit(handleEdit)}>
                <input placeholder="Nome" {...register('RazaoSocial')} defaultValue={person.RazaoSocial} />
                <input placeholder="Endereco" {...register('Endereco')} defaultValue={person.Endereco} />
                <input placeholder="Email" {...register('Email')} defaultValue={person.Email} />
                <InputBox>
                <InputMask {...register('Telefone1')} defaultValue={person.Telefone1} mask="(99) 99999-9999" />
                <input className="inputBoxField" placeholder="Contato 1" {...register('Telefone1Contato')} defaultValue={person.Telefone1Contato} />
                </InputBox>
                <InputBox>
                <InputMask {...register('Telefone2')} defaultValue={person.Telefone2} mask="(99) 99999-9999" />
                <input placeholder="Contato 2" {...register('Telefone2Contato')} defaultValue={person.Telefone2Contato} />
                </InputBox>
                <InputBox>
                <InputMask {...register('Telefone3')} defaultValue={person.Telefone3} mask="(99) 99999-9999" />
                <input placeholder="Contato 3" {...register('Telefone3Contato')} defaultValue={person.Telefone3Contato} />
                </InputBox>
                <InputBox>
                <InputMask {...register('Telefone4')} defaultValue={person.Telefone4} mask="(99) 99999-9999" />
                <input placeholder="Contato 4" {...register('Telefone4Contato')} defaultValue={person.Telefone4Contato} />
                </InputBox>
                <InputBox>
                <InputMask {...register('Telefone5')} defaultValue={person.Telefone5} mask="(99) 99999-9999" />
                <input placeholder="Contato 5" {...register('Telefone5Contato')} defaultValue={person.Telefone5Contato} />
                </InputBox>
                <input placeholder="Observações" {...register('Observacoes')} defaultValue={person.Observacoes} />
                <button type="submit">Alterar</button>
            </form>
            </FormContent>

        </FormContainer>
  )
}

export default Edit

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
