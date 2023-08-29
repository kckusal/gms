import express from "express";
import prisma from "../lib/prisma";
import { authorizeReq } from "../middlewares/authorize";
import { sendResponse } from "../utils/response";

const router = express.Router();

//* Fetches all training session attendance
router.get(
  "/",
  authorizeReq({
    resource: "training_session_attendance",
    requiredAccess: "read",
  }),
  async (req, res) => {
    const data = await prisma.trainingSessionAttendance.findMany();

    return sendResponse(res, 200, { success: true, data });
  },
);

//* Fetches a specific training session attendance by its ID.
router.get(
  "/:id",
  authorizeReq({
    resource: "training_session_attendance",
    requiredAccess: "read",
  }),
  async (req, res) => {
    const { id } = req.params;
    const data = await prisma.trainingSessionAttendance.findFirst({
      where: { id: Number(id) },
    });

    return sendResponse(res, 200, { success: true, data });
  },
);

//* Creates a new training session attendance
router.post(
  "/",
  authorizeReq({
    resource: "training_session_attendance",
    requiredAccess: "create",
  }),
  async (req, res) => {
    const data = await prisma.trainingSessionAttendance.create({
      data: { ...req.body },
    });

    return sendResponse(res, 200, { success: true, data });
  },
);

//* Updates training session attendance
router.put(
  "/:id",
  authorizeReq({
    resource: "training_session_attendance",
    requiredAccess: "update",
  }),
  async (req, res) => {
    const { id } = req.params;
    const data = await prisma.trainingSessionAttendance.update({
      where: { id: Number(id) },
      data: { ...req.body },
    });

    return sendResponse(res, 200, { success: true, data });
  },
);

//* Deletes a training session attendance by its ID.
router.delete(
  "/:id",
  authorizeReq({
    resource: "training_session_attendance",
    requiredAccess: "delete",
  }),
  async (req, res) => {
    const { id } = req.params;
    const data = await prisma.trainingSessionAttendance.delete({
      where: { id: Number(id) },
    });

    return sendResponse(res, 200, { success: true, data });
  },
);

export default router;
