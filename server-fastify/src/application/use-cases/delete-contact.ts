import { ContactsRepository } from '@/domain/repositories/contacts-repository'

interface DeleteContactRequest {
  id: string
}

export class DeleteContact {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  async execute(req: DeleteContactRequest): Promise<void> {
    const { id } = req

    await this.contactsRepository.deleteById(id)
  }
}
