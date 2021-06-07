import React, { useState, useEffect } from 'react'
import SearchInput from '../SearchInput'
import api from '../../services/api'

export default function Table(){
  const [people, setPeople] = useState([])
  const [text, setText] = useState('')


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
        <td><button type="button">Teste</button></td>
        </tr>))}

      </tbody>
      </table>
    </div>
  )
}