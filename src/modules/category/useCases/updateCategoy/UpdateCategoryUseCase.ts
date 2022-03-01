import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../global/errors/AppError";
import { Categories } from "../../entities/Categories";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  category_id: string;
  name: string;
  description: string;
}
@injectable()
class UpdateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute({
    category_id,
    name,
    description,
  }: IRequest): Promise<Categories> {
    const category = await this.categoriesRepository.findById(category_id);
    if (!category) {
      throw new AppError("Categoria não encontrada!");
    }
    Object.assign(category, {
      name: name || category.name,
      description: description || category.description,
    });
    await this.categoriesRepository.save(category);
    return category;
  }
}
export { UpdateCategoryUseCase };
