import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IListAllParams {
  name?: string;
  initial_date?: Date;
  final_date?: Date;
}
export interface IListAllReturn {
  total: number;
  data: User[];
}

interface IUsersRepository {
  create({ name, phone, password }: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByPhone(phone: string): Promise<User>;
  save(user: User): Promise<User>;
  list(params?: IListAllParams): Promise<IListAllReturn>;
  delete(id: string): Promise<number> | undefined;
}
export { IUsersRepository };
