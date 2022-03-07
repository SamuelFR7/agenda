import { IUpdatePersonDTO } from '@modules/people/dtos/IUpdatePersonDTO'
import { Person } from '@modules/people/entities/Person'
import { IPersonRepository } from '@modules/people/repositories/IPersonRepository'
import { prisma } from '@shared/infra/database/prisma/client'

class PersonRepository implements IPersonRepository {
    async create(person: Person): Promise<Person> {
        const newPerson = await prisma.person.create({
            data: person,
        })

        return newPerson
    }

    async getLength(): Promise<number> {
        const length = await prisma.person.count()

        return length
    }

    async show(id: string): Promise<Person> {
        const person = await prisma.person.findUnique({ where: { id } })

        return person
    }

    async update(id: string, person: IUpdatePersonDTO): Promise<Person> {
        const personUpdated = await prisma.person.update({
            where: {
                id,
            },
            data: person,
        })

        return personUpdated
    }

    async delete(id: string): Promise<void> {
        await prisma.person.delete({ where: { id } })
    }

    async filter(page: number, name?: string): Promise<Person[]> {
        const skip = (page - 1) * 10

        if (name) {
            const people = await prisma.person.findMany({
                where: {
                    RazaoSocial: {
                        contains: name,
                    },
                },
                take: 10,
                orderBy: {
                    RazaoSocial: 'asc',
                },
            })

            return people
        }
        const people = await prisma.person.findMany({
            skip,
            take: 10,
            orderBy: {
                RazaoSocial: 'asc',
            },
        })

        return people
    }
}

export { PersonRepository }
