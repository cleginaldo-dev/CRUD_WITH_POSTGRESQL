import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../global/errors/AppError";
import { Championship } from "../../entities/Championship";
import { IChampionshipsRepository } from "../../repositories/IChampionshipsRepository";

@injectable()
class ShowChampionshipUseCase {
  constructor(
    @inject("ChampionshipsRepository")
    private championshipsRepository: IChampionshipsRepository
  ) {}
  async execute(championship_id: string): Promise<Championship> {
    const championshipExists = await this.championshipsRepository.findById(
      championship_id
    );
    if (!championshipExists) {
      throw new AppError("Campeonato não encontrado", 404);
    }
    return championshipExists;
  }
}
export { ShowChampionshipUseCase };
