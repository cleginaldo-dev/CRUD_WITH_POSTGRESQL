import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";

import { AppError } from "./errors/AppError";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ error: err.message });
    }

    return response.status(500).json({ error: err.message });
  }
);

app.listen(3333, () => console.log("server is running on port 3333!"));

export { app };
