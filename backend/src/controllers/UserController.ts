import { UserService } from '../services/UserService'
import { Request, Response } from 'express'

class UserController {
  async store (req: Request, res: Response) {
    const { email, password } = req.body

    const userService = new UserService()

    const addUser = await userService.create(email, password)

    return res.json(addUser)
  }

  async login (req: Request, res: Response) {
    const { email, password } = req.body

    const userService = new UserService()

    const token = await userService.authenticate(email, password)

    return res.json(token)
  }
}

export { UserController }
