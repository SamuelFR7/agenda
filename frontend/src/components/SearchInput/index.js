import React from 'react'
import '../../pages/Main.css'

export default function SearchInput({ value, onChange }){
    function handleChange(e){
        onChange(e.target.value)
    }

    return (
        <input className="searchInput" placeholder="Pesquisar" type="search" value={value} onChange={handleChange}/>
    )
}