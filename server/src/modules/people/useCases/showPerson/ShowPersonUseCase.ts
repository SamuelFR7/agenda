import { Person } from "@modules/people/entities/Person";
import { IPersonRepository } from "@modules/people/repositories/IPersonRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ShowPersonUseCase {
  constructor(
    @inject("PersonRepository")
    private readonly peopleRepository: IPersonRepository
  ) {}

  async execute(id: string): Promise<Person> {
    const person = await this.peopleRepository.show(id);

    return person;
  }
}

export { ShowPersonUseCase };
