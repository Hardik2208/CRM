import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Users,
  ShoppingCart,
  BarChart2,
  BadgeAlert,
  TrendingUp,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [sumOfQuantity, setSumOfQuantity] = useState(0);
  const [sumOfSales, setSumOfSales] = useState(0);
  const [productList, setProductList] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getCustomerData();
    getSalesThisMonth();
    getProductData();
  }, []);

  const getCustomerData = () => {
    axios
      .get("https://shop-software.onrender.com/api/customer")
      .then((res) => setCustomerList(res.data))
      .catch((err) => console.log(err));
  };

  const getProductData = () => {
    axios
      .get("https://shop-software.onrender.com/api/product")
      .then((res) => {
        const lowStock = res.data.filter((item) => item.quantity <= 2);
        setProductList(lowStock);
      })
      .catch((err) => console.log(err));
  };

  const getSalesThisMonth = async () => {
    try {
      const [orderRes, productRes] = await Promise.all([
        axios.get("https://shop-software.onrender.com/api/order/month"),
        axios.get("https://shop-software.onrender.com/api/product"),
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
    <div className="p-8 bg-white h-[100vh] overflow-auto">
      {/* Header */}
      <div className="mb-[2vh]">
        <h1 className="text-4xl mb-[5vh] font-bold text-black">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className=" border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-sm font-medium ">Total Customers</p>
              <Users className="text-3xl text-[#27548A]" />
            </div>
            <p className="text-2xl font-semibold text-[#27548A] ">
              {customerList.length || "--"}
            </p>
          </div>
        </div>

        <div className=" border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Items Sold (Month)</p>
              <ShoppingCart className="text-3xl text-[#27548A]" />
            </div>
            <p className="text-2xl font-semibold text-[#27548A]">
              {sumOfQuantity || "--"}
            </p>
          </div>
        </div>

        <div className=" border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Sales This Month</p>
              <BarChart2 className="text-3xl text-[#27548A]" />
            </div>
            <p className="text-2xl font-semibold text-[#27548A]">
              ₹{sumOfSales || "--"}
            </p>
          </div>
        </div>

        <div className=" border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-sm font-medium">Revenue This Month</p>
              <TrendingUp className="text-3xl text-[#27548A]" />
            </div>
            <p className="text-2xl font-semibold text-[#27548A]">
              ₹{revenue || "--"}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className=" rounded-lg border border-gray-200 p-6">
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
                  className="odd: even:bg-gray-50 hover:bg-indigo-50 transition"
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
      <div className=" border border-gray-200 rounded-lg p-5 hover:shadow-md transition mt-10 w-[50%]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-red-500">Low Stock</p>
            <BadgeAlert className="text-3xl text-red-500" />
          </div>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr
                  key={product._id}
                  className="odd: even:bg-gray-50 hover:bg-indigo-50 transition"
                >
                  <td className="px-4 py-3 text-slate-700">
                    {product.category || "--"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {product.productObject.company || "--"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {product.modelName || "--"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {product.quantity || "--"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {product.amount || "--"}
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
