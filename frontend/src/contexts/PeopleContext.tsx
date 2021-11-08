import React, { createContext, useState, ReactNode } from 'react'

interface IPerson {
    _id: string
    RazaoSocial: string
    Email: string
    Observacoes: string
    Endereco: string
    Telefone1: string
    Telefone2: string
    Telefone3: string
    Telefone4: string
    Telefone5: string
    Telefone1Contato: string
    Telefone2Contato: string
    Telefone3Contato: string
    Telefone4Contato: string
    Telefone5Contato: string
}

interface IPeopleProviderProps {
    children: ReactNode
}

interface IPeopleContextData {
    people: IPerson[]
    setPeople: React.Dispatch<React.SetStateAction<IPerson[]>>
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export const PeopleContext = createContext<IPeopleContextData>({} as IPeopleContextData)

export function PeopleProvider ({ children }: IPeopleProviderProps) {
  const [people, setPeople] = useState<IPerson[]>([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  return (
        <PeopleContext.Provider value={{ people, setPeople, search, setSearch, currentPage, setCurrentPage }}>
            {children}
        </PeopleContext.Provider>
  )
}
