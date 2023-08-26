import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

//* Fetches all training sessions
router.get("/", async (req, res) => {
  const result = await prisma.trainingSession.findMany();

  res.json({
    success: true,
    data: result,
  });
});

//* Fetches a specific training session by its ID.
router.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  const result = await prisma.trainingSession.findFirst({
    where: { id: Number(id) },
  });

  res.json({
    success: true,
    data: result,
  });
});

//* Creates a new training session
router.post(`/`, async (req, res) => {
  const result = await prisma.trainingSession.create({
    data: { ...req.body },
  });

  res.json({
    success: true,
    data: result,
  });
});

//* Updates training session
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await prisma.trainingSession.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });

  res.json({
    success: true,
    data: result,
  });
});

//* Deletes a training session by its ID.
router.delete(`/:id`, async (req, res) => {
  const { id } = req.params;
  const result = await prisma.trainingSession.delete({
    where: { id: Number(id) },
  });

  res.json({
    success: true,
    data: result,
  });
});

export default router;
