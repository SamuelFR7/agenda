import { Contact } from '@/domain/entities/Contact'
import { ContactsRepository } from '@/domain/repositories/contacts-repository'
import { prisma } from '../client'
import { PrismaContactMapper } from '../mappers/prisma-contact-mapper'

export class PrismaContactsRepository implements ContactsRepository {
  async deleteById(id: string): Promise<void> {
    await prisma.contact.delete({
      where: {
        id,
      },
    })
  }

  async findMany({
    page,
    search,
  }: {
    page?: number | undefined
    search?: string | undefined
  }): Promise<Contact[]> {
    if (search) {
      const contacts = await prisma.contact.findMany({
        where: {
          name: {
            contains: search,
          },
        },
        take: 10,
      })

      return contacts.map(PrismaContactMapper.toDomain)
    }

    if (page) {
      const contacts = await prisma.contact.findMany({
        take: 10,
        skip: (page - 1) * 10,
      })

      return contacts.map(PrismaContactMapper.toDomain)
    }

    throw new Error('Not page or search defined')
  }

  async findUnique(id: string): Promise<Contact> {
    const contact = await prisma.contact.findUnique({
      where: {
        id,
      },
    })

    if (!contact) {
      throw new Error('Contact not found')
    }

    return PrismaContactMapper.toDomain(contact)
  }

  async save(contact: Contact): Promise<Contact> {
    const raw = PrismaContactMapper.toPrisma(contact)

    const updatedContact = await prisma.contact.update({
      where: {
        id: raw.id,
      },
      data: {
        ...raw,
      },
    })

    return PrismaContactMapper.toDomain(updatedContact)
  }

  async create(contact: Contact): Promise<void> {
    const raw = PrismaContactMapper.toPrisma(contact)

    await prisma.contact.create({
      data: {
        ...raw,
      },
    })
  }

  async count(): Promise<number> {
    return await prisma.contact.count()
  }
}
