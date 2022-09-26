import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { UserTokens } from '@modules/accounts/entities/UserTokens'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { prisma } from '@shared/infra/database/prisma/client'

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const newToken = await prisma.usersTokens.create({
      data: {
        expires_date,
        refresh_token,
        user_id,
      },
    })

    return newToken
  }

  async findByUsersIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const usersTokens = await prisma.usersTokens.findMany({
      where: { user_id, refresh_token },
    })

    return usersTokens[0]
  }

  async deleteById(id: string): Promise<void> {
    await prisma.usersTokens.delete({ where: { id } })
  }
}

export { UsersTokensRepository }
