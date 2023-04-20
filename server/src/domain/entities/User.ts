import { Entity } from '@/core/domain/Entity'

interface UserProps {
  email: string
  password: string
}

class User extends Entity<UserProps> {
  get id() {
    return this._id
  }

  public get email(): string {
    return this.props.email
  }

  public set email(email: string) {
    this.props.email = email
  }

  public get password(): string {
    return this.props.password
  }

  public set password(password: string) {
    this.props.password = password
  }
}

export { User }
