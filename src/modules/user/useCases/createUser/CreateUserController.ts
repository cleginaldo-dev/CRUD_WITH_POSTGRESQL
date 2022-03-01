import { hash } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone, password, balance } = request.body;
    const passwordHash = await hash(password, 8);
    const createUserUserCase = container.resolve(CreateUserUseCase);
    const createdUser = await createUserUserCase.execute({
      name,
      phone,
      password: passwordHash,
      balance,
    });
    return response.status(201).json(instanceToPlain(createdUser));
  }
}
export { CreateUserController };
