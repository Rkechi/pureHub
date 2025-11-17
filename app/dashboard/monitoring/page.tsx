"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  Wind,
  Droplets,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Users,
  Wifi,
  WifiOff,
  TrendingUp,
  TrendingDown,
  Zap,
  Clock,
} from "lucide-react";

// 🔥 FIX: Sensor Type Definition (allows null values safely)
type Sensor = {
  id: number;
  area: string;
  status: "active" | "warning" | "cleaning" | "offline";
  vocLevel: number | null;
  humidity: number | null;
  temperature: number | null;
  waterUsage: number | null;
  lastCleaned: string;
  cleaner: string | null;
  alerts: string[];
};

export default function LiveMonitoringPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedArea, setSelectedArea] = useState<Sensor | null>(null);

  const [sensors, setSensors] = useState<Sensor[]>([
    {
      id: 1,
      area: "Lobby",
      status: "active",
      vocLevel: 0.42,
      humidity: 48,
      temperature: 22,
      waterUsage: 2.3,
      lastCleaned: "2 hours ago",
      cleaner: "Sarah Johnson",
      alerts: [],
    },
    {
      id: 2,
      area: "Conference Room A",
      status: "warning",
      vocLevel: 0.76,
      humidity: 54,
      temperature: 25,
      waterUsage: 1.8,
      lastCleaned: "3 hours ago",
      cleaner: "Victor Ade",
      alerts: ["High VOC Levels"],
    },
    {
      id: 3,
      area: "Hallway 1F",
      status: "cleaning",
      vocLevel: 0.30,
      humidity: 47,
      temperature: 23,
      waterUsage: 3.2,
      lastCleaned: "15 minutes ago",
      cleaner: "Janet O.",
      alerts: ["Cleaning in progress"],
    },
    {
      id: 4,
      area: "Restroom – West",
      status: "active",
      vocLevel: 0.52,
      humidity: 60,
      temperature: 24,
      waterUsage: 4.1,
      lastCleaned: "1 hour ago",
      cleaner: "Ola James",
      alerts: [],
    },
    {
      id: 5,
      area: "Storage Room",
      status: "warning",
      vocLevel: 0.91,
      humidity: 65,
      temperature: 27,
      waterUsage: 2.9,
      lastCleaned: "5 hours ago",
      cleaner: "Unknown",
      alerts: ["Poor ventilation", "High temperature"],
    },
    {
      id: 6,
      area: "Cafeteria",
      status: "offline",
      vocLevel: null,
      humidity: null,
      temperature: null,
      waterUsage: null,
      lastCleaned: "2 hours ago",
      cleaner: null,
      alerts: ["Sensor offline"],
    },
  ]);

  // Real-time updates (unchanged)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());

      setSensors((prev) =>
        prev.map((sensor) => {
          if (sensor.status === "offline") return sensor;

          return {
            ...sensor,
            vocLevel: parseFloat(
              (sensor.vocLevel! + (Math.random() - 0.5) * 0.05).toFixed(2)
            ),
            humidity: Math.max(
              30,
              Math.min(70, sensor.humidity! + Math.floor(Math.random() * 3 - 1))
            ),
            temperature: Math.max(
              18,
              Math.min(
                30,
                sensor.temperature! + Math.floor(Math.random() * 3 - 1)
              )
            ),
          };
        })
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-600" />
          Live Monitoring
        </h1>
        <span className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          {currentTime.toLocaleTimeString()}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sensors.map((sensor) => (
          <div
            key={sensor.id}
            onClick={() => setSelectedArea(sensor)}
            className={`cursor-pointer p-5 rounded-xl border shadow-sm transition-all hover:shadow-md ${
              sensor.status === "warning"
                ? "border-yellow-400 bg-yellow-50"
                : sensor.status === "cleaning"
                ? "border-blue-400 bg-blue-50"
                : sensor.status === "offline"
                ? "border-gray-400 bg-gray-100"
                : "border-green-400 bg-green-50"
            }`}
          >
            <div className="flex justify-between">
              <h2 className="font-semibold text-lg">{sensor.area}</h2>
              {sensor.status === "offline" ? (
                <WifiOff className="text-gray-600" />
              ) : (
                <Wifi className="text-green-600" />
              )}
            </div>

            <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
              <Users className="w-4 h-4" />
              Cleaner: {sensor.cleaner ?? "No data"}
            </p>

            <div className="mt-4 space-y-2">
              <p className="text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-600" />
                VOC: {sensor.vocLevel ?? "N/A"}
              </p>

              <p className="text-sm flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-600" />
                Humidity: {sensor.humidity ?? "N/A"}%
              </p>

              <p className="text-sm flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-500" />
                Temp: {sensor.temperature ?? "N/A"}°C
              </p>
            </div>

            {sensor.alerts.length > 0 && (
              <div className="mt-3 text-xs text-red-600 font-semibold">
                ⚠ {sensor.alerts.join(", ")}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Area Drawer */}
      {selectedArea && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl p-6 border-t">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{selectedArea.area}</h2>
            <button
              onClick={() => setSelectedArea(null)}
              className="text-gray-500 hover:text-black"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <p>Status: {selectedArea.status}</p>
            <p>VOC: {selectedArea.vocLevel ?? "N/A"}</p>
            <p>Humidity: {selectedArea.humidity ?? "N/A"}%</p>
            <p>Temperature: {selectedArea.temperature ?? "N/A"}°C</p>
            <p>Water Usage: {selectedArea.waterUsage ?? "N/A"}L</p>
            <p>Cleaner: {selectedArea.cleaner ?? "N/A"}</p>
          </div>

          {selectedArea.alerts.length > 0 && (
            <div className="mt-4 text-red-600">
              <strong>Alerts:</strong> {selectedArea.alerts.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
