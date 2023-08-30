import { FC, ReactNode, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const RequireAuth: FC<{ children: ReactNode }> = ({ children }) => {
  const authData = useContext(AuthContext);

  if (
    authData.status !== "fetched" ||
    !authData.data?.user ||
    !authData.data?.jwtToken
  ) {
    return null;
  }

  return children;
};
