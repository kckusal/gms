import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import { sendResponse } from "../utils/response";
import HttpStatusCode from "../utils/httpStatusCodes";
import { UserAccount } from "@prisma/client";

const router = express.Router();

//* Get my profile data
router.get("/profile", async (req, res) => {
  const data = await prisma.userAccount.findFirst({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      account_request_status: true,
      role: true,

      participant_of: true,
      trainer_for: true,
    },
    where: { id: Number(req.user?.id) },
  });

  return sendResponse(res, 200, { success: true, data: data });
});

router.put("/profile", async (req, res) => {
  const { password, email, ...restInput } = req.body;

  // check if user already exists
  // Validate if user exists in our database
  const existingUser = await prisma.userAccount.findFirst({
    where: {
      email,
      id: {
        not: req.user?.id,
      },
    },
  });

  if (existingUser) {
    return sendResponse(res, HttpStatusCode.CONFLICT, {
      error: {
        message: "User already exists with this email!",
      },
    });
  }

  const updates: Partial<UserAccount> = { ...restInput, email };

  if (password) {
    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(
      password,
      process.env.PASSWORD_HASH_SALT as string,
    );

    updates.password_hash = encryptedPassword;
  }

  const result = await prisma.userAccount.update({
    data: updates,
    where: { id: req.user?.id },
  });

  return sendResponse(res, 200, { success: true, data: result });
});

export default router;
