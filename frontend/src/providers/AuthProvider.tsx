import React, { FC, useEffect, useState } from "react";
import { redirect, useLocation } from "react-router-dom";

interface AuthContextInterface {
  isSignedIn: boolean;
  token: string | null;

  setIsSignedIn: (value: boolean) => void;
  setToken: (token: string | null) => void;
}

export const AuthContext = React.createContext<AuthContextInterface | null>(
  null
);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    console.log({ location, isSignedIn });

    const isAuthPagesPath = ["/auth/signin", "/auth/register"].includes(
      location.pathname
    );

    if (isSignedIn) {
      if (isAuthPagesPath) redirect("/");
    } else {
      if (!isAuthPagesPath) redirect("/auth/signin");
    }
  }, [isSignedIn, location]);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, token, setIsSignedIn, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
