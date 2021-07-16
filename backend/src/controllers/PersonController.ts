import Person from '../model/Person'
import { Request, Response } from 'express'

export default {
  async index (req: Request, res: Response) {
    const { page } = req.params
    const currentPage = Number(page)
    const skip = (currentPage - 1) * 10
    const limit = (10 * currentPage)
    const people = (await Person.find({}).sort({ RazaoSocial: 1 })).slice(skip, limit)

    return res.json(people)
  },

  async indexLength (req: Request, res: Response) {
    const peopleLength = await Person.estimatedDocumentCount()
    return res.json(peopleLength)
  },

  async store (req: Request, res: Response) {
    const addPerson = await Person.create(req.body)
    return res.json(addPerson)
  },

  async show (req: Request, res: Response) {
    const { id } = req.params
    const showPerson = await Person.findById(id)
    return res.json(showPerson)
  },

  async update (req: Request, res: Response) {
    const updatedPerson = await Person.findByIdAndUpdate(req.body.id, req.body)
    return res.json(updatedPerson)
  },

  async delete (req: Request, res: Response) {
    const { id } = req.params
    const deletePerson = await Person.findByIdAndDelete(id)
    return res.json(deletePerson)
  },

  async filter (req: Request, res: Response) {
    const { name } = req.params
    const searchPerson = await Person.find({ RazaoSocial: { $regex: name } }).limit(10)
    return res.json(searchPerson)
  }
}
