import {
  Box,
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
import React, { FormEvent, useState } from 'react'
import { usePeople } from '../../hooks/usePeople'
import api from '../../services/api'
import { Input } from '../Form/input'
import InputMask from 'react-input-mask'

interface IAddPersonProps {
  isOpen: boolean
  onClose: () => void
}

function AddPerson({ isOpen, onClose }: IAddPersonProps) {
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

  function handleResetPersonAndClose() {
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
    onClose()
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await api.post('/people/', {
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
      Observacoes: Observacoes.toUpperCase(),
    })
    if (search) {
      const { data } = await api.get(
        `/people/list/${currentPage}?name=${search.toUpperCase()}`
      )
      setPeople(data)
    } else {
      const { data } = await api.get(`/people/list/${currentPage}`)
      setPeople(data)
    }
    handleResetPersonAndClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetPersonAndClose}
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Contato</ModalHeader>
        <ModalCloseButton />
        <Box as="form" onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing="4">
              <HStack spacing="4">
                <Input
                  value={RazaoSocial}
                  onChange={(e) => setRazaoSocial(e.target.value)}
                  name="RazaoSocial"
                  label="Nome"
                  isRequired
                />
                <Input
                  value={Endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  name="Endereco"
                  label="Endereço"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="E-mail"
                />
                <Input
                  name="Telefone1"
                  value={Telefone1}
                  as={InputMask}
                  mask="(**) *****-****"
                  onChange={(e) => setTelefone1(e.target.value)}
                  label="Telefone"
                  isRequired
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Telefone1Contato"
                  value={Telefone1Contato}
                  onChange={(e) => setTelefone1Contato(e.target.value)}
                  label="Contato 1"
                />
                <Input
                  name="Telefone2"
                  value={Telefone2}
                  as={InputMask}
                  mask="(**) *****-****"
                  onChange={(e) => setTelefone2(e.target.value)}
                  label="Telefone 2"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Telefone2Contato"
                  value={Telefone2Contato}
                  onChange={(e) => setTelefone2Contato(e.target.value)}
                  label="Contato 2"
                />
                <Input
                  name="Telefone3"
                  value={Telefone3}
                  as={InputMask}
                  mask="(**) *****-****"
                  onChange={(e) => setTelefone3(e.target.value)}
                  label="Telefone 3"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Telefone3Contato"
                  value={Telefone3Contato}
                  onChange={(e) => setTelefone3Contato(e.target.value)}
                  label="Contato 3"
                />
                <Input
                  name="Telefone4"
                  value={Telefone4}
                  as={InputMask}
                  mask="(**) *****-****"
                  onChange={(e) => setTelefone4(e.target.value)}
                  label="Telefone 4"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Telefone4Contato"
                  value={Telefone4Contato}
                  onChange={(e) => setTelefone4Contato(e.target.value)}
                  label="Contato 4"
                />
                <Input
                  name="Telefone5"
                  value={Telefone5}
                  as={InputMask}
                  mask="(**) *****-****"
                  onChange={(e) => setTelefone5(e.target.value)}
                  label="Telefone 5"
                />
              </HStack>
              <HStack spacing="4">
                <Input
                  name="Telefone5Contato"
                  value={Telefone5Contato}
                  onChange={(e) => setTelefone5Contato(e.target.value)}
                  label="Contato 5"
                />
                <Input
                  name="Observacoes"
                  value={Observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  label="Observações"
                />
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="gray"
              onClick={handleResetPersonAndClose}
              mr={3}
            >
              Cancelar
            </Button>
            <Button type="submit" colorScheme="green">
              Cadastrar
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export { AddPerson }
