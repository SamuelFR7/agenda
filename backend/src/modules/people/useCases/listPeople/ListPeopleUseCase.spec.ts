import 'reflect-metadata'
import { ListPeopleUseCase } from './ListPeopleUseCase'
import { PersonRepositoryInMemory } from '@modules/people/repositories/in-memory/PersonRepositoryInMemory'
import { v4 as uuid } from 'uuid'
let listPeopleUseCase: ListPeopleUseCase
let personRepositoryInMemory: PersonRepositoryInMemory

describe('List people use case', () => {
  beforeEach(() => {
    personRepositoryInMemory = new PersonRepositoryInMemory()
    listPeopleUseCase = new ListPeopleUseCase(personRepositoryInMemory)
  })

  it('should be able to list people', async () => {
    const id = uuid()

    personRepositoryInMemory.create({
      id,
      RazaoSocial: 'EDUARDO',
      Telefone1: '000000000000',
      Telefone2: '',
      Telefone3: '',
      Telefone4: '',
      Telefone5: '',
      Telefone1Contato: '',
      Telefone2Contato: '',
      Telefone3Contato: '',
      Telefone4Contato: '',
      Telefone5Contato: '',
      Email: '',
      Endereco: '',
      Observacoes: '',
    })

    const findByPage = await listPeopleUseCase.execute(1)
    const findByName = await listPeopleUseCase.execute(1, 'EDUARDO')

    expect(findByPage.length).toEqual(1)
    expect(findByName.length).toEqual(1)
  })
})
