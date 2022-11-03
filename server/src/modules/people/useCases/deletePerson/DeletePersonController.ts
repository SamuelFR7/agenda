import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePersonUseCase } from "./DeletePersonUseCase";

class DeletePersonController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletePersonUseCase = container.resolve(DeletePersonUseCase);

    await deletePersonUseCase.execute(id);

    return res.status(200).send();
  }
}

export { DeletePersonController };
