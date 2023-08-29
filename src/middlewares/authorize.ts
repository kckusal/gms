import { SecurityRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/response";

type AccessType = "create" | "read" | "update" | "delete";

type ResourceName =
  | "user"
  | "training_session"
  | "training_session_attendance"
  | "trainer_review";

const PERMISSIONS_MAP: Record<
  SecurityRole,
  Record<ResourceName, Array<AccessType>>
> = {
  [SecurityRole.ADMIN]: {
    user: ["create", "read", "update", "delete"],
    training_session: ["create", "read", "update", "delete"],
    training_session_attendance: ["create", "read", "update", "delete"],
    trainer_review: ["create", "read", "update", "delete"],
  },

  [SecurityRole.TRAINER]: {
    user: ["read"],
    training_session: ["create", "read", "update"],
    training_session_attendance: ["create", "read", "update", "delete"],
    trainer_review: ["read"],
  },

  [SecurityRole.MEMBER]: {
    user: ["read", "update", "delete"],
    training_session: ["read"],
    training_session_attendance: ["read"],
    trainer_review: ["create", "read", "update"],
  },
};

export const authorizeReq =
  ({
    resource,
    requiredAccess,
  }: { resource: ResourceName; requiredAccess: AccessType }) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.id) {
      return sendResponse(res, 401, {
        error: { message: "Request is not authenticated!" },
      });
    }

    const resourcePermissionsByRole = PERMISSIONS_MAP[req.user.role];
    const requestorHasAccess =
      resourcePermissionsByRole[resource].includes(requiredAccess);

    if (!requestorHasAccess) {
      return sendResponse(res, 403, {
        error: {
          message:
            "Forbidden: requestor is not authorized to access this resource.",
        },
      });
    }

    return next();
  };
