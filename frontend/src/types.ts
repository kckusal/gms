export type SecurityRole = "ADMIN" | "TRAINER" | "MEMBER";
type AccountRequestStatus = "REQUESTED" | "CONFIRMED" | "DENIED";

export type AuthData = {
  jwtToken: string | null;
  user: null | {
    id: number;
    first_name: string;
    email: string;
    role: SecurityRole;
    account_request_status: AccountRequestStatus;
  };
};

export interface User {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  account_request_status: AccountRequestStatus;
  role: SecurityRole;
}

interface TrainingSessionAttendace {
  id: number;
  attended: boolean;
  note: string;
  participant_id: number;
  training_session_id: number;
}

export interface TrainingSession {
  id: number;
  start_date: string;
  start_HHmm: string;
  end_date: string;
  end_HHmm: string;
  trainer_id: number;
  attendance: TrainingSessionAttendace[];
}
