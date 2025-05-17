import React from "react";

import { FaPeopleGroup } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Package,
  Store,
  Users,
  ShoppingCart,
  BarChart2,
  Settings,
  UserCog,
  LogOut,
  Home,
  IndianRupee,
  FileText,
  Building,
} from "lucide-react";


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-[#FAFAFA] h-[100vh] text-[gray-400] shadow-md z-50 m-[0] w-[18%] border-r border-gray-200">
      <h1 className="text-xl font-bold my-[8vh] flex ml-[5%]">
        <span className="text-blue-600 mr-2">
          <Store />
        </span>{" "}
        Admin Panel
      </h1>
      <div className="overflow-y-auto h-[80vh]">
        <label className="px-[8%] text-xs text-gray-600 font-medium" htmlFor="">
          MAIN NAVIGATION
        </label>
        <ul className="flex flex-col justify-around">
          <li onClick={() => navigate("/")} className="cursor-pointer">
            <div
              className={`flex items-center gap-4 py-1 px-[5%] my-1 rounded-md transition duration-300 ${
                location.pathname === "/"
                  ? " w-[90%] mx-[5%]"
                  : "hover:bg-gray-100 w-[90%] mx-[5%]"
              }`}
            >
              <Home className="text-xs text-gray-600" />
              <span className="text-xs mt-1">Dashboard</span>
            </div>
          </li>

          <li onClick={() => navigate("/Product")} className="cursor-pointer">
            <div
              className={`flex items-center gap-4 py-1 px-[5%] my-1 rounded-md transition duration-300 ${
                location.pathname === "/Product"
                  ? " w-[90%] mx-[5%]"
                  : "hover:bg-gray-100 w-[90%] mx-[5%]"
              }`}
            >
              <Package className="text-xs text-gray-600" />
              <span className="text-xs mt-1">Stocks</span>
            </div>
          </li>

          <li onClick={() => navigate("/Enquiry")} className="cursor-pointer">
            <div
              className={`flex items-center gap-4 py-1 px-[5%] my-1 rounded-md transition duration-300 ${
                location.pathname === "/Enquiry"
                  ? " w-[90%] mx-[5%]"
                  : "hover:bg-gray-100 w-[90%] mx-[5%]"
              }`}
            >
              <FileText className="text-xs text-gray-600" />
              <span className="text-xs mt-1">Enquiry</span>
            </div>
          </li>

          <li onClick={() => navigate("/Order")} className="cursor-pointer">
            <div
              className={`flex items-center gap-4 py-1 px-[5%] my-1 rounded-md transition duration-300 ${
                location.pathname === "/Order"
                  ? " w-[90%] mx-[5%]"
                  : "hover:bg-gray-100 w-[90%] mx-[5%]"
              }`}
            >
              <ShoppingCart className="text-xs text-gray-600" />
              <span className="text-xs mt-1">Orders</span>
            </div>
          </li>

          <li onClick={() => navigate("/Sales")} className="cursor-pointer">
            <div
              className={`flex items-center gap-4 py-1 px-[5%] my-1 rounded-md transition duration-300 ${
                location.pathname === "/Sales"
                  ? " w-[90%] mx-[5%]"
                  : "hover:bg-gray-100 w-[90%] mx-[5%]"
              }`}
            >
              <BarChart2 className="text-xs text-gray-600" />
              <span className="text-xs mt-1">Sales</span>
            </div>
          </li>

          <li onClick={() => navigate("/Staff")} className="cursor-pointer">
            <div
              className={`flex items-center gap-4 py-1 px-[5%] my-1 rounded-md transition duration-300 ${
                location.pathname === "/Staff"
                  ? " w-[90%] mx-[5%]"
                  : "hover:bg-gray-100 w-[90%] mx-[5%]"
              }`}
            >
              <UserCog className="text-xs text-gray-600" />
              <span className="text-xs mt-1">Staff</span>
            </div>
          </li>

          <li onClick={() => navigate("/Invoice")} className="cursor-pointer">
            <div
              className={`flex items-center gap-4 py-1 px-[5%] my-1 rounded-md transition duration-300 ${
                location.pathname === "/Invoice"
                  ? " w-[90%] mx-[5%]"
                  : "hover:bg-gray-100 w-[90%] mx-[5%]"
              }`}
            >
              <Building className="text-xs text-gray-600" />
              <span className="text-xs mt-1">Invoice</span>
            </div>
          </li>

          <li onClick={() => navigate("/Customer")} className="cursor-pointer">
            <div
              className={`flex items-center gap-4 py-1 px-[5%] my-1 rounded-md transition duration-300 ${
                location.pathname === "/Customer"
                  ? " w-[90%] mx-[5%]"
                  : "hover:bg-gray-100 w-[90%] mx-[5%]"
              }`}
            >
              <Users className="text-xs text-gray-600" />
              <span className="text-xs mt-1">Customer</span>
            </div>
          </li>

          <li
            onClick={() => navigate("/ThirdPartyF")}
            className="cursor-pointer"
          >
            <div
              className={`flex items-center gap-4 py-1 px-[5%] my-1 rounded-md transition duration-300 ${
                location.pathname === "/ThirdPartyF"
                  ? " w-[90%] mx-[5%]"
                  : "hover:bg-gray-100 w-[90%] mx-[5%]"
              }`}
            >
              <IndianRupee className="text-xs text-gray-600" />
              <span className="text-xs mt-1">Finances</span>
            </div>
          </li>

          <label
            className="px-[8%] mt-[5vh] text-xs text-gray-600 font-medium"
            htmlFor=""
          >
            SETTINGS
          </label>

          <li onClick={() => navigate("/Settings")} className="cursor-pointer">
            <div
              className={`flex items-center gap-4 py-1 px-[5%] my-1 rounded-md transition duration-300 ${
                location.pathname === "/Settings"
                  ? " w-[90%] mx-[5%]"
                  : "hover:bg-gray-100 w-[90%] mx-[5%]"
              }`}
            >
              <Settings className="text-xs text-gray-600" />
              <span className="text-xs mt-1">Settings</span>
            </div>
          </li>

          <li className="cursor-pointer">
            <div className="flex items-center gap-4 py-1 px-[5%] my-1 rounded-md transition duration-300 hover:bg-red-100 mx-[5%]">
              <LogOut className="text-xs text-red-500" />
              <span className="text-xs mt-1 text-red-500">Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
