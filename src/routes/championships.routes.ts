// import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import { CreateChampionshipController } from "../modules/championship/useCases/createChampionship/CreateChampionshipController";
import { ShowChampionshipController } from "../modules/championship/useCases/showChampionship/ShowChampionshipController";

const championshipRoutes = Router();

const createChampionshipController = new CreateChampionshipController();
const showChampionshipController = new ShowChampionshipController();

championshipRoutes.post("/", createChampionshipController.handle);
championshipRoutes.get("/:championship_id", showChampionshipController.handle);

export { championshipRoutes };
