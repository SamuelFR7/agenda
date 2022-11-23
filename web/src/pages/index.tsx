import React, { useState } from 'react'
import Head from 'next/head'

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
  Spinner,
  Text,
  useBreakpointValue,
  useColorModeValue,
  theme,
} from '@chakra-ui/react'
import {
  RiAddLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiPencilLine,
} from 'react-icons/ri'
import { api } from '../services/apiClient'
import { AddPerson } from '../components/AddPerson'
import { ViewPerson } from '../components/ViewPerson'
import { EditPerson } from '../components/EditPersonModal/'
import { Pagination } from '../components/Pagination/'
import { usePeople } from '../hooks/usePeople'
import { queryClient } from '../services/queryClient'
import { withSSRAuth } from '../utils/withSSRAuth'
import Swal from 'sweetalert2'

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
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const { data, isLoading, error } = usePeople(
    currentPage,
    search.toUpperCase()
  )
  const [personToView, setPersonToView] = useState('')
  const [personToEdit, setPersonToEdit] = useState('')

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  function handleOpenView(id: string) {
    setPersonToView(id)
    onViewOpen()
  }

  function handleOpenEdit(id: string) {
    setPersonToEdit(id)
    onEditOpen()
  }

  async function handleDelete(id: string) {
    const { isConfirmed } = await Swal.fire({
      title: 'Certeza de que quer apagar este contato?',
      confirmButtonText: 'Apagar',
      icon: 'question',
      confirmButtonColor: theme.colors.red['500'],
      cancelButtonColor: theme.colors.gray['400'],
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    })

    if (isConfirmed) {
      await api.delete(`/people/delete/${id}`)
      queryClient.invalidateQueries(['people'])
      Swal.fire({
        title: 'Contato apagado',
        icon: 'success',
        timer: (3 / 2) * 10 * 10 * 10, // 1.5 Seconds,
        timerProgressBar: true,
      })
    }
  }

  const tableBg = useColorModeValue('gray.50', 'gray.800')
  const hoverInputBg = useColorModeValue('gray.100', 'gray.900')
  const ButtonsBg = useColorModeValue('green.400', 'green.600')

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
        <Box flex={1} borderRadius={8} bg={tableBg} p="8">
          <Flex mb="8" justify="space-between" align="center">
            <ChakraInput
              size="lg"
              focusBorderColor="green.500"
              _hover={{ bgColor: `${hoverInputBg}` }}
              placeholder="Pesquisar"
              type="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            {isWideVersion && (
              <Button
                ml="8"
                size="lg"
                fontSize="md"
                colorScheme="green"
                bg={ButtonsBg}
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                onClick={onAddOpen}
              >
                Adicionar Contato
              </Button>
            )}
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos contatos</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    {isWideVersion && (
                      <>
                        <Th>Telefone</Th>
                        <Th></Th>
                        <Th></Th>
                      </>
                    )}
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.people.map((person) => {
                    return (
                      <Tr key={person.id}>
                        <Td>{person.RazaoSocial}</Td>
                        {isWideVersion && (
                          <>
                            <Td>{person.Telefone1}</Td>
                            <Td>
                              <Button
                                size="sm"
                                fontSize="sm"
                                colorScheme="green"
                                bg={ButtonsBg}
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
                                bg={ButtonsBg}
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
                                bg={ButtonsBg}
                                onClick={() => handleDelete(person.id)}
                              >
                                <Icon as={RiDeleteBinLine} />
                              </Button>
                            </Td>
                          </>
                        )}
                        {!isWideVersion && (
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
                        )}
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>

              {!search && (
                <Pagination
                  totalCountOfRegisters={data.totalCount}
                  onPageChange={setCurrentPage}
                  currentPage={currentPage}
                />
              )}
            </>
          )}
        </Box>
      </Flex>
    </>
  )
}

export default Home

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  }
})
