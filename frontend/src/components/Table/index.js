import React, { useState, useEffect } from 'react'
import SearchInput from '../SearchInput'
import './Table.css'
import Pagination from 'rc-pagination'


import 'rc-pagination/assets/index.css'

import api from '../../services/api'


export default function Table(){
  const [people, setPeople] = useState([])
  const [text, setText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPeople, setTotalPeople] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function search(){
      if(text) {
        const response = await api.get('/filter', {
          headers: {
            name: text.toUpperCase(),
            limit: 2
          }
        })
        const resdata = response.data
        setPeople(resdata)
      }
      else {
        setCurrentPage(1)
        const response = await api.get('/', {
          headers: {
            page: 1,
            limit: 1
          }
        })
        const resdata = response.data
        setPeople(resdata)
      }
  }
  search()
  }, [text])

  useEffect(() => {
    async function loadAllPeople(){
      const response = await api.get('/')
      const datares = response.data
      setTotalPeople(datares)
    }
    loadAllPeople()
  }, [])

  useEffect(() => {
    async function loadPeople(){
    const data = await api.get('/', {
      headers: {
        page: currentPage,
        limit: 1
      }
    })
    const response = data.data
    setPeople(response)}
    loadPeople()
    setLoading(false)
  }, [currentPage])



  async function handleDelete(id){
    await api.delete('/delete', {
      headers: {
        id: id
      }
    })
    if(text) {
      const response = await api.get('/filter', {
        headers: {
          name: text.toUpperCase()
        }
      })
      const resdata = response.data
      setPeople(resdata)
    }
    else {
      const response = await api.get('/')
      const resdata = response.data
      setPeople(resdata)
    }
  }

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )
  }


  return (
    <div>
      <header>
        <a href="/add"><button>Adicionar</button></a>
      </header>
      <SearchInput value={text} onChange={(search) => setText(search)} />
      <table>
        <thead>
          <tr>
          <th>Nome</th>
          <th>Telefone 1</th>
          <th>Email</th>
          <th>Contato 1</th>
          </tr>
        </thead>
        <tbody>
    

    
      {people.map(item => (<tr key={item._id}>
        <td>{item.RazaoSocial}</td>
        <td>{item.Telefone1}</td>
        <td>{item.Email}</td>
        <td>{item.Telefone1Contato}</td>
        <td><button type="button" onClick={() => {if (window.confirm('Certeza de que você quer deletar este item?')) handleDelete(item._id)}}>Deletar</button></td>
        <td><a href={"/edit/"+item._id}><button>Editar</button></a></td>
        <td><a href={"/show/"+item._id}><button>Visualizar</button></a></td>
        </tr>))}
      </tbody>
      </table>

      <Pagination 
        pageSize={10}
        onChange={setCurrentPage}
        current={currentPage}
        total={totalPeople.length}
      />
    </div>
  )
}