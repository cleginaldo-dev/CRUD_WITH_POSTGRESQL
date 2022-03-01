import { container } from "tsyringe";

import { ICategoriesRepository } from "../../../modules/category/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../../modules/category/repositories/implementations/CategoriesRepository";
import { IChampionshipsRepository } from "../../../modules/championship/repositories/IChampionshipsRepository";
import { ChampionshipsRepository } from "../../../modules/championship/repositories/implementations/ChampionshipsRepository";
import { TeamsRepository } from "../../../modules/team/repositories/implementations/TeamsRepository";
import { ITeamsRepository } from "../../../modules/team/repositories/ITeamsRepository";
import { UsersRepository } from "../../../modules/user/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../../modules/user/repositories/IUsersRepository";
import { VideosRepository } from "../../../modules/video/repositories/implementations/VideosRepository";
import { IVideosRepository } from "../../../modules/video/repositories/IVideosRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IVideosRepository>(
  "VideosRepository",
  VideosRepository
);

container.registerSingleton<ITeamsRepository>(
  "TeamsRepository",
  TeamsRepository
);

container.registerSingleton<IChampionshipsRepository>(
  "ChampionshipsRepository",
  ChampionshipsRepository
);
