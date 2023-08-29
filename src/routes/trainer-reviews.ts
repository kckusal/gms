import express from "express";
import prisma from "../lib/prisma";
import { authorizeReq } from "../middlewares/authorize";
import { sendResponse } from "../utils/response";

const router = express.Router();

//* Fetches all trainer reviews
router.get(
  "/",
  authorizeReq({ resource: "trainer_review", requiredAccess: "read" }),
  async (req, res) => {
    const data = await prisma.trainerReview.findMany();

    return sendResponse(res, 200, { success: true, data });
  },
);

//* Fetches a specific training review by its ID.
router.get(
  "/:id",
  authorizeReq({ resource: "trainer_review", requiredAccess: "read" }),
  async (req, res) => {
    const { id } = req.params;
    const data = await prisma.trainerReview.findFirst({
      where: { id: Number(id) },
    });

    return sendResponse(res, 200, { success: true, data });
  },
);

//* Creates a new trainer review
router.post(
  "/",
  authorizeReq({ resource: "trainer_review", requiredAccess: "create" }),
  async (req, res) => {
    const data = await prisma.trainerReview.create({
      data: { ...req.body },
    });

    return sendResponse(res, 200, { success: true, data });
  },
);

//* Updates trainer review
router.put(
  "/:id",
  authorizeReq({ resource: "trainer_review", requiredAccess: "update" }),
  async (req, res) => {
    const { id } = req.params;
    const data = await prisma.trainerReview.update({
      where: { id: Number(id) },
      data: { ...req.body },
    });

    return sendResponse(res, 200, { success: true, data });
  },
);

//* Deletes a trainer review by its ID.
router.delete(
  "/:id",
  authorizeReq({ resource: "trainer_review", requiredAccess: "delete" }),
  async (req, res) => {
    const { id } = req.params;
    const data = await prisma.trainerReview.delete({
      where: { id: Number(id) },
    });

    return sendResponse(res, 200, { success: true, data });
  },
);

export default router;
