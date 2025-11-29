"use client";
import { Activity, Droplets, Beaker, Thermometer, Wind, Battery, Loader2, RefreshCw } from "lucide-react";
import { useMonitoring } from "@/hooks/useMonitoring";

export default function MonitoringPage() {
  const { latestData, stats, loading, error, refresh } = useMonitoring(30000); // Poll every 30s

  if (loading && !latestData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Real-Time Monitoring</h1>
            <p className="text-gray-600 mt-1">IoT sensors tracking environmental data</p>
          </div>
          <button
            onClick={refresh}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {latestData && (
          <>
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Latest Reading</h2>
                <div className="text-sm opacity-90">
                  {new Date(latestData.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-5 h-5" />
                    <span className="text-sm  opacity-90">VOC Level</span>
                  </div>
                  <p className="text-3xl font-bold">{latestData.vocLevel.toFixed(1)} ppb</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5" />
                    <span className="text-sm opacity-90">Water Usage</span>
                  </div>
                  <p className="text-3xl font-bold">{latestData.waterUsage.toFixed(1)} L</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Beaker className="w-5 h-5" />
                    <span className="text-sm opacity-90">Chemical</span>
                  </div>
                  <p className="text-3xl font-bold">{latestData.chemicalUsage.toFixed(1)} ml</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-5 h-5" />
                    <span className="text-sm opacity-90">Temperature</span>
                  </div>
                  <p className="text-3xl font-bold">{latestData.temperature.toFixed(1)}°C</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="text-gray-600 text-sm mb-1">Humidity</p>
                <p className="text-2xl font-bold text-blue-600">{latestData.humidity.toFixed(1)}%</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="text-gray-600 text-sm mb-1">Air Quality</p>
                <p className="text-2xl font-bold text-green-600">{latestData.airQuality.toFixed(0)} AQI</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="text-gray-600 text-sm mb-1">Battery</p>
                <div className="flex items-center gap-2">
                  <Battery className="w-5 h-5 text-gray-600" />
                  <p className="text-2xl font-bold text-cyan-600">{latestData.battery.toFixed(0)}%</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="text-gray-600 text-sm mb-1">Signal</p>
                <p className="text-2xl font-bold text-gray-700">{latestData.signal.toFixed(0)}%</p>
              </div>
            </div>
          </>
        )}

        {stats && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Historical Averages</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Avg VOC</p>
                <p className="text-xl font-bold text-blue-600">{stats.avgVocLevel.toFixed(1)} ppb</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Avg Water</p>
                <p className="text-xl font-bold text-cyan-600">{stats.avgWaterUsage.toFixed(1)} L</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Avg Chemical</p>
                <p className="text-xl font-bold text-purple-600">{stats.avgChemicalUsage.toFixed(1)} ml</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Avg Temp</p>
                <p className="text-xl font-bold text-orange-600">{stats.avgTemperature.toFixed(1)}°C</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Avg Humidity</p>
                <p className="text-xl font-bold text-green-600">{stats.avgHumidity.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Readings</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalReadings}</p>
              </div>
            </div>
          </div>
        )}

        {!latestData && !loading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No sensor data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
