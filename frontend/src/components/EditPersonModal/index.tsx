import React, { FormEvent, useEffect, useState } from 'react'

import Modal from 'react-modal'

import CloseImg from '../../assets/close.svg'
import api from '../../services/api'

import { IPerson } from '../PeopleTable'

import { Container } from './styles'
import { usePeople } from '../../hooks/usePeople'

interface IEditPersonModal {
    isOpen: boolean;
    onRequestClose: () => void;
    personToEdit: string
    setPersonToEdit: React.Dispatch<React.SetStateAction<string>>
    ;
}

export function EditPersonModal ({ isOpen, onRequestClose, personToEdit, setPersonToEdit }: IEditPersonModal) {
  const { search, setPeople, currentPage } = usePeople()
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
    async function getPersonToEditData () {
      if (personToEdit) {
        const { data } = await api.get<IPerson>(`/show/${personToEdit}`)
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
    getPersonToEditData()
  }, [personToEdit])

  async function handleSetPeople () {
    if (search) {
      const { data } = await api.get(`/filter/${search.toUpperCase()}`)
      setPeople(data)
    } else {
      const { data } = await api.get(`/index/${currentPage}`)
      setPeople(data)
    }
  }

  function handleCloseAndResetPerson () {
    setPersonToEdit('')
    setRazaoSocial('')
    setEmail('')
    setObservacoes('')
    setEmail('')
    setTelefone1('')
    setTelefone2('')
    setTelefone3('')
    setTelefone4('')
    setTelefone5('')
    setTelefone1Contato('')
    setTelefone2Contato('')
    setTelefone3Contato('')
    setTelefone4Contato('')
    setTelefone5Contato('')
    onRequestClose()
  }

  async function handleEditPerson (e: FormEvent) {
    e.preventDefault()
    await api.patch('/update', {
      id: personToEdit,
      RazaoSocial: RazaoSocial.toUpperCase(),
      Telefone1: Telefone1,
      Telefone2: Telefone2,
      Telefone3: Telefone3,
      Telefone4: Telefone4,
      Telefone5: Telefone5,
      Telefone1Contato: Telefone1Contato.toUpperCase(),
      Telefone2Contato: Telefone2Contato.toUpperCase(),
      Telefone3Contato: Telefone3Contato.toUpperCase(),
      Telefone4Contato: Telefone4Contato.toUpperCase(),
      Telefone5Contato: Telefone5Contato.toUpperCase(),
      Email: Email.toLowerCase(),
      Endereco: Endereco.toUpperCase(),
      Observacoes: Observacoes.toUpperCase()
    })
    handleSetPeople()
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
                className='react-modal-close'
                onClick={handleCloseAndResetPerson}
            >
                <CloseImg />
            </button>
            <Container onSubmit={handleEditPerson}>
                <h2>
                    Editar Contato
                </h2>
                <input
                        placeholder="Nome"
                        defaultValue={RazaoSocial}
                        onChange={e => setRazaoSocial(e.target.value)}
                        required={true}
                    />
                    <input
                        placeholder="Endereço"
                        defaultValue={Endereco}
                        onChange={e => setEndereco(e.target.value)}
                    />
                    <input
                        placeholder="Email"
                        defaultValue={Email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Telefone"
                        defaultValue={Telefone1}
                        onChange={e => setTelefone1(e.target.value)}
                        required={true}
                    />
                    <input
                        placeholder="Contato 1"
                        defaultValue={Telefone1Contato}
                        onChange={e => setTelefone1Contato(e.target.value)}
                    />
                    <input
                        placeholder="Telefone 2"
                        defaultValue={Telefone2}
                        onChange={e => setTelefone2(e.target.value)}
                    />
                    <input
                        placeholder="Contato 2"
                        defaultValue={Telefone2Contato}
                        onChange={e => setTelefone2Contato(e.target.value)}
                    />
                    <input
                        placeholder="Telefone 3"
                        defaultValue={Telefone3}
                        onChange={e => setTelefone3(e.target.value)}
                    />
                    <input
                        placeholder="Contato 3"
                        defaultValue={Telefone3Contato}
                        onChange={e => setTelefone3Contato(e.target.value)}
                    />
                    <input
                        placeholder="Telefone 4"
                        defaultValue={Telefone4}
                        onChange={e => setTelefone4(e.target.value)}
                    />
                    <input
                        placeholder="Contato 4"
                        defaultValue={Telefone4Contato}
                        onChange={e => setTelefone4Contato(e.target.value)}
                    />
                    <input
                        placeholder="Telefone 5"
                        defaultValue={Telefone5}
                        onChange={e => setTelefone5(e.target.value)}
                    />
                    <input
                        placeholder="Contato 5"
                        defaultValue={Telefone5Contato}
                        onChange={e => setTelefone5Contato(e.target.value)}
                    />
                    <input
                        placeholder="Observações"
                        defaultValue={Observacoes}
                        onChange={e => setObservacoes(e.target.value)}
                    />

                    <button type="submit">
                        Cadastrar
                    </button>
            </Container>

        </Modal>
  )
}
