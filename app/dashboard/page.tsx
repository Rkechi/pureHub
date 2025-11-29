"use client";

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
  Loader2,
} from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardHome() {
  const { metrics, recentActivities, environmentalImpact, loading, error } = useDashboard(5000);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Icon mapping
  const iconMap: Record<string, any> = {
    Wind,
    Droplets,
    Activity,
    CheckCircle,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Real-time monitoring and analytics</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-100 text-green-700 rounded-lg text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold">Live</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {metrics.map((metric, i) => {
            const Icon = iconMap[metric.icon];
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-center mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div
                    className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${metric.trend > 0
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                      }`}
                  >
                    <TrendingUp
                      className={`w-3 h-3 ${metric.trend > 0 ? "rotate-180" : ""
                        }`}
                    />
                    {Math.abs(metric.trend)}%
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">{metric.title}</p>
                  <div className="flex items-baseline gap-2">
                    <motion.span
                      key={metric.value.toString()}
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
                  className={`mt-4 h-1 rounded-full ${metric.status === "good" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                ></div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl p-4 sm:px-6 shadow-lg">
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
              {recentActivities.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No recent activities</p>
                </div>
              ) : (
                recentActivities.map((activity, i) => (
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
                ))
              )}
            </div>
          </div>

          {/* Alerts & Quick Actions */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">System Status</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border-l-4 bg-green-50 border-green-500">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">
                      All systems operational
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Last updated: Just now</p>
                  </div>
                </div>
              </div>

              {environmentalImpact.waterSaved > 0 && (
                <div className="p-4 rounded-xl border-l-4 bg-blue-50 border-blue-500">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">
                        Water conservation active
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {environmentalImpact.waterSaved.toFixed(1)}L saved today
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
              <p className="text-3xl font-bold">{environmentalImpact.waterSaved.toFixed(1)}L</p>
            </div>
            <div>
              <p className="text-green-100 text-sm mb-1">
                CO<sub>2</sub> Reduced
              </p>
              <p className="text-2xl font-bold">{environmentalImpact.co2Reduced.toFixed(1)}kg</p>
            </div>
            <div>
              <p className="text-green-100 text-sm mb-1">Efficiency</p>
              <p className="text-3xl font-bold">{Math.round(environmentalImpact.efficiency)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
