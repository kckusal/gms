import { FC, useContext, useEffect } from "react";

import { AuthContext } from "../../providers/AuthProvider";

const SignOut: FC = () => {
  const { setIsSignedIn, setToken } = useContext(AuthContext);

  useEffect(() => {
    localStorage.removeItem("auth-token");
    setIsSignedIn(false);
    setToken(null);
  }, [setIsSignedIn, setToken]);

  return null;
};

export default SignOut;
