import { Entity } from '@/core/domain/Entity'
import { Maybe } from '@/core/logic/Maybe'

interface ContactProps {
  name: string
  phone_1: string
  phone_2?: string | null
  phone_3?: string | null
  phone_4?: string | null
  phone_5?: string | null
  contact_1?: string | null
  contact_2?: string | null
  contact_3?: string | null
  contact_4?: string | null
  contact_5?: string | null
  email?: string | null
  address?: string | null
  observations?: string | null
}

export class Contact extends Entity<ContactProps> {
  public get name(): string {
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }

  public get phone_1(): string {
    return this.props.phone_1
  }

  public set phone_1(phone1: string) {
    this.props.phone_1 = phone1
  }

  public get phone_2(): Maybe<string> {
    return this.props.phone_2
  }

  public set phone_2(phone2: Maybe<string>) {
    this.props.phone_2 = phone2
  }

  public get phone_3(): Maybe<string> {
    return this.props.phone_3
  }

  public set phone_3(phone3: Maybe<string>) {
    this.props.phone_3 = phone3
  }

  public get phone_4(): Maybe<string> {
    return this.props.phone_4
  }

  public set phone_4(phone4: Maybe<string>) {
    this.props.phone_4 = phone4
  }

  public get phone_5(): Maybe<string> {
    return this.props.phone_5
  }

  public set phone_5(phone5: Maybe<string>) {
    this.props.phone_5 = phone5
  }

  public get contact_1(): Maybe<string> {
    return this.props.contact_1
  }

  public set contact_1(contact1: Maybe<string>) {
    this.props.contact_1 = contact1
  }

  public get contact_2(): Maybe<string> {
    return this.props.contact_2
  }

  public set contact_2(contact2: Maybe<string>) {
    this.props.contact_2 = contact2
  }

  public get contact_3(): Maybe<string> {
    return this.props.contact_3
  }

  public set contact_3(contact3: Maybe<string>) {
    this.props.contact_3 = contact3
  }

  public get contact_4(): Maybe<string> {
    return this.props.contact_4
  }

  public set contact_4(contact4: Maybe<string>) {
    this.props.contact_1 = contact4
  }

  public get contact_5(): Maybe<string> {
    return this.props.contact_5
  }

  public set contact_5(contact5: Maybe<string>) {
    this.props.contact_5 = contact5
  }

  public get email(): Maybe<string> {
    return this.props.email
  }

  public set email(email: Maybe<string>) {
    this.props.email = email
  }

  public get address(): Maybe<string> {
    return this.props.address
  }

  public set address(address: Maybe<string>) {
    this.props.address = address
  }

  public get observations(): Maybe<string> {
    return this.props.observations
  }

  public set observations(observations: Maybe<string>) {
    this.props.observations = observations
  }
}
