"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import ProtectedRoute from "../auth/ProtectedRouted";
import { Line } from "react-chartjs-2";
import api from "../lib/api";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Page = () => {
  const [dailyVisitors, setDailyVisitors] = useState([]);
  const [monthlyVisitors, setMonthlyVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const dailyRes = await api.get('/visitors/daily');
        setDailyVisitors(Array.isArray(dailyRes.data) ? dailyRes.data : []);

        const monthlyRes = await api.get('/visitors/monthly');
        setMonthlyVisitors(Array.isArray(monthlyRes.data) ? monthlyRes.data : []);
      } catch (error) {
        console.error("Failed to fetch visitor data", error);
      }
    };

    fetchVisitors();
  }, []);


  const dailyChartData = {
    labels: dailyVisitors.map((d) => d.date),
    datasets: [
      {
        label: "Visitor Harian",
        data: dailyVisitors.map((d) => d.total),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const monthlyChartData = {
    labels: monthlyVisitors.map((d) => d.month),
    datasets: [
      {
        label: "Visitor Bulanan",
        data: monthlyVisitors.map((d) => d.total),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <ProtectedRoute>
      <div>
        <Sidebar />
        <Header />

        <main className="md:ml-64 p-6 bg-gray-100 min-h-screen z-100">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              {
                label: "Total visitor hari ini",
                value: "0",
                change: "-12.4%",
                color: "bg-purple-500",
              },
              {
                label: "Total Blog",
                value: "0",
                change: "+40.9%",
                color: "bg-blue-500",
              },
              {
                label: "Total Perum",
                value: "0",
                change: "+84.7%",
                color: "bg-yellow-500",
              },
              {
                label: "Total Carrier",
                value: "0",
                change: "-23.6%",
                color: "bg-red-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`${item.color} text-white p-4 rounded-lg shadow`}
              >
                <h3 className="text-sm font-medium">{item.label}</h3>
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-sm">{item.change}</div>
              </div>
            ))}
          </div>

          {/* Visitor Harian */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">Grafik Visitor Harian</h3>
            <div className="w-full h-64">
              <Line data={dailyChartData} options={{ ...chartOptions, title: { text: "Visitor Harian" } }} />
            </div>
          </div>

          {/* Visitor Bulanan */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Grafik Visitor Bulanan</h3>
            <div className="w-full h-64">
              <Line data={monthlyChartData} options={{ ...chartOptions, title: { text: "Visitor Bulanan" } }} />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
