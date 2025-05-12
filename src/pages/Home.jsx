import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [sumOfQuantity, setSumOfQuantity] = useState(0);
  const [sumOfSales, setSumOfSales] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getCustomerData();
    getSalesThisMonth();
  }, []);

  const getCustomerData = () => {
    axios
      .get("http://localhost:5001/api/customer")
      .then((res) => setCustomerList(res.data))
      .catch((err) => console.log(err));
  };

  const getSalesThisMonth = async () => {
    try {
      const [orderRes, productRes] = await Promise.all([
        axios.get("http://localhost:5001/api/order/month"),
        axios.get("http://localhost:5001/api/product"),
      ]);

      const orders = orderRes.data;
      const products = productRes.data;

      setOrderList(orders);

      // Calculate total quantity
      const totalQuantity = orders.reduce(
        (acc, curr) => acc + (curr.quantity || 0),
        0
      );
      setSumOfQuantity(totalQuantity);

      // Calculate total sales
      const totalSales = orders.reduce((acc, curr) => {
        const price = Number(curr.paymentObject?.price || 0);
        const discount = Number(curr.paymentObject?.discount || 0);
        return acc + (price - discount);
      }, 0);
      setSumOfSales(totalSales);

      // Calculate revenue
      let totalRevenue = 0;

      orders.forEach((order) => {
        const { category, modelName, orderObject, quantity, paymentObject } =
          order;
        const product = products.find(
          (prod) =>
            prod.category === category &&
            prod.modelName === modelName &&
            (!prod.productObject ||
              !orderObject ||
              (prod.productObject.company === orderObject.company &&
                prod.productObject.specs === orderObject.specs &&
                prod.productObject.color === orderObject.color))
        );

        const price = Number(paymentObject?.price || 0);
        const discount = Number(paymentObject?.discount || 0);
        const costPerUnit = Number(product?.amount || 0);
        const costTotal = costPerUnit * (quantity || 0);

        totalRevenue += price - discount - costTotal;
      });

      setRevenue(totalRevenue);
    } catch (err) {
      console.error("Error loading sales or products", err);
    }
  };

  const recentOrders = [...orderList]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="mb-[2vh]">
        <h1 className="text-4xl text-center font-bold text-slate-800">
          Dashboard
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-lg shadow p-5 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <FaUsers className="text-3xl text-indigo-800" />
            <div>
              <p className="text-sm text-gray-500 ">Total Customers</p>
              <p className="text-2xl font-semibold text-indigo-800">
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
              <p className="text-2xl font-semibold text-teal-600">
                {sumOfQuantity || "--"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow p-5 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <FaMoneyBillWave className="text-3xl text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Sales This Month</p>
              <p className="text-2xl font-semibold text-green-600">
                ₹{sumOfSales || "--"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow p-5 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <FaChartLine className="text-3xl text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Revenue This Month</p>
              <p className="text-2xl font-semibold text-yellow-500">
                ₹{revenue || "--"}
              </p>
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
                <th className="px-4 py-3">Phone Number</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Model Name</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Amount</th>
                
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50 transition"
                >
                  <td className="px-4 py-3 text-slate-700">
                    {order.customerObject?.name || "--"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {order.customerObject?.phoneNumber || "--"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {order.orderObject?.company || "--"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {order.modelName || "--"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {order.quantity || "--"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    ₹
                    {Number(order.paymentObject?.price || 0) -
                      Number(order.paymentObject?.discount || 0)}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
