import Pagination from 'rc-pagination'
import React, { useEffect, useState } from 'react'

import { Container } from './styles'

import 'rc-pagination/assets/index.css'
import { usePeople } from '../../hooks/usePeople'
import api from '../../services/api'

export function PaginationContainer() {
    const { currentPage, setCurrentPage } = usePeople()
    const [peopleLength, setPeopleLength] = useState(0)

    useEffect(() => {
        async function getPageLength() {
            const { data } = await api.get('/length')
            setPeopleLength(data)
        }
        getPageLength()
    }, [])

    return (
        <Container>
            <Pagination
                pageSize={10}
                current={currentPage}
                total={peopleLength}
                onChange={setCurrentPage}
            />
        </Container>
    )
}
