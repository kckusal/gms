import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { sendResponse } from "../utils/response";

//* Fetches all trainer reviews
export const getAllTrainerReviews = async (req: Request, res: Response) => {
  const data = await prisma.trainerReview.findMany();

  return sendResponse(res, 200, { success: true, data });
};

//* Fetches a specific training review by its ID.
export const getTrainerReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await prisma.trainerReview.findFirst({
    where: { id: Number(id) },
  });

  return sendResponse(res, 200, { success: true, data });
};

//* Creates a new trainer review
export const createTrainerReview = async (req: Request, res: Response) => {
  const data = await prisma.trainerReview.create({
    data: { ...req.body },
  });

  return sendResponse(res, 200, { success: true, data });
};

//* Updates trainer review
export const updateTrainerReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await prisma.trainerReview.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });

  return sendResponse(res, 200, { success: true, data });
};

//* Deletes a trainer review by its ID.
export const deleteTrainerReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await prisma.trainerReview.delete({
    where: { id: Number(id) },
  });

  return sendResponse(res, 200, { success: true, data });
};
