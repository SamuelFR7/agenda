import { Request, Response, Router } from 'express'
import { prisma } from '../infra/database/prisma/client'
import { ICreatePersonDTO } from '../services/PersonService'

const migrateRoutes = Router()

interface ICreateUserDTO {
    email: string
    password: string
}

migrateRoutes.post('/createpeople', async (req: Request, res: Response) => {
    const data: ICreatePersonDTO[] = req.body

    await prisma.person.createMany({
        data,
    })

    return res.status(201).send()
})

migrateRoutes.post('/createusers', async (req: Request, res: Response) => {
    const data: ICreateUserDTO[] = req.body

    await prisma.user.createMany({
        data,
    })

    return res.status(201).send()
})

export { migrateRoutes }
