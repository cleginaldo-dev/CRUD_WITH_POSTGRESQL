import { inject, injectable } from "tsyringe";

import {
  ICategoriesRepository,
  IListReturnData,
} from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  initial_date: Date;
  final_date: Date;
}
@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute(params: IRequest): Promise<IListReturnData> {
    const { total, data } = await this.categoriesRepository.list(params);
    return { total, data };
  }
}
export { ListCategoriesUseCase };
