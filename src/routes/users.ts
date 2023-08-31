import express from "express";
import { authorizeReq } from "../middlewares/authorize";

import * as usersController from "../controllers/users";
import { catchAsyncErrors } from "../middlewares/errorHandling";

const router = express.Router();

//* Fetches all users
router.get(
  "/",
  authorizeReq({ resource: "user", requiredAccess: "read" }),
  catchAsyncErrors(usersController.getAllUsers),
);

//* Fetches a specific user by its ID.
router.get(
  "/:id",
  authorizeReq({ resource: "user", requiredAccess: "read" }),
  catchAsyncErrors(usersController.getUserById),
);

//* Creates a new user
router.post(
  "/",
  authorizeReq({ resource: "user", requiredAccess: "create" }),
  catchAsyncErrors(usersController.createUser),
);

//* Updates user
router.put(
  "/:id",
  authorizeReq({ resource: "user", requiredAccess: "update" }),
  catchAsyncErrors(usersController.updateUser),
);

//* Deletes a user by its ID.
router.delete(
  "/:id",
  authorizeReq({ resource: "user", requiredAccess: "delete" }),
  catchAsyncErrors(usersController.deleteUser),
);

export default router;
