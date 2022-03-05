import { Request, Response } from 'express'

function errorCatch(err: Error, req: Request, res: Response) {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    })
}

export { errorCatch }
