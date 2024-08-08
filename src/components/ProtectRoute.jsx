import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";

const ProtectRoute = ({ minRole = 5000 }) => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  if (authUser && authUser?.roleId > minRole) {
    return <Outlet />;
  } else {
    toast.warning(
      <div>
        UPS!!! Izgleda da niste autorizovani da posetite ovu lokaciju!
        <br /> Bićete preusmereni na početnu stranu...
      </div>,
      {
        position: "top-center",
        autoClose: 2000,
      }
    );
    setTimeout(() => {
      navigate("/");
    }, 2500);

    return null;
  }
};

export default ProtectRoute;
