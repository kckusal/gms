import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { sendResponse } from "../utils/response";

export const catchAsyncErrors =
  (
    func: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };

export const handleAsyncErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return sendResponse(res, 500, {
    success: false,
    error: {
      message: err?.message || "Something went wrong!",
      details: JSON.stringify(err),
    },
  });
};
