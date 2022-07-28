import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input as ChakraInput,
} from '@chakra-ui/react'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { RiDeleteBinLine, RiEyeLine, RiPencilLine } from 'react-icons/ri'
import { Header } from '../components/Header/chakra'
import { usePeople } from '../hooks/usePeople'
import api from '../services/api'
import NextLink from 'next/link'

function Home() {
  const { people, setPeople, search, currentPage } = usePeople()

  useEffect(() => {
    async function getPeopleData() {
      const response = await api.get(`/people/list/${currentPage}`)
      setPeople(response.data)
    }
    getPeopleData()
  }, [currentPage])

  return (
    <>
      <Head>
        <title>Agenda</title>
      </Head>
      <Header />
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
                      <NextLink href={`/person/view/${person.id}`} passHref>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="green"
                        >
                          <Icon as={RiEyeLine} />
                        </Button>
                      </NextLink>
                    </Td>
                    <Td>
                      <NextLink href={`/person/edit/${person.id}`} passHref>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="green"
                        >
                          <Icon as={RiPencilLine} />
                        </Button>
                      </NextLink>
                    </Td>
                    <Td>
                      <Button size="sm" fontSize="sm" colorScheme="green">
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
