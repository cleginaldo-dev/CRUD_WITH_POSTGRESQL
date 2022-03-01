import { ICreateChampionshipDTO } from "../dtos/ICreateChampionshipDTO";
import { Championship } from "../entities/Championship";

interface IChampionshipsRepository {
  create({ name }: ICreateChampionshipDTO): Promise<Championship>;
  findByName(name: string): Promise<Championship>;
  findById(id: string): Promise<Championship>;
  findAll(): Promise<Championship[]>;
}
export { IChampionshipsRepository };
