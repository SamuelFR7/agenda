import { Request, Response } from 'express'
import { PersonService } from '../services/PersonService'

class PersonController {
  async index (req: Request, res: Response) {
    const { page } = req.params
    const currentPage = Number(page)

    const personService = new PersonService()

    const people = await personService.indexPerPage(currentPage)

    return res.json(people)
  }

  async indexLength (req: Request, res: Response) {
    const personService = new PersonService()

    const peopleLength = await personService.indexLength()
    return res.json(peopleLength)
  }

  async store (req: Request, res: Response) {
    const personService = new PersonService()
    const addPerson = await personService.create(req.body)
    return res.json(addPerson)
  }

  async show (req: Request, res: Response) {
    const { id } = req.params

    const personService = new PersonService()

    const showPerson = await personService.showOne(id)

    return res.json(showPerson)
  }

  async update (req: Request, res: Response) {
    const personService = new PersonService()

    const updatedPerson = await personService.update(req.body.id, req.body)

    return res.json(updatedPerson)
  }

  async delete (req: Request, res: Response) {
    const { id } = req.params

    const personService = new PersonService()
    const deletePerson = await personService.delete(id)
    return res.json(deletePerson)
  }

  async filter (req: Request, res: Response) {
    const { name } = req.params

    const personService = new PersonService()

    const searchPerson = await personService.filter(name)

    return res.json(searchPerson)
  }
}

export { PersonController }
