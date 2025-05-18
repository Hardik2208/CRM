import React from "react";
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

const menuItems = [
  { path: "/Home", label: "Dashboard", icon: Home },
  { path: "/Product", label: "Stocks", icon: Package },
  { path: "/Enquiry", label: "Enquiry", icon: FileText },
  { path: "/Order", label: "Orders", icon: ShoppingCart },
  { path: "/Sales", label: "Sales", icon: BarChart2 },
  { path: "/Staff", label: "Staff", icon: UserCog },
  { path: "/Invoice", label: "Invoice", icon: Building },
  { path: "/Customer", label: "Customer", icon: Users },
  { path: "/ThirdPartyF", label: "Finances", icon: IndianRupee },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-[18%] bg-[#F9FAFB] text-gray-800 shadow-sm border-r border-gray-200 overflow-auto">
      <div className="py-6 px-4">
        {/* Header */}
        <div className="flex items-center gap-2 text-2xl font-semibold text-blue-900 mb-10">
          <Store className="text-blue-600" />
          <span>Admin Panel</span>
        </div>

        {/* Main Navigation */}
        <label className="text-xs text-gray-500 font-medium mb-3 block">
          MAIN NAVIGATION
        </label>
        <ul className="space-y-1">
          {menuItems.map(({ path, label, icon: Icon }) => (
            <li
              key={path}
              onClick={() => navigate(path)}
              className="cursor-pointer"
            >
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm transition ${
                  isActive(path)
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Settings */}
        <div className="mt-8">
          <label className="text-xs text-gray-500 font-medium mb-3 block">
            SETTINGS
          </label>
          <ul>
            <li
              onClick={() => navigate("/Settings")}
              className="cursor-pointer"
            >
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm transition ${
                  isActive("/Settings")
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Settings size={18} />
                <span>Settings</span>
              </div>
            </li>
            <li onClick={() => navigate("/")} className="cursor-pointer mt-2">
              <div className="flex items-center gap-3 px-4 py-2 rounded-md text-sm transition hover:bg-red-50 text-red-500 hover:text-red-600">
                <LogOut size={18} />
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
