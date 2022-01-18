import { Person, IPerson } from '../entities/Person'

class PersonService {
    async indexPerPage(page: number) {
        const skip = (page - 1) * 10
        const limit = page * 10

        const people = (await Person.find({}).sort({ RazaoSocial: 1 })).slice(
            skip,
            limit
        )

        return people
    }

    async indexLength() {
        const length = await Person.estimatedDocumentCount()

        return length
    }

    async create(info: IPerson) {
        const newPerson = await Person.create(info)

        return newPerson
    }

    async showOne(id: string) {
        const person = await Person.findById(id)

        return person
    }

    async update(id: string, info: IPerson) {
        const updatedPerson = await Person.findByIdAndUpdate(id, info)

        return updatedPerson
    }

    async delete(id: string) {
        const deletedPerson = await Person.findByIdAndDelete(id)

        return deletedPerson
    }

    async filter(name: string) {
        const searchedPeople = await Person.find({
            RazaoSocial: { $regex: name },
        }).limit(10)

        return searchedPeople
    }
}

export { PersonService }
