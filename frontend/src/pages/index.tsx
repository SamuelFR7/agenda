import React, { useState } from 'react'

import Head from 'next/head'

import Modal from 'react-modal'
import { parseCookies } from 'nookies'

import { GetServerSideProps } from 'next'
import { Header } from '../components/Header'
import { Dashboard } from '../components/Dashboard'
import { NewPersonModal } from '../components/NewPersonModal'

export default function Home() {
    const [isNewPersonModalOpen, setIsNewPersonModalOpen] = useState(false)

    Modal.setAppElement('body')

    function handleOpenNewPersonModal() {
        setIsNewPersonModalOpen(true)
    }

    function handleCloseNewPersonModal() {
        setIsNewPersonModalOpen(false)
    }

    return (
        <>
            <Head>
                <title>Agenda</title>
            </Head>
            <Header onOpenNewPersonModal={handleOpenNewPersonModal} />
            <Dashboard />
            <NewPersonModal
                isOpen={isNewPersonModalOpen}
                onRequestClose={handleCloseNewPersonModal}
            />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = parseCookies(ctx)

    if (!token) {
        return {
            redirect: {
                destination: '/Login',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}
