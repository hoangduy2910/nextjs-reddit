import React from "react";
import Link from "next/link";

import Logo from "~/public/images/logo.svg";

const NavBar = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-10 px-6 flex items-center justify-between h-12 bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <a>
            <Logo className="w-8 h-8 mr-2" />
          </a>
        </Link>
        <span className="text-2xl font-semibold">
          <Link href="/">reddit</Link>
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex bg-gray-100 items-center mx-auto border rounded cursor-pointer hover:border-blue-500 hover:bg-white transition duration-300">
        <i className="pl-4 pr-3 fas fa-search text-gray-500"></i>
        <input
          type="text"
          placeholder="Search"
          className="w-160 bg-transparent py-1 pr-3 rounded focus:outline-none cursor-pointer"
        />
      </div>

      {/* Login/Register */}
      <div className="flex">
        <Link href="/login">
          <a className="inline-block text-xs uppercase border rounded w-24 mr-4 border-blue-500 px-2 py-1 text-blue-500 font-bold text-center leading-5">
            Log In
          </a>
        </Link>
        <Link href="/register">
          <a className="inline-block text-xs uppercase border rounded w-24 border-blue-500 bg-blue-500 px-2 py-1 text-white font-bold text-center leading-5">
            Sign Up
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
