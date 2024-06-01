import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <main className=" bg-gradient-to-b from-[#02396f] to-[#0f0037]">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
