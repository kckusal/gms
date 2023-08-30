import React, { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthData } from "../types";
import fetcher from "../utils/fetcher";

interface AuthContextInterface {
  status: "notFetched" | "fetching" | "fetched" | "fetchError";
  data: AuthData | null;
  setData: (data: AuthData | null) => void;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  status: "notFetched",
  data: { jwtToken: null, user: null },
  setData: () => {},
});

const AUTH_DATA_STORAGE_KEY = "auth-data";

const readTokenFromLocalStorage = () => {
  const data = JSON.parse(
    localStorage.getItem(AUTH_DATA_STORAGE_KEY) ?? "null"
  );

  fetcher.setAuthToken(data?.jwtToken);
  return data;
};

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] =
    useState<AuthContextInterface["status"]>("notFetched");
  const [data, setData] = useState<AuthData | null>(readTokenFromLocalStorage);

  useEffect(() => {
    setStatus("fetching");

    if (!data?.user || !data?.jwtToken) {
      localStorage.removeItem(AUTH_DATA_STORAGE_KEY);
      return;
    }

    const authDataStr = JSON.stringify(data);
    localStorage.setItem(AUTH_DATA_STORAGE_KEY, authDataStr);
    fetcher.setAuthToken(data?.jwtToken);

    setStatus("fetched");
  }, [data]);

  useEffect(() => {
    const isAuthPagesPath = ["/auth/signin", "/auth/register"].includes(
      location.pathname
    );

    if (data?.user && data?.jwtToken) {
      if (isAuthPagesPath) navigate("/");
    } else {
      if (!isAuthPagesPath) navigate("/auth/signin");
    }
  }, [data, location, navigate]);

  return (
    <AuthContext.Provider value={{ status, data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};
