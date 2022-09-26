import { useQuery } from '@tanstack/react-query'
import { api } from '../services/apiClient'

type Person = {
  id: string
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

type GetPeopleResponse = {
  totalCount: number
  people: Person[]
}

export async function getPeople(
  page: number,
  search?: string
): Promise<GetPeopleResponse> {
  const { data, headers } = await api.get<Person[]>(
    `people/list/${page}?name=${search}`
  )

  const totalCount = Number(headers['x-total-count'])

  const people = data.map((person) => {
    return {
      id: person.id,
      RazaoSocial: person.RazaoSocial,
      Email: person.Email,
      Observacoes: person.Observacoes,
      Endereco: person.Endereco,
      Telefone1: person.Telefone1,
      Telefone2: person.Telefone2,
      Telefone3: person.Telefone3,
      Telefone4: person.Telefone4,
      Telefone5: person.Telefone5,
      Telefone1Contato: person.Telefone1Contato,
      Telefone2Contato: person.Telefone2Contato,
      Telefone3Contato: person.Telefone3Contato,
      Telefone4Contato: person.Telefone4Contato,
      Telefone5Contato: person.Telefone5Contato,
    }
  })

  return { totalCount, people }
}

export function usePeople(page: number, search?: string) {
  return useQuery(['people', page, search], () => getPeople(page, search), {
    staleTime: 1000 * 60 * 10,
  })
}
