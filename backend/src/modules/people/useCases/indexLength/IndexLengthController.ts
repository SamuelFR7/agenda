import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IndexLengthUseCase } from './IndexLengthUseCase'

class IndexLengthController {
    async handle(req: Request, res: Response): Promise<Response> {
        const indexLengthUseCase = container.resolve(IndexLengthUseCase)

        const response = await indexLengthUseCase.execute()

        return res.status(200).json(response)
    }
}

export { IndexLengthController }
