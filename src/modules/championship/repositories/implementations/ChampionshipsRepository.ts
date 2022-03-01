import { getRepository, Repository } from "typeorm";

import { ICreateChampionshipDTO } from "../../dtos/ICreateChampionshipDTO";
import { Championship } from "../../entities/Championship";
import { IChampionshipsRepository } from "../IChampionshipsRepository";

class ChampionshipsRepository implements IChampionshipsRepository {
  private ormRepository: Repository<Championship>;

  constructor() {
    this.ormRepository = getRepository(Championship);
  }
  async findByName(name: string): Promise<Championship> {
    const championship = await this.ormRepository.findOne({ name });
    return championship;
  }

  async findById(id: string): Promise<Championship> {
    const championship = await this.ormRepository.findOne(id, {
      relations: ["teams"],
    });
    return championship;
  }

  async create({ name }: ICreateChampionshipDTO): Promise<Championship> {
    const championship = this.ormRepository.create({ name });

    await this.ormRepository.save(championship);

    return championship;
  }
  async findAll(): Promise<Championship[]> {
    return this.ormRepository.find();
  }
}
export { ChampionshipsRepository };
