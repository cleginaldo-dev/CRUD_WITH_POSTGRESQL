import { Router } from "express";

import { CreateCategoryController } from "../modules/category/useCases/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "../modules/category/useCases/deleteCategory/DeleteCategoryController";
import { ListCategoriesController } from "../modules/category/useCases/listCategories/ListCategoriesController";
import { ShowCategoryContoller } from "../modules/category/useCases/showCategory/ShowCategoryContoller";
import { UpdateCategoryController } from "../modules/category/useCases/updateCategoy/UpdateCategoryController";

const categories = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const updateCategoryController = new UpdateCategoryController();
const showCategoryController = new ShowCategoryContoller();
const deleteCategoryController = new DeleteCategoryController();

categories.post("/", createCategoryController.handle);

categories.get("/", listCategoriesController.handle);

categories.put("/:category_id", updateCategoryController.handle);
categories.get("/:category_id", showCategoryController.handle);

categories.delete("/:category_id", deleteCategoryController.handle);

export { categories };
