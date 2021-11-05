import React from 'react'
import { PeopleTable } from '../PeopleTable'
import SearchInput from '../SearchInput'
import { Container } from './styles'

export function Dashboard () {
  return (
        <Container>
            <SearchInput value='' onChange={() => console.log('a')} />
            <PeopleTable />
        </Container>
  )
}
