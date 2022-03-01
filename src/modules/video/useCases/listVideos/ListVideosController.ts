import { Request, Response } from "express";
import { container } from "tsyringe";

import { IRequest, ListVideosUseCase } from "./ListVideosUseCase";

class ListVideosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, initial_date, final_date } = request.query;
    const listVideosUseCase = container.resolve(ListVideosUseCase);
    const videos = await listVideosUseCase.execute({
      name,
      initial_date: initial_date ? new Date(String(initial_date)) : undefined,
      final_date: final_date ? new Date(String(final_date)) : undefined,
    } as IRequest);
    return response.json(videos);
  }
}
export { ListVideosController };
