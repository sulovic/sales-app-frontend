import React from "react";
import Navbar from "../../components/Navbar";
import {SalesAdminDashboardLinks} from "../../config/config";

const Dashboard = () => {
  
  return <>
  <Navbar Links={SalesAdminDashboardLinks} />
  <div>Dashboard</div>
  </>;
};

export default Dashboard;
