import { PersonRepository } from '@modules/people/infra/prisma/PersonRepository'
import { IPersonRepository } from '@modules/people/repositories/IPersonRepository'
import { UserRepository } from '@modules/accounts/infra/prisma/UserRepository'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { container } from 'tsyringe'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/UsersTokensRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IPersonRepository>(
  'PersonRepository',
  PersonRepository
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
)
