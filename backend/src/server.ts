import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'

dotenv.config()
const server = express()

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(process.env.PORT || 3333)
