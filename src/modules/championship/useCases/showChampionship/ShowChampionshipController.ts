import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowChampionshipUseCase } from "./ShowChampionshipUseCase";

class ShowChampionshipController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { championship_id } = request.params;
    const showChampionshipUseCase = container.resolve(ShowChampionshipUseCase);
    const championship = await showChampionshipUseCase.execute(championship_id);

    return response.json(championship);
  }
}
export { ShowChampionshipController };
