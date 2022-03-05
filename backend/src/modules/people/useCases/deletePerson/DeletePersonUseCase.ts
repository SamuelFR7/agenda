import { IPersonRepository } from '@modules/people/repositories/IPersonRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeletePersonUseCase {
    constructor(
        @inject('PersonRepository')
        private peopleRepository: IPersonRepository
    ) {}

    async execute(id: string): Promise<void> {
        const personDeleted = await this.peopleRepository.delete(id)

        return personDeleted
    }
}
export { DeletePersonUseCase }
