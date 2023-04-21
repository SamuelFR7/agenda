import { Contact } from '@/domain/entities/Contact'
import { ContactsRepository } from '@/domain/repositories/contacts-repository'
import { UseCaseError } from '../errors/use-case-error'

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

    if (!contact) {
      throw new UseCaseError('Contact does not exists')
    }

    return {
      contact,
    }
  }
}
