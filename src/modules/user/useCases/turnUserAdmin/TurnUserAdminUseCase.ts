import { instanceToPlain } from "class-transformer";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../global/errors/AppError";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export interface IRequest {
  user_id: string;
}
@injectable()
class TurnUserAdminUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Usuário não existe!");
    }
    if (user.isAdmin) {
      throw new AppError("O usuário Já é um administrador!");
    }

    Object.assign(user, {
      isAdmin: true,
      updated_at: new Date(),
    });

    const userAdmin = await this.usersRepository.save(user);
    return instanceToPlain(userAdmin) as User;
  }
}
export { TurnUserAdminUseCase };
