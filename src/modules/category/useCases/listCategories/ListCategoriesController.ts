import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, initial_date, final_date } = request.query;
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const allcategories = await listCategoriesUseCase.execute({
      name: name ? String(name) : undefined,
      initial_date: initial_date ? new Date(String(initial_date)) : undefined,
      final_date: final_date ? new Date(String(final_date)) : undefined,
    });

    return response.json(allcategories);
  }
}
export { ListCategoriesController };
