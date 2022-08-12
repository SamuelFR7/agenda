import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { AppError } from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { auth } from 'config/auth'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import dayjs from 'dayjs'

interface IResponse {
  user: {
    email: string
  }
  token: string
  refresh_token: string
}

interface IRequest {
  email: string
  password: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    const {
      expires_in_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth

    if (!user) {
      throw new AppError('User or password incorrect!', 401)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('User or password incorrect!', 401)
    }

    const token = sign({}, process.env.TOKEN_SECRET, {
      subject: user.id,
      expiresIn: expires_in_token,
    })

    const refreshToken = sign(
      {
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        subject: user.id,
        expiresIn: expires_in_refresh_token,
      }
    )

    const refresh_token_expires_date = dayjs()
      .add(expires_refresh_token_days, 'days')
      .toDate()

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token: refreshToken,
      user_id: user.id,
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        email: user.email,
      },
      refresh_token: refreshToken,
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }
