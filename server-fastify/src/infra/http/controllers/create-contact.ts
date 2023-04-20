import { CreateContactUseCase } from '@/application/use-cases/create-contact'
import { PrismaContactsRepository } from '@/infra/database/prisma/repositories/prisma-contacts-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CreateContactController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const createContactSchema = z.object({
      name: z.string().nonempty({ message: 'Name should not be empty' }),
      phone_1: z.string().nonempty({ message: 'Phone 1 should not be empty' }),
      phone_2: z.string().nullish(),
      phone_3: z.string().nullish(),
      phone_4: z.string().nullish(),
      phone_5: z.string().nullish(),
      contact_1: z.string().nullish(),
      contact_2: z.string().nullish(),
      contact_3: z.string().nullish(),
      contact_4: z.string().nullish(),
      contact_5: z.string().nullish(),
      email: z.string().nullish(),
      address: z.string().nullish(),
      observations: z.string().nullish(),
    })

    const {
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
    } = createContactSchema.parse(req.body)

    const prismaContactsRepository = new PrismaContactsRepository()
    const createContactUseCase = new CreateContactUseCase(
      prismaContactsRepository,
    )

    await createContactUseCase.execute({
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

    return res.status(201).send()
  }
}
