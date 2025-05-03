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
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-white h-[100vh] overflow-y-auto text-black shadow-md z-50 m-[0] w-[15%]">
      <h1 className="text-2xl font-bold my-[3vh] ml-[10%] text-blue-900">Admin Panel</h1>
      <ul className="flex flex-col justify-around">
        <li onClick={() => navigate("/")} className="cursor-pointer">
          <div className={`flex items-center gap-4 py-[1.5vh] px-[5%] rounded-md transition duration-300 ${location.pathname === "/" ? "bg-gray-200 w-[90%] mx-[5%]" : "hover:bg-gray-200 w-[90%] mx-[5%]"}`}>
            <FaHome className="text-2xl text-[#2B7FFF]" />
            <span className="text-sm mt-1">Dashboard</span>
          </div>
        </li>

        <li onClick={() => navigate("/Product")} className="cursor-pointer">
          <div className={`flex items-center gap-4 py-[1.5vh] px-[5%] rounded-md transition duration-300 ${location.pathname === "/Product" ? "bg-gray-200 w-[90%] mx-[5%]" : "hover:bg-gray-200 w-[90%] mx-[5%]"}`}>
            <FaBoxOpen className="text-2xl text-[#2B7FFF]" />
            <span className="text-sm mt-1">Stocks</span>
          </div>
        </li>

        <li onClick={() => navigate("/Enquiry")} className="cursor-pointer">
          <div className={`flex items-center gap-4 py-[1.5vh] px-[5%] rounded-md transition duration-300 ${location.pathname === "/Enquiry" ? "bg-gray-200 w-[90%] mx-[5%]" : "hover:bg-gray-200 w-[90%] mx-[5%]"}`}>
            <FaWpforms className="text-2xl text-[#2B7FFF]" />
            <span className="text-sm mt-1">Enquiry</span>
          </div>
        </li>

        <li onClick={() => navigate("/Order")} className="cursor-pointer">
          <div className={`flex items-center gap-4 py-[1.5vh] px-[5%] rounded-md transition duration-300 ${location.pathname === "/Order" ? "bg-gray-200 w-[90%] mx-[5%]" : "hover:bg-gray-200 w-[90%] mx-[5%]"}`}>
            <FaShoppingCart className="text-2xl text-[#2B7FFF]" />
            <span className="text-sm mt-1">Orders</span>
          </div>
        </li>

        <li onClick={() => navigate("/Sales")} className="cursor-pointer">
          <div className={`flex items-center gap-4 py-[1.5vh] px-[5%] rounded-md transition duration-300 ${location.pathname === "/Sales" ? "bg-gray-200 w-[90%] mx-[5%]" : "hover:bg-gray-200 w-[90%] mx-[5%]"}`}>
            <FaChartLine className="text-2xl text-[#2B7FFF]" />
            <span className="text-sm mt-1">Sales</span>
          </div>
        </li>

        <li onClick={() => navigate("/Staff")} className="cursor-pointer">
          <div className={`flex items-center gap-4 py-[1.5vh] px-[5%] rounded-md transition duration-300 ${location.pathname === "/Staff" ? "bg-gray-200 w-[90%] mx-[5%]" : "hover:bg-gray-200 w-[90%] mx-[5%]"}`}>
            <FaPeopleGroup className="text-2xl text-[#2B7FFF]" />
            <span className="text-sm mt-1">Staff</span>
          </div>
        </li>

        <li onClick={() => navigate("/Invoice")} className="cursor-pointer">
          <div className={`flex items-center gap-4 py-[1.5vh] px-[5%] rounded-md transition duration-300 ${location.pathname === "/Invoice" ? "bg-gray-200 w-[90%] mx-[5%]" : "hover:bg-gray-200 w-[90%] mx-[5%]"}`}>
            <FaUniversity className="text-2xl text-[#2B7FFF]" />
            <span className="text-sm mt-1">Invoice</span>
          </div>
        </li>

        <li onClick={() => navigate("/Customer")} className="cursor-pointer">
          <div className={`flex items-center gap-4 py-[1.5vh] px-[5%] rounded-md transition duration-300 ${location.pathname === "/Customer" ? "bg-gray-200 w-[90%] mx-[5%]" : "hover:bg-gray-200 w-[90%] mx-[5%]"}`}>
            <FaUsers className="text-2xl text-[#2B7FFF]" />
            <span className="text-sm mt-1">Customer</span>
          </div>
        </li>

        <li onClick={() => navigate("/ThirdPartyF")} className="cursor-pointer">
          <div className={`flex items-center gap-4 py-[1.5vh] px-[5%] rounded-md transition duration-300 ${location.pathname === "/ThirdPartyF" ? "bg-gray-200 w-[90%] mx-[5%]" : "hover:bg-gray-200 w-[90%] mx-[5%]"}`}>
            <FaMoneyBillWave className="text-2xl text-[#2B7FFF]" />
            <span className="text-sm mt-1">Third Party Finance</span>
          </div>
        </li>

        <li onClick={() => navigate("/Settings")} className="cursor-pointer">
          <div className={`flex items-center gap-4 py-[1.5vh] px-[5%] rounded-md transition duration-300 ${location.pathname === "/Settings" ? "bg-gray-200 w-[90%] mx-[5%]" : "hover:bg-gray-200 w-[90%] mx-[5%]"}`}>
            <FaCog className="text-2xl text-[#2B7FFF]" />
            <span className="text-sm mt-1">Settings</span>
          </div>
        </li>

        <li className="cursor-pointer">
          <div className="flex items-center gap-4 py-[1.5vh] px-[5%] rounded-md transition duration-300 hover:bg-red-100 mx-[5%]">
            <FaSignOutAlt className="text-2xl text-red-500" />
            <span className="text-sm mt-1 text-red-500">Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
