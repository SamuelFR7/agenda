import 'reflect-metadata'
import { IndexLengthUseCase } from './IndexLengthUseCase'
import { PersonRepositoryInMemory } from '@modules/people/repositories/in-memory/PersonRepositoryInMemory'
let indexLengthUseCase: IndexLengthUseCase
let personRepositoryInMemory: PersonRepositoryInMemory

describe('Index length use case', () => {
    beforeEach(() => {
        personRepositoryInMemory = new PersonRepositoryInMemory()
        indexLengthUseCase = new IndexLengthUseCase(personRepositoryInMemory)
    })

    it('should be able to get people length', async () => {
        const length = await indexLengthUseCase.execute()

        expect(length).toEqual(0)
    })
})
