import { ICreateTeamDTO } from "../dtos/ICreateTeamDTO";
import { Team } from "../entities/Team";

export interface ITeamsResponse {
  total: number;
  data: Team[];
}

interface ITeamsRepository {
  create({ name, championship_id }: ICreateTeamDTO): Promise<Team>;
  save(data: Team): Promise<Team>;
  findByName(name: string): Promise<Team>;
  findById(id: string): Promise<Team>;
  findAll(name: string): Promise<ITeamsResponse>;
}
export { ITeamsRepository };
