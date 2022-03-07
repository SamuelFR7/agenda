import 'reflect-metadata'
import { DeletePersonUseCase } from './DeletePersonUseCase'
import { PersonRepositoryInMemory } from '../../repositories/in-memory/PersonRepositoryInMemory'
import { v4 as uuid } from 'uuid'
let deletePersonUseCase: DeletePersonUseCase
let personRepositoryInMemory: PersonRepositoryInMemory

describe('Delete person use case', () => {
    beforeEach(() => {
        personRepositoryInMemory = new PersonRepositoryInMemory()
        deletePersonUseCase = new DeletePersonUseCase(personRepositoryInMemory)
    })

    it('should be able to delete a person', async () => {
        const id = uuid()

        personRepositoryInMemory.create({
            id,
            RazaoSocial: 'JOÃO',
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

        await deletePersonUseCase.execute(id)

        const findPerson = await personRepositoryInMemory.show(id)

        expect(findPerson).toBeFalsy()
    })
})
