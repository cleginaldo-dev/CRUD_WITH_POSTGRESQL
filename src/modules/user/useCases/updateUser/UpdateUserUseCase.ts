import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../global/errors/AppError";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export interface IRequest {
  user_id: string;
  logged_user_id: string;
  name: string;
  phone: string;
  balance: number;
  password: string;
  isAdmin: boolean;
}
@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    user_id,
    logged_user_id,
    name,
    phone,
    balance,
    password,
    isAdmin,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Usuário não existe!");
    }

    const phoneExists = await this.usersRepository.findByPhone(phone);

    if (phoneExists && user.phone !== phoneExists.phone) {
      throw new AppError("O Telefone já existe no bando de dados!");
    }

    const loggedUser = await this.usersRepository.findById(logged_user_id);

    if (!user.isAdmin && isAdmin && !loggedUser.isAdmin) {
      throw new AppError(
        "O usuário logado não tem permissão para tornar o usuário editado em administrador!"
      );
    }

    Object.assign(user, {
      name: name || user.name,
      phone: phone || user.phone,
      password: password || user.password,
      balance: balance || user.balance,
      updated_at: new Date(),
      isAdmin: isAdmin === false || isAdmin === true ? isAdmin : user.isAdmin,
    });

    const userUpdate = await this.usersRepository.save(user);
    return userUpdate;
  }
}

export { UpdateUserUseCase };
