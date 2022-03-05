import { hashSync, compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { prisma } from '../infra/database/prisma/client'

class UserService {
    async create(email: string, password: string) {
        const emailExists = await prisma.user.findUnique({ where: { email } })

        if (emailExists) {
            throw new Error('Email já registrado')
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashSync(password),
            },
        })

        return newUser
    }

    async authenticate(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            throw new Error('Email ou senha incorretos')
        }

        const userAndPasswordMatchs = compareSync(password, user.password)

        if (!userAndPasswordMatchs) {
            throw new Error('Email ou senha incorretos')
        }

        const token = sign(
            {
                email: user.email,
            },
            process.env.TOKEN_SECRET,
            {
                subject: user.id,
                expiresIn: '1d',
            }
        )

        return token
    }
}

export { UserService }
