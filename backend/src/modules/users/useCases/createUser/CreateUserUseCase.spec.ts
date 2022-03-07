import 'reflect-metadata'
import { CreateUserUseCase } from './CreateUserUseCase'
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
let userRepositoryInMemory: UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Create user use case', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it('should be able to create a new user', async () => {
        await createUserUseCase.execute({
            email: 'SAMUEL',
            password: '123',
        })

        const findNewUser = await userRepositoryInMemory.findByEmail('SAMUEL')

        expect(findNewUser).toHaveProperty('id')
    })

    it('should not be able to create a user with existing email', async () => {
        const newUser: ICreateUserDTO = {
            email: 'SAMUEL',
            password: '123',
        }

        await createUserUseCase.execute(newUser)

        await expect(createUserUseCase.execute(newUser)).rejects.toEqual(
            new Error('User already exists')
        )
    })
})
