import { GetUniqueContactUseCase } from '@/application/use-cases/get-unique-contact'
import { PrismaContactsRepository } from '@/infra/database/prisma/repositories/prisma-contacts-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ContactsViewModel } from '../view-models/ContactsViewModel'

export class GetUniqueContactController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const getUniqueContactSchema = z.object({
      id: z.string(),
    })

    const { id } = getUniqueContactSchema.parse(req.params)

    const prismaContactsRepository = new PrismaContactsRepository()
    const getUniqueContactUseCase = new GetUniqueContactUseCase(
      prismaContactsRepository,
    )

    const { contact } = await getUniqueContactUseCase.execute({
      id,
    })

    return res.status(200).send({
      contact: ContactsViewModel.toHttp(contact),
    })
  }
}
