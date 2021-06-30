import React, {FormEvent} from 'react'
import '../../App.scss'

export default function SearchInput({ value, onChange }: {value: string, onChange: any}){
    function handleChange(e: FormEvent<HTMLInputElement>){
        onChange(e.currentTarget.value)
    }

    return (
        <input className="searchInput" placeholder="Pesquisar" type="search" value={value} onChange={handleChange}/>
    )
}