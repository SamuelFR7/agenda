import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IPerson } from '../../dtos/IPerson'
import api from '../../services/api'
import { Input } from '../Form/input'

interface IViewPersonProps {
  isOpen: boolean
  onClose: () => void
  personToView: string
  setPersonToView: React.Dispatch<React.SetStateAction<string>>
}

function ViewPerson({
  isOpen,
  onClose,
  personToView,
  setPersonToView,
}: IViewPersonProps) {
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
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseAndResetPerson}
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Visualizar Contato</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing="4">
            <HStack spacing="4">
              <Input
                error={null}
                value={RazaoSocial}
                name="RazaoSocial"
                label="Nome"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
              <Input
                error={null}
                value={Endereco}
                name="Endereco"
                label="Endereço"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
            </HStack>
            <HStack spacing="4">
              <Input
                error={null}
                name="Email"
                value={Email}
                label="E-mail"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
              <Input
                error={null}
                name="Telefone1"
                value={Telefone1}
                label="Telefone"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
            </HStack>
            <HStack spacing="4">
              <Input
                error={null}
                name="Telefone1Contato"
                value={Telefone1Contato}
                label="Contato 1"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
              <Input
                error={null}
                name="Telefone2"
                value={Telefone2}
                label="Telefone 2"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
            </HStack>
            <HStack spacing="4">
              <Input
                error={null}
                name="Telefone2Contato"
                value={Telefone2Contato}
                label="Contato 2"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
              <Input
                error={null}
                name="Telefone3"
                value={Telefone3}
                label="Telefone 3"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
            </HStack>
            <HStack spacing="4">
              <Input
                error={null}
                name="Telefone3Contato"
                value={Telefone3Contato}
                label="Contato 3"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
              <Input
                error={null}
                name="Telefone4"
                value={Telefone4}
                label="Telefone 4"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
            </HStack>
            <HStack spacing="4">
              <Input
                error={null}
                name="Telefone4Contato"
                value={Telefone4Contato}
                label="Contato 4"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
              <Input
                error={null}
                name="Telefone5"
                value={Telefone5}
                label="Telefone 5"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
            </HStack>
            <HStack spacing="4">
              <Input
                error={null}
                name="Telefone5Contato"
                value={Telefone5Contato}
                label="Contato 5"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
              <Input
                error={null}
                name="Observacoes"
                value={Observacoes}
                label="Observações"
                isDisabled={true}
                _disabled={{ color: 'black', opacity: 100 }}
              />
            </HStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            w="100%"
            colorScheme="green"
            onClick={handleCloseAndResetPerson}
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { ViewPerson }
