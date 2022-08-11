import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { Router } from 'express'

const userRoutes = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

userRoutes.post('/', createUserController.handle)
userRoutes.post('/session', authenticateUserController.handle)

export { userRoutes }
