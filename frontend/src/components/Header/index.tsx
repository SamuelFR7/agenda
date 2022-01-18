import React from 'react'

import Logo from '../../assets/logo.svg'

import { Container, Content } from './styles'

interface HeaderProps {
    onOpenNewPersonModal: () => void
}

export function Header({ onOpenNewPersonModal }: HeaderProps) {
    return (
        <Container>
            <Content>
                <Logo />
                <button type="button" onClick={onOpenNewPersonModal}>
                    Adicionar Contato
                </button>
            </Content>
        </Container>
    )
}
