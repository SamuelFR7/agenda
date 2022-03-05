import React, { useEffect, useState } from 'react'

import Modal from 'react-modal'

import CloseImg from '../../assets/close.svg'
import api from '../../services/api'

import { IPerson } from '../PeopleTable'

import { Container } from './styles'

interface IViewPersonModal {
    isOpen: boolean
    onRequestClose: () => void
    personToView: string
    setPersonToView: React.Dispatch<React.SetStateAction<string>>
}

export function ViewPersonModal({
    isOpen,
    onRequestClose,
    personToView,
    setPersonToView,
}: IViewPersonModal) {
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

    useEffect(() => {
        async function getPersonToViewData() {
            if (personToView) {
                const { data } = await api.get<IPerson>(`/people/show/${personToView}`)
                setRazaoSocial(data.RazaoSocial)
                setEndereco(data.Endereco)
                setEmail(data.Email)
                setTelefone1(data.Telefone1)
                setTelefone1Contato(data.Telefone1Contato)
                setTelefone2(data.Telefone2)
                setTelefone2Contato(data.Telefone2Contato)
                setTelefone3(data.Telefone3)
                setTelefone3Contato(data.Telefone3Contato)
                setTelefone4(data.Telefone4)
                setTelefone4Contato(data.Telefone4Contato)
                setTelefone5(data.Telefone5)
                setTelefone5Contato(data.Telefone5Contato)
                setObservacoes(data.Observacoes)
            }
        }
        getPersonToViewData()
    }, [personToView])

    function handleCloseAndResetPerson() {
        setPersonToView('')
        setRazaoSocial('')
        setEndereco('')
        setEmail('')
        setTelefone1('')
        setTelefone1Contato('')
        setTelefone2('')
        setTelefone2Contato('')
        setTelefone3('')
        setTelefone3Contato('')
        setTelefone4('')
        setTelefone4Contato('')
        setTelefone5('')
        setTelefone5Contato('')
        setObservacoes('')
        onRequestClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseAndResetPerson}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                className="react-modal-close"
                onClick={handleCloseAndResetPerson}
            >
                <CloseImg />
            </button>
            <Container onSubmit={handleCloseAndResetPerson}>
                <h2>Visualizar Contato</h2>
                <input placeholder="Nome" value={RazaoSocial} disabled={true} />
                <input
                    placeholder="Endereço"
                    value={Endereco}
                    disabled={true}
                />
                <input placeholder="Email" value={Email} disabled={true} />
                <input
                    placeholder="Telefone"
                    value={Telefone1}
                    disabled={true}
                />
                <input
                    placeholder="Contato 1"
                    value={Telefone1Contato}
                    disabled={true}
                />
                <input
                    placeholder="Telefone 2"
                    value={Telefone2}
                    disabled={true}
                />
                <input
                    placeholder="Contato 2"
                    value={Telefone2Contato}
                    disabled={true}
                />
                <input
                    placeholder="Telefone 3"
                    value={Telefone3}
                    disabled={true}
                />
                <input
                    placeholder="Contato 3"
                    value={Telefone3Contato}
                    disabled={true}
                />
                <input
                    placeholder="Telefone 4"
                    value={Telefone4}
                    disabled={true}
                />
                <input
                    placeholder="Contato 4"
                    value={Telefone4Contato}
                    disabled={true}
                />
                <input
                    placeholder="Telefone 5"
                    value={Telefone5}
                    disabled={true}
                />
                <input
                    placeholder="Contato 5"
                    value={Telefone5Contato}
                    disabled={true}
                />
                <input
                    placeholder="Observações"
                    value={Observacoes}
                    disabled={true}
                />

                <button type="submit">Fechar</button>
            </Container>
        </Modal>
    )
}
