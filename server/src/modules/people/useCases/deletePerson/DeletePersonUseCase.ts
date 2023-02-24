import { IPersonRepository } from "@modules/people/repositories/IPersonRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeletePersonUseCase {
    constructor(
        @inject("PersonRepository")
        private readonly peopleRepository: IPersonRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.peopleRepository.delete(id);
    }
}
export { DeletePersonUseCase };
