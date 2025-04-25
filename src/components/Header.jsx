import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
const Header = () => {
 
  return (
    <header className="flex justify-between items-center bg-[#222831] text-white p-4 m-[0]">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <div className="flex items-center space-x-6">
        <FaUserCircle className="text-3xl cursor-pointer hover:text-gray-400" />
      </div>
    </header>
  );
};

export default Header;
