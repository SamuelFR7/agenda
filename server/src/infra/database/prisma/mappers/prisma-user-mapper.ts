import { User } from '@/domain/entities/User'
import { User as RawUser } from '@prisma/client'

export class PrismaUserMapper {
  static toPrisma(user: User): RawUser {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
    }
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        username: raw.username,
        password: raw.password,
      },
      raw.id,
    )
  }
}
