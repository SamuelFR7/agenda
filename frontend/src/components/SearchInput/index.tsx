import React from 'react'
import { usePeople } from '../../hooks/usePeople'
import api from '../../services/api'
import { IPerson } from '../PeopleTable'

import { Container } from './style'

export default function SearchInput() {
  const { setPeople, setSearch, currentPage } = usePeople()

  async function handleChange(value: string) {
    setSearch(value)
    if (value) {
      const { data } = await api.get<IPerson[]>(
        `/people/list/${currentPage}?name=${value.toUpperCase()}`
      )
      setPeople(data)
    } else {
      const { data } = await api.get<IPerson[]>(`/people/list/${currentPage}`)
      setPeople(data)
    }
  }

  return (
    <Container>
      <input
        placeholder="Pesquisar"
        type="search"
        onChange={(e) => handleChange(e.target.value)}
      />
    </Container>
  )
}
