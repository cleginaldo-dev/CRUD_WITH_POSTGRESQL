import { Categories } from "../entities/Categories";
import { ICreateCategoryDTO } from "./implementations/ICreateCategoryDTO";

export interface IListAllParams {
  name?: string;
  initial_date?: Date;
  final_date?: Date;
}

export interface IListReturnData {
  total: number;
  data: Categories[];
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Categories>;
  findById(id: string): Promise<Categories>;
  findByName(name: string): Promise<Categories>;
  save(category: Categories): Promise<Categories>;
  list(params?: IListAllParams): Promise<IListReturnData>;
  delete(id: string): Promise<void>;
}

export { ICategoriesRepository };
