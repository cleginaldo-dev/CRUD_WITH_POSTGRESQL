import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

class UpdateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const { name, description } = request.body;
    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);
    const category = await updateCategoryUseCase.execute({
      category_id,
      name,
      description,
    });
    return response.json(category);
  }
}
export { UpdateCategoryController };
