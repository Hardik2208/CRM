import React from "react";
import {
  FaHome,
  FaPlusCircle,
  FaUsers,
  FaUniversity,
  FaCog,
  FaSignOutAlt,
  FaWpforms,
  FaChartLine,
  FaShoppingCart,
  FaBoxOpen,
  FaMoneyBillWave,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#222831] h-[90vh] text-white shadow-md z-50 m-[0] w-[11%]">
      <ul className="flex flex-col justify-around">
        <li
          onClick={() => navigate("/")}
          className="flex pb-[3vh] gap-4 items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaHome className="text-2xl" />
          <span className="text-sm mt-1">Dashboard</span>
        </li>
        <li
          onClick={() => navigate("/Product")}
          className="flex pb-[3vh] gap-4 items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaBoxOpen className="text-2xl" />
          <span className="text-sm mt-1">Stocks</span>
        </li>
        <li
          onClick={() => navigate("/Enquiry")}
          className="flex pb-[3vh] gap-4 items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaWpforms className="text-2xl" />
          <span className="text-sm mt-1">Enquiry</span>
        </li>

        <li
          onClick={() => navigate("/Order")}
          className="flex pb-[3vh] gap-4 items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaShoppingCart className="text-2xl" />
          <span className="text-sm mt-1">Orders</span>
        </li>
        <li
          onClick={() => navigate("/Sales")}
          className="flex pb-[3vh] gap-4 items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaChartLine className="text-2xl" />
          <span className="text-sm mt-1">Sales</span>
        </li>
        <li
          onClick={() => navigate("/Staff")}
          className="flex pb-[3vh] gap-4 items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaPeopleGroup className="text-2xl" />
          <span className="text-sm mt-1">Staff</span>
        </li>
        <li
          onClick={() => navigate("Invoice")}
          className="flex pb-[3vh] gap-4 items-center cursor-pointer p-2 relative hover:text-blue-400 transition duration-300"
        >
          <FaUniversity className="text-2xl" />
          <span className="text-sm mt-1">Invoice</span>
        </li>
        <li
          onClick={() => navigate("/Customer")}
          className="flex pb-[3vh] gap-4 items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaUsers className="text-2xl" />
          <span className="text-sm mt-1">Customer</span>
        </li>
        <li
          onClick={() => navigate("/ThirdPartyF")}
          className="flex pb-[3vh] gap-4 items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaMoneyBillWave className="text-2xl" />
          <span className="text-sm mt-1">Third Party Finance</span>
        </li>
        <li
          onClick={() => navigate("/Settings")}
          className="flex pb-[3vh] gap-4 items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaCog className="text-2xl" />
          <span className="text-sm mt-1">Settings</span>
        </li>
        <li className="flex pb-[3vh] gap-4 items-center cursor-pointer p-2 hover:text-red-400 transition duration-300">
          <FaSignOutAlt className="text-2xl" />
          <span className="text-sm mt-1">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
