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

    async store(req, res){
        const { RazaoSocial, Telefone1, Telefone1Contato, Telefone2, Telefone2Contato, Telefone3, Telefone3Contato, Telefone4, Telefone4Contato, Telefone5, Telefone5Contato, Email, Endereco, Observacoes } = req.body

        const addPerson = await Person.create({
            RazaoSocial: RazaoSocial,
            Telefone1: Telefone1,
            Telefone1Contato: Telefone1Contato,
            Telefone2:  Telefone2,
            Telefone2Contato: Telefone2Contato,
            Telefone3: Telefone3,
            Telefone3Contato: Telefone3Contato,
            Telefone4: Telefone4,
            Telefone4Contato: Telefone4Contato,
            Telefone5: Telefone5,
            Telefone5Contato: Telefone5Contato,
            Email: Email,
            Endereco: Endereco,
            Observacoes: Observacoes
        })

        return res.json(addPerson)
    },

    async show(req, res){
        const { id } = req.headers
        const showPerson = await Person.findById(id)

        return res.json(showPerson)
    },

    async update(req, res){
        const updatedPerson = await Person.findByIdAndUpdate(req.body.id, {$set: req.body}, {new: true})
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
