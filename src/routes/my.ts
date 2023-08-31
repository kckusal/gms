import express from "express";
import * as myController from "../controllers/my";
import { catchAsyncErrors } from "../middlewares/errorHandling";

const router = express.Router();

//* Get my profile data
router.get("/profile", catchAsyncErrors(myController.getMyProfile));

router.put("/profile", catchAsyncErrors(myController.updateMyProfile));

router.get(
  "/booked-sessions",
  catchAsyncErrors(myController.getMyBookedSessions),
);
router.post(
  "/booked-sessions",
  catchAsyncErrors(myController.createMyBooking),
);


export default router;
