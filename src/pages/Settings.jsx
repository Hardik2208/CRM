import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { LockKeyhole } from "lucide-react";


function Settings() {

  const navigate = useNavigate();
  return (
    
    <div className="flex flex-col h-screen">
      <div className="flex">
        <Sidebar />
        <div className="pt-5 bg-white h-[100vh] overflow-auto w-[90%] flex flex-col">
          <div
          onClick={()=>{navigate("/UpdatePassword")}}
          className="w-[100%] flex gap-2 py-4 px-5 hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer"><span><LockKeyhole /></span> Update Password</div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
