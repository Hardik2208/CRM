import React from "react";
import logo from './logo.png'; 

import { useNavigate, useLocation } from "react-router-dom";

import { Cpu, HardDrive, Cable } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Left Side */}

      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center px-16 relative z-0">
        <div className="bg-[#3B73ED] rounded-[75px] h-[150px] w-[150px] flex items-center justify-center absolute top-[10vh] left-[5%] -z-1">
          <div className="bg-blue-600 rounded-[70px] h-[140px] w-[140px]"></div>
        </div>

        <div className="bg-[#3B73ED] rounded-full h-[300px] w-[300px] flex items-center justify-center absolute top-[32vh] left-[30%] -z-10 opacity-80">
          <div className="bg-blue-600 rounded-full h-[290px] w-[290px]"></div>
        </div>

        <div className="bg-[#3B73ED] rounded-full h-[200px] w-[200px] flex items-center justify-center absolute top-[40vh] left-[60%] -z-10 opacity-50">
          <div className="bg-blue-600 rounded-full h-[190px] w-[190px]"></div>
        </div>

        <div className="absolute top-6 left-6 space-x-2 z-10 w-[100%]">
          <h1 className="text-2xl font-bold flex items-center gap-2"><img src={logo} alt="MyShopDesk logo" className= "w-[10%] bg-black rounded-full" />MyShopDesk</h1>
        </div>
        <div className="mt-20">
          <h2 className="text-4xl font-bold mb-4 z-10">
            MyShopDesk Management
          </h2>
          <p className="text-lg mb-8">
            Streamline your electronics store operations with our comprehensive
            management solution.
          </p>
          <ul className="space-y-4 z-10">
            <li className="flex items-center">
              <span className="mx-2 bg-[#5182EF] rounded-[25px] w-[50px] h-[50px] flex justify-center items-center">
                <Cpu />
              </span>
              Inventory tracking with real-time updates
            </li>
            <li className="flex items-center">
              <span className="mx-2 bg-[#5182EF] rounded-[25px] w-[50px] h-[50px] flex justify-center items-center">
                <HardDrive />
              </span>
              Detailed sales analytics and reporting
            </li>
            <li className="flex items-center">
              <span className="mx-2 bg-[#5182EF] rounded-[25px] w-[50px] h-[50px] flex justify-center items-center">
                <Cable />
              </span>
              Smart customer relationship management
            </li>
          </ul>
        </div>
        <footer className="absolute bottom-6 text-sm text-white/80 z-10">
          © 2025 MyShopDesk Management. All rights reserved.
        </footer>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Login to your account
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Username or Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              onClick={() => navigate("/Home")}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
            >
              Log in
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-500 text-center">
            Need help? Contact{" "}
            <a
              href="mailto:support@electroretail.com"
              className="text-blue-600 hover:underline"
            >
              support@electroretail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
