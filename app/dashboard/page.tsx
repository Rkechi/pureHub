"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Droplets,
  Wind,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";

export default function DashboardHome() {
  const [realtimeData, setRealtimeData] = useState({
    vocLevel: 0.42,
    humidity: 48,
    waterUsed: 2.3,
    lastCleaned: "10 mins ago",
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData((prev) => ({
        ...prev,
        vocLevel: parseFloat((Math.random() * 0.8).toFixed(2)),
        humidity: 45 + Math.random() * 10,
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      title: "VOC Level",
      value: realtimeData.vocLevel,
      unit: "ppm",
      icon: Wind,
      trend: -12,
      status: realtimeData.vocLevel < 0.5 ? "good" : "warning",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Water Usage",
      value: realtimeData.waterUsed,
      unit: "L/day",
      icon: Droplets,
      trend: -8,
      status: "good",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Humidity",
      value: Math.round(realtimeData.humidity),
      unit: "%",
      icon: Activity,
      trend: 5,
      status: "good",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Areas Cleaned",
      value: 12,
      unit: "today",
      icon: CheckCircle,
      trend: 15,
      status: "good",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const recentActivities = [
    { area: "Lobby", time: "10 mins ago", status: "completed", cleaner: "John D." },
    { area: "Restroom A", time: "25 mins ago", status: "completed", cleaner: "Sarah M." },
    { area: "Kitchen", time: "1 hour ago", status: "completed", cleaner: "Emily L." },
  ];

  const alerts = [
    {
      type: "warning",
      message: "High VOC levels detected in Restroom B",
      time: "5 mins ago",
    },
    {
      type: "info",
      message: "Routine cleaning scheduled for Kitchen area",
      time: "30 mins ago",
    },
    {
      type: "warning",
      message: "Low water pressure detected in supply tank",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Real-time monitoring and analytics</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold">Live</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-center mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div
                    className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                      metric.trend > 0
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    <TrendingUp
                      className={`w-3 h-3 ${
                        metric.trend > 0 ? "rotate-180" : ""
                      }`}
                    />
                    {Math.abs(metric.trend)}%
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">{metric.title}</p>
                  <div className="flex items-baseline gap-2">
                    <motion.span
                      key={metric.value}
                      initial={{ opacity: 0.4, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl font-bold text-gray-900"
                    >
                      {metric.value}
                    </motion.span>
                    <span className="text-gray-500 text-sm">{metric.unit}</span>
                  </div>
                </div>
                <div
                  className={`mt-4 h-1 rounded-full ${
                    metric.status === "good" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-2xl px-6 shadow-lg">
            <div className="flex justify-between items-center mb-6 pt-3">
              <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
              <a
                href="/dashboard/logs"
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
              >
                View All →
              </a>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{activity.area}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-3 h-3" />
                        {activity.cleaner}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                      {activity.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Alerts</h2>
            <div className="space-y-4">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border-l-4 ${
                    alert.type === "warning"
                      ? "bg-yellow-50 border-yellow-500"
                      : "bg-blue-50 border-blue-500"
                  }`}
                >
                  <div className="flex gap-3">
                    <AlertTriangle
                      className={`w-5 h-5 flex-shrink-0 ${
                        alert.type === "warning"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <a
                  href="/dashboard/logs"
                  className="block w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-center font-semibold text-sm"
                >
                  Add New Log
                </a>
                <a
                  href="/dashboard/reports"
                  className="block w-full px-3 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-center font-semibold text-sm"
                >
                  Generate Report
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact Summary */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 shadow-lg text-white mt-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Today's Environmental Impact</h2>
              <p className="text-green-100">Your contribution to sustainability</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Activity className="w-8 h-8" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div>
              <p className="text-green-100 text-sm mb-1">Water Saved</p>
              <p className="text-3xl font-bold">18.5L</p>
            </div>
            <div>
              <p className="text-green-100 text-sm mb-1">
                CO<sub>2</sub> Reduced
              </p>
              <p className="text-2xl font-bold">4.2kg</p>
            </div>
            <div>
              <p className="text-green-100 text-sm mb-1">Efficiency</p>
              <p className="text-3xl font-bold">94%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
