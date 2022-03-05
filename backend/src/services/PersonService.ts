import { prisma } from '../infra/database/prisma/client'

export interface ICreatePersonDTO {
    RazaoSocial: string
    Telefone1: string
    Telefone1Contato: string
    Telefone2: string
    Telefone2Contato: string
    Telefone3: string
    Telefone3Contato: string
    Telefone4: string
    Telefone4Contato: string
    Telefone5: string
    Telefone5Contato: string
    Email: string
    Endereco: string
    Observacoes: string
}

class PersonService {
    async indexPerPage(page: number) {
        const skip = (page - 1) * 10

        const people = await prisma.person.findMany({
            skip,
            take: 10,
            orderBy: {
                RazaoSocial: 'asc',
            },
        })

        return people
    }

    async indexLength() {
        const length = await prisma.person.count()

        return length
    }

    async create(info: ICreatePersonDTO) {
        const newPerson = await prisma.person.create({
            data: {
                RazaoSocial: info.RazaoSocial,
                Telefone1: info.Telefone1,
                Telefone2: info.Telefone2 || '',
                Telefone3: info.Telefone3 || '',
                Telefone4: info.Telefone4 || '',
                Telefone5: info.Telefone5 || '',
                Telefone1Contato: info.Telefone1Contato || '',
                Telefone2Contato: info.Telefone2Contato || '',
                Telefone3Contato: info.Telefone3Contato || '',
                Telefone4Contato: info.Telefone4Contato || '',
                Telefone5Contato: info.Telefone5Contato || '',
                Endereco: info.Endereco || '',
                Email: info.Email || '',
                Observacoes: info.Observacoes || '',
            },
        })

        return newPerson
    }

    async showOne(id: string) {
        const person = await prisma.person.findUnique({ where: { id } })

        return person
    }

    async update(id: string, info: ICreatePersonDTO) {
        const updatedPerson = await prisma.person.update({
            where: {
                id,
            },
            data: info,
        })

        return updatedPerson
    }

    async delete(id: string) {
        const deletedPerson = await prisma.person.delete({ where: { id } })

        return deletedPerson
    }

    async filter(name: string) {
        const searchedPeople = await prisma.person.findMany({
            where: {
                RazaoSocial: {
                    contains: name,
                },
            },
            take: 10,
        })

        return searchedPeople
    }
}

export { PersonService }
