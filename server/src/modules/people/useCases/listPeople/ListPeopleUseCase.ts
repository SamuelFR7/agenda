import { Person } from "@modules/people/entities/Person";
import { IPersonRepository } from "@modules/people/repositories/IPersonRepository";
import { inject, injectable } from "tsyringe";

interface IListPeopleUseCaseReturn {
  people: Person[];
  length: number;
}

@injectable()
class ListPeopleUseCase {
  constructor(
    @inject("PersonRepository")
    private readonly peopleRepository: IPersonRepository
  ) {}

  async execute(
    page: number,
    name?: string
  ): Promise<IListPeopleUseCaseReturn> {
    const people = await this.peopleRepository.filter(page, name);
    const length = await this.peopleRepository.getLength();

    return { people, length };
  }
}

export { ListPeopleUseCase };
