import React from "react";
import { Link } from "react-router-dom";
import {motion} from "framer-motion"
const Navbar = () => {
  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className=" shadow rounded items-center z-50 top-2 w-full text-[#ffffffac] container mx-auto font-thin p-4 max-sm:text-sm text-xl flex lg:px-20  "
      >
        <Link
          to={"/"}
          className="hover:scale-[1.05] hover:text-white transition-all cursor-pointer"
        >
          Home
        </Link>
        <ul className="relative flex w-full justify-center  max-sm:gap-3 gap-10 ">
          <li className="hover:text-white hover:-translate-y-1 hover:scale-[1.02] transition-all cursor-pointer">
            <a href="#home">Home</a>
          </li>
          <li className="hover:-translate-y-1 font-semibold hover:scale-[1.02] transition-all cursor-pointer bg-gradient-to-r from-[#fc00ff] to-[#00dbde] bg-clip-text text-transparent">
            <a href="#market">Market</a>
          </li>
          <li className="hover:text-white hover:-translate-y-1 hover:scale-[1.02] transition-all cursor-pointer">
            <a href="#joinus">Join Us</a>
          </li>
        </ul>
        <div className=" flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hover:text-blue-500 hover:fill-blue-500 lucide lucide-twitter hover:-translate-y-1 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hover:text-[#ff006a] lucide lucide-instagram hover:-translate-y-1 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
