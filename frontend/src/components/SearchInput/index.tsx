import React, { FormEvent } from 'react'

import { InputSearch } from './style'

export default function SearchInput ({ value, onChange }: {value: string, onChange: any}) {
  function handleChange (e: FormEvent<HTMLInputElement>) {
    onChange(e.currentTarget.value)
  }

  return (
        <InputSearch placeholder="Pesquisar" type="search" value={value} onChange={handleChange}/>
  )
}
