import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import Graphs from "../components/Graph";
import dayjs from "dayjs";

import Loader from '../components/loader';

import Sidebar from "../components/Sidebar";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  ChartLine,
  ChartNoAxesCombined,
  ClipboardList,
  FileChartColumn,
  IndianRupee,
  BadgeIndianRupee,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);
const Sales = () => {
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);

  const [loading, setLoading] = useState(true);

  const getOrder = () => {
    axios
      .get("https://shop-software.onrender.com/api/order/month")
      .then((res) => {
        setOrderList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProduct = () => {
    axios
      .get("https://shop-software.onrender.com/api/product")
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrder();
    getProduct();
  }, []);

  const today = dayjs();
  const todayStr = today.format("YYYY-MM-DD");
  const startOfWeek = today.startOf("week"); // Sunday as the start
  const currentMonth = today.format("YYYY-MM");

  // --- Get cost of product from productList ---
  const getProductCost = (modelName, category) => {
    const product = productList.find(
      (p) => p.modelName === modelName && p.category === category
    );
    return product ? (product.amount || 0) * (product.quantity || 1) : 0;
  };

  // --- Net Price (price - discount) ---
  const getNetPrice = (order) => {
    const price = parseFloat(order.paymentObject?.price || 0);
    const discount = parseFloat(order.paymentObject?.discount || 0);
    return price - discount;
  };

  // --- Total Sales Today ---
  const salesToday = orderList
    .filter((order) => dayjs(order.date).format("YYYY-MM-DD") === todayStr)
    .reduce((sum, order) => sum + getNetPrice(order), 0);

  // --- Units Sold Today ---
  const unitsToday = orderList
    .filter((order) => dayjs(order.date).format("YYYY-MM-DD") === todayStr)
    .reduce((sum, order) => sum + (order.quantity || 0), 0);

  // --- Total Sales This Week ---
  const salesThisWeek = orderList
    .filter((order) => dayjs(order.date).isAfter(startOfWeek))
    .reduce((sum, order) => sum + getNetPrice(order), 0);

  // --- Total Orders This Month ---
  const ordersThisMonth = orderList.filter(
    (order) => dayjs(order.date).format("YYYY-MM") === currentMonth
  ).length;

  // --- Gross Revenue (Monthly) ---
  const grossRevenue = orderList
    .filter((order) => dayjs(order.date).format("YYYY-MM") === currentMonth)
    .reduce((sum, order) => {
      const netPrice = getNetPrice(order);
      const productCost = getProductCost(order.modelName, order.category);
      return sum + (netPrice - productCost);
    }, 0);

  // --- Top Selling Category ---
  const categoryCount = {};
  orderList.forEach((order) => {
    if (dayjs(order.date).format("YYYY-MM") === currentMonth) {
      const cat = order.category || "UNKNOWN";
      categoryCount[cat] = (categoryCount[cat] || 0) + (order.quantity || 0);
    }
  });
  const topCategory =
    Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  // --- Top Selling Product ---f
  const productCount = {};
  orderList.forEach((order) => {
    if (dayjs(order.date).format("YYYY-MM") === currentMonth) {
      const model = order.modelName || "UNKNOWN";
      productCount[model] = (productCount[model] || 0) + (order.quantity || 0);
    }
  });
  const topProduct =
    Object.entries(productCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  if (loading) return <Loader />; 

  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <Sidebar />
        <div className="p-8 bg-[#F9FAFB] h-[100vh] overflow-auto w-[90%]">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            Sales Overview
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className=" border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-white">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="text-md font-medium ">Total Sales Today</p>
                  <ChartLine className="text-3xl text-[#9EA8B6]" />
                </div>

                <p className="text-2xl font-semibold text-[#21C55D] ">
                  ₹{salesToday}{" "}
                </p>
              </div>
            </div>
            <div className=" border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-white">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="text-md font-medium ">Unit Sold Today</p>
                  <ClipboardList className="text-3xl text-[#9EA8B6]" />
                </div>
                <p className="text-2xl font-semibold text-black ">
                  {unitsToday}
                </p>
              </div>
            </div>
            <div className=" border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-white">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="text-md font-medium ">Total Sales this Week</p>
                  <ChartNoAxesCombined className="text-3xl text-[#9EA8B6]" />
                </div>
                <p className="text-2xl font-semibold text-[#2ecc71] ">
                  ₹{salesThisWeek}
                </p>
              </div>
            </div>
            <div className=" border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-white">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="text-md font-medium ">
                    Total Orders this Month
                  </p>
                  <FileChartColumn className="text-3xl text-[#9EA8B6]" />
                </div>
                <p className="text-2xl font-semibold text-black ">
                  {ordersThisMonth}
                </p>
              </div>
            </div>
            <div className=" border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-white">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="text-md font-medium ">Gross Revenue(monthly)</p>
                  <IndianRupee className="text-3xl text-[#9EA8B6]" />
                </div>
                <p className="text-2xl font-semibold text-[#DC2625] ">
                  ₹{grossRevenue}{" "}
                </p>
              </div>
            </div>
            <div className=" border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-white">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="text-md font-medium ">Top Selling Category</p>
                  <ClipboardList className="text-3xl text-[#9EA8B6]" />
                </div>
                <p className="text-2xl font-semibold text-black ">
                  {topCategory}
                </p>
              </div>
            </div>
            <div className=" border border-gray-200 rounded-lg p-5 hover:shadow-md transition bg-white">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="text-md font-medium ">Top Selling Product</p>
                  <ClipboardList className="text-3xl text-[#9EA8B6]" />
                </div>
                <p className="text-2xl font-semibold text-black ">
                  {topProduct}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[100%]">
            <Card className="transition-transform">
              <CardHeader>
                <CardTitle>Sales Performance Graph</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <Graphs orders={orderList}></Graphs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
