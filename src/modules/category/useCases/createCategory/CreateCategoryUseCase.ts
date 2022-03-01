import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../global/errors/AppError";
import { Categories } from "../../entities/Categories";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Categories> {
    const categoryExist = await this.categoriesRepository.findByName(name);
    if (categoryExist) {
      throw new AppError("A categoria já existe!");
    }
    const category = await this.categoriesRepository.create({
      name,
      description,
    });
    return category;
  }
}
export { CreateCategoryUseCase };
