import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../global/errors/AppError";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  phone: string;
  balance: number;
  password: string;
}
@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ name, phone, password, balance }: IRequest): Promise<User> {
    const phoneExists = await this.userRepository.findByPhone(phone);
    if (phoneExists) {
      throw new AppError("Telefone já existe!");
    }
    const createdUser = await this.userRepository.create({
      name,
      phone,
      password,
      balance,
    });
    return createdUser;
  }
}
export { CreateUserUseCase };
