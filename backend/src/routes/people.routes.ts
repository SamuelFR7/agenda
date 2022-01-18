import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { PersonController } from '../controllers/PersonController'

const peopleRoutes = Router()

const personController = new PersonController()

peopleRoutes.get('/index/:page', ensureAuthenticated, personController.index)
peopleRoutes.get('/length', ensureAuthenticated, personController.indexLength)
peopleRoutes.post('/add', ensureAuthenticated, personController.store)
peopleRoutes.get('/show/:id', ensureAuthenticated, personController.show)
peopleRoutes.patch('/update', ensureAuthenticated, personController.update)
peopleRoutes.delete('/delete/:id', ensureAuthenticated, personController.delete)
peopleRoutes.get('/filter/:name', ensureAuthenticated, personController.filter)

export { peopleRoutes }
