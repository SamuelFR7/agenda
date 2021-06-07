import React, { useEffect, useState } from 'react'

import api from '../services/api'

export default function Show({ match }){
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

    console.log(person)

    return (
        <div>
            <ul>
                <li>Nome: {person.RazaoSocial}</li>
                <li>Telefone 1: {person.Telefone1}</li>
                <li>Telefone 2: {person.Telefone2}</li>
                <li>Telefone 3: {person.Telefone3}</li>
                <li>Telefone 4: {person.Telefone4}</li>
                <li>Telefone 5: {person.Telefone5}</li>
                <li>Contato 1: {person.Telefone1Contato}</li>
                <li>Contato 2: {person.Telefone2Contato}</li>
                <li>Contato 3: {person.Telefone3Contato}</li>
                <li>Contato 4: {person.Telefone4Contato}</li>
                <li>Contato 5: {person.Telefone5Contato}</li>
                <li>Email: {person.Email}</li>
                <li>Observacoes: {person.Observacoes}</li>
            </ul>
        </div>
    )
}