import { Entity } from '@/core/domain/Entity'

interface ContactProps {
  name: string
  phone_1: string
  phone_2: string
  phone_3: string
  phone_4: string
  phone_5: string
  contact_1: string
  contact_2: string
  contact_3: string
  contact_4: string
  contact_5: string
  email: string
  address: string
  observations: string
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

  public get phone_2(): string {
    return this.props.phone_2
  }

  public set phone_2(phone2: string) {
    this.props.phone_2 = phone2
  }

  public get phone_3(): string {
    return this.props.phone_3
  }

  public set phone_3(phone3: string) {
    this.props.phone_3 = phone3
  }

  public get phone_4(): string {
    return this.props.phone_4
  }

  public set phone_4(phone4: string) {
    this.props.phone_4 = phone4
  }

  public get phone_5(): string {
    return this.props.phone_5
  }

  public set phone_5(phone5: string) {
    this.props.phone_5 = phone5
  }

  public get contact_1(): string {
    return this.props.contact_1
  }

  public set contact_1(contact1: string) {
    this.props.contact_1 = contact1
  }

  public get contact_2(): string {
    return this.props.contact_2
  }

  public set contact_2(contact2: string) {
    this.props.contact_2 = contact2
  }

  public get contact_3(): string {
    return this.props.contact_3
  }

  public set contact_3(contact3: string) {
    this.props.contact_3 = contact3
  }

  public get contact_4(): string {
    return this.props.contact_4
  }

  public set contact_4(contact4: string) {
    this.props.contact_1 = contact4
  }

  public get contact_5(): string {
    return this.props.contact_5
  }

  public set contact_5(contact5: string) {
    this.props.contact_5 = contact5
  }

  public get email(): string {
    return this.props.email
  }

  public set email(email: string) {
    this.props.email = email
  }

  public get address(): string {
    return this.props.address
  }

  public set address(address: string) {
    this.props.address = address
  }

  public get observations(): string {
    return this.props.observations
  }

  public set observations(observations: string) {
    this.props.observations = observations
  }
}
