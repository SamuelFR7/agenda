const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    async store(req, res){
        const { email, password } = req.headers

        const emailExists = await User.findOne({email: email})
        if (emailExists) return res.status(400).send('Email já registrado')

        const addUser = await User.create({
            email,
            password: bcrypt.hashSync(password)
        })

        return res.json(addUser)
    },

    async login(req, res){
        const { email, password } = req.headers

        const selectedUser = await User.findOne({email: email})
        if (!selectedUser) return res.status(400).send('Email ou senha incorretos')

        const userAndPasswordMatch = bcrypt.compareSync(password, selectedUser.password)
        if (!userAndPasswordMatch) return res.status(400).send('Email ou senha incorretos')

        const token = jwt.sign({id: selectedUser._id, admin: selectedUser.admin}, process.env.TOKEN_SECRET)

        return res.json({token: token})

    },

    async auth(req, res, next){
        const { authorization } = req.headers

        if (!authorization) {
            return res.sendStatus(401)
        }

        const token = authorization

        try {
            jwt.verify(token, process.env.TOKEN_SECRET)

            return next()
        } catch (error) {
            return res.sendStatus(401)
        }
    },

    async check(req, res){
        return res.json('Logged')
    }
}