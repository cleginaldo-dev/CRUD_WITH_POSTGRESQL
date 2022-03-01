import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../global/errors/AppError";
import { ICreateChampionshipDTO } from "../../dtos/ICreateChampionshipDTO";
import { Championship } from "../../entities/Championship";
import { IChampionshipsRepository } from "../../repositories/IChampionshipsRepository";

@injectable()
class CreateChampionshipUseCase {
  constructor(
    @inject("ChampionshipsRepository")
    private championshipsReposirory: IChampionshipsRepository
  ) {}

  async execute({ name }: ICreateChampionshipDTO): Promise<Championship> {
    const championshipExist = await this.championshipsReposirory.findByName(
      name
    );

    if (championshipExist) {
      throw new AppError("Um campeonato com esse nome já existe");
    }

    const championship = await this.championshipsReposirory.create({ name });
    return championship;
  }
}
export { CreateChampionshipUseCase };
