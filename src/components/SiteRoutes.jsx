import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import SalesAppAdmin from "../pages/SalesAppAdmin";

const SiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SalesAppAdmin" element={<SalesAppAdmin />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default SiteRoutes;
