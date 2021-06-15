import React, { useState, useEffect } from 'react'
import SearchInput from '../components/SearchInput'
import './Main.css'
import Pagination from 'rc-pagination'

import 'rc-pagination/assets/index.css'

import api from '../services/api'


import deleteIcon from '../assets/delete.png'
import editIcon from '../assets/pen.png'
import viewIcon from '../assets/view.png'

export default function Table({ history }){
  const [people, setPeople] = useState([])
  const [text, setText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPeople, setTotalPeople] = useState([])
  const [loading, setLoading] = useState(true)
  const [logged, setLogged] = useState(true)

  useEffect(() => {
    async function Check(){
      const token = localStorage.getItem('token')
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
    async function loadAllPeople(){
      const token = localStorage.getItem('token')
      const response = await api.get('/', {
        headers: {
          authorization: token
        }
      })
      const datares = response.data
      setTotalPeople(datares)
      setLoading(false)
    }
    Check()
    loadAllPeople()
  }, [])


  useEffect(() => {
    async function search(){
      const token = localStorage.getItem('token')
      if(text) {
        const response = await api.get('/filter', {
          headers: {
            authorization: token,
            name: text.toUpperCase(),
            limit: 1
          }
        })
        const resdata = response.data
        setPeople(resdata)
      }
      else {
        setCurrentPage(1)
        const response = await api.get('/', {
          headers: {
            authorization: token,
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
    async function loadPeople(){
      const token = localStorage.getItem('token')
      const data = await api.get('/', {
        headers: {
          authorization: token,
          page: currentPage,
          limit: 1
        }
    })
    const response = data.data
    setPeople(response)
  }
    loadPeople()
  }, [currentPage])



  async function handleDelete(id){
    const token = localStorage.getItem('token')
    await api.delete('/delete', {
      headers: {
        authorization: token,
        id: id
      }
    })
    if(text) {
      const response = await api.get('/filter', {
        headers: {
          authorization: token,
          name: text.toUpperCase()
        }
      })
      const resdata = response.data
      setPeople(resdata)
    }
    else {
      const response = await api.get('/', {
        headers: {
          authorization: token,
          page: 1,
          limit: 1
        }
      })
      const resdata = response.data
      setPeople(resdata)
    }
  }

  if (loading === true && logged === true) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )
  }

  if (!logged) {
    history.push('/')
  }


  return (
    <div className="main-container">

      <header>
        <a href="/add"><button className="addButton">Novo Contato</button></a>
      </header>
  
      <SearchInput value={text} onChange={(search) => setText(search)}/>

      <table className="table-content" style={{overflowX: 'auto'}}>
        
        <thead className="table-header"> 
          <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Contato</th>
          <th>Visualizar</th>
          <th>Editar</th>
          <th>Deletar</th>
          </tr>
          
        </thead>
       
        <tbody className="table-body">
        
    
      {people.map(item => (<tr key={item._id}>
        <td>{item.RazaoSocial}</td>
        <td>{item.Telefone1}</td>
        <td>{item.Email}</td>
        <td>{item.Telefone1Contato}</td>
        <td><a href={"/show/"+item._id}><button className="showButton"><img src={viewIcon} alt="view"></img></button></a></td>
        <td><a href={"/edit/"+item._id}><button className="editButton"><img src={editIcon} alt="edit"></img></button></a></td>
        <td><button type="button" className="deleteButton" onClick={() => {if (window.confirm('Certeza de que você quer deletar este item?')) handleDelete(item._id)}}><img src={deleteIcon} alt="delete"></img></button></td>
        </tr>))}

      </tbody>
      </table>



      <div className="pagination-container">
      <Pagination 
        pageSize={10}
        onChange={setCurrentPage}
        current={currentPage}
        total={totalPeople.length}
      />
      </div>

    </div>
  )
}