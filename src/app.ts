import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import "./database";
import "./global/shared/container";

import { AppError } from "./global/errors/AppError";
import { categories } from "./routes/categories.routes";
import { championshipRoutes } from "./routes/championships.routes";
import { teamRoutes } from "./routes/teams.routes";
import { usersRoutes } from "./routes/users.routes";
import { videos } from "./routes/videos.routes";

const app = express();

app.use(express.json());

app.use("/categories", categories);
app.use("/videos", videos);
app.use("/users", usersRoutes);
app.use("/teams", teamRoutes);
app.use("/championships", championshipRoutes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ error: err.message });
    }

    return response.status(500).json({ error: err.message });
  }
);

export { app };
