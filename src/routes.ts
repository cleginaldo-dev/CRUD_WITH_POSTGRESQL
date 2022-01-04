import { Router } from "express";

import { createCategoryController } from "./modules/category/useCases";

const router = Router();

router.post("/categories", (request, response) =>
  createCategoryController.handle(request, response)
);

export { router };
