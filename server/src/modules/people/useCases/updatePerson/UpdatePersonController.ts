import { type Request, type Response } from "express";
import { container } from "tsyringe";
import { UpdatePersonUseCase } from "./UpdatePersonUseCase";

class UpdatePersonController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;

        const updatePersonUseCase = container.resolve(UpdatePersonUseCase);

        const response = await updatePersonUseCase.execute(id, req.body);

        return res.status(201).json(response);
    }
}

export { UpdatePersonController };
