import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'

function Header() {
  return (
    <Box w="100%" bg="green.500">
      <Flex
        as="header"
        w="100%"
        maxWidth={1290}
        marginX="auto"
        py="5"
        align="center"
        justify="center"
      >
        <Image src="/Logo.png" />
      </Flex>
    </Box>
  )
}

export { Header }
