import express from "express";
import prisma from "../lib/prisma";
import { authorizeReq } from "../middlewares/authorize";
import { sendResponse } from "../utils/response";

const router = express.Router();

//* Fetches all training sessions
router.get(
  "/",
  authorizeReq({ resource: "training_session", requiredAccess: "read" }),
  async (req, res) => {
    const data = await prisma.trainingSession.findMany();

    return sendResponse(res, 200, { success: true, data });
  },
);

//* Fetches a specific training session by its ID.
router.get(
  "/:id",
  authorizeReq({ resource: "training_session", requiredAccess: "read" }),
  async (req, res) => {
    const { id } = req.params;
    const data = await prisma.trainingSession.findFirst({
      where: { id: Number(id) },
    });

    return sendResponse(res, 200, { success: true, data });
  },
);

//* Creates a new training session
router.post(
  "/",
  authorizeReq({ resource: "training_session", requiredAccess: "create" }),
  async (req, res) => {
    const data = await prisma.trainingSession.create({
      data: { ...req.body },
    });

    return sendResponse(res, 200, { success: true, data });
  },
);

//* Updates training session
router.put(
  "/:id",
  authorizeReq({ resource: "training_session", requiredAccess: "update" }),
  async (req, res) => {
    const { id } = req.params;
    const data = await prisma.trainingSession.update({
      where: { id: Number(id) },
      data: { ...req.body },
    });

    return sendResponse(res, 200, { success: true, data });
  },
);

//* Deletes a training session by its ID.
router.delete(
  "/:id",
  authorizeReq({ resource: "training_session", requiredAccess: "delete" }),
  async (req, res) => {
    const { id } = req.params;
    const data = await prisma.trainingSession.delete({
      where: { id: Number(id) },
    });

    return sendResponse(res, 200, { success: true, data });
  },
);

export default router;
