import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ListPeopleController } from '@modules/people/useCases/listPeople/ListPeopleController'
import { IndexLengthController } from '@modules/people/useCases/indexLength/IndexLengthController'
import { CreatePersonController } from '@modules/people/useCases/createPerson/CreatePersonController'
import { ShowPersonController } from '@modules/people/useCases/showPerson/ShowPersonController'
import { UpdatePersonController } from '@modules/people/useCases/updatePerson/UpdatePersonController'
import { DeletePersonController } from '@modules/people/useCases/deletePerson/DeletePersonController'

const peopleRoutes = Router()

const listPeopleController = new ListPeopleController()
const indexLengthController = new IndexLengthController()
const createPersonController = new CreatePersonController()
const showPersonController = new ShowPersonController()
const updatePersonController = new UpdatePersonController()
const deletePersonController = new DeletePersonController()

peopleRoutes.get(
    '/list/:page',
    ensureAuthenticated,
    ensureAdmin,
    listPeopleController.handle
)
peopleRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createPersonController.handle
)
peopleRoutes.get(
    '/length',
    ensureAuthenticated,
    ensureAdmin,
    indexLengthController.handle
)
peopleRoutes.get(
    '/show/:id',
    ensureAuthenticated,
    ensureAdmin,
    showPersonController.handle
)
peopleRoutes.patch(
    '/update',
    ensureAuthenticated,
    ensureAdmin,
    updatePersonController.handle
)
peopleRoutes.delete(
    '/delete/:id',
    ensureAuthenticated,
    ensureAdmin,
    deletePersonController.handle
)

export { peopleRoutes }
