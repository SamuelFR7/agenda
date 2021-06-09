import React, {useEffect, useState} from 'react'

import api from '../services/api'

import './Add.css'

export default function AddForm({ history }){
    const [RazaoSocial, setRazaoSocial] = useState('')
    const [Endereco, setEndereco] = useState('')
    const [Email, setEmail] = useState('')
    const [Telefone1, setTelefone1] = useState('')
    const [Telefone1Contato, setTelefone1Contato] = useState('')
    const [Telefone2, setTelefone2] = useState('')
    const [Telefone2Contato, setTelefone2Contato] = useState('')
    const [Telefone3, setTelefone3] = useState('')
    const [Telefone3Contato, setTelefone3Contato] = useState('')
    const [Telefone4, setTelefone4] = useState('')
    const [Telefone4Contato, setTelefone4Contato] = useState('')
    const [Telefone5, setTelefone5] = useState('')
    const [Telefone5Contato, setTelefone5Contato] = useState('')
    const [Observacoes, setObservacoes] = useState('')
    const [logout, setLogout] = useState(false)

    useEffect(() => {
        async function Check(){
            try {
                const token = localStorage.getItem('token')
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
    }, [])


    async function handleSubmit(e){
        e.preventDefault()

        await api.post('/add',{
            RazaoSocial,
            Endereco,
            Email,
            Telefone1,
            Telefone1Contato,
            Telefone2,
            Telefone2Contato,
            Telefone3,
            Telefone3Contato,
            Telefone4,
            Telefone4Contato,
            Telefone5,
            Telefone5Contato,
            Observacoes
        })
        history.push('/main')
    }

    function handleReturn(){
        history.push('/main')
    }

    if (logout === true) {
        history.push('/main')
    }


    return (
        <div className="form-container">
            <button className="buttonReturn" onClick={handleReturn}>Retornar</button>
            <div className="form-content">
                    <form  onSubmit={handleSubmit}>
                        <input className="inputField" placeholder="Nome" value={RazaoSocial} onChange={e => setRazaoSocial(e.target.value.toUpperCase())} required={true} />
                        <input className="inputField" placeholder="Endereço" value={Endereco} onChange={e => setEndereco(e.target.value.toUpperCase())} />
                        <input className="inputField" placeholder="Email" value={Email} onChange={e => setEmail(e.target.value.toUpperCase())} />
                        <input className="inputField" placeholder="Telefone 1" value={Telefone1} onChange={e => setTelefone1(e.target.value)} required={true} />
                        <input className="inputField" placeholder="Contato 1" value={Telefone1Contato} onChange={e => setTelefone1Contato(e.target.value.toUpperCase())} />
                        <input className="inputField" placeholder="Telefone 2" value={Telefone2} onChange={e => setTelefone2(e.target.value)} />
                        <input className="inputField" placeholder="Contato 2" value={Telefone2Contato} onChange={e => setTelefone2Contato(e.target.value.toUpperCase())} />
                        <input className="inputField" placeholder="Telefone 3" value={Telefone3} onChange={e => setTelefone3(e.target.value)} />
                        <input className="inputField" placeholder="Contato 3" value={Telefone3Contato} onChange={e => setTelefone3Contato(e.target.value.toUpperCase())} />
                        <input className="inputField" placeholder="Telefone 4" value={Telefone4} onChange={e => setTelefone4(e.target.value)} />
                        <input className="inputField" placeholder="Contato 4" value={Telefone4Contato} onChange={e => setTelefone4Contato(e.target.value.toUpperCase())} />
                        <input className="inputField" placeholder="Telefone 5" value={Telefone5} onChange={e => setTelefone5(e.target.value)} />
                        <input className="inputField" placeholder="Contato 5" value={Telefone5Contato} onChange={e => setTelefone5Contato(e.target.value.toUpperCase())} />
                        <input className="inputField" placeholder="Observações" value={Observacoes} onChange={e => setObservacoes(e.target.value.toUpperCase())} />
                        <button type="submit">Adicionar</button>
                    </form>
            </div>
        </div>
    )
}