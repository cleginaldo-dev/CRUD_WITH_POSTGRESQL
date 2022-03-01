import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../global/errors/AppError";
import { ITeamsRepository } from "../../repositories/ITeamsRepository";

interface IRequest {
  team_id: string;
  name: string;
  shield: string;
}

@injectable()
class UpdateTeamUseCase {
  constructor(
    @inject("TeamsRepository") private teamsRepository: ITeamsRepository
  ) {}

  async execute({ team_id, name, shield }: IRequest) {
    const teamExist = await this.teamsRepository.findById(team_id);
    if (!teamExist) {
      throw new AppError("Time não encontrado!", 404);
    }

    Object.assign(teamExist, {
      name: name || teamExist.name,
      shield: shield || teamExist.shield,
    });
    const updateTeam = await this.teamsRepository.save(teamExist);
    return updateTeam;
  }
}
export { UpdateTeamUseCase };
