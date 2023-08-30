import { FC, useContext, useEffect } from "react";

import { AuthContext } from "../../providers/AuthProvider";

const SignOut: FC = () => {
  const authData = useContext(AuthContext);

  useEffect(() => {
    authData.setData(null);
  }, [authData]);

  return null;
};

export default SignOut;
