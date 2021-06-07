import React from 'react'

export default function SearchInput({ value, onChange }){
    function handleChange(e){
        onChange(e.target.value)
    }

    return (
        <input type="search" value={value} onChange={handleChange}/>
    )
}