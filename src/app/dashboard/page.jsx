"use client";
import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import ProtectedRoute from "../auth/ProtectedRouted";

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        {/* Sidebar */}
        <Sidebar />

        {/* Header */}
        <Header />

        {/* Content */}
        <main className="md:ml-64 p-6 bg-gray-100 min-h-screen z-100">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              {
                label: "Users",
                value: "26K",
                change: "-12.4%",
                color: "bg-purple-500",
              },
              {
                label: "Income",
                value: "$6,200",
                change: "+40.9%",
                color: "bg-blue-500",
              },
              {
                label: "Conversion Rate",
                value: "2.49%",
                change: "+84.7%",
                color: "bg-yellow-500",
              },
              {
                label: "Sessions",
                value: "44K",
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

          {/* Traffic Chart Placeholder */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Traffic (January - July 2023)
            </h3>
            <div className="w-full h-64 bg-gradient-to-r from-white via-gray-100 to-white flex items-center justify-center text-gray-400">
              {/* Ganti bagian ini dengan Chart.js / Recharts nanti */}
              <span>Chart Placeholder</span>
            </div>

            {/* Traffic Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 text-sm text-center">
              <div>
                <p className="font-semibold">Visits</p>
                <p>29,703 Users (40%)</p>
              </div>
              <div>
                <p className="font-semibold">Unique</p>
                <p>24,093 Users (20%)</p>
              </div>
              <div>
                <p className="font-semibold">Pageviews</p>
                <p>78,706 Views (60%)</p>
              </div>
              <div>
                <p className="font-semibold">New Users</p>
                <p>22,123 Users (80%)</p>
              </div>
              <div>
                <p className="font-semibold">Bounce Rate</p>
                <p>40.15%</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default page;
