import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const IndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/my-profile");
  }, [navigate]);

  return null;
};
