import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import { ensureAdmin } from "../global/middlewares/ensureAdmin";
import { ensureAuthenticated } from "../global/middlewares/ensureAuthenticated";
import { AuthUserController } from "../modules/user/useCases/authUser/AuthUserControler";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../modules/user/useCases/deleteUser/DeleteUserController";
import { ListAllUsersController } from "../modules/user/useCases/listAllUsers/ListAllUsersController";
import { ShowUserProfileController } from "../modules/user/useCases/showUserProfile/ShowUserProfileController";
import { TurnUserAdminController } from "../modules/user/useCases/turnUserAdmin/TurnUserAdminController";
import { UpdateUserController } from "../modules/user/useCases/updateUser/UpdateUserController";

const usersRoutes = Router();

const authUserController = new AuthUserController();
const createUserController = new CreateUserController();
const turnUserAdminController = new TurnUserAdminController();
const listAllUsersController = new ListAllUsersController();
const showUserProfileController = new ShowUserProfileController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post("/login", authUserController.handle);

usersRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
      balance: Joi.number(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref("password")),
    },
  }),
  createUserController.handle
);

usersRoutes.patch(
  "/admin/:user_id",
  ensureAuthenticated,
  ensureAdmin,
  turnUserAdminController.handle
);

usersRoutes.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  listAllUsersController.handle
);
usersRoutes.get(
  "/:user_id",
  ensureAuthenticated,
  showUserProfileController.handle
);

usersRoutes.put("/:user_id", ensureAuthenticated, updateUserController.handle);

usersRoutes.delete(
  "/:user_id",
  ensureAuthenticated,
  ensureAdmin,
  deleteUserController.handle
);

export { usersRoutes };
