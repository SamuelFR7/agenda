import { User } from '../entities/User'
import { hashSync, compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

class UserService {
  async create (email: string, password: string) {
    const emailExists = await User.findOne({ email })

    if (emailExists) {
      throw new Error('Email já registrado')
    }

    const newUser = await User.create({
      email,
      password: hashSync(password)
    })

    return newUser
  }

  async authenticate (email: string, password: string) {
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('Email ou senha incorretos')
    }

    const userAndPasswordMatchs = compareSync(password, user.password)

    if (!userAndPasswordMatchs) {
      throw new Error('Email ou senha incorretos')
    }

    const token = sign({
      email: user.email
    }, process.env.TOKEN_SECRET, {
      subject: user.id,
      expiresIn: '1d'
    })

    return token
  }
}

export { UserService }
