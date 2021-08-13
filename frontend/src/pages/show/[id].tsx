import React, { useState, useEffect, FormEvent } from 'react'
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

const Show: React.FC = () => {
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

  useEffect(() => {
    async function loadPerson () {
      try {
        const response = await api.get(`/show/${id}`)
        console.log(response)
        const datares = response.data
        setPerson(datares)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    loadPerson()
  }, [id])

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
            <title>Visualizar</title>
          </Head>
            <FormContent>
                    <form>
                        <input style={{ color: 'black' }} placeholder="Nome" value={person.RazaoSocial} disabled={true} />
                        <input style={{ color: 'black' }} placeholder="Endereço" value={person.Endereco} disabled={true} />
                        <input style={{ color: 'black' }} placeholder="Email" value={person.Email} disabled={true} />
                        <InputBox>
                        <Input style={{ color: 'black' }} placeholder="Telefone 4" name="number" value={person.Telefone1} disabled={true} />
                        <input style={{ color: 'black' }} className="inputBoxField" placeholder="Contato 1" value={person.Telefone1Contato} disabled={true} />
                        </InputBox>
                        <InputBox>
                        <Input style={{ color: 'black' }} placeholder="Telefone 4" name="number" value={person.Telefone2} disabled={true} />
                        <input style={{ color: 'black' }} placeholder="Contato 2" value={person.Telefone2Contato} disabled={true} />
                        </InputBox>
                        <InputBox>
                        <Input style={{ color: 'black' }} placeholder="Telefone 4" name="number" value={person.Telefone3} disabled={true} />
                        <input style={{ color: 'black' }} placeholder="Contato 3" value={person.Telefone3Contato} disabled={true} />
                        </InputBox>
                        <InputBox>
                        <Input style={{ color: 'black' }} placeholder="Telefone 4" name="number" value={person.Telefone4} disabled={true} />
                        <input style={{ color: 'black' }} placeholder="Contato 4" value={person.Telefone4Contato} disabled={true} />
                        </InputBox>
                        <InputBox>
                        <Input style={{ color: 'black' }} placeholder="Telefone 5" name="number" value={person.Telefone5} disabled={true} />
                        <input style={{ color: 'black' }} placeholder="Contato 5" value={person.Telefone5Contato} disabled={true} />
                        </InputBox>
                        <input style={{ color: 'black' }} placeholder="Observações" value={person.Observacoes} disabled={true}/>
                        <ButtonReturn onClick={handleReturn}>Retornar</ButtonReturn>
                    </form>
            </FormContent>
        </FormContainer>
  )
}

export default Show

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
