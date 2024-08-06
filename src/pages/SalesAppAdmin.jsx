import React from "react";
import { useAuth } from "../Context/AuthContext";
import Login from "./Login";
import SalesAppAdminDashboard from "./SalesAppAdminDashboard";

const SalesAppAdmin = () => {
  const { authUser } = useAuth();

  return authUser ? <SalesAppAdminDashboard /> : <Login />;
};

export default SalesAppAdmin;
