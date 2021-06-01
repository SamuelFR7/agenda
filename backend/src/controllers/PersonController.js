const axios = require('axios')
const Person = require('../model/Person')


module.exports = {
    async index(req, res){
        const people = await Person.find({}).sort({RazaoSocial: 1})

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
        const { id } = req.body
        const showPerson = await Person.findById(id)

        return res.json(showPerson)
    },

    async update(req, res){
        const { id, RazaoSocial, Telefone1, Telefone1Contato, Telefone2, Telefone2Contato, Telefone3, Telefone3Contato, Telefone4, Telefone4Contato, Telefone5, Telefone5Contato, Email, Endereco, Observacoes } = req.body

        const editPerson = await Person.findByIdAndUpdate(id, {
            RazaoSocial: RazaoSocial,
            Telefone1: Telefone1,
            Telefone1Contato: Telefone1Contato,
            Telefone2: Telefone2,
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

        return res.json(editPerson)
    },

    async delete(req, res){
        const { id } = req.body 

        const deletePerson = await Person.findByIdAndDelete(id)

        return res.json(deletePerson)
    }
}
