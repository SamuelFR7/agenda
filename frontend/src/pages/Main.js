import React, { useState, useEffect } from 'react'
import SearchInput from '../components/SearchInput'
import '../styles/Main.scss'
import Pagination from 'rc-pagination'

import 'rc-pagination/assets/index.css'

import api from '../services/api'


import deleteIcon from '../assets/delete.png'
import editIcon from '../assets/pen.png'
import viewIcon from '../assets/view.png'
import { useCookies } from 'react-cookie'

export default function Table({ history }){
  const [people, setPeople] = useState([])
  const [text, setText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPeople, setTotalPeople] = useState(1)
  const [loading, setLoading] = useState(true)
  const [logged, setLogged] = useState(true)
  const [cookies] = useCookies(['cookie-name'])
  
  const token = cookies.token

  useEffect(() => {
    async function Check(){
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
      const {data} = await api.get('/length')
      setTotalPeople(data)
    }
    Check()
    loadAllPeople()
  }, [token])


  useEffect(() => {
    async function search(){
      if(text) {
        const {data} = await api.get('/filter', {
          headers: {
            name: text.toUpperCase(),
            limit: 1
          }
        })
        setPeople(data)
      }
      else {
        setCurrentPage(1)
        const {data} = await api.get('/', {
          headers: {
            page: 1,
            limit: 1
          }
        })
        setPeople(data)
      }
  }
  search()
  }, [text])

  useEffect(() => {
    async function loadPeople(){
      const {data} = await api.get('/', {
        headers: {
          page: currentPage,
          limit: 1
        }
    })
    setPeople(data)
    setLoading(false)
  }
    loadPeople()
  }, [currentPage])


  async function handleDelete(id){
    await api.delete('/delete', {
      headers: {
        id: id
      }
    })
    if(text) {
      const {data} = await api.get('/filter', {
        headers: {
          name: text.toUpperCase()
        }
      })
      setPeople(data)
    }
    else {
      const {data} = await api.get('/', {
        headers: {
          page: currentPage,
          limit: 1
        }
      })
      setPeople(data)
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
        <td><a href={"/show/"+item._id}><button className="showButton"><img src={viewIcon} alt="view"></img></button></a></td>
        <td><a href={"/edit/"+item._id}><button className="editButton"><img src={editIcon} alt="edit"></img></button></a></td>
        <td><button type="button" className="deleteButton" onClick={() => {if (window.confirm('Certeza de que você quer deletar este item?')) handleDelete(item._id)}}><img src={deleteIcon} alt="delete"></img></button></td>
        </tr>))}
      </tbody>
      </table>


      {!text && (
        <div className="pagination-container">
        <Pagination 
          pageSize={10}
          onChange={setCurrentPage}
          current={currentPage}
          total={totalPeople}
        />
        </div>
      )}

    </div>
  )
}