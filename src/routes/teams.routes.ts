// import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { CreateTeamController } from "../modules/team/useCases/createTeam/CreateTeamController";
import { ListTeamsController } from "../modules/team/useCases/listTeams/ListTeamsController";
import { UpdateTeamController } from "../modules/team/useCases/updateTeam/UpdateTeamController";

const teamRoutes = Router();

const uploadFile = multer(uploadConfig.upload("./tmp/upload"));

const createTeamController = new CreateTeamController();
const listTeamsController = new ListTeamsController();
const updateTeamController = new UpdateTeamController();

teamRoutes.post("/", uploadFile.single("upload"), createTeamController.handle);
teamRoutes.get("/", listTeamsController.handle);
teamRoutes.put(
  "/:team_id",
  uploadFile.single("upload"),
  updateTeamController.handle
);

export { teamRoutes };
