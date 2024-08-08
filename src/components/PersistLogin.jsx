import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const PersistLogin = () => {
  const { authUser, accessToken, handleRefreshToken } = useAuth();
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await handleRefreshToken();
      } catch (err) {
        toast.warning(`Ups! Došlo je do greške: ${err}`, {
          position: "top-center",
        });
      } finally {
        setShowSpinner(false);
      }
    };

    !accessToken || !authUser ? verifyRefreshToken() : setShowSpinner(false);
  }, []);

  return showSpinner ? <Spinner /> : <Outlet />;
};

export default PersistLogin;
