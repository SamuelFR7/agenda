import React, { useState, useEffect } from 'react'
import SearchInput from '../SearchInput'

import api from '../../services/api'



export default function Table(){
  const [people, setPeople] = useState([])
  const [text, setText] = useState('')
  console.log(people)

  useEffect(() => {
    async function search(){
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
  search()
  }, [text])


  useEffect(() => {
    async function loadPeople(){
    const data = await api.get('/')
    const response = data.data
    setPeople(response)}
    loadPeople()
  }, [])


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


  return (
    <div>
      <SearchInput value={text} onChange={(search) => setText(search)} />
      <header>
      </header>
      <table>
        <thead>
          <tr>
          <th>Nome</th>
          <th>Telefone1</th>
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
        <td><a href={"/edit/"+item._id}>Editar</a></td>
        <td><a href={"/show/"+item._id}>Visualizar</a></td>
        </tr>))}
      </tbody>
      </table>
    </div>
  )
}