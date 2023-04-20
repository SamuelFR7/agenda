import { compare } from 'bcryptjs'
import { UsersRepository } from '@/domain/repositories/users-repository'
import { UseCaseError } from '../errors/use-case-error'
import { User } from '@/domain/entities/User'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

class AuthenticateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UseCaseError('email or password incorrect!')
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new UseCaseError('email or password incorrect!')
    }

    return user
  }
}

export { AuthenticateUserUseCase }
