import { ICreatePersonDTO } from '@modules/people/dtos/ICreatePersonDTO'
import { IPersonRepository } from '@modules/people/repositories/IPersonRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class UpdatePersonUseCase {
    constructor(
        @inject('PersonRepository')
        private peopleRepository: IPersonRepository
    ) {}

    async execute(id: string, person: ICreatePersonDTO) {
        const personUpdated = await this.peopleRepository.update(id, person)

        return personUpdated
    }
}

export { UpdatePersonUseCase }
