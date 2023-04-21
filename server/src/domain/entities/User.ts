import { Entity } from '@/core/domain/Entity'

interface UserProps {
  username: string
  password: string
}

class User extends Entity<UserProps> {
  get id() {
    return this._id
  }

  public get username(): string {
    return this.props.username
  }

  public set username(username: string) {
    this.props.username = username
  }

  public get password(): string {
    return this.props.password
  }

  public set password(password: string) {
    this.props.password = password
  }
}

export { User }
