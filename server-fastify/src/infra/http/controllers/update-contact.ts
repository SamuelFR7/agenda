import { UpdateContactUseCase } from '@/application/use-cases/update-contact'
import { PrismaContactsRepository } from '@/infra/database/prisma/repositories/prisma-contacts-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class UpdateContactController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const updateContactSchema = z.object({
      id: z.string().nonempty({ message: 'Id should not be empty' }),
      name: z.string().nonempty({ message: 'Name should not be empty' }),
      phone_1: z.string().nonempty({ message: 'Phone 1 should not be empty' }),
      phone_2: z.string(),
      phone_3: z.string(),
      phone_4: z.string(),
      phone_5: z.string(),
      contact_1: z.string(),
      contact_2: z.string(),
      contact_3: z.string(),
      contact_4: z.string(),
      contact_5: z.string(),
      email: z.string().email(),
      address: z.string(),
      observations: z.string(),
    })

    const {
      id,
      name,
      phone_1,
      address,
      contact_1,
      contact_2,
      contact_3,
      contact_4,
      contact_5,
      email,
      observations,
      phone_2,
      phone_3,
      phone_4,
      phone_5,
    } = updateContactSchema.parse(req.body)

    const prismaContactsRepository = new PrismaContactsRepository()
    const updateContactUseCase = new UpdateContactUseCase(
      prismaContactsRepository,
    )

    await updateContactUseCase.execute({
      address,
      contact_1,
      contact_2,
      contact_3,
      contact_4,
      contact_5,
      email,
      id,
      name,
      observations,
      phone_1,
      phone_2,
      phone_3,
      phone_4,
      phone_5,
    })

    return res.status(201).send()
  }
}
