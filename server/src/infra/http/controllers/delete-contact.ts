import { DeleteContactUseCase } from '@/application/use-cases/delete-contact'
import { PrismaContactsRepository } from '@/infra/database/prisma/repositories/prisma-contacts-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class DeleteContactController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const deleteContactSchema = z.object({
      id: z.string(),
    })

    const { id } = deleteContactSchema.parse(req.params)

    const prismaContactsRepository = new PrismaContactsRepository()
    const deleteContactUseCase = new DeleteContactUseCase(
      prismaContactsRepository,
    )

    await deleteContactUseCase.execute({
      id,
    })

    return res.status(200).send()
  }
}
