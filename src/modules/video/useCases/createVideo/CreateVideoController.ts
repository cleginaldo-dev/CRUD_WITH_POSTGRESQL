import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateVideoUseCase } from "./CreateVideoUseCase";

class CreateVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, duration, category_id } = request.body;
    const createVideoUseCase = container.resolve(CreateVideoUseCase);
    const video = await createVideoUseCase.execute({
      name,
      description,
      duration,
      category_id,
    });
    return response.status(201).json(video);
  }
}
export { CreateVideoController };
