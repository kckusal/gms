import express from "express";
import zod from "zod";

import { SecurityRole } from "@prisma/client";
import { validateReqWithZodSchema } from "../middlewares/validateReqWithZodSchema";
import { catchAsyncErrors } from "../middlewares/errorHandling";

import * as authController from "../controllers/auth";

const router = express.Router();

const loginRequestSchema = zod.object({
  body: zod.object({
    email: zod.string().email(),
    password: zod.string(),
  }),
});

router.post(
  "/signin",
  validateReqWithZodSchema(loginRequestSchema),
  catchAsyncErrors(authController.signin),
);

const registerRequestSchema = zod.object({
  body: zod.object({
    first_name: zod.string(),
    last_name: zod.string().optional(),
    email: zod.string().email(),
    password: zod.string().min(8),
    role: zod.nativeEnum(SecurityRole),
  }),
});

router.post(
  "/register",
  validateReqWithZodSchema(registerRequestSchema),
  catchAsyncErrors(authController.register),
);

export default router;
