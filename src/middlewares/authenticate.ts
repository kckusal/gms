import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";

const extractBearerToken = (req: Request): string | null => {
  const authHeader = req.get("Authorization");

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return null;
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = extractBearerToken(req);

  if (!token) {
    return sendResponse(res, 401, {
      error: { message: "The request is not authenticated." },
    });
  }

  try {
    const { user } = jwt.verify(token, JWT_SECRET_KEY) as {
      user: Request["user"];
    };

    req.user = user;

    return next();
  } catch (err) {
    return sendResponse(res, 401, {
      success: false,
      error: {
        message: "Authenticated failed!",
        details: JSON.stringify(err),
      },
    });
  }
};
