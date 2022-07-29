import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../entities/User'
import { IUserRepository } from '../../repositories/IUserRepository'
import { prisma } from '@shared/infra/database/prisma/client'

class UserRepository implements IUserRepository {
  async create(data: ICreateUserDTO): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
      },
    })

    return newUser
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }
}

export { UserRepository }
