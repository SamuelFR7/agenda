import React, { useEffect, useState } from 'react'

import api from '../services/api'

import './Show.css'

export default function Show({ match, history }){
    const [person, setPerson] = useState([])
    
    useEffect(() => {
        async function loadPerson(){
            const response = await api.get('/show', {
                headers: {
                    id: match.params.id
                }
            })
            const datares = response.data
            setPerson(datares)
        }
        loadPerson()
    }, [match.params.id])

    function handleReturn(){
        history.push('/main')
    }


    return (
        <div className="list-container">
            <ul className="list-content" >
                <div className="listBox">
                <li className="list-item"><p>Nome:</p>{person.RazaoSocial}</li>
                <li className="list-item"><p>Endereço:</p>{person.Endereco}</li>
                </div>
                <li className="list-item"><p>Email:</p>{person.Email}</li>
                <div className="listBox">
                <li className="list-item"><p>Telefone 1:</p>{person.Telefone1}</li>
                <li className="list-item"><p>Contato 1:</p>{person.Telefone1Contato}</li>
                </div>
                <div className="listBox">
                <li className="list-item"><p>Telefone 2:</p>{person.Telefone2}</li>
                <li className="list-item"><p>Contato 2:</p>{person.Telefone2Contato}</li>
                </div>
                <div className="listBox">
                <li className="list-item"><p>Telefone 3:</p>{person.Telefone3}</li>
                <li className="list-item"><p>Contato 3:</p>{person.Telefone3Contato}</li>
                </div>
                <div className="listBox">
                <li className="list-item"><p>Telefone 4:</p>{person.Telefone4}</li>
                <li className="list-item"><p>Contato 4:</p>{person.Telefone4Contato}</li>
                </div>
                <div className="listBox">
                <li className="list-item"><p>Telefone 5:</p>{person.Telefone5}</li>
                <li className="list-item"><p>Contato 5:</p>{person.Telefone5Contato}</li>
                </div>

                <li className="list-item"><p>Observações:</p>{person.Observacoes}</li>
               
            </ul>
            <button onClick={handleReturn}>Retornar</button>
        </div>
    )
}