import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository
    ) {}

    async execute({ email, password }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if (userAlreadyExists) {
            throw new Error('User already exists')
        }

        const passwordHash = await hash(password, 8)

        await this.usersRepository.create({
            email,
            password: passwordHash,
        })
    }
}

export { CreateUserUseCase }
