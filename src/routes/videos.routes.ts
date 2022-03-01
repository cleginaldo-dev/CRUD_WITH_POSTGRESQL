import { Router } from "express";

import { CreateVideoController } from "../modules/video/useCases/createVideo/CreateVideoController";
import { ListVideosController } from "../modules/video/useCases/listVideos/ListVideosController";

const videos = Router();

const createVideoController = new CreateVideoController();
const listVideosController = new ListVideosController();

videos.post("/", createVideoController.handle);

videos.get("/", listVideosController.handle);
export { videos };
