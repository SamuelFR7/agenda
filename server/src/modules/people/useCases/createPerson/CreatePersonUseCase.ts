import { type ICreatePersonDTO } from "@modules/people/dtos/ICreatePersonDTO";
import { type Person } from "@modules/people/entities/Person";
import { IPersonRepository } from "@modules/people/repositories/IPersonRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreatePersonUseCase {
    constructor(
        @inject("PersonRepository")
        private readonly peopleRepository: IPersonRepository
    ) {}

    async execute(person: ICreatePersonDTO): Promise<Person> {
        const newPerson = await this.peopleRepository.create({
            RazaoSocial: person.RazaoSocial,
            Telefone1: person.Telefone1,
            Telefone2: person.Telefone2 || "",
            Telefone3: person.Telefone3 || "",
            Telefone4: person.Telefone4 || "",
            Telefone5: person.Telefone5 || "",
            Telefone1Contato: person.Telefone1Contato || "",
            Telefone2Contato: person.Telefone2Contato || "",
            Telefone3Contato: person.Telefone3Contato || "",
            Telefone4Contato: person.Telefone4Contato || "",
            Telefone5Contato: person.Telefone5Contato || "",
            Endereco: person.Endereco || "",
            Email: person.Email || "",
            Observacoes: person.Observacoes || "",
        });

        return newPerson;
    }
}

export { CreatePersonUseCase };
