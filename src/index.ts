import dotenv from "dotenv";
import express from "express";

import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import trainerReviewsRouter from "./routes/trainer-reviews";
import trainingSessionAttendancesRouter from "./routes/training-session-attendances";
import trainingSessionsRouter from "./routes/training-sessions";
import { requireAuth } from "./middlewares/authenticate";
import { UserAccount } from "@prisma/client";
import { sendResponse } from "./utils/response";
import HttpStatusCode from "./utils/httpStatusCodes";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: Pick<
        UserAccount,
        "id" | "first_name" | "email" | "role" | "account_request_status"
      > | null;
    }
  }
}

const app = express();
app.use(express.json());

// PUBLIC endpoints:
app.use("/auth", authRouter);

app.use(requireAuth);
// PRIVATE endpoints requiring authentication:
app.use("/users", usersRouter);
app.use("/trainer-reviews", trainerReviewsRouter);
app.use("/training-session-attendances", trainingSessionAttendancesRouter);
app.use("/training-sessions", trainingSessionsRouter);

app.use((req, res, next) => {
  return sendResponse(res, HttpStatusCode.NOT_FOUND, {
    error: { message: `Endpoint not found for path: ${req.path}` },
  });
});

app.listen(3000, () => {
  console.log("REST API server ready at: http://localhost:3000");
});
