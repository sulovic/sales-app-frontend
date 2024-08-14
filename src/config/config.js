
export const allowedFileTypes = [

  "image/jpeg", // JPEG images
  "image/jpg", // JPEG images
  "image/png", // PNG images
  "image/gif", // GIF images

];
export const allowedExtensions = ".jpg, .jpeg, .png, .gif";

export const Priviledges = {

  //SalesAppAdmin
  "/salesappadmin/dashboard": 1000,
  "/salesappadmin/proizvodi": 1000,
  "/salesappadmin/proizvodi-na-akciji": 1000,
  "/salesappadmin/akcije": 1000,
  "/salesappadmin/korisnici": 5000,
};

export const SalesAdminDashboardLinks = [
    {
      label: "Home",
      image: "",
      desc: "Home",
      href: "/SalesAppAdmin/dashboard",
      minRole: Priviledges["/salesappadmin/dashboard"],
    },  
    {
      label: "Proizvodi na akciji",
      image: "",
      desc: "Proizvodi na akciji",
      href: "/SalesAppAdmin/proizvodi-na-akciji",
      minRole: Priviledges["/salesappadmin/proizvodi-na-akciji"],
    },
    {
      label: "Proizvodi",
      image: "",
      desc: "Proizvodi",
      href: "/SalesAppAdmin/proizvodi",
      minRole: Priviledges["/salesappadmin/korisnici"],
    },
    {
      label: "Akcije",
      image: "",
      desc: "Akcije",
      href: "/SalesAppAdmin/akcije",
      minRole: Priviledges["/salesappadmin/akcije"],
    },
    {
      label: "Korisnici",
      image: "",
      desc: "Korisnici",
      href: "/SalesAppAdmin/korisnici",
      minRole: Priviledges["/salesappadmin/korisnici"],
    },
  ];
