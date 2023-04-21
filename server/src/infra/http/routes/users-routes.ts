import { FastifyInstance } from 'fastify'
import { AuthUserController } from '../controllers/auth-user'

const authenticateUserController = new AuthUserController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users/session', authenticateUserController.handle)
}
