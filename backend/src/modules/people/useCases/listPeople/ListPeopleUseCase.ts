import { Person } from '@modules/people/entities/Person'
import { IPersonRepository } from '@modules/people/repositories/IPersonRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListPeopleUseCase {
    constructor(
        @inject('PersonRepository')
        private peopleRepository: IPersonRepository
    ) {}

    async execute(page: number, name?: string): Promise<Person[]> {
        const people = await this.peopleRepository.filter(page, name)

        return people
    }
}

export { ListPeopleUseCase }
