import { Response } from "express";
import HttpStatusCode from "./httpStatusCodes";

interface SendResponseOptions {
  success?: boolean;
  data?: unknown;
  error?: {
    message: string;
    details?: unknown;
  };
}

export const sendResponse = (
  res: Response,
  status: HttpStatusCode,
  options: SendResponseOptions = {},
) => {
  return res.status(status).json({
    success: options.success ?? false,
    data: options.data ?? null,
    error: options.error ?? null,
  });
};
