import { useContext } from 'react'
import { PeopleContext } from '../contexts/PeopleContext'

export function usePeople() {
  const context = useContext(PeopleContext)

  return context
}
