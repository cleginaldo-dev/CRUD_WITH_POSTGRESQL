import { Request, Response } from "express";
import { container } from "tsyringe";

import { deleteFile } from "../../../../global/utils/deleteFile";
import { UpdateTeamUseCase } from "./UpdateTeamUseCase";

class UpdateTeamController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { team_id } = request.params;
    const { name } = request.body;
    const shield = request.file.filename;
    const updateTeamUseCase = container.resolve(UpdateTeamUseCase);

    if (shield) {
      await deleteFile(`./tmp/upload/${shield}`);
    }
    const updateTeam = await updateTeamUseCase.execute({
      name,
      shield,
      team_id,
    });
    return response.json(updateTeam);
  }
}
export { UpdateTeamController };
