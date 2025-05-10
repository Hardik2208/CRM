import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaUsers, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = () => {
    axios
      .get("http://localhost:5001/api/customer")
      .then((res) => setCustomerList(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="mb-[2vh]">
        <h1 className="text-4xl text-center font-bold text-slate-800">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg shadow p-5 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <FaUsers className="text-3xl text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-2xl font-semibold text-slate-800">
                {customerList.length || "--"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow p-5 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <FaShoppingCart className="text-3xl text-teal-600" />
            <div>
              <p className="text-sm text-gray-500">Items Sold (Month)</p>
              <p className="text-2xl font-semibold text-slate-800">--</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow p-5 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <FaMoneyBillWave className="text-3xl text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Sales This Month</p>
              <p className="text-2xl font-semibold text-slate-800">₹--</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow p-5 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <FaChartLine className="text-3xl text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Revenue This Month</p>
              <p className="text-2xl font-semibold text-slate-800">₹--</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50 transition">
                <td className="px-4 py-3 text-slate-700">--</td>
                <td className="px-4 py-3 text-slate-700">--</td>
                <td className="px-4 py-3 text-slate-700">₹--</td>
                <td className="px-4 py-3 text-slate-700">--</td>
                <td className="px-4 py-3 text-slate-700">--</td>
                <td className="px-4 py-3">
                  <button className="text-indigo-600 font-medium hover:underline hover:text-indigo-800">
                    View
                  </button>
                </td>
              </tr>
              {/* Repeat rows dynamically here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
