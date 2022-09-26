import { Router } from 'express'
import { peopleRoutes } from './people.routes'
import { userRoutes } from './user.routes'

const router = Router()

router.use('/users', userRoutes)
router.use('/people', peopleRoutes)

export { router }
