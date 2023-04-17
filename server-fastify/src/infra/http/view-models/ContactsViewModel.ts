import { Contact } from '@/domain/entities/Contact'

export class ContactsViewModel {
  static toHttp(contact: Contact) {
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
}
