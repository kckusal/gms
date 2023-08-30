enum SecurityRole {
  ADMIN = "ADMIN",
  TRAINER = "TRAINER",
  MEMBER = "MEMBER",
}

export type AuthData = {
  jwtToken: string | null;
  user: null | {
    id: number;
    first_name: string;
    email: string;
    role: SecurityRole;
    account_request_status: "REQUESTED" | "CONFIRMED" | "DENIED";
  };
};
