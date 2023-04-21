import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { AuthenticateUserUseCase } from '@/application/use-cases/auth-user'

export class AuthUserController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const authUserSchema = z.object({
      username: z.string(),
      password: z.string(),
    })

    const { username, password } = authUserSchema.parse(req.body)

    const prismaUserRepository = new PrismaUsersRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      prismaUserRepository,
    )

    try {
      const user = await authenticateUserUseCase.execute({
        username,
        password,
      })

      const token = await res.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
          },
        },
      )

      return res.status(200).send({
        user: {
          username: user.username,
        },
        token,
      })
    } catch (error) {
      return res.status(400).send({ message: 'Invalid credentials' })
    }
  }
}
