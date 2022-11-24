import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Spacer,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'
import { SignOut } from 'phosphor-react'
import { AuthContext } from '../../contexts/AuthContext'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

function Header() {
  const { toggleColorMode, colorMode } = useColorMode()
  const { signOut } = useContext(AuthContext)
  const { asPath } = useRouter()

  const headerBg = useColorModeValue('green.500', 'green.900')

  const isLogin = asPath === '/Login'

  async function handleSignOut() {
    const { isConfirmed } = await Swal.fire({
      title: 'Você tem certeza que deseja sair?',
      showDenyButton: true,
      icon: 'question',
      confirmButtonText: 'Sair',
      confirmButtonColor: 'red',
      denyButtonText: 'Cancelar',
      denyButtonColor: 'gray',
    })

    if (isConfirmed) {
      signOut()
    }
  }

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
        <Image src="/Logo.png" ml={['4', '0']} />
        <Spacer />
        <Flex gap={8} alignItems="center" mr={['4', '0']}>
          <Flex alignItems="center">
            <Icon as={MdOutlineLightMode} color="#F0F2F5" mr="2" />
            <Switch
              size="lg"
              isChecked={colorMode === 'dark'}
              onChange={toggleColorMode}
              colorScheme="green"
            />
            <Icon as={MdOutlineDarkMode} color="#F0F2F5" ml="2" />
          </Flex>
          {!isLogin && (
            <Button colorScheme="green" gap={2} onClick={handleSignOut}>
              <SignOut size={24} />
              <Text>Sair</Text>
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export { Header }
