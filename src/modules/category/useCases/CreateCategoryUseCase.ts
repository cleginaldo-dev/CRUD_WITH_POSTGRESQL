import { Categories } from "../../../entities/Categories";
import { AppError } from "../../../errors/AppError";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

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
