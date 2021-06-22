import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import api from '../services/api'

import '../styles/Show.scss'

export default function Show({ match, history }){
    const [person, setPerson] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPerson(){
            const response = await api.get('/show', {
                headers: {
                    id: match.params.id
                }
            })
            const datares = response.data
            setPerson(datares)
            setLoading(false)
        }
        loadPerson()
    }, [match.params.id])

    function handleReturn(){
        history.push('/main')
    }

    if (loading){
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
                        <input style={{color: 'black'}} className="inputField" placeholder="Nome" value={person.RazaoSocial} disabled={true} />
                        <input style={{color: 'black'}} className="inputField" placeholder="Endereço" value={person.Endereco} disabled={true} />
                        <input style={{color: 'black'}} className="inputField" placeholder="Email" value={person.Email} disabled={true} />
                        <div className="inputBox">
                        <Input style={{color: 'black'}} placeholder="Telefone 4" name="number" value={person.Telefone1} disabled={true} />
                        <input style={{color: 'black'}} className="inputBoxField" placeholder="Contato 1" value={person.Telefone1Contato} disabled={true} />
                        </div>
                        <div className="inputBox">
                        <Input style={{color: 'black'}} placeholder="Telefone 4" name="number" value={person.Telefone2} disabled={true} />
                        <input style={{color: 'black'}} className="inputField" placeholder="Contato 2" value={person.Telefone2Contato} disabled={true} />
                        </div>
                        <div className="inputBox">
                        <Input style={{color: 'black'}} placeholder="Telefone 4" name="number" value={person.Telefone3} disabled={true} />
                        <input style={{color: 'black'}} className="inputField" placeholder="Contato 3" value={person.Telefone3Contato} disabled={true} />
                        </div>
                        <div className="inputBox">
                        <Input style={{color: 'black'}} placeholder="Telefone 4" name="number" value={person.Telefone4} disabled={true} />
                        <input style={{color: 'black'}} className="inputField" placeholder="Contato 4" value={person.Telefone4Contato} disabled={true} />
                        </div>
                        <div className="inputBox">
                        <Input style={{color: 'black'}} placeholder="Telefone 5" name="number" value={person.Telefone5} disabled={true} />
                        <input style={{color: 'black'}} className="inputField" placeholder="Contato 5" value={person.Telefone5Contato} disabled={true} />
                        </div>
                        <input style={{color: 'black'}} className="inputField" placeholder="Observações" value={person.Observacoes} disabled={true}/>
                        <button className="buttonReturn" onClick={handleReturn}>Retornar</button>
                    </form>
            </div>
        </div>
    )
}