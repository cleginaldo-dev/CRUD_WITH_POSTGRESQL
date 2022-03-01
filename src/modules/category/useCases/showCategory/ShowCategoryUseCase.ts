import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../global/errors/AppError";
import { Categories } from "../../entities/Categories";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  category_id: string;
}
@injectable()
class ShowCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute({ category_id }: IRequest): Promise<Categories> {
    const category = await this.categoriesRepository.findById(category_id);
    if (!category) {
      throw new AppError("Categoria não encontrada!");
    }
    return category;
  }
}
export { ShowCategoryUseCase };
