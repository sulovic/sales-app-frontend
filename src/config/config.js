
export const allowedFileTypes = [

  "image/jpeg", // JPEG images
  "image/jpg", // JPEG images
  "image/png", // PNG images
];
export const allowedExtensions = ".jpg, .jpeg, .png";

export const Priviledges = {

  //SalesAppAdmin
  "/salesappadmin/dashboard": 1000,
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
      minRole: Priviledges["/salesappadmin/korisnici"],
    },
  ];
