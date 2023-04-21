import { User } from '@/domain/entities/User'
import { UsersRepository } from '@/domain/repositories/users-repository'
import { prisma } from '../client'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

export class PrismaUsersRepository implements UsersRepository {
  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return PrismaUserMapper.toDomain(user)
  }
}
