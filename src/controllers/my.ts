import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import { sendResponse } from "../utils/response";
import HttpStatusCode from "../utils/httpStatusCodes";
import { UserAccount } from "@prisma/client";

//* Get my profile data
export const getMyProfile = async (req: Request, res: Response) => {
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
};

export const updateMyProfile = async (req: Request, res: Response) => {
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
};

export const getMyBookedSessions = async (req: Request, res: Response) => {
  const data = await prisma.trainingSessionAttendance.findFirst({
    select: {
      id: true,
      attended: true,
      training_session: {
        select: {
          id: true,
          start_date: true,
          start_HHmm: true,
          end_date: true,
          end_HHmm: true,
          trainer_id: true,
        },
      },
    },

    where: { participant_id: Number(req.user?.id) },
  });

  return sendResponse(res, 200, { success: true, data });
};

export const createMyBooking = async (req: Request, res: Response) => {
  const data = await prisma.trainingSessionAttendance.create({
    data: {
      training_session_id: req.body.training_session_id,
      // rome-ignore lint/style/noNonNullAssertion: <explanation>
      participant_id: req.user?.id!,
      attended: false,
      note: "",
    },
  });

  return sendResponse(res, 200, { success: true, data });
};
