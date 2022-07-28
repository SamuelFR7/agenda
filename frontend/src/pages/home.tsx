import {
  Box,
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input as ChakraInput,
  useDisclosure,
} from '@chakra-ui/react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { RiDeleteBinLine, RiEyeLine, RiPencilLine } from 'react-icons/ri'
import { Header } from '../components/Header/chakra'
import { usePeople } from '../hooks/usePeople'
import api from '../services/api'
import { AddPerson } from '../components/AddPerson'
import { ViewPerson } from '../components/ViewPerson'
import { EditPerson } from '../components/EditPersonModal/'

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

function Home() {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure()
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()
  const { people, setPeople, currentPage, setSearch, search } = usePeople()
  const [personToView, setPersonToView] = useState('')
  const [personToEdit, setPersonToEdit] = useState('')

  async function handleChange(value: string) {
    setSearch(value)
    if (value) {
      const { data } = await api.get<IPerson[]>(
        `/people/list/${currentPage}?name=${value.toUpperCase()}`
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

  function handleOpenView(id: string) {
    setPersonToView(id)
    onViewOpen()
  }

  function handleOpenEdit(id: string) {
    setPersonToEdit(id)
    onEditOpen()
  }

  async function handleDelete(id: string) {
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

  return (
    <>
      <Head>
        <title>Agenda</title>
      </Head>
      <Header onOpen={onAddOpen} />
      <AddPerson isOpen={isAddOpen} onClose={onAddClose} />
      <ViewPerson
        isOpen={isViewOpen}
        onClose={onViewClose}
        personToView={personToView}
        setPersonToView={setPersonToView}
      />
      <EditPerson
        isOpen={isEditOpen}
        onClose={onEditClose}
        personToEdit={personToEdit}
        setPersonToEdit={setPersonToEdit}
      />
      <Flex
        w="100%"
        my="16"
        maxWidth={1290}
        mx="auto"
        px="6"
        direction="column"
      >
        <Box flex={1} borderRadius={8} bg="gray.50" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <ChakraInput
              size="lg"
              focusBorderColor="green.500"
              _hover={{ bgColor: 'gray.50' }}
              placeholder="Pesquisar"
              type="search"
              onChange={(e) => handleChange(e.target.value)}
            />
          </Flex>
          <Table colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Telefone</Th>
                <Th>Contato</Th>
                <Th></Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {people.map((person) => {
                return (
                  <Tr key={person.id}>
                    <Td>{person.RazaoSocial}</Td>
                    <Td>{person.Telefone1}</Td>
                    <Td>{person.Telefone1Contato}</Td>
                    <Td>
                      <Button
                        size="sm"
                        fontSize="sm"
                        colorScheme="green"
                        onClick={() => handleOpenView(person.id)}
                      >
                        <Icon as={RiEyeLine} />
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        size="sm"
                        fontSize="sm"
                        colorScheme="green"
                        onClick={() => handleOpenEdit(person.id)}
                      >
                        <Icon as={RiPencilLine} />
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        size="sm"
                        fontSize="sm"
                        colorScheme="green"
                        onClick={() => {
                          if (
                            window.confirm(
                              'Certeza de que você quer deletar este contato?'
                            )
                          )
                            handleDelete(person.id)
                        }}
                      >
                        <Icon as={RiDeleteBinLine} />
                      </Button>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </>
  )
}

export default Home
