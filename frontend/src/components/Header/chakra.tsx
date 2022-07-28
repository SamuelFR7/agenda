import { Box, Button, Flex, Icon, Image, Spacer } from '@chakra-ui/react'
import React from 'react'
import { RiAddLine } from 'react-icons/ri'
import NextLink from 'next/link'

function Header() {
  return (
    <Box w="100%" bg="green.500">
      <Flex
        as="header"
        w="100%"
        maxWidth={1290}
        px={['4', '0']}
        marginX="auto"
        py="5"
      >
        <Image src="/Logo.png" />
        <Spacer />
        <NextLink href="/person/create" passHref>
          <Button
            as="a"
            size="md"
            fontSize="md"
            colorScheme="green"
            bg="green.400"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          >
            Adicionar Contato
          </Button>
        </NextLink>
      </Flex>
    </Box>
  )
}

export { Header }
