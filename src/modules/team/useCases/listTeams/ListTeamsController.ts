import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListTeamsUseCase } from "./ListTeamsUseCase";

class ListTeamsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const listeTeamsUseCase = container.resolve(ListTeamsUseCase);
    const teams = await listeTeamsUseCase.execute(name as string);
    return response.json(teams);
  }
}
export { ListTeamsController };
