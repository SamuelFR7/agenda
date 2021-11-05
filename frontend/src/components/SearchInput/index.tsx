import React, { FormEvent } from 'react'

import { Container } from './style'

export default function SearchInput ({ value, onChange }: {value: string, onChange: any}) {
  function handleChange (e: FormEvent<HTMLInputElement>) {
    onChange(e.currentTarget.value)
  }

  return (
        <Container>
          <input placeholder="Pesquisar" type="search" value={value} onChange={handleChange}/>
        </Container>
  )
}
