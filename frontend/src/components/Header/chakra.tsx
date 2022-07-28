import { Box, Button, Flex, Icon, Image, Spacer } from '@chakra-ui/react'
import React from 'react'
import { RiAddLine } from 'react-icons/ri'

interface IHeaderProps {
  onOpen: () => void
}

function Header({ onOpen }: IHeaderProps) {
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
        <Button
          size="md"
          fontSize="md"
          colorScheme="green"
          bg="green.400"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          onClick={onOpen}
        >
          Adicionar Contato
        </Button>
      </Flex>
    </Box>
  )
}

export { Header }
