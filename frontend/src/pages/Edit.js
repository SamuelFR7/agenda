import React, { useEffect, useState, useCallback } from 'react'
import api from '../services/api'
import Input from '../components/Input'

export default function EditForm({ match, history }){
    const [person, setPerson] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPerson(){
            const response = await api.get('/show', {
                headers: { id: match.params.id }
            })
            setPerson(response.data)
            setLoading(false)
        }
        loadPerson()
    }, [match.params.id])



    const [RazaoSocial, setRazaoSocial] = useState()
    const [Telefone1, setTelefone1] = useState()
    const [Telefone2, setTelefone2] = useState()
    const [Telefone3, setTelefone3] = useState()
    const [Telefone4, setTelefone4] = useState()
    const [Telefone5, setTelefone5] = useState()
    const [Telefone1Contato, setTelefone1Contato] = useState()
    const [Telefone2Contato, setTelefone2Contato] = useState()
    const [Telefone3Contato, setTelefone3Contato] = useState()
    const [Telefone4Contato, setTelefone4Contato] = useState()
    const [Telefone5Contato, setTelefone5Contato] = useState()
    const [Email, setEmail] = useState()
    const [Observacoes, setObservacoes] = useState()
    const [Endereco, setEndereco] = useState()
    const [number, setNumber] = useState('')

    const handleChange = useCallback((e) => {
        setNumber(e.currentTarget.value)
    }, [])

    async function handleSubmit(){
        const id = match.params.id
        await api.post('/update', {
            id,
            RazaoSocial,
            Telefone1,
            Telefone2,
            Telefone3,
            Telefone4,
            Telefone5,
            Telefone1Contato,
            Telefone2Contato,
            Telefone3Contato,
            Telefone4Contato,
            Telefone5Contato,
            Email,
            Endereco,
            Observacoes
        })
        console.log(number)
        history.push('/main')
    }

    function handleReturn(){
        history.push('/main')
    }

    if (loading === true){
        return (
            <div className="loader-container">
            <div className="loader"></div>
          </div>
        )
    }



    return (
        <div className="form-container">
            <button className="buttonReturn" onClick={handleReturn}>Retornar</button>
            <div className="form-content">
            <form>
                <input className="inputField" placeholder="Nome" defaultValue={person.RazaoSocial} onChange={e => setRazaoSocial(e.target.value.toUpperCase())} />
                <input className="inputField" placeholder="Endereco" defaultValue={person.Endereco} onChange={e => setEndereco(e.target.value.toUpperCase())} />
                <input className="inputField" placeholder="Email" defaultValue={person.Email} onChange={e => setEmail(e.target.value.toLowerCase())} />
                <div className="inputBox">
                <Input placeholder="Telefone 1" name="number" defaultValue={person.Telefone1} onChange={(e) => handleChange && setTelefone1(e.target.value)} />
                <input className="inputBoxField" placeholder="Contato 1" defaultValue={person.Telefone1Contato} onChange={e => setTelefone1Contato(e.target.value.toUpperCase())} />
                </div>
                <div className="inputBox">
                <Input placeholder="Telefone 2" name="number" defaultValue={person.Telefone2} onChange={(e) => handleChange && setTelefone2(e.target.value)} />
                <input className="inputField" placeholder="Contato 2" defaultValue={person.Telefone2Contato} onChange={e => setTelefone2Contato(e.target.value.toUpperCase())} />
                </div>
                <div className="inputBox">
                <Input placeholder="Telefone 3" name="number" defaultValue={person.Telefone3} onChange={(e) => handleChange && setTelefone3(e.target.value)} />
                <input className="inputField" placeholder="Contato 3" defaultValue={person.Telefone3Contato} onChange={e => setTelefone3Contato(e.target.value.toUpperCase())} />
                </div>
                <div className="inputBox">
                <Input placeholder="Telefone 4" name="number" defaultValue={person.Telefone4} onChange={(e) => handleChange && setTelefone4(e.target.value)} />
                <input className="inputField" placeholder="Contato 4" defaultValue={person.Telefone4Contato} onChange={e => setTelefone4Contato(e.target.value.toUpperCase())} />
                </div>
                <div className="inputBox">
                <Input placeholder="Telefone 5" name="number" defaultValue={person.Telefone5} onChange={(e) => handleChange && setTelefone5(e.target.value)} />
                <input className="inputField" placeholder="Contato 5" defaultValue={person.Telefone5Contato} onChange={e => setTelefone5Contato(e.target.value.toUpperCase())} />
                </div>
                <input className="inputField" placeholder="Observações" defaultValue={person.Observacoes} onChange={e => setObservacoes(e.target.value.toUpperCase())} />
                <button type='button' onClick={() => handleSubmit()}>Alterar</button>
            </form>
            </div>
            
        </div>
    )
}