import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowCategoryUseCase } from "./ShowCategoryUseCase";

class ShowCategoryContoller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const showCategoryUseCase = container.resolve(ShowCategoryUseCase);
    const category = await showCategoryUseCase.execute({
      category_id,
    });
    return response.json(category);
  }
}
export { ShowCategoryContoller };
