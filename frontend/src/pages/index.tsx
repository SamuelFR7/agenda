import React, { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { parseCookies } from 'nookies'

import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'

import SearchInput from '../components/SearchInput'

import api from '../services/api'

import { MainContainer, AddButton, TableContent, TableButton, PaginationContainer } from '../styles/pages/Main'
import { LoaderContainer, Loader } from '../styles/Loader'

import deleteIcon from '../assets/delete.png'
import editIcon from '../assets/pen.png'
import viewIcon from '../assets/view.png'
import { GetServerSideProps } from 'next'

export interface IPerson {
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

const Home: React.FC = () => {
  const history = useRouter()
  const [people, setPeople] = useState<IPerson[]>([])
  const [text, setText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPeople, setTotalPeople] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAllPeople () {
      try {
        const { data } = await api.get('/length')
        setTotalPeople(data)
      } catch (error) {
        console.log(error)
      }
    }
    loadAllPeople()
  }, [])

  useEffect(() => {
    async function search () {
      if (text) {
        const { data } = await api.get(`/filter/${text.toUpperCase()}`)
        setPeople(data)
      } else {
        setCurrentPage(1)
        try {
          const { data } = await api.get(`/index/${currentPage}`)
          setPeople(data)
        } catch (error) {
          console.log(error)
        }
      }
    }
    search()
  }, [text])

  useEffect(() => {
    async function loadPeople () {
      try {
        const { data } = await api.get(`/index/${currentPage}`)
        setPeople(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    loadPeople()
  }, [currentPage])

  async function handleDelete (id: string) {
    await api.delete(`/delete/${id}`)
    if (text) {
      const { data } = await api.get(`/filter/${text.toUpperCase()}`)
      setPeople(data)
    } else {
      const { data } = await api.get(`/index/${currentPage}`)
      setPeople(data)
    }
  }

  function handleAdd (e: FormEvent) {
    e.preventDefault()
    history.push('/Add')
  }

  if (loading) {
    return (
      <LoaderContainer>
        <Loader></Loader>
      </LoaderContainer>
    )
  }

  return (
    <MainContainer>
      <Head>
        <title>Agenda</title>
      </Head>

      <header>
        <AddButton onClick={handleAdd}>Novo Contato</AddButton>
      </header>

      <SearchInput value={text} onChange={(search: string) => setText(search)}/>

      <TableContent>

        <thead className="table-header">
          <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Contato</th>
          <th>Visualizar</th>
          <th>Alterar</th>
          <th>Deletar</th>
          </tr>

        </thead>

        <tbody className="table-body">

      {people.map(item => (<tr key={item._id}>
        <td className="text-content">{item.RazaoSocial}</td>
        <td className="text-content">{item.Telefone1}</td>
        <td className="text-content">{item.Email}</td>
        <td className="text-content">{item.Telefone1Contato}</td>
        <td><a href={'/show/' + item._id}><TableButton><Image src={viewIcon} alt="view"></Image></TableButton></a></td>
        <td><a href={'/edit/' + item._id}><TableButton><Image src={editIcon} alt="edit"></Image></TableButton></a></td>
        <td><TableButton onClick={() => { if (window.confirm('Certeza de que você quer deletar este item?')) handleDelete(item._id) }}><Image src={deleteIcon} alt="delete"></Image></TableButton></td>
        </tr>))}
      </tbody>
      </TableContent>

      {!text && (
        <PaginationContainer>
        <Pagination
          pageSize={10}
          onChange={setCurrentPage}
          current={currentPage}
          total={totalPeople}
        />
        </PaginationContainer>
      )}

    </MainContainer>
  )
}

export default Home

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
