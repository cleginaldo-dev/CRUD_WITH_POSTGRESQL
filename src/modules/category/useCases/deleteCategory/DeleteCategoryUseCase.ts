import { inject, injectable } from "tsyringe";

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IRequest {
  category_id: string;
}
@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}
  async execute({ category_id }: IRequest): Promise<void> {
    await this.categoriesRepository.delete(category_id);
  }
}
export { DeleteCategoryUseCase };
