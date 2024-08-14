import React from 'react'
import Navbar from "../../components/Navbar";
import { SalesAdminDashboardLinks } from "../../config/config";

const Sales = () => {
  return (
    <>
    <Navbar Links={SalesAdminDashboardLinks} />
    <div>Sales</div>
  </>  )
}

export default Sales