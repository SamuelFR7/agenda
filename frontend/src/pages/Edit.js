import React, {useState} from 'react'
import Header from '../components/Header'

import api from '../services/api'

export default function Edit({ history }){
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

    async function handleSubmit(e){
        e.preventDefault()

        await api.post('/edit',{
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

        history.push('/')
    }

    return (
        <div>
           <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet" />
            
            <div>
            <Header />     

            <div className="container w-50">
                <h1 className="text-black text-center mt-5 mb-3">Editar Contato</h1>
                    <form onSubmit={handleSubmit} className="d-flex flex-column">
                        <input className="form-control mb-2" placeholder="Nome" value={RazaoSocial} onChange={e => setRazaoSocial(e.target.value)} />
                        <input className="form-control mb-2" placeholder="Endereço" value={Endereco} onChange={e => setEndereco(e.target.value)} />
                        <input className="form-control mb-2" placeholder="Email" value={Email} onChange={e => setEmail(e.target.value)} />
                        <div className="d-inline">
                            <input className="form-control mb-2" placeholder="Telefone 1" value={Telefone1} onChange={e => setTelefone1(e.target.value)} />
                            <input className="form-control mb-2 ml-5" placeholder="Contato 1" value={Telefone1Contato} onChange={e => setTelefone1Contato(e.target.value)} />
                        </div>
                        <div className="form-inline">
                            <input className="form-control mb-2" placeholder="Telefone 2" value={Telefone2} onChange={e => setTelefone2(e.target.value)} />
                            <input className="form-control mb-2 ml-5" placeholder="Contato 2" value={Telefone2Contato} onChange={e => setTelefone2Contato(e.target.value)} />
                        </div>
                        <div className="form-inline">
                            <input className="form-control mb-2" placeholder="Telefone 3" value={Telefone3} onChange={e => setTelefone3(e.target.value)} />
                            <input className="form-control mb-2 ml-5" placeholder="Contato 3" value={Telefone3Contato} onChange={e => setTelefone3Contato(e.target.value)} />
                        </div>
                        <div className="form-inline">
                            <input className="form-control mb-2" placeholder="Telefone 4" value={Telefone4} onChange={e => setTelefone4(e.target.value)} />
                            <input className="form-control mb-2 ml-5" placeholder="Contato 4" value={Telefone4Contato} onChange={e => setTelefone4Contato(e.target.value)} />
                        </div>
                        <div className="form-inline">
                            <input className="form-control mb-2" placeholder="Telefone 5" value={Telefone5} onChange={e => setTelefone5(e.target.value)} />
                            <input className="form-control mb-2 ml-5" placeholder="Contato 5" value={Telefone5Contato} onChange={e => setTelefone5Contato(e.target.value)} />
                        </div>

                        <input className="form-control mb-4" placeholder="Observações" value={Observacoes} onChange={e => setObservacoes(e.target.value)} />
                        <button type="submit" className="btn btn-primary">Editar</button>
                    </form>
            </div>
            </div>
        </div>
    )
}