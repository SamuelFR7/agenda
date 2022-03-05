import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { PersonController } from '../controllers/PersonController'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const peopleRoutes = Router()

const personController = new PersonController()

peopleRoutes.get(
    '/index/:page',
    ensureAuthenticated,
    ensureAdmin,
    personController.index
)
peopleRoutes.get(
    '/length',
    ensureAuthenticated,
    ensureAdmin,
    personController.indexLength
)
peopleRoutes.post(
    '/add',
    ensureAuthenticated,
    ensureAdmin,
    personController.store
)
peopleRoutes.get(
    '/show/:id',
    ensureAuthenticated,
    ensureAdmin,
    personController.show
)
peopleRoutes.patch(
    '/update',
    ensureAuthenticated,
    ensureAdmin,
    personController.update
)
peopleRoutes.delete(
    '/delete/:id',
    ensureAuthenticated,
    ensureAdmin,
    personController.delete
)
peopleRoutes.get(
    '/filter/:name',
    ensureAuthenticated,
    ensureAdmin,
    personController.filter
)

export { peopleRoutes }
