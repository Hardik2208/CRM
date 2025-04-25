import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between mb-[3vh]">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <button
          onClick={() => navigate("/Order")}
          className="bg-green-500 w-[15%] h-[8vh] text-white px-4 py-2 rounded-md hover:bg-green-600 hover:cursor-pointer"
        >
          Place Order
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Customers
          </h2>
          <p className="text-3xl font-bold text-blue-600"></p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-600">Total Sales</h2>
          <p className="text-3xl font-bold text-green-600">₹</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Sales this Month
          </h2>
          <p className="text-3xl font-bold text-red-600">₹</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Sales this Week
          </h2>
          <p className="text-3xl font-bold text-yellow-600">₹</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Order</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full overflow-y-scroll">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Items </th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs`}></span>
                </td>
                <td className="py-2 px-4">₹</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs `}></span>
                </td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
