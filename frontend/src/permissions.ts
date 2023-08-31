import { SecurityRole } from "./types";

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
  ADMIN: {
    user: ["create", "read", "update", "delete"],
    training_session: ["create", "read", "update", "delete"],
    training_session_attendance: ["create", "read", "update", "delete"],
    trainer_review: ["create", "read", "update", "delete"],
  },

  TRAINER: {
    user: ["read"],
    training_session: ["create", "read", "update"],
    training_session_attendance: ["create", "read", "update", "delete"],
    trainer_review: ["read"],
  },

  MEMBER: {
    user: ["read", "update", "delete"],
    training_session: ["read"],
    training_session_attendance: ["read"],
    trainer_review: ["create", "read", "update"],
  },
};

export const getUserPermissionByRole = ({
  resource,
  role,
}: {
  resource: ResourceName;
  role?: SecurityRole;
}) => {
  if (!role) return [];
  return PERMISSIONS_MAP[role][resource];
};
