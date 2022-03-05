import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ShowPersonUseCase } from './ShowPersonUseCase'

class ShowPersonController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        const showPersonUseCase = container.resolve(ShowPersonUseCase)

        const response = await showPersonUseCase.execute(id)

        return res.status(200).json(response)
    }
}

export { ShowPersonController }
