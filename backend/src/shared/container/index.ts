import { PersonRepository } from '@modules/people/infra/prisma/PersonRepository'
import { IPersonRepository } from '@modules/people/repositories/IPersonRepository'
import { UserRepository } from '@modules/users/infra/prisma/UserRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { container } from 'tsyringe'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<IPersonRepository>(
  'PersonRepository',
  PersonRepository
)
