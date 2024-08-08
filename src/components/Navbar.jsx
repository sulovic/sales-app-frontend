import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
import UserMenu from "./UserMenu.jsx";

const Navbar = ({ Links = [] }) => {
  const { authUser } = useAuth();
  const currentLocation = useLocation();

  return (
    <nav tabIndex={-1} className={`mb-3 flex flex-wrap items-center justify-between bg-sky-400 p-1`}>
      <div className="ps-2 flex flex-shrink-0 items-center">
        <img src={"/public/favicon.png"} alt="Logo" style={{ width: "auto", height: "36px" }} />
      </div>
      <div className="ps-2 mr-6 flex flex-shrink-0 items-center">
        <h4 className="text-white">Sales App Admin</h4>
      </div>
      <div className="hidden lg:flex lg:w-auto lg:flex-grow lg:items-center">
        {authUser && (
          <ul className="mb-0">
            {Links.map(
              (link, index) =>
                authUser?.roleId > link?.minRole && (
                  <li className="mt-3 text-end	text-lg font-medium lg:!mt-0 lg:inline-block" key={index}>
                    <Link
                      className={`mr-4 no-underline ${currentLocation.pathname === link?.href ? `text-sky-200` : `text-sky-100`} hover:text-white`}
                      to={link?.href}
                    >
                      {link?.label}
                    </Link>
                  </li>
                )
            )}
          </ul>
        )}
      </div>
      <div className="flex justify-end pe-1">
        <UserMenu Links={Links} />
      </div>
    </nav>
  );
};

export default Navbar;
