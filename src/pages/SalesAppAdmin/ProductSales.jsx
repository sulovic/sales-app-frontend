import React from "react";
import Navbar from "../../components/Navbar";
import { SalesAdminDashboardLinks } from "../../config/config";

const ProductSales = () => {
  return (
    <>
      <Navbar Links={SalesAdminDashboardLinks} />
      <div>ProductSales</div>
    </>
  );
};

export default ProductSales;
