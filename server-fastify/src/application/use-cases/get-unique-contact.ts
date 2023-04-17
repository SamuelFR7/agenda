import { Contact } from '@/domain/entities/Contact'
import { ContactsRepository } from '@/domain/repositories/contacts-repository'

interface GetUniqueContactRequest {
  id: string
}

interface GetUniqueContactResponse {
  contact: Contact
}

export class GetUniqueContactUseCase {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  async execute(
    req: GetUniqueContactRequest,
  ): Promise<GetUniqueContactResponse> {
    const { id } = req

    const contact = await this.contactsRepository.findUnique(id)

    return {
      contact,
    }
  }
}
