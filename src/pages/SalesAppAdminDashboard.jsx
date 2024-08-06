import React from "react";
import Navbar from "../components/Navbar";

const SalesAppAdminDashboard = () => {
  const Links = [
    {
      label: "Home",
      image: "",
      desc: "Home",
      href: "/SalesAppAdmin",
      minRole: 5000,
    },  
    {
      label: "Proizvodi na akciji",
      image: "",
      desc: "Proizvodi na akciji",
      href: "/SalesAppAdmin/proizvodi-na-akciji",
      minRole: 5000,
    },
    {
      label: "Proizvodi",
      image: "",
      desc: "Proizvodi",
      href: "/SalesAppAdmin/proizvodi",
      minRole: 5000,
    },
    {
      label: "Akcije",
      image: "",
      desc: "Akcije",
      href: "/SalesAppAdmin/akcije",
      minRole: 5000,
    },
    {
      label: "Korisnici",
      image: "",
      desc: "Korisnici",
      href: "/SalesAppAdmin/korisnici",
      minRole: 5000,
    },
  ];
  return <>
  <Navbar Links={Links} />
  <div>SalesAppAdminDashboard</div>
  </>;
};

export default SalesAppAdminDashboard;
