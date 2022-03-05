import { Router } from 'express'
import { peopleRoutes } from './people.routes'
import { userRoutes } from './user.routes'

const router = Router()

router.use(userRoutes)
router.use(peopleRoutes)

export { router }
