import express from 'express'
import PersonController from './controllers/PersonController'
import UserController from './controllers/UserController'

const routes = express.Router()
// User Routes
routes.post('/user/register', UserController.adminAuth, UserController.store)
routes.post('/user/login', UserController.login)
routes.get('/user/check', UserController.auth, UserController.check)
routes.post('/user/admin/check', UserController.adminAuth, UserController.check)

// Pages Routes

routes.get('/', PersonController.index)
routes.get('/length', PersonController.indexLength)
routes.post('/add', PersonController.store)
routes.get('/show', PersonController.show)
routes.post('/update', PersonController.update)
routes.delete('/delete', PersonController.delete)
routes.get('/filter', PersonController.filter)

export default routes
