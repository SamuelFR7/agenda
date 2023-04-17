import { Contact } from '@/domain/entities/Contact'
import { ContactsRepository } from '@/domain/repositories/contacts-repository'

interface UpdateContactRequest {
  contactToUpdate: Contact
}

interface UpdateContactResponse {
  contact: Contact
}

export class UpdateContact {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  async execute(req: UpdateContactRequest): Promise<UpdateContactResponse> {
    const { contactToUpdate } = req

    const contact = await this.contactsRepository.save(contactToUpdate)

    return {
      contact,
    }
  }
}
