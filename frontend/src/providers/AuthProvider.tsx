import React, { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextInterface {
  isSignedIn: boolean;
  token: string | null;

  setIsSignedIn: (value: boolean) => void;
  setToken: (token: string | null) => void;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  isSignedIn: false,
  token: null,
  setIsSignedIn: () => {},
  setToken: () => {},
});

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  console.log({ isSignedIn, token, path: location.pathname });

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("auth-token");

    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
      setIsSignedIn(true);
    }
  }, []);

  useEffect(() => {
    const isAuthPagesPath = ["/auth/signin", "/auth/register"].includes(
      location.pathname
    );

    if (isSignedIn) {
      if (isAuthPagesPath) navigate("/");
    } else {
      if (!isAuthPagesPath) navigate("/auth/signin");
    }
  }, [isSignedIn, location, navigate]);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, token, setIsSignedIn, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
