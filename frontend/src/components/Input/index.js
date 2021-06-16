import React, { useCallback } from 'react'


export default function Input({ ...props }){

    const handleKeyUp = useCallback((e) => {
        e.currentTarget.maxLength = 15
            let value = e.currentTarget.value
            value = value.replace(/\D/g, "")
            value = value.replace(/^(\d{2})(\d{5})(\d)/, "($1) $2-$3")
            e.currentTarget.value = value
    }, [])

    return (
        <div>
            <input {...props} onKeyUp={handleKeyUp} />
        </div>
    )
}