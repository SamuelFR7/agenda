import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import dotenv from 'dotenv'

import { connect } from 'mongoose'

import { errorCatch } from './middlewares/errorCatch'

import { routes } from './routes'

dotenv.config()
connect(process.env.MONGO_CONNECTION)

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorCatch)

app.listen(process.env.PORT || 3333, () => console.log('🚀 Server started!'))
