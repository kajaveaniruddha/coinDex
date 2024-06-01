import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <main className=" bg-[#1c1c1c]">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
