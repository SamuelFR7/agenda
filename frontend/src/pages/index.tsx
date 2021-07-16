import React, { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import Image from 'next/image'

import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'

import SearchInput from '../components/SearchInput'

import api from '../services/api'

import { MainContainer, AddButton, TableContent, TableButton, PaginationContainer } from '../styles/pages/Main'
import { LoaderContainer, Loader } from '../styles/Loader'

import deleteIcon from '../assets/delete.png'
import editIcon from '../assets/pen.png'
import viewIcon from '../assets/view.png'

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

const Home: React.FC = () => {
  const history = useRouter()
  const [people, setPeople] = useState<IPerson[]>([])
  const [text, setText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPeople, setTotalPeople] = useState(1)
  const [loading, setLoading] = useState(true)
  const [logged, setLogged] = useState(true)
  const [cookies] = useCookies(['cookie-name'])

  const token = cookies.token

  useEffect(() => {
    async function Check () {
      try {
        await api.get('/user/check', {
          headers: {
            authorization: token
          }
        })
      } catch (error) {
        setLogged(false)
      }
    }
    async function loadAllPeople () {
      const { data } = await api.get('/length')
      setTotalPeople(data)
    }
    Check()
    loadAllPeople()
  }, [token])

  useEffect(() => {
    async function search () {
      if (text) {
        const { data } = await api.post('/filter', {
          name: text.toUpperCase()
        })
        setPeople(data)
      } else {
        setCurrentPage(1)
        const { data } = await api.post('/', {
          currentPage: 1
        })
        setPeople(data)
      }
    }
    search()
  }, [text])

  useEffect(() => {
    async function loadPeople () {
      const { data } = await api.post('/', {
        currentPage
      })
      setPeople(data)
      setLoading(false)
    }
    loadPeople()
  }, [currentPage])

  async function handleDelete (id: string) {
    await api.delete('/delete', {
      headers: {
        id: id
      }
    })
    if (text) {
      const { data } = await api.post('/filter', {
        name: text.toUpperCase()
      })
      setPeople(data)
    } else {
      const { data } = await api.post('/', {
        currentPage: 1
      })
      setPeople(data)
    }
  }

  function handleAdd (e: FormEvent) {
    e.preventDefault()
    history.push('/Add')
  }

  if (loading === true && logged === true) {
    return (
      <LoaderContainer>
        <Loader></Loader>
      </LoaderContainer>
    )
  }

  if (!logged) {
    history.push('/Login')
  }

  return (
    <MainContainer>

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
