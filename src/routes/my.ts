import express from "express";
import prisma from "../lib/prisma";
import { sendResponse } from "../utils/response";

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

export default router;
