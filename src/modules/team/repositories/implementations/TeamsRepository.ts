import { getRepository, Repository } from "typeorm";

import { ICreateTeamDTO } from "../../dtos/ICreateTeamDTO";
import { Team } from "../../entities/Team";
import { ITeamsRepository, ITeamsResponse } from "../ITeamsRepository";

class TeamsRepository implements ITeamsRepository {
  private ormRepository: Repository<Team>;

  constructor() {
    this.ormRepository = getRepository(Team);
  }

  async findById(id: string): Promise<Team> {
    const team = await this.ormRepository.findOne(id);
    return team;
  }

  async findByName(name: string): Promise<Team> {
    const team = await this.ormRepository.findOne({ name });
    return team;
  }

  async create({
    name,
    championship_id,
    shield,
  }: ICreateTeamDTO): Promise<Team> {
    const team = this.ormRepository.create({ name, championship_id, shield });

    await this.ormRepository.save(team);

    return team;
  }

  async save(data: Team): Promise<Team> {
    const team = await this.ormRepository.save(data);
    return team;
  }

  async findAll(name: string): Promise<ITeamsResponse> {
    const queryBuilder = await this.ormRepository
      .createQueryBuilder("teams")
      .orderBy("teams.name", "DESC");

    if (name) {
      queryBuilder.andWhere("teams.name ILIKE :name", {
        name: `%${name}%`,
      });
    }
    const total = await queryBuilder.getCount();
    const data = await queryBuilder.getMany();

    return { total, data };
  }
}
export { TeamsRepository };
