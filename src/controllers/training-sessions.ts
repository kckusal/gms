import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { sendResponse } from "../utils/response";

//* Fetches all training sessions
export const getAllTrainingSessions = async (req: Request, res: Response) => {
  const data = await prisma.trainingSession.findMany();

  return sendResponse(res, 200, { success: true, data });
};

//* Fetches a specific training session by its ID.
export const getTrainingSessionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await prisma.trainingSession.findFirst({
    where: { id: Number(id) },
  });

  return sendResponse(res, 200, { success: true, data });
};

//* Creates a new training session
export const createTrainingSession = async (req: Request, res: Response) => {
  const data = await prisma.trainingSession.create({
    data: { ...req.body },
  });

  return sendResponse(res, 200, { success: true, data });
};

//* Updates training session
export const updateTrainingSession = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await prisma.trainingSession.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });

  return sendResponse(res, 200, { success: true, data });
};

//* Deletes a training session by its ID.
export const deleteTrainingSession = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await prisma.trainingSession.delete({
    where: { id: Number(id) },
  });

  return sendResponse(res, 200, { success: true, data });
};
