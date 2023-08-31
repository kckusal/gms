import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { sendResponse } from "../utils/response";

//* Fetches all training session attendance
export const getAllTrainingSessionAttendances = async (
  req: Request,
  res: Response,
) => {
  const data = await prisma.trainingSessionAttendance.findMany();

  return sendResponse(res, 200, { success: true, data });
};

//* Fetches a specific training session attendance by its ID.
export const getTrainingSessionAttendanceById = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const data = await prisma.trainingSessionAttendance.findFirst({
    where: { id: Number(id) },
  });

  return sendResponse(res, 200, { success: true, data });
};

//* Creates a new training session attendance
export const createTrainingSessionAttendance = async (
  req: Request,
  res: Response,
) => {
  const data = await prisma.trainingSessionAttendance.create({
    data: { ...req.body },
  });

  return sendResponse(res, 200, { success: true, data });
};

//* Updates training session attendance
export const updateTrainingSessionAttendance = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const data = await prisma.trainingSessionAttendance.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });

  return sendResponse(res, 200, { success: true, data });
};

//* Deletes a training session attendance by its ID.
export const deleteTrainingSessionAttendance = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const data = await prisma.trainingSessionAttendance.delete({
    where: { id: Number(id) },
  });

  return sendResponse(res, 200, { success: true, data });
};
