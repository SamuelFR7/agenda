import React, { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Input from '../../components/Input'

import api from '../../services/api'

import { FormContainer, FormContent, InputBox, ButtonReturn } from '../../styles/pages/Add'
import { LoaderContainer, Loader } from '../../styles/Loader'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

interface IPerson {
    _id: string
    RazaoSocial: string
    Email: string
    Observacoes: string
    Endereco: string
    Telefone1: string
    Telefone2: string
    Telefone3: string
    Telefone4: string
    Telefone5: string
    Telefone1Contato: string
    Telefone2Contato: string
    Telefone3Contato: string
    Telefone4Contato: string
    Telefone5Contato: string
  }

const Edit: React.FC = () => {
  const history = useRouter()
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
  const [RazaoSocial, setRazaoSocial] = useState('')
  const [Telefone1, setTelefone1] = useState('')
  const [Telefone2, setTelefone2] = useState('')
  const [Telefone3, setTelefone3] = useState('')
  const [Telefone4, setTelefone4] = useState('')
  const [Telefone5, setTelefone5] = useState('')
  const [Telefone1Contato, setTelefone1Contato] = useState('')
  const [Telefone2Contato, setTelefone2Contato] = useState('')
  const [Telefone3Contato, setTelefone3Contato] = useState('')
  const [Telefone4Contato, setTelefone4Contato] = useState('')
  const [Telefone5Contato, setTelefone5Contato] = useState('')
  const [Email, setEmail] = useState('')
  const [Observacoes, setObservacoes] = useState('')
  const [Endereco, setEndereco] = useState('')

  useEffect(() => {
    async function loadPerson () {
      const { data } = await api.get<IPerson>(`/show/${id}`)
      setPerson(data)
      setRazaoSocial(data.RazaoSocial)
      setEmail(data.Email)
      setEndereco(data.Endereco)
      setObservacoes(data.Observacoes)
      setTelefone1(data.Telefone1)
      setTelefone2(data.Telefone2)
      setTelefone3(data.Telefone3)
      setTelefone4(data.Telefone4)
      setTelefone5(data.Telefone5)
      setTelefone1Contato(data.Telefone1Contato)
      setTelefone2Contato(data.Telefone2Contato)
      setTelefone3Contato(data.Telefone3Contato)
      setTelefone4Contato(data.Telefone4Contato)
      setTelefone5Contato(data.Telefone5Contato)
      setLoading(false)
    }
    loadPerson()
  }, [id])

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()
    await api.patch('/update', {
      id,
      RazaoSocial,
      Telefone1,
      Telefone2,
      Telefone3,
      Telefone4,
      Telefone5,
      Telefone1Contato,
      Telefone2Contato,
      Telefone3Contato,
      Telefone4Contato,
      Telefone5Contato,
      Email,
      Endereco,
      Observacoes
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
            <form onSubmit={handleSubmit}>
                <input placeholder="Nome" defaultValue={person.RazaoSocial} onChange={e => setRazaoSocial(e.target.value.toUpperCase())} />
                <input placeholder="Endereco" defaultValue={person.Endereco} onChange={e => setEndereco(e.target.value.toUpperCase())} />
                <input placeholder="Email" defaultValue={person.Email} onChange={e => setEmail(e.target.value.toLowerCase())} />
                <InputBox>
                <Input placeholder="Telefone 1" name="number" defaultValue={person.Telefone1} onChange={e => setTelefone1(e.target.value)} />
                <input className="inputBoxField" placeholder="Contato 1" defaultValue={person.Telefone1Contato} onChange={e => setTelefone1Contato(e.target.value.toUpperCase())} />
                </InputBox>
                <InputBox>
                <Input placeholder="Telefone 2" name="number" defaultValue={person.Telefone2} onChange={e => setTelefone2(e.target.value)} />
                <input placeholder="Contato 2" defaultValue={person.Telefone2Contato} onChange={e => setTelefone2Contato(e.target.value.toUpperCase())} />
                </InputBox>
                <InputBox>
                <Input placeholder="Telefone 3" name="number" defaultValue={person.Telefone3} onChange={e => setTelefone3(e.target.value)} />
                <input placeholder="Contato 3" defaultValue={person.Telefone3Contato} onChange={e => setTelefone3Contato(e.target.value.toUpperCase())} />
                </InputBox>
                <InputBox>
                <Input placeholder="Telefone 4" name="number" defaultValue={person.Telefone4} onChange={e => setTelefone4(e.target.value)} />
                <input placeholder="Contato 4" defaultValue={person.Telefone4Contato} onChange={e => setTelefone4Contato(e.target.value.toUpperCase())} />
                </InputBox>
                <InputBox>
                <Input placeholder="Telefone 5" name="number" defaultValue={person.Telefone5} onChange={e => setTelefone5(e.target.value)} />
                <input placeholder="Contato 5" defaultValue={person.Telefone5Contato} onChange={e => setTelefone5Contato(e.target.value.toUpperCase())} />
                </InputBox>
                <input placeholder="Observações" defaultValue={person.Observacoes} onChange={e => setObservacoes(e.target.value.toUpperCase())} />
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
