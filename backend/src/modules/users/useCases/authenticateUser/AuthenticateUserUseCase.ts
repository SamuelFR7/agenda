import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface IRequest {
    email: string
    password: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<string> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new Error('User or password incorrect!')
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error('User or password incorrect!')
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

export { AuthenticateUserUseCase }
