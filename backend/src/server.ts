import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes'
import { databaseConnection } from './database/databaseConnection'

dotenv.config()
const server = express()

databaseConnection.start()

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(process.env.PORT || 3333)
