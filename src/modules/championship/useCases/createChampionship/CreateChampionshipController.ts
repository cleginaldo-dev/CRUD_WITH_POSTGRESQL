import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateChampionshipUseCase } from "./CreateChampionshipUseCase";

class CreateChampionshipController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createChampionshipUseCase = container.resolve(
      CreateChampionshipUseCase
    );

    const createChampionship = await createChampionshipUseCase.execute({
      name,
    });

    return response.status(201).json(createChampionship);
  }
}
export { CreateChampionshipController };
