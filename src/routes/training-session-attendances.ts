import express from "express";
import { authorizeReq } from "../middlewares/authorize";
import { catchAsyncErrors } from "../middlewares/errorHandling";
import * as tsaController from "../controllers/training-session-attendances";

const router = express.Router();

//* Fetches all training session attendance
router.get(
  "/",
  authorizeReq({
    resource: "training_session_attendance",
    requiredAccess: "read",
  }),
  catchAsyncErrors(tsaController.getAllTrainingSessionAttendances),
);

//* Fetches a specific training session attendance by its ID.
router.get(
  "/:id",
  authorizeReq({
    resource: "training_session_attendance",
    requiredAccess: "read",
  }),
  catchAsyncErrors(tsaController.getTrainingSessionAttendanceById),
);

//* Creates a new training session attendance
router.post(
  "/",
  authorizeReq({
    resource: "training_session_attendance",
    requiredAccess: "create",
  }),
  catchAsyncErrors(tsaController.createTrainingSessionAttendance),
);

//* Updates training session attendance
router.put(
  "/:id",
  authorizeReq({
    resource: "training_session_attendance",
    requiredAccess: "update",
  }),
  catchAsyncErrors(tsaController.updateTrainingSessionAttendance),
);

//* Deletes a training session attendance by its ID.
router.delete(
  "/:id",
  authorizeReq({
    resource: "training_session_attendance",
    requiredAccess: "delete",
  }),
  catchAsyncErrors(tsaController.deleteTrainingSessionAttendance),
);

export default router;
