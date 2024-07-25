// src/utils/useAuthRedirect.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = (user) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/not-authenticated");
    }
  }, [user, navigate]);
};

export default useAuthRedirect;
