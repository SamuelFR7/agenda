import React from 'react'

import Logo from '../../assets/logo.svg'

import { Container, Content } from './styles'

export function Header() {
  return (
    <Container>
      <Content>
        <Logo />
      </Content>
    </Container>
  )
}
