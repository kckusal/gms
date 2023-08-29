import express from "express";
import prisma from "../lib/prisma";
import { authorizeReq } from "../middlewares/authorize";
import { sendResponse } from "../utils/response";

const router = express.Router();

//* Fetches all users
router.get(
  "/",
  authorizeReq({ resource: "user", requiredAccess: "read" }),
  async (req, res) => {
    const users = await prisma.userAccount.findMany();

    return sendResponse(res, 200, { success: true, data: users });
  },
);

//* Fetches a specific user by its ID.
router.get(
  "/:id",
  authorizeReq({ resource: "user", requiredAccess: "read" }),
  async (req, res) => {
    const { id } = req.params;
    const user = await prisma.userAccount.findFirst({
      where: { id: Number(id) },
    });

    return sendResponse(res, 200, { success: true, data: user });
  },
);

//* Creates a new user
router.post(
  "/",
  authorizeReq({ resource: "user", requiredAccess: "create" }),
  async (req, res) => {
    const result = await prisma.userAccount.create({
      data: { ...req.body },
    });

    return sendResponse(res, 200, { success: true, data: result });
  },
);

//* Updates user
router.put(
  "/:id",
  authorizeReq({ resource: "user", requiredAccess: "update" }),
  async (req, res) => {
    const { id } = req.params;
    const user = await prisma.userAccount.update({
      where: { id: Number(id) },
      data: { ...req.body },
    });

    return sendResponse(res, 200, { success: true, data: user });
  },
);

//* Deletes a user by its ID.
router.delete(
  "/:id",
  authorizeReq({ resource: "user", requiredAccess: "delete" }),
  async (req, res) => {
    const { id } = req.params;
    const user = await prisma.userAccount.delete({
      where: { id: Number(id) },
    });

    return sendResponse(res, 200, { success: true, data: user });
  },
);

export default router;
