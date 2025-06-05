// UpdatePassword.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

import { Cpu, HardDrive, Cable } from "lucide-react";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Password updated successfully. You can now log in.");
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center px-16 relative z-0">
        <div className="bg-[#3B73ED] rounded-[75px] h-[150px] w-[150px] absolute top-[10vh] left-[5%] -z-1" />
        <div className="bg-[#3B73ED] rounded-full h-[300px] w-[300px] absolute top-[32vh] left-[30%] -z-10 opacity-80" />
        <div className="bg-[#3B73ED] rounded-full h-[200px] w-[200px] absolute top-[40vh] left-[60%] -z-10 opacity-50" />

        <div className="absolute top-6 left-6 z-10 w-[100%]">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <img
              src={logo}
              alt="MyShopDesk logo"
              className="w-[10%] bg-black rounded-full"
            />
            MyShopDesk
          </h1>
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
              </span>{" "}
              Inventory tracking with real-time updates
            </li>
            <li className="flex items-center">
              <span className="mx-2 bg-[#5182EF] rounded-[25px] w-[50px] h-[50px] flex justify-center items-center">
                <HardDrive />
              </span>{" "}
              Detailed sales analytics and reporting
            </li>
            <li className="flex items-center">
              <span className="mx-2 bg-[#5182EF] rounded-[25px] w-[50px] h-[50px] flex justify-center items-center">
                <Cable />
              </span>{" "}
              Smart customer relationship management
            </li>
          </ul>
        </div>
        <footer className="absolute bottom-6 text-sm text-white/80 z-10">
          © 2025 MyShopDesk Management. All rights reserved.
        </footer>
      </div>
      <div className="flex w-1/2 items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-xl font-semibold mb-4">Set New Password</h2>
          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:cursor-pointer hover:bg-blue-700"
          >
            Update Password
          </button>
          {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
        </form>
      </div>
    </div>
  );
}
