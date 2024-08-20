import React from "react";
import { Outlet } from "react-router-dom";
import InPageNavigation from "./InPageNavigation";
function Navbar() {
  return (
    <div className="flex flex-col  max-w-[90%] lg:max-w-[60%] mx-auto  min-h-screen ">
      <InPageNavigation
        teams={[
          { title: "MATCHES", path: "/" },
          { title: "NEWS", path: "/news" },
          { title: "TABLE", path: "/pointsTable" },
        ]}
      ></InPageNavigation>

      <Outlet />
    </div>
  );
}

export default Navbar;
