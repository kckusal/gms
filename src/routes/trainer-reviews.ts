import express from "express";
import { authorizeReq } from "../middlewares/authorize";
import * as trainerReviewsController from "../controllers/trainer-reviews";
import { catchAsyncErrors } from "../middlewares/errorHandling";

const router = express.Router();

//* Fetches all trainer reviews
router.get(
  "/",
  authorizeReq({ resource: "trainer_review", requiredAccess: "read" }),
  catchAsyncErrors(trainerReviewsController.getAllTrainerReviews),
);

//* Fetches a specific training review by its ID.
router.get(
  "/:id",
  authorizeReq({ resource: "trainer_review", requiredAccess: "read" }),
  catchAsyncErrors(trainerReviewsController.getTrainerReviewById),
);

//* Creates a new trainer review
router.post(
  "/",
  authorizeReq({ resource: "trainer_review", requiredAccess: "create" }),
  catchAsyncErrors(trainerReviewsController.createTrainerReview),
);

//* Updates trainer review
router.put(
  "/:id",
  authorizeReq({ resource: "trainer_review", requiredAccess: "update" }),
  catchAsyncErrors(trainerReviewsController.updateTrainerReview),
);

//* Deletes a trainer review by its ID.
router.delete(
  "/:id",
  authorizeReq({ resource: "trainer_review", requiredAccess: "delete" }),
  catchAsyncErrors(trainerReviewsController.deleteTrainerReview),
);

export default router;
