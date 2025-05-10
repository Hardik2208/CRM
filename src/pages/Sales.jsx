import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";
import { Button } from "../components/button";
import { Input } from "../components/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/tabs";
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
  FaChartLine,
  FaBoxOpen,
  FaUserTie,
  FaMoneyBillWave,
} from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Sales = () => {
  const [salesList, setSalesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSalesList([
      {
        date: "2025-04-29",
        invoice: "#INV1023",
        customer: "Rahul Mehta",
        products: "AC, TV",
        salesperson: "Anjali Verma",
        total: 42000,
        paymentMode: "UPI",
        status: "Completed",
      },
    ]);
  }, []);

  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Total Sales",
        data: [12000, 15000, 14000, 18000, 17000, 20000, 22000],
        backgroundColor: "#4338ca",
        borderRadius: 6,
      },
    ],
  };

  const categoryData = {
    labels: ["TVs", "ACs", "Refrigerators", "Mobiles", "Laptops"],
    datasets: [
      {
        label: "Sales Category Distribution",
        data: [50, 30, 20, 40, 25],
        backgroundColor: ["#4338ca", "#4f46e5", "#6366f1", "#818cf8", "#a5b4fc"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen h-[100vh] overflow-y-auto">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Sales Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
          <CardHeader className="flex items-center gap-3">
            <FaMoneyBillWave className="text-3xl text-indigo-600" />
            <CardTitle className="">Today's Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">₹22,000</p>
          </CardContent>
        </Card>

        <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
          <CardHeader className="flex items-center gap-3">
            <FaBoxOpen className="text-3xl text-teal-600" />
            <CardTitle className="">Units Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-black">36</p>
          </CardContent>
        </Card>

        <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
          <CardHeader className="flex items-center gap-3 ">
            <FaChartLine className="text-3xl text-green-600" />
            <CardTitle className="">Top Product</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-black">Samsung 55" LED TV</p>
          </CardContent>
        </Card>

        <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
          <CardHeader className="flex items-center gap-3">
            <FaUserTie className="text-3xl text-yellow-500" />
            <CardTitle className="">Top Salesperson</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-black">Anjali Verma</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white rounded-lg shadow-lg transition-transform hover:shadow-xl">
          <CardHeader>
            <CardTitle>Weekly Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={salesData} />
          </CardContent>
        </Card>

        <Card className="bg-white rounded-lg shadow-lg transition-transform hover:shadow-xl">
          <CardHeader>
            <CardTitle>Category Sales Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-[280px] mx-auto">
              <Pie data={categoryData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sales;
