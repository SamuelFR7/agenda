import { Router } from 'express'
import { migrateRoutes } from './migrate.routes'
import { peopleRoutes } from './people.routes'
import { userRoutes } from './user.routes'

const router = Router()

router.use(userRoutes)
router.use(peopleRoutes)
router.use(migrateRoutes)

export { router }
