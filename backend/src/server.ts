import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import dotenv from 'dotenv'

import { errorCatch } from './middlewares/errorCatch'
import { router } from './routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(
    express.json({
        limit: '50mb',
    })
)
app.use(router)
app.use(errorCatch)

app.listen(process.env.PORT || 3333, () =>
    console.log('🚀 Server started and running at port 3333')
)
