import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../global/errors/AppError";
import { ICreateTeamDTO } from "../../dtos/ICreateTeamDTO";
import { Team } from "../../entities/Team";
import { ITeamsRepository } from "../../repositories/ITeamsRepository";

@injectable()
class CreateTeamUseCase {
  constructor(
    @inject("TeamsRepository")
    private teamsReposirory: ITeamsRepository
  ) {}

  async execute({
    name,
    championship_id,
    shield,
  }: ICreateTeamDTO): Promise<Team> {
    const teamExist = await this.teamsReposirory.findByName(name);

    if (teamExist) {
      throw new AppError("Nome já existe");
    }

    const team = await this.teamsReposirory.create({
      name,
      championship_id,
      shield,
    });
    return team;
  }
}
export { CreateTeamUseCase };
