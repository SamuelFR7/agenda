import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import dotenv from 'dotenv'

import { connect } from 'mongoose'

import { errorCatch } from './middlewares/errorCatch'

import { peopleRoutes } from './routes/people.routes'
import { userRoutes } from './routes/user.routes'

dotenv.config()
connect(process.env.MONGO_CONNECTION)

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(peopleRoutes)
app.use(errorCatch)

app.listen(process.env.PORT || 3333, () =>
    console.log('🚀 Server started and running at port 3333!')
)
