"use client";
import { useState, useEffect } from 'react';
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
  Clock
} from 'lucide-react';

export default function LiveMonitoringPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedArea, setSelectedArea] = useState(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time sensor data
  const [sensors, setSensors] = useState([
    {
      id: 1,
      area: "Lobby",
      status: "active",
      vocLevel: 0.32,
      humidity: 48,
      temperature: 22,
      waterUsage: 1.8,
      lastCleaned: "10 mins ago",
      cleaner: "John Doe",
      alerts: []
    },
    {
      id: 2,
      area: "Conference Room A",
      status: "active",
      vocLevel: 0.45,
      humidity: 52,
      temperature: 21,
      waterUsage: 2.1,
      lastCleaned: "25 mins ago",
      cleaner: "Sarah Smith",
      alerts: []
    },
    {
      id: 3,
      area: "Restroom B",
      status: "warning",
      vocLevel: 0.68,
      humidity: 65,
      temperature: 23,
      waterUsage: 3.2,
      lastCleaned: "45 mins ago",
      cleaner: "Mike Johnson",
      alerts: ["High VOC level detected"]
    },
    {
      id: 4,
      area: "Kitchen",
      status: "cleaning",
      vocLevel: 0.28,
      humidity: 50,
      temperature: 24,
      waterUsage: 2.5,
      lastCleaned: "Now",
      cleaner: "Emily Brown",
      alerts: []
    },
    {
      id: 5,
      area: "Office Floor 2",
      status: "active",
      vocLevel: 0.38,
      humidity: 47,
      temperature: 22,
      waterUsage: 1.9,
      lastCleaned: "1 hour ago",
      cleaner: "David Lee",
      alerts: []
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
      alerts: ["Sensor offline"]
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        vocLevel: sensor.status !== 'offline' ? parseFloat((Math.random() * 0.8).toFixed(2)) : null,
        humidity: sensor.status !== 'offline' ? Math.round(45 + Math.random() * 15) : null,
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const systemStats = {
    totalSensors: sensors.length,
    activeSensors: sensors.filter(s => s.status === 'active' || s.status === 'cleaning').length,
    offlineSensors: sensors.filter(s => s.status === 'offline').length,
    warnings: sensors.filter(s => s.status === 'warning').length,
    uptime: 99.8
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-500';
      case 'cleaning': return 'bg-blue-100 text-blue-700 border-blue-500';
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-500';
      case 'offline': return 'bg-red-100 text-red-700 border-red-500';
      default: return 'bg-gray-100 text-gray-700 border-gray-500';
    }
  };

  const getVOCStatus = (voc) => {
    if (voc === null) return 'offline';
    if (voc < 0.4) return 'good';
    if (voc < 0.6) return 'moderate';
    return 'high';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Live Indicator */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Live Monitoring</h1>
              <div className="flex items-center gap-2 px-3 py-1 bg-red-100 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-700 font-semibold text-sm">LIVE</span>
              </div>
            </div>
            <p className="text-gray-600">Real-time sensor data and cleaning activity</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm text-gray-600">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Total Sensors</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{systemStats.totalSensors}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Active</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{systemStats.activeSensors}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">Warnings</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{systemStats.warnings}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-center gap-2 mb-2">
              <WifiOff className="w-5 h-5 text-red-600" />
              <span className="text-sm text-gray-600">Offline</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{systemStats.offlineSensors}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Uptime</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{systemStats.uptime}%</p>
          </div>
        </div>

        {/* Sensor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensors.map((sensor) => (
            <div
              key={sensor.id}
              onClick={() => setSelectedArea(sensor)}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-l-4 ${
                sensor.status === 'warning' ? 'border-yellow-500' :
                sensor.status === 'offline' ? 'border-red-500' :
                sensor.status === 'cleaning' ? 'border-blue-500' :
                'border-green-500'
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${getStatusColor(sensor.status).split(' ')[0]} rounded-lg flex items-center justify-center`}>
                    <MapPin className={`w-5 h-5 ${getStatusColor(sensor.status).split(' ')[1]}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{sensor.area}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(sensor.status)}`}>
                      {sensor.status}
                    </span>
                  </div>
                </div>
                {sensor.status !== 'offline' && (
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>

              {/* Metrics */}
              {sensor.status !== 'offline' ? (
                <div className="space-y-3">
                  {/* VOC Level */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">VOC Level</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{sensor.vocLevel} ppm</span>
                      {getVOCStatus(sensor.vocLevel) === 'good' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : getVOCStatus(sensor.vocLevel) === 'moderate' ? (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>

                  {/* Humidity */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-cyan-600" />
                      <span className="text-sm text-gray-600">Humidity</span>
                    </div>
                    <span className="font-bold text-gray-900">{sensor.humidity}%</span>
                  </div>

                  {/* Temperature */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-600">Temperature</span>
                    </div>
                    <span className="font-bold text-gray-900">{sensor.temperature}°C</span>
                  </div>

                  {/* Water Usage */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Water Usage</span>
                    </div>
                    <span className="font-bold text-gray-900">{sensor.waterUsage}L</span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <WifiOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Sensor offline</p>
                </div>
              )}

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                {sensor.cleaner && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    {sensor.cleaner}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  Last cleaned: {sensor.lastCleaned}
                </div>
              </div>

              {/* Alerts */}
              {sensor.alerts.length > 0 && (
                <div className="mt-3">
                  {sensor.alerts.map((alert, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                      <span className="text-yellow-800">{alert}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Active Alerts */}
        {systemStats.warnings > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-yellow-900 mb-2">Active Warnings</h3>
                <ul className="space-y-2">
                  {sensors.filter(s => s.alerts.length > 0).map((sensor, i) => (
                    <li key={i} className="text-yellow-800">
                      <strong>{sensor.area}:</strong> {sensor.alerts.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        )}

        {/* Real-time Activity Feed */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-600" />
            Real-time Activity Feed
          </h2>
          <div className="space-y-3">
            {[
              { time: "Just now", action: "Kitchen cleaning started", user: "Emily Brown", type: "start" },
              { time: "2 mins ago", action: "Restroom B VOC level elevated", user: "System", type: "alert" },
              { time: "5 mins ago", action: "Lobby cleaning completed", user: "John Doe", type: "complete" },
              { time: "8 mins ago", action: "Conference Room A sensor update", user: "System", type: "update" },
              { time: "12 mins ago", action: "Office Floor 2 cleaning started", user: "David Lee", type: "start" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'alert' ? 'bg-yellow-500' :
                  activity.type === 'complete' ? 'bg-green-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedArea && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedArea(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedArea.area}</h2>
                <span className={`inline-block mt-2 px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(selectedArea.status)}`}>
                  {selectedArea.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedArea(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <Wind className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-sm text-gray-600">VOC Level</p>
                <p className="text-2xl font-bold text-gray-900">{selectedArea.vocLevel} ppm</p>
              </div>
              <div className="bg-cyan-50 rounded-xl p-4">
                <Droplets className="w-6 h-6 text-cyan-600 mb-2" />
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="text-2xl font-bold text-gray-900">{selectedArea.humidity}%</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <Thermometer className="w-6 h-6 text-orange-600 mb-2" />
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-2xl font-bold text-gray-900">{selectedArea.temperature}°C</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <Activity className="w-6 h-6 text-green-600 mb-2" />
                <p className="text-sm text-gray-600">Water Usage</p>
                <p className="text-2xl font-bold text-gray-900">{selectedArea.waterUsage}L</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-2">Assigned Cleaner</p>
              <p className="font-semibold text-gray-900">{selectedArea.cleaner || 'Not assigned'}</p>
              <p className="text-sm text-gray-600 mt-3 mb-1">Last Cleaned</p>
              <p className="font-semibold text-gray-900">{selectedArea.lastCleaned}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}