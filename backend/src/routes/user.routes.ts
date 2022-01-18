import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

import { UserController } from '../controllers/UserController'

const userRoutes = Router()

const userController = new UserController()

userRoutes.post(
    '/user/register',
    ensureAuthenticated,
    ensureAdmin,
    userController.store
)
userRoutes.post('/user/login', userController.login)

export { userRoutes }
