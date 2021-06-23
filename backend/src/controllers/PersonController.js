const axios = require('axios')
const Person = require('../model/Person')


module.exports = {
    async index(req, res){
        const { page, limit } = req.headers
        const skip = (page * 10) - 10
        const limitcount = limit * 10
        const people = await Person.find({}).sort({RazaoSocial: 1}).skip(skip).limit(limitcount)

        return res.json(people)
    },

    async indexLength(req, res){
        const peopleLength = await Person.estimatedDocumentCount()
        return res.json(peopleLength)
    },

    async store(req, res){
        const addPerson = await Person.create(req.body)
        return res.json(addPerson)
    },

    async show(req, res){
        const { id } = req.headers
        const showPerson = await Person.findById(id)
        return res.json(showPerson)
    },

    async update(req, res){
        const updatedPerson = await Person.findByIdAndUpdate(req.body.id, req.body)
        return res.json(updatedPerson)
    },

    async delete(req, res){
        const { id } = req.headers 
        const deletePerson = await Person.findByIdAndDelete(id)
        return res.json(deletePerson)
    },

    async filter(req, res){
        const { name, limit } = req.headers
        const limitcount = limit * 10
        const searchPerson = await Person.find({ RazaoSocial: {$regex: name}}).limit(limitcount)
        return res.json(searchPerson)
    }
}
