import { Person } from '../entities/Person'

interface IPersonRepository {
    create(person: Person): Promise<Person>
    getLength(): Promise<number>
    show(id: string): Promise<Person>
    update(id: string, person: Person): Promise<Person>
    delete(id: string): Promise<void>
    filter(page: number, name?: string): Promise<Person[]>
}

export { IPersonRepository }
