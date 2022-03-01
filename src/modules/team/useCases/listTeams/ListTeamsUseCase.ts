import { inject, injectable } from "tsyringe";

import {
  ITeamsRepository,
  ITeamsResponse,
} from "../../repositories/ITeamsRepository";

@injectable()
class ListTeamsUseCase {
  constructor(
    @inject("TeamsRepository") private teamsRepository: ITeamsRepository
  ) {}
  async execute(name: string): Promise<ITeamsResponse> {
    const { total, data } = await this.teamsRepository.findAll(name);
    return { total, data };
  }
}
export { ListTeamsUseCase };
