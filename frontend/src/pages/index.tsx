import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

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
import {
  RiAddLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiPencilLine,
} from 'react-icons/ri'
import { usePeople } from '../hooks/usePeople'
import api from '../services/api'
import { AddPerson } from '../components/AddPerson'
import { ViewPerson } from '../components/ViewPerson'
import { EditPerson } from '../components/EditPersonModal/'
import { Pagination } from '../components/Pagination/'
import { IPerson } from '../dtos/IPerson'

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
  const { people, setPeople, currentPage, setSearch, search, setCurrentPage } =
    usePeople()
  const [personToView, setPersonToView] = useState('')
  const [personToEdit, setPersonToEdit] = useState('')
  const [peopleLength, setPeopleLength] = useState(0)

  useEffect(() => {
    async function getPageLength() {
      const { data } = await api.get('/people/length')
      setPeopleLength(data)
    }
    getPageLength()
  }, [])

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
            <Button
              ml="8"
              size="lg"
              fontSize="md"
              colorScheme="green"
              bg="green.400"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              onClick={onAddOpen}
            >
              Adicionar Contato
            </Button>
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
          <Pagination
            totalCountOfRegisters={peopleLength}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />
        </Box>
      </Flex>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
