import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [customerList,setCustomerList] = useState([])

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
    <div className="p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-blue-900">Dashboard</h1>
        <button
          onClick={() => navigate("/Order")}
          className="bg-gradient-to-r from-green-400 to-green-600 w-[15%] h-[8vh] text-white px-4 py-2 rounded-md shadow-lg hover:bg-gradient-to-l"
        >
          Place Order
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="hover:cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-6 shadow-lg text-white">
          <h2 className="text-lg font-semibold">Total Customers</h2>
          {customerList.length === 0 ?
            (<p className="text-3xl font-bold">--</p>):
          (<p className="text-3xl font-bold">{customerList.length}</p>)}
        </div>
        <div className="hover:cursor-pointer bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-6 shadow-lg text-white">
          <h2 className="text-lg font-semibold">Items Sold this Month</h2>
          <p className="text-3xl font-bold">--</p>
        </div>
        <div className="hover:cursor-pointer bg-gradient-to-r from-red-400 to-red-600 rounded-lg p-6 shadow-lg text-white">
          <h2 className="text-lg font-semibold">Sales This Month</h2>
          <p className="text-3xl font-bold">₹--</p>
        </div>
        <div className="hover:cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-6 shadow-lg text-white">
          <h2 className="text-lg font-semibold">Rewenue this Month</h2>
          <p className="text-3xl font-bold">₹--</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-gray-600">--</td>
                <td className="py-2 px-4 text-gray-600">--</td>
                <td className="py-2 px-4 text-gray-600">₹--</td>
                <td className="py-2 px-4 text-gray-600">--</td>
                <td className="py-2 px-4 text-gray-600">--</td>
                <td className="py-2 px-4">
                  <button className="text-blue-500 underline hover:text-blue-700 hover:cursor-pointer">
                    View
                  </button>
                </td>
              </tr>
              {/* You can map through orders here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
