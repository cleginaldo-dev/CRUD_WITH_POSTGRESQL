import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { UsersRepository } from "../../modules/user/repositories/implementations/UsersRepository";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> {
  const { logged_user_id } = request;
  const usersRepository = container.resolve(UsersRepository);
  const { isAdmin } = await usersRepository.findById(logged_user_id);

  if (isAdmin) {
    return next();
  }
  return response.status(401).json({
    error: "O usuário logado não tem permissão de administrador!",
  });
}
