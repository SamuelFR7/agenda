const axios = require('axios')
const { collection } = require('../model/Person')
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
        const { id } = req.headers
        const showPerson = await Person.findById(id)

        return res.json(showPerson)
    },

    async update(req, res){
        let person = {}
        if (req.body.RazaoSocial) person.RazaoSocial = req.body.RazaoSocial
        if (req.body.Telefone1) person.Telefone1 = req.body.Telefone1
        if (req.body.Telefone2) person.Telefone2 = req.body.Telefone2
        if (req.body.Telefone3) person.Telefone3 = req.body.Telefone3
        if (req.body.Telefone4) person.Telefone4 = req.body.Telefone4
        if (req.body.Telefone5) person.Telefone5 = req.body.Telefone5
        if (req.body.Telefone1Contato) person.Telefone1Contato = req.body.Telefone1Contato
        if (req.body.Telefone1Contato) person.Telefone2Contato = req.body.Telefone2Contato
        if (req.body.Telefone1Contato) person.Telefone3Contato = req.body.Telefone3Contato
        if (req.body.Telefone1Contato) person.Telefone4Contato = req.body.Telefone4Contato
        if (req.body.Telefone1Contato) person.Telefone5Contato = req.body.Telefone5Contato
        if (req.body.Email) person.Email = req.body.Email
        if (req.body.Observacoes) person.Observacoes = req.body.Observacoes

        person = { $set: person }

        const updatedPerson = await Person.findByIdAndUpdate(req.body.id, person)

        return res.json(updatedPerson)
    },

    async delete(req, res){
        const { id } = req.body 

        const deletePerson = await Person.findByIdAndDelete(id)

        return res.json(deletePerson)
    },

    async filter(req, res){
        const { name } = req.headers
        const regexp = new RegExp("^"+name)
        const searchPerson = await Person.find({RazaoSocial: regexp})
        return res.json(searchPerson)
    }
}
