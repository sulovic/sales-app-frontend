import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import PersistLogin from "./PersistLogin";
import ProtectRoute from "./ProtectRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/SalesAppAdmin/Dashboard";
import Users from "../pages/SalesAppAdmin/Users";
import { Priviledges } from "../config/config";
const SiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PersistLogin />}>
        <Route path="SalesAppAdmin">
          <Route index element={<Login />} />
          <Route element={<ProtectRoute minRole={Priviledges["/salesappadmin/dashboard"]} />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectRoute minRole={Priviledges["/salesappadmin/korisnici"]} />}>
            <Route path="korisnici" element={<Users />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default SiteRoutes;
