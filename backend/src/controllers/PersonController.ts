import Person from '../model/Person'
import { Request, Response } from 'express'

export = {
  async index (req: Request, res: Response) {
    const { page, limit } = req.headers
    const pageNum = Number(page)
    const limitNum = Number(limit)
    const skip = (pageNum * 10) - 10
    const limitcount = limitNum * 10
    const people = await Person.find({}).sort({ RazaoSocial: 1 }).skip(skip).limit(limitcount)

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
    const { id } = req.headers
    const showPerson = await Person.findById(id)
    return res.json(showPerson)
  },

  async update (req: Request, res: Response) {
    const updatedPerson = await Person.findByIdAndUpdate(req.body.id, req.body)
    return res.json(updatedPerson)
  },

  async delete (req: Request, res: Response) {
    const { id } = req.headers
    const deletePerson = await Person.findByIdAndDelete(id)
    return res.json(deletePerson)
  },

  async filter (req: Request, res: Response) {
    const { name, limit } = req.headers
    const limitNum = Number(limit)
    const limitcount = limitNum * 10
    const searchPerson = await Person.find({ RazaoSocial: { $regex: name } }).limit(limitcount)
    return res.json(searchPerson)
  }
};
