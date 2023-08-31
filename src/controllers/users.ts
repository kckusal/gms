import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import { sendResponse } from "../utils/response";
import HttpStatusCode from "../utils/httpStatusCodes";

//* Fetches all users
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.userAccount.findMany();
  return sendResponse(res, 200, { success: true, data: users });
};

//* Fetches a specific user by its ID.
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.userAccount.findFirst({
    where: { id: Number(id) },
  });

  return sendResponse(res, 200, { success: true, data: user });
};

//* Creates a new user
export const createUser = async (req: Request, res: Response) => {
  // Get user input validated with zod schema
  const { password, email, ...restInput } = req.body;

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
        message: "User already exists with this email!",
      },
    });
  }

  //Encrypt user password
  const encryptedPassword = await bcrypt.hash(
    password,
    process.env.PASSWORD_HASH_SALT as string,
  );

  const result = await prisma.userAccount.create({
    data: { password_hash: encryptedPassword, email, ...restInput },
  });

  return sendResponse(res, 200, { success: true, data: result });
};

//* Updates user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.userAccount.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });

  return sendResponse(res, 200, { success: true, data: user });
};

//* Deletes a user by its ID.
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.userAccount.delete({
    where: { id: Number(id) },
  });

  return sendResponse(res, 200, { success: true, data: user });
};
