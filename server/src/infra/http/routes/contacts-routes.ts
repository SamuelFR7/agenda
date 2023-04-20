import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt'
import { CreateContactController } from '../controllers/create-contact'
import { ListContactsController } from '../controllers/list-contacts'
import { GetUniqueContactController } from '../controllers/get-unique-contact'
import { UpdateContactController } from '../controllers/update-contact'
import { DeleteContactController } from '../controllers/delete-contact'

const createContactController = new CreateContactController()
const listContactController = new ListContactsController()
const getUniqueContactController = new GetUniqueContactController()
const updateContactController = new UpdateContactController()
const deleteContactController = new DeleteContactController()

export async function contactsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/contacts/', createContactController.handle)
  app.get('/contacts/list/:page/:search', listContactController.handle)
  app.get('/contacts/unique/:id', getUniqueContactController.handle)
  app.patch('/contacts/', updateContactController.handle)
  app.delete('/contacts/:id', deleteContactController.handle)
}
