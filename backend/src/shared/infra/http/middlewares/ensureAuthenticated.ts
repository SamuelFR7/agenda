import { AppError } from '@shared/errors/AppError'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization
  if (!authToken) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authToken.split(' ')
  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET) as IPayload

    req.userId = sub
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }

  return next()
}

export { ensureAuthenticated }
