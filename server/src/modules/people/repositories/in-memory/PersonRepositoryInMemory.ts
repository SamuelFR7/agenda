import { type Person } from "@modules/people/entities/Person";
import { type IPersonRepository } from "../IPersonRepository";
import { v4 as uuid } from "uuid";
import { type IUpdatePersonDTO } from "@modules/people/dtos/IUpdatePersonDTO";

class PersonRepositoryInMemory implements IPersonRepository {
    people: Person[] = [];

    async create(person: Person): Promise<Person> {
        Object.assign(person, {
            id: uuid(),
        });

        this.people.push(person);

        return person;
    }

    async getLength(): Promise<number> {
        const length = this.people.length;

        return length;
    }

    async show(id: string): Promise<Person> {
        const person = this.people.find((item) => item.id === id);

        return person;
    }

    async update(id: string, person: IUpdatePersonDTO): Promise<Person> {
        const personToUpdate = this.people.find((item) => item.id === id);

        Object.assign(personToUpdate, person);

        return personToUpdate;
    }

    async delete(id: string): Promise<void> {
        const personToDelete = this.people.find((item) => item.id === id);

        const index = this.people.indexOf(personToDelete);
        if (index > -1) {
            this.people.splice(index, 1);
        }
    }

    async filter(page: number, name?: string): Promise<Person[]> {
        const skip = (page - 1) * 10;
        const limit = skip + 10;

        if (name) {
            const list = this.people.filter((item) => {
                return item.RazaoSocial === name;
            });

            return list;
        }

        return this.people.slice(skip, limit);
    }
}

export { PersonRepositoryInMemory };
