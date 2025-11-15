"use client";
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Calendar,
  MapPin,
  User,
  Droplets,
  Wind,
  Thermometer,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Save
} from 'lucide-react';

export default function LogsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newLog, setNewLog] = useState({
    area: '',
    cleaner: '',
    waterUsed: '',
    vocLevel: '',
    temperature: '',
    humidity: '',
    tools: '',
    notes: ''
  });

  const logs = [
    {
      id: 1,
      area: "Lobby",
      cleaner: "John Doe",
      timestamp: "2024-11-15 09:30 AM",
      vocLevel: 0.32,
      waterUsed: 1.8,
      temperature: 22,
      humidity: 48,
      tools: ["Mop", "Vacuum", "Disinfectant"],
      status: "completed",
      blockchainHash: "0x1234567890abcdef",
      verified: true
    },
    {
      id: 2,
      area: "Conference Room A",
      cleaner: "Sarah Smith",
      timestamp: "2024-11-15 08:15 AM",
      vocLevel: 0.45,
      waterUsed: 2.1,
      temperature: 21,
      humidity: 52,
      tools: ["Duster", "Glass Cleaner", "Vacuum"],
      status: "completed",
      blockchainHash: "0xabcdef1234567890",
      verified: true
    },
    {
      id: 3,
      area: "Restroom B",
      cleaner: "Mike Johnson",
      timestamp: "2024-11-15 07:45 AM",
      vocLevel: 0.68,
      waterUsed: 3.2,
      temperature: 23,
      humidity: 55,
      tools: ["Toilet Cleaner", "Mop", "Disinfectant"],
      status: "completed",
      blockchainHash: "0x7890abcdef123456",
      verified: true
    },
    {
      id: 4,
      area: "Kitchen",
      cleaner: "Emily Brown",
      timestamp: "2024-11-15 10:00 AM",
      vocLevel: 0.28,
      waterUsed: 2.5,
      temperature: 24,
      humidity: 50,
      tools: ["Degreaser", "Sponge", "Sanitizer"],
      status: "in-progress",
      blockchainHash: null,
      verified: false
    },
    {
      id: 5,
      area: "Office Floor 2",
      cleaner: "David Lee",
      timestamp: "2024-11-15 06:30 AM",
      vocLevel: 0.38,
      waterUsed: 1.9,
      temperature: 22,
      humidity: 47,
      tools: ["Vacuum", "Duster", "Polish"],
      status: "completed",
      blockchainHash: "0x456789abcdef0123",
      verified: true
    }
  ];

  const handleAddLog = () => {
    console.log("Adding new log:", newLog);
    setShowAddModal(false);
    // Reset form
    setNewLog({
      area: '',
      cleaner: '',
      waterUsed: '',
      vocLevel: '',
      temperature: '',
      humidity: '',
      tools: '',
      notes: ''
    });
  };

  const filteredLogs = logs.filter(log => {
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchesSearch = log.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.cleaner.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cleaning Logs</h1>
            <p className="text-gray-600 mt-1">Track and verify all cleaning activities</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Log
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by area or cleaner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                  filterStatus === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                  filterStatus === 'completed'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilterStatus('in-progress')}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                  filterStatus === 'in-progress'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm mb-1">Total Logs</p>
            <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {logs.filter(l => l.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm mb-1">In Progress</p>
            <p className="text-2xl font-bold text-yellow-600">
              {logs.filter(l => l.status === 'in-progress').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm mb-1">Verified</p>
            <p className="text-2xl font-bold text-blue-600">
              {logs.filter(l => l.verified).length}
            </p>
          </div>
        </div>

        {/* Logs List */}
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div key={log.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      log.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {log.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Clock className="w-6 h-6 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{log.area}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {log.cleaner}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {log.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {log.verified && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      log.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {log.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Wind className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-600">VOC Level</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{log.vocLevel} <span className="text-sm font-normal">ppm</span></p>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="w-4 h-4 text-cyan-600" />
                      <span className="text-xs text-gray-600">Water Used</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{log.waterUsed} <span className="text-sm font-normal">L</span></p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Thermometer className="w-4 h-4 text-orange-600" />
                      <span className="text-xs text-gray-600">Temperature</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{log.temperature} <span className="text-sm font-normal">°C</span></p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="w-4 h-4 text-purple-600" />
                      <span className="text-xs text-gray-600">Humidity</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{log.humidity} <span className="text-sm font-normal">%</span></p>
                  </div>
                </div>

                {/* Tools and Blockchain */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {log.tools.map((tool, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                  {log.blockchainHash && (
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Blockchain Hash</p>
                      <code className="text-xs font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {log.blockchainHash.substring(0, 16)}...
                      </code>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Export Button */}
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export All Logs
          </button>
        </div>
      </div>

      {/* Add Log Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Cleaning Log</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Area / Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={newLog.area}
                      onChange={(e) => setNewLog({...newLog, area: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="e.g., Lobby, Office Floor 2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cleaner Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={newLog.cleaner}
                      onChange={(e) => setNewLog({...newLog, cleaner: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter cleaner name"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Water Used (Liters)
                  </label>
                  <div className="relative">
                    <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.1"
                      value={newLog.waterUsed}
                      onChange={(e) => setNewLog({...newLog, waterUsed: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="0.0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    VOC Level (ppm)
                  </label>
                  <div className="relative">
                    <Wind className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      step="0.01"
                      value={newLog.vocLevel}
                      onChange={(e) => setNewLog({...newLog, vocLevel: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <div className="relative">
                    <Thermometer className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={newLog.temperature}
                      onChange={(e) => setNewLog({...newLog, temperature: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="22"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Humidity (%)
                  </label>
                  <div className="relative">
                    <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={newLog.humidity}
                      onChange={(e) => setNewLog({...newLog, humidity: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tools Used (comma-separated)
                </label>
                <input
                  type="text"
                  value={newLog.tools}
                  onChange={(e) => setNewLog({...newLog, tools: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g., Mop, Vacuum, Disinfectant"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  value={newLog.notes}
                  onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Any additional observations..."
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLog}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}