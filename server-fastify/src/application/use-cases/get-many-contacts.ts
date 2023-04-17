import { Contact } from '@/domain/entities/Contact'
import { ContactsRepository } from '@/domain/repositories/contacts-repository'
import { PaginatedResult } from '@/core/dto/paginated-result'

interface GetManyContactsRequest {
  page?: number
  search?: string
}

export class GetManyContacts {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  async execute(
    req: GetManyContactsRequest,
  ): Promise<PaginatedResult<Contact[]>> {
    const { page, search } = req

    const totalCount = await this.contactsRepository.count()

    if (!search) {
      const contacts = await this.contactsRepository.findMany({
        search,
      })

      return {
        data: contacts,
        totalCount,
      }
    }

    const contacts = await this.contactsRepository.findMany({
      page,
    })

    return {
      data: contacts,
      totalCount,
    }
  }
}
