import React, { FormEvent, useState } from 'react'
import Modal from 'react-modal'

import { Container } from './styles'
import CloseImg from '../../assets/close.svg'
import api from '../../services/api'
import { usePeople } from '../../hooks/usePeople'
import InputMask from 'react-input-mask'

interface INewPersonModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewPersonModal ({ isOpen, onRequestClose }: INewPersonModalProps) {
  const { currentPage, search, setPeople } = usePeople()
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

  function handleResetPersonAndClose () {
    setRazaoSocial('')
    setEmail('')
    setEndereco('')
    setObservacoes('')
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

  async function handleAddPerson (e: FormEvent) {
    e.preventDefault()
    await api.post('/add', {
      RazaoSocial: RazaoSocial.toUpperCase(),
      Endereco: Endereco.toUpperCase(),
      Email: Email.toLowerCase(),
      Telefone1: Telefone1.replace('_', ''),
      Telefone1Contato: Telefone1Contato.toUpperCase(),
      Telefone2: Telefone2.replace('_', ''),
      Telefone2Contato: Telefone2Contato.toUpperCase(),
      Telefone3: Telefone3.replace('_', ''),
      Telefone3Contato: Telefone3Contato.toUpperCase(),
      Telefone4: Telefone4.replace('_', ''),
      Telefone4Contato: Telefone4Contato.toUpperCase(),
      Telefone5: Telefone5.replace('_', ''),
      Telefone5Contato: Telefone5Contato.toUpperCase(),
      Observacoes: Observacoes.toUpperCase()
    })
    if (search) {
      const { data } = await api.get(`/filter/${search.toUpperCase()}`)
      setPeople(data)
    } else {
      const { data } = await api.get(`/index/${currentPage}`)
      setPeople(data)
    }
    handleResetPersonAndClose()
  }

  return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleResetPersonAndClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                className='react-modal-close'
                onClick={handleResetPersonAndClose}
            >
                <CloseImg />
            </button>
            <Container onSubmit={handleAddPerson}>
                <h2>Adicionar Contato</h2>
                <input
                    placeholder="Nome"
                    value={RazaoSocial}
                    onChange={e => setRazaoSocial(e.target.value)}
                    required={true}
                />
                <input
                    placeholder="Endereço"
                    value={Endereco}
                    onChange={e => setEndereco(e.target.value)}
                />
                <input
                    placeholder="Email"
                    value={Email}
                    onChange={e => setEmail(e.target.value)}
                />
                <InputMask
                    placeholder="Telefone"
                    mask="(99) 99999-9999"
                    value={Telefone1}
                    onChange={e => setTelefone1(e.target.value)}
                    required={true}
                />
                <input
                    placeholder="Contato 1"
                    value={Telefone1Contato}
                    onChange={e => setTelefone1Contato(e.target.value)}
                />
                <InputMask
                    placeholder="Telefone 2"
                    mask="(99) 99999-9999"
                    value={Telefone2}
                    onChange={e => setTelefone2(e.target.value)}
                />
                <input
                    placeholder="Contato 2"
                    value={Telefone2Contato}
                    onChange={e => setTelefone2Contato(e.target.value)}
                />
                <InputMask
                    placeholder="Telefone 3"
                    mask="(99) 99999-9999"
                    value={Telefone3}
                    onChange={e => setTelefone3(e.target.value)}
                />
                <input
                    placeholder="Contato 3"
                    value={Telefone3Contato}
                    onChange={e => setTelefone3Contato(e.target.value)}
                />
                <InputMask
                    placeholder="Telefone 4"
                    mask="(99) 99999-9999"
                    value={Telefone4}
                    onChange={e => setTelefone4(e.target.value)}
                />
                <input
                    placeholder="Contato 4"
                    value={Telefone4Contato}
                    onChange={e => setTelefone4Contato(e.target.value)}
                />
                <InputMask
                    placeholder="Telefone 5"
                    mask="(99) 99999-9999"
                    value={Telefone5}
                    onChange={e => setTelefone5(e.target.value)}
                />
                <input
                    placeholder="Contato 5"
                    value={Telefone5Contato}
                    onChange={e => setTelefone5Contato(e.target.value)}
                />
                <input
                    placeholder="Observações"
                    value={Observacoes}
                    onChange={e => setObservacoes(e.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
  )
}
