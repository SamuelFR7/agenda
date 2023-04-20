import { Contact } from '@/domain/entities/Contact'
import { ContactsRepository } from '@/domain/repositories/contacts-repository'

interface UpdateContactRequest {
  id: string
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

interface UpdateContactResponse {
  contact: Contact
}

export class UpdateContactUseCase {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  async execute(req: UpdateContactRequest): Promise<UpdateContactResponse> {
    const {
      id,
      address,
      contact_1,
      contact_2,
      contact_3,
      contact_4,
      contact_5,
      email,
      name,
      observations,
      phone_1,
      phone_2,
      phone_3,
      phone_4,
      phone_5,
    } = req

    const contactToUpdate = new Contact(
      {
        address,
        contact_1,
        contact_2,
        contact_3,
        contact_4,
        contact_5,
        email,
        name,
        observations,
        phone_1,
        phone_2,
        phone_3,
        phone_4,
        phone_5,
      },
      id,
    )

    const contact = await this.contactsRepository.save(contactToUpdate)

    return {
      contact,
    }
  }
}
