import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className=" shadow bg-[#121212] bg-opacity-80 border border-white/50 rounded items-center z-50 sticky top-2 w-full text-white container mx-auto font-bold p-3 max-sm:text-sm text-2xl flex">
      <Link
        to={"/"}
        className=" hover:text-[#FF9500] hover:-translate-y-1 hover:scale-[1.02] transition-all cursor-pointer uppercase"
      >
        CoinDex
      </Link>
      <ul className=" flex w-full justify-center  max-sm:gap-3 gap-10 ">
        <li className="hover:text-[#00FF6A] hover:-translate-y-1 hover:scale-[1.02] transition-all cursor-pointer">
          <a href="#home">Home</a>
        </li>
        <li className="hover:text-[#00FF6A] hover:-translate-y-1 hover:scale-[1.02] transition-all cursor-pointer">
          <a href="#market">Market</a>
        </li>
        <li className="hover:text-[#00FF6A] hover:-translate-y-1 hover:scale-[1.02] transition-all cursor-pointer">
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
          className="hover:text-[#FF9500] lucide lucide-twitter hover:-translate-y-1 hover:scale-[1.02] transition-all cursor-pointer"
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
          className="hover:text-[#FF9500] lucide lucide-instagram hover:-translate-y-1 hover:scale-[1.02] transition-all cursor-pointer"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
