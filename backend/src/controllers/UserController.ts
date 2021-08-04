import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../database/model/User'
import { Request, Response, NextFunction } from 'express'

export default {
  async store (req: Request, res: Response) {
    const { email, password } = req.body

    const emailExists = await User.findOne({ email })
    if (emailExists) return res.status(400).send('Email já registrado')

    const addUser = await User.create({
      email,
      password: bcrypt.hashSync(password)
    })

    return res.json(addUser)
  },

  async login (req: Request, res: Response) {
    const { email, password } = req.body

    const selectedUser = await User.findOne({ email })
    if (!selectedUser) return res.status(400).send('Email ou senha incorretos')

    const userAndPasswordMatch = bcrypt.compareSync(password, selectedUser.password)
    if (!userAndPasswordMatch) return res.status(400).send('Email ou senha incorretos')

    const adminToken = selectedUser.admin ? jwt.sign({ id: selectedUser._id, admin: selectedUser.admin }, process.env.TOKEN_SECRET_ADMIN) : null
    const token = jwt.sign({ id: selectedUser._id, admin: selectedUser }, process.env.TOKEN_SECRET)

    if (adminToken) {
      return res.json({ token, adminToken })
    } else {
      return res.json({ token })
    }
  },

  async auth (req: Request, res: Response, next: NextFunction) {
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

  async check (req: Request, res: Response) {
    return res.json('Logged')
  },

  async adminAuth (req: Request, res: Response, next: NextFunction) {
    const { adminAuth } = req.body

    if (!adminAuth) {
      return res.sendStatus(401)
    }

    const token = adminAuth

    try {
      jwt.verify(token, process.env.TOKEN_SECRET_ADMIN)
      return next()
    } catch (error) {
      return res.sendStatus(401)
    }
  }
}
