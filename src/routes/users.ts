import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

//* Fetches all users
router.get("/", async (req, res) => {
  const users = await prisma.userAccount.findMany();

  res.json({
    success: true,
    data: users,
  });
});

//* Fetches a specific user by its ID.
router.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  const user = await prisma.userAccount.findFirst({
    where: { id: Number(id) },
  });

  res.json({
    success: true,
    data: user,
  });
});

//* Creates a new user
router.post(`/`, async (req, res) => {
  const result = await prisma.userAccount.create({
    data: { ...req.body },
  });

  res.json({
    success: true,
    data: result,
  });
});

//* Updates user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.userAccount.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });

  res.json({
    success: true,
    data: user,
  });
});

//* Deletes a user by its ID.
router.delete(`/:id`, async (req, res) => {
  const { id } = req.params;
  const user = await prisma.userAccount.delete({
    where: { id: Number(id) },
  });

  res.json({
    success: true,
    data: user,
  });
});

export default router;
