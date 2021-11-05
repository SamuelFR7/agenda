import React from 'react'

import LogoImg from '../../assets/logo.svg'

import { Container, Content } from './styles'

export function Header () {
  return (
        <Container>
            <Content>
                <LogoImg/>
                <button
                    type="button"
                >
                    Adicionar Contato
                </button>
            </Content>
        </Container>
  )
}
