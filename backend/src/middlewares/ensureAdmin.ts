import { Request, Response, NextFunction } from 'express'
import { User } from '../entities/User'

async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const { userId } = req

    const user = await User.findById(userId)

    const admin = user.admin

    if (admin) {
        return next()
    }

    return res.status(401).json({
        error: 'Unauthorized',
    })
}

export { ensureAdmin }
