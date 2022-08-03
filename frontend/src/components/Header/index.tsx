import {
  Box,
  Flex,
  Icon,
  Image,
  Spacer,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'

function Header() {
  const { toggleColorMode } = useColorMode()

  const headerBg = useColorModeValue('green.500', 'green.900')

  return (
    <Box w="100%" bg={headerBg}>
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
        <Spacer />
        <Flex align="center">
          <Icon as={MdOutlineLightMode} color="#F0F2F5" size="lg" mr="2" />
          <Switch size="lg" onChange={toggleColorMode} colorScheme="green" />
          <Icon as={MdOutlineDarkMode} color="#F0F2F5" size="lg" ml="2" />
        </Flex>
      </Flex>
    </Box>
  )
}

export { Header }
