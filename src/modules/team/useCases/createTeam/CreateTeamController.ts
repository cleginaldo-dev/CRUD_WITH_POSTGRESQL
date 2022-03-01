import { Request, Response } from "express";
import { container } from "tsyringe";

import { deleteFile } from "../../../../global/utils/deleteFile";
import { CreateTeamUseCase } from "./CreateTeamUseCase";

class CreateTeamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, championship_id } = request.body;
    const shield = request.file.filename;
    const createTeamUseCase = container.resolve(CreateTeamUseCase);

    if (shield) {
      await deleteFile(`./tmp/upload/${shield}`);
    }

    const createTeam = await createTeamUseCase.execute({
      name,
      championship_id,
      shield,
    });

    return response.status(201).json(createTeam);
  }
}
export { CreateTeamController };
