import { GetManyContactsUseCase } from '@/application/use-cases/get-many-contacts'
import { PrismaContactsRepository } from '@/infra/database/prisma/repositories/prisma-contacts-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ContactsViewModel } from '../view-models/ContactsViewModel'

class ListContactsController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const listContactsSchema = z.object({
      page: z.string().transform((arg) => Number(arg)),
      search: z.string().nullish(),
    })

    const { page, search } = listContactsSchema.parse(req.params)

    const prismaContactsRepository = new PrismaContactsRepository()
    const getManyContactsUseCase = new GetManyContactsUseCase(
      prismaContactsRepository,
    )

    const { data, totalCount } = await getManyContactsUseCase.execute({
      page,
      search,
    })

    return res.status(200).send({
      contacts: data.map((item) => ContactsViewModel.toHttp(item)),
      totalCount,
    })
  }
}

export { ListContactsController }
