import React, { useEffect, useState } from 'react'

import Edit from '../../assets/edit.svg'
import View from '../../assets/view.svg'
import Delete from '../../assets/delete.svg'

import { Container } from './styles'
import api from '../../services/api'
import { EditPersonModal } from '../EditPersonModal'

import { usePeople } from '../../hooks/usePeople'

export interface IPerson {
  id: string
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

export function PeopleTable() {
  const { people, setPeople, search, currentPage } = usePeople()
  const [isEditPersonModalOpen, setIsEditPersonModalOpen] = useState(false)
  const [personToEdit, setPersonToEdit] = useState('')

  function handleOpenEditPersonModal(id: string) {
    setPersonToEdit(id)
    setIsEditPersonModalOpen(true)
  }

  function handleCloseEditPersonModal() {
    setIsEditPersonModalOpen(false)
  }

  async function handleDeletePerson(id: string) {
    await api.delete(`/people/delete/${id}`)
    if (search) {
      const { data } = await api.get<IPerson[]>(
        `/people/list/${currentPage}?name=${search.toUpperCase()}`
      )
      setPeople(data)
    } else {
      const { data } = await api.get<IPerson[]>(`/people/list/${currentPage}`)
      setPeople(data)
    }
  }

  useEffect(() => {
    async function getPeopleData() {
      const response = await api.get(`/people/list/${currentPage}`)
      setPeople(response.data)
    }
    getPeopleData()
  }, [currentPage])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Contato</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {people.map((item) => (
            <tr key={item.id}>
              <td>{item.RazaoSocial}</td>
              <td>{item.Telefone1}</td>
              <td>{item.Telefone1Contato}</td>
              <td>
                <div className="imgButton">
                  <View />
                </div>
              </td>
              <td>
                <div
                  className="imgButton"
                  onClick={() => handleOpenEditPersonModal(item.id)}
                >
                  <Edit />
                </div>
              </td>
              <td>
                <div
                  className="imgButton"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Certeza de que você quer deletar este item?'
                      )
                    )
                      handleDeletePerson(item.id)
                  }}
                >
                  <Delete />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditPersonModal
        isOpen={isEditPersonModalOpen}
        onRequestClose={handleCloseEditPersonModal}
        personToEdit={personToEdit}
        setPersonToEdit={setPersonToEdit}
      />
    </Container>
  )
}
