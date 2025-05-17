import React from "react";

import Sidebar from "../components/Sidebar";

function Settings() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <Sidebar />
        <div className="p-8 bg-white h-[100vh] overflow-auto w-[90%]">
          Settings
        </div>
      </div>
    </div>
  );
}

export default Settings;
