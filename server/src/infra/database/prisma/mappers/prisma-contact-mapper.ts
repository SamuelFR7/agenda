import { Contact } from '@/domain/entities/Contact'
import { Contact as RawContact } from '@prisma/client'

export class PrismaContactMapper {
  static toPrisma(contact: Contact): RawContact {
    return {
      id: contact.id,
      email: contact.email,
      address: contact.address,
      contact_1: contact.contact_1,
      contact_2: contact.contact_2,
      contact_3: contact.contact_3,
      contact_4: contact.contact_4,
      contact_5: contact.contact_5,
      name: contact.name,
      observations: contact.observations,
      phone_1: contact.phone_1,
      phone_2: contact.phone_2,
      phone_3: contact.phone_3,
      phone_4: contact.phone_4,
      phone_5: contact.phone_5,
    }
  }

  static toDomain(raw: RawContact): Contact {
    return new Contact(
      {
        email: raw.email,
        address: raw.address,
        contact_1: raw.contact_1,
        contact_2: raw.contact_2,
        contact_3: raw.contact_3,
        contact_4: raw.contact_4,
        contact_5: raw.contact_5,
        name: raw.name,
        observations: raw.observations,
        phone_1: raw.phone_1,
        phone_2: raw.phone_2,
        phone_3: raw.phone_3,
        phone_4: raw.phone_4,
        phone_5: raw.phone_5,
      },
      raw.id,
    )
  }
}
