import express from 'express'

import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ensureAdmin } from './middlewares/ensureAdmin'

import { PersonController } from './controllers/PersonController'
import { UserController } from './controllers/UserController'

const routes = express.Router()

// Objects
const personController = new PersonController()
const userController = new UserController()

// User Routes
routes.post('/user/register', ensureAuthenticated, ensureAdmin, userController.store)
routes.post('/user/login', userController.login)

// Pages Routes

routes.get('/index/:page', ensureAuthenticated, personController.index)
routes.get('/length', ensureAuthenticated, personController.indexLength)
routes.post('/add', ensureAuthenticated, personController.store)
routes.get('/show/:id', ensureAuthenticated, personController.show)
routes.patch('/update', ensureAuthenticated, personController.update)
routes.delete('/delete/:id', ensureAuthenticated, personController.delete)
routes.get('/filter/:name', ensureAuthenticated, personController.filter)

export { routes }
