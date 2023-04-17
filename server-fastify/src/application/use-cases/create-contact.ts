import { Contact } from '@/domain/entities/Contact'
import { ContactsRepository } from '@/domain/repositories/contacts-repository'

interface CreateContactRequest {
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

interface CreateContactResponse {
  contact: Contact
}

class CreateContactUseCase {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  async execute(req: CreateContactRequest): Promise<CreateContactResponse> {
    const {
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

    const contact = new Contact({
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
    })

    await this.contactsRepository.create(contact)

    return {
      contact,
    }
  }
}

export { CreateContactUseCase }
