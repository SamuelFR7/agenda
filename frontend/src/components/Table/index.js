import React from 'react'

import api from '../../services/api'

export default function Table(){
    async function getPeople(){
        const response = await api.get('/')
        const allData = response.data
        return allData
    }

    const data = getPeople()

    console.log(data)

    return (
        <div>
            Olá
            
        </div>
    )
}