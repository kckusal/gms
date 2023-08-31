import express from "express";
import { authorizeReq } from "../middlewares/authorize";
import * as tsController from "../controllers/training-sessions";
import { catchAsyncErrors } from "../middlewares/errorHandling";

const router = express.Router();

//* Fetches all training sessions
router.get(
  "/",
  authorizeReq({ resource: "training_session", requiredAccess: "read" }),
  catchAsyncErrors(tsController.getAllTrainingSessions),
);

//* Fetches a specific training session by its ID.
router.get(
  "/:id",
  authorizeReq({ resource: "training_session", requiredAccess: "read" }),
  catchAsyncErrors(tsController.getTrainingSessionById),
);

//* Creates a new training session
router.post(
  "/",
  authorizeReq({ resource: "training_session", requiredAccess: "create" }),
  catchAsyncErrors(tsController.createTrainingSession),
);

//* Updates training session
router.put(
  "/:id",
  authorizeReq({ resource: "training_session", requiredAccess: "update" }),
  catchAsyncErrors(tsController.updateTrainingSession),
);

//* Deletes a training session by its ID.
router.delete(
  "/:id",
  authorizeReq({ resource: "training_session", requiredAccess: "delete" }),
  catchAsyncErrors(tsController.deleteTrainingSession),
);

export default router;
