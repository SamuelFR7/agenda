import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'
import cors from 'cors'

import { errorCatch } from './middlewares/errorCatch'
import { router } from './routes'

import '../../container'

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use(errorCatch)

export { app }
