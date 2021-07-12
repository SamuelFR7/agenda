import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Input from '../components/Input'
import api from '../services/api'
import { useHistory, useParams } from 'react-router-dom'

import '../styles/Show.scss'

type ShowParams = {
    id: string
}

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

export default function Show () {
  const history = useHistory()
  const params = useParams<ShowParams>()
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
  const [logout, setLogout] = useState(false)
  const [cookies] = useCookies(['cookie-name'])

  const token = cookies.token

  useEffect(() => {
    async function Check () {
      try {
        const response = await api.get('/user/check', {
          headers: {
            authorization: token
          }
        })
        console.log(response)
      } catch (error) {
        setLogout(true)
      }
    }
    Check()
  }, [token])

  useEffect(() => {
    async function loadPerson () {
      const response = await api.post('/show', {
        id: params.id
      })
      const datares = response.data
      setPerson(datares)
      setLoading(false)
    }
    loadPerson()
  }, [params.id])

  function handleReturn () {
    history.push('/main')
  }

  if (logout) {
    history.push('/')
  }

  if (loading) {
    return (
            <div className="loader-container">
            <div className="loader"></div>
          </div>
    )
  }

  return (
        <div className="form-container">
            <div className="form-content">
                    <form>
                        <input style={{ color: 'black' }} className="inputField" placeholder="Nome" value={person.RazaoSocial} disabled={true} />
                        <input style={{ color: 'black' }} className="inputField" placeholder="Endereço" value={person.Endereco} disabled={true} />
                        <input style={{ color: 'black' }} className="inputField" placeholder="Email" value={person.Email} disabled={true} />
                        <div className="inputBox">
                        <Input style={{ color: 'black' }} placeholder="Telefone 4" name="number" value={person.Telefone1} disabled={true} />
                        <input style={{ color: 'black' }} className="inputBoxField" placeholder="Contato 1" value={person.Telefone1Contato} disabled={true} />
                        </div>
                        <div className="inputBox">
                        <Input style={{ color: 'black' }} placeholder="Telefone 4" name="number" value={person.Telefone2} disabled={true} />
                        <input style={{ color: 'black' }} className="inputField" placeholder="Contato 2" value={person.Telefone2Contato} disabled={true} />
                        </div>
                        <div className="inputBox">
                        <Input style={{ color: 'black' }} placeholder="Telefone 4" name="number" value={person.Telefone3} disabled={true} />
                        <input style={{ color: 'black' }} className="inputField" placeholder="Contato 3" value={person.Telefone3Contato} disabled={true} />
                        </div>
                        <div className="inputBox">
                        <Input style={{ color: 'black' }} placeholder="Telefone 4" name="number" value={person.Telefone4} disabled={true} />
                        <input style={{ color: 'black' }} className="inputField" placeholder="Contato 4" value={person.Telefone4Contato} disabled={true} />
                        </div>
                        <div className="inputBox">
                        <Input style={{ color: 'black' }} placeholder="Telefone 5" name="number" value={person.Telefone5} disabled={true} />
                        <input style={{ color: 'black' }} className="inputField" placeholder="Contato 5" value={person.Telefone5Contato} disabled={true} />
                        </div>
                        <input style={{ color: 'black' }} className="inputField" placeholder="Observações" value={person.Observacoes} disabled={true}/>
                        <button className="buttonReturn" onClick={handleReturn}>Retornar</button>
                    </form>
            </div>
        </div>
  )
}
