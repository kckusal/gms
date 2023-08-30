import bcrypt from "bcryptjs";
import express, { Request } from "express";
import jwt from "jsonwebtoken";
import zod from "zod";

import prisma from "../lib/prisma";
import { SecurityRole, UserAccountRequestStatus } from "@prisma/client";
import { validateReqWithZodSchema } from "../middlewares/validateReqWithZodSchema";
import { sendResponse } from "../utils/response";
import HttpStatusCode from "../utils/httpStatusCodes";

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
  async (req, res) => {
    console.log(req.route);
    // Get user input
    const { email, password } = req.body;

    // Validate if user exist in our database
    const user = await prisma.userAccount.findFirst({
      where: { email, account_request_status: "CONFIRMED" },
    });

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const authUser: Request["user"] = {
        id: user.id,
        first_name: user.first_name,
        email: user.email,
        role: user.role,
        account_request_status: user.account_request_status,
      };

      // Create token
      const jwtToken = jwt.sign(
        {
          user: authUser,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "4h",
        },
      );

      return sendResponse(res, HttpStatusCode.OK, {
        success: true,
        data: { jwt: jwtToken, user: authUser },
      });
    }

    sendResponse(res, HttpStatusCode.BAD_REQUEST, {
      error: { message: "Credentials did not match any user!" },
    });
  },
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
  async (req, res) => {
    try {
      // Get user input validated with zod schema
      const { first_name, last_name, email, password } = req.body;

      // check if user already exists
      // Validate if user exists in our database
      const existingUser = await prisma.userAccount.findFirst({
        where: {
          email,
        },
      });

      if (existingUser) {
        return sendResponse(res, HttpStatusCode.CONFLICT, {
          error: {
            message: "User already exists with this email! Please login.",
          },
        });
      }

      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(
        password,
        process.env.PASSWORD_HASH_SALT as string,
      );

      // If this is our very first user, we want it to have the ADMIN role with CONFIRMED status
      const isFirstUser = (await prisma.userAccount.findFirst()) === null;
      const account_request_status = isFirstUser
        ? UserAccountRequestStatus.CONFIRMED
        : UserAccountRequestStatus.REQUESTED;
      const role = isFirstUser ? SecurityRole.ADMIN : req.body.role;

      // Create user in our database
      const data = await prisma.userAccount.create({
        data: {
          first_name,
          last_name: last_name ?? "",
          email: email.toLowerCase(),
          password_hash: encryptedPassword,
          account_request_status,
          role,
        },
      });

      return sendResponse(res, HttpStatusCode.OK, { success: true, data });
    } catch (err) {
      console.log(err);
      return sendResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, {
        error: {
          message: "Something went wrong while attempting to register user.",
          details: JSON.stringify(err),
        },
      });
    }
  },
);

export default router;
