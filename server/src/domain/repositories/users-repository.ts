import { User } from '../entities/User'

export abstract class UsersRepository {
  abstract findByUsername(username: string): Promise<User | null>
}
