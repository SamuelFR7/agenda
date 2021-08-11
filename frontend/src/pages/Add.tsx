import React, { useEffect, useState, FormEvent } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Input from '../components/Input'

import api from '../services/api'

import { FormContainer, FormContent, InputBox, ButtonReturn } from '../styles/pages/Add'

const Add: React.FC = () => {
  const history = useRouter()
  const [RazaoSocial, setRazaoSocial] = useState('')
  const [Endereco, setEndereco] = useState('')
  const [Email, setEmail] = useState('')
  const [Telefone1, setTelefone1] = useState('')
  const [Telefone1Contato, setTelefone1Contato] = useState('')
  const [Telefone2, setTelefone2] = useState('')
  const [Telefone2Contato, setTelefone2Contato] = useState('')
  const [Telefone3, setTelefone3] = useState('')
  const [Telefone3Contato, setTelefone3Contato] = useState('')
  const [Telefone4, setTelefone4] = useState('')
  const [Telefone4Contato, setTelefone4Contato] = useState('')
  const [Telefone5, setTelefone5] = useState('')
  const [Telefone5Contato, setTelefone5Contato] = useState('')
  const [Observacoes, setObservacoes] = useState('')
  const [logged, setLogged] = useState(true)
  const [cookies] = useCookies(['cookie-name'])

  const token = cookies.token

  useEffect(() => {
    async function Check () {
      try {
        await api.get('/user/check', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
      } catch (error) {
        return setLogged(false)
      }
      return setLogged(true)
    }
    Check()
  }, [token])

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()

    await api.post('/add', {
      RazaoSocial,
      Endereco,
      Email,
      Telefone1,
      Telefone1Contato,
      Telefone2,
      Telefone2Contato,
      Telefone3,
      Telefone3Contato,
      Telefone4,
      Telefone4Contato,
      Telefone5,
      Telefone5Contato,
      Observacoes
    }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    history.push('/')
  }

  function handleReturn (e: FormEvent) {
    e.preventDefault()
    history.push('/')
  }

  if (!logged) {
    history.push('/')
  }

  return (
          <FormContainer>
            <Head>
              <title>Adicionar</title>
            </Head>
              <ButtonReturn onClick={handleReturn}>Retornar</ButtonReturn>
              <FormContent>
                      <form onSubmit={handleSubmit}>
                          <input placeholder="Nome" value={RazaoSocial} onChange={e => setRazaoSocial(e.target.value.toUpperCase())} required={true} />
                          <input placeholder="Endereço" value={Endereco} onChange={e => setEndereco(e.target.value.toUpperCase())} />
                          <input placeholder="Email" value={Email} onChange={e => setEmail(e.target.value.toLowerCase())} />
                          <InputBox>
                          <Input placeholder="Telefone 1" name="number" onChange={(e: FormEvent<HTMLInputElement>) => setTelefone1(e.currentTarget.value)} />
                          <input className="inputBoxField" placeholder="Contato 1" value={Telefone1Contato} onChange={e => setTelefone1Contato(e.target.value.toUpperCase())} />
                          </InputBox>
                          <InputBox>
                          <Input placeholder="Telefone 2" name="number" onChange={(e: FormEvent<HTMLInputElement>) => setTelefone2(e.currentTarget.value)} />
                          <input placeholder="Contato 2" value={Telefone2Contato} onChange={e => setTelefone2Contato(e.target.value.toUpperCase())} />
                          </InputBox>
                          <InputBox>
                          <Input placeholder="Telefone 3" name="number" onChange={(e: FormEvent<HTMLInputElement>) => setTelefone3(e.currentTarget.value)} />
                          <input placeholder="Contato 3" value={Telefone3Contato} onChange={e => setTelefone3Contato(e.target.value.toUpperCase())} />
                          </InputBox>
                          <InputBox>
                          <Input placeholder="Telefone 4" name="number" onChange={(e: FormEvent<HTMLInputElement>) => setTelefone4(e.currentTarget.value)} />
                          <input placeholder="Contato 4" value={Telefone4Contato} onChange={e => setTelefone4Contato(e.target.value.toUpperCase())} />
                          </InputBox>
                          <InputBox>
                          <Input placeholder="Telefone 5" name="number" onChange={(e: FormEvent<HTMLInputElement>) => setTelefone5(e.currentTarget.value)} />
                          <input placeholder="Contato 5" value={Telefone5Contato} onChange={e => setTelefone5Contato(e.target.value.toUpperCase())} />
                          </InputBox>
                          <input placeholder="Observações" value={Observacoes} onChange={e => setObservacoes(e.target.value.toUpperCase())} />
                          <button type="submit">Adicionar</button>
                      </form>
              </FormContent>
          </FormContainer>
  )
}

export default Add
