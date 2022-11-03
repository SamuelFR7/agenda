import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePersonUseCase } from "./CreatePersonUseCase";

class CreatePersonController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      RazaoSocial,
      Telefone1,
      Telefone2,
      Telefone3,
      Telefone4,
      Telefone5,
      Telefone1Contato,
      Telefone2Contato,
      Telefone3Contato,
      Telefone4Contato,
      Telefone5Contato,
      Email,
      Endereco,
      Observacoes,
    } = req.body;

    const createPersonUseCase = container.resolve(CreatePersonUseCase);

    const response = await createPersonUseCase.execute({
      RazaoSocial,
      Telefone1,
      Telefone2,
      Telefone3,
      Telefone4,
      Telefone5,
      Telefone1Contato,
      Telefone2Contato,
      Telefone3Contato,
      Telefone4Contato,
      Telefone5Contato,
      Email,
      Endereco,
      Observacoes,
    });

    return res.status(201).json(response);
  }
}

export { CreatePersonController };
