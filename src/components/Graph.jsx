import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';

const Graphs = ({ orders }) => {
  const COLORS = [
      '#36A2EB', // Sky Blue
      '#B0C4DE',  // Light Blue Gray
    '#4682B4', // Steel Blue
  '#0A66C2', // Corporate Blue

  '#003f5c', // Navy Blue
  

];


  // --- Date Helpers ---
  const today = dayjs();
  const last7Days = [...Array(7).keys()]
    .map(i => today.subtract(i, 'day').format('YYYY-MM-DD'))
    .reverse();

  // --- Bar Chart Data: Last 7 Days Sales ---
  const dailySales = last7Days.map(dateStr => {
    const total = orders
      .filter(order => dayjs(order.date).format('YYYY-MM-DD') === dateStr)
      .reduce((sum, order) => sum + (parseFloat(order.paymentObject?.price || 0) - parseFloat(order.paymentObject?.discount || 0)), 0);
    return { date: dateStr, sales: total };
  });

  // --- Pie Chart Data: Monthly Category Sales ---
  const categorySales = {};
  const currentMonth = today.format('YYYY-MM');

  orders.forEach(order => {
    if (dayjs(order.date).format('YYYY-MM') === currentMonth) {
      const category = order.category || 'UNKNOWN';
      const sale = parseFloat(order.paymentObject?.price || 0) - parseFloat(order.paymentObject?.discount || 0);
      categorySales[category] = (categorySales[category] || 0) + sale;
    }
  });

  const pieData = Object.entries(categorySales).map(([name, value]) => ({ name, value }));

  return (
    <div className="flex lg:flex-row gap-10 justify-center items-center w-full">
      {/* Bar Chart */}
      <div className="h-[50vh] lg:w-1/2 bg-white shadow-md rounded-lg p-8">
        <h3 className="text-center text-lg font-semibold mb-2 text-gray-700">Last 7 Days Sales</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailySales}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#21C55D" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="h-[50vh] lg:w-1/2 bg-white shadow-md rounded-lg p-8">
        <h3 className="text-center text-lg font-semibold mb-2 text-gray-700">Monthly Category Sales Ratio</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="60%"
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graphs;
