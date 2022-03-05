import { IPersonRepository } from '@modules/people/repositories/IPersonRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class IndexLengthUseCase {
    constructor(
        @inject('PersonRepository')
        private peopleRepository: IPersonRepository
    ) {}

    async execute(): Promise<number> {
        const length = await this.peopleRepository.getLength()

        return length
    }
}

export { IndexLengthUseCase }
