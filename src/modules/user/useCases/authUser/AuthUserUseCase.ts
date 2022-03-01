import { compare } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../global/errors/AppError";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IAuthUserRequest {
  phone: string;
  password: string;
}
interface IResponse {
  token: string;
  user: User;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    phone,
    password,
  }: IAuthUserRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByPhone(phone);
    if (!user) {
      throw new AppError("Telefone ou senha incorretos");
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Telefone ou senha incorretos");
    }

    const token = sign(
      {
        phone: user.phone,
      },
      "6a204bd89f3c8348afd5c77c717a097a",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return instanceToPlain({ token, user }) as IResponse;
  }
}
export { AuthUserUseCase };
