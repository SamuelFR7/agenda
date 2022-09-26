import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { AppError } from '@shared/errors/AppError'
import dayjs from 'dayjs'
import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { auth } from '@config/auth'

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  user: {
    email: string
  }
  token: string
  refresh_token: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { expires_in_refresh_token, expires_refresh_token_days } = auth
    const { email, sub } = verify(
      token,
      process.env.REFRESH_TOKEN_SECRET
    ) as IPayload

    const user_id = sub

    const userTokens =
      await this.usersTokensRepository.findByUsersIdAndRefreshToken(
        user_id,
        token
      )

    if (!userTokens) {
      throw new AppError('Refresh Token does not exists!')
    }

    await this.usersTokensRepository.deleteById(userTokens.id)

    const refresh_token = sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    })

    const refresh_token_expires_date = dayjs()
      .add(expires_refresh_token_days, 'days')
      .toDate()

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id,
    })

    const newToken = sign({}, process.env.TOKEN_SECRET, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    })

    return {
      user: {
        email,
      },
      token: newToken,
      refresh_token,
    }
  }
}

export { RefreshTokenUseCase }
