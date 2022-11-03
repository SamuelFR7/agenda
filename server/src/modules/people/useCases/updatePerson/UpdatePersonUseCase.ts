import { IUpdatePersonDTO } from "@modules/people/dtos/IUpdatePersonDTO";
import { IPersonRepository } from "@modules/people/repositories/IPersonRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdatePersonUseCase {
  constructor(
    @inject("PersonRepository")
    private readonly peopleRepository: IPersonRepository
  ) {}

  async execute(id: string, person: IUpdatePersonDTO) {
    const personUpdated = await this.peopleRepository.update(id, person);

    return personUpdated;
  }
}

export { UpdatePersonUseCase };
