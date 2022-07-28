import React from 'react'
import { PaginationContainer } from '../Pagination'
import { PeopleTable } from '../PeopleTable'
import SearchInput from '../SearchInput'

import { Container } from './styles'

export function Dashboard() {
  return (
    <Container>
      <SearchInput />
      <PeopleTable />
      <PaginationContainer />
    </Container>
  )
}
