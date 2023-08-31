import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { sendResponse } from "../utils/response";
import HttpStatusCode from "../utils/httpStatusCodes";

export const validateReqWithZodSchema =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return sendResponse(res, HttpStatusCode.BAD_REQUEST, {
        error: {
          message: "Input validation failed!",
          details: JSON.stringify(error),
        },
      });
    }
  };
