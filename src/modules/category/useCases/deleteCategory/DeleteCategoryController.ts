import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);
    await deleteCategoryUseCase.execute({ category_id });
    return response.status(200).send();
  }
}
export { DeleteCategoryController };
