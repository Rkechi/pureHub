"use client";
import { useState } from "react";
import { FileText, Plus, Loader2, Shield, Droplets, Beaker } from "lucide-react";
import { useCleaningLogs } from "@/hooks/useCleaningLogs";

export default function LogsPage() {
  const { logs, loading, error, addLog } = useCleaningLogs();
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [newLog, setNewLog] = useState({
    area: "",
    cleaner: "",
    duration: "",
    vocLevel: "",
    waterUsed: "",
    chemicalUsed: "",
  });

  const handleAddLog = async () => {
    setActionLoading(true);
    const result = await addLog({
      ...newLog,
      timestamp: new Date(),
      duration: parseInt(newLog.duration),
      vocLevel: parseFloat(newLog.vocLevel),
      waterUsed: parseFloat(newLog.waterUsed),
      chemicalUsed: parseFloat(newLog.chemicalUsed),
    } as any);

    if (result.success) {
      setShowAddModal(false);
      setNewLog({
        area: "",
        cleaner: "",
        duration: "",
        vocLevel: "",
        waterUsed: "",
        chemicalUsed: "",
      });
    } else {
      alert(result.error || "Failed to add log");
    }
    setActionLoading(false);
  };

  if (loading) {
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
            <h1 className="text-3xl font-bold text-gray-900">Cleaning Logs</h1>
            <p className="text-gray-600 mt-1">Track and verify cleaning activities</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Log
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-800 text-sm">Total Logs</p>
            <p className="text-2xl text-gray-600 font-bold">{logs.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-800 text-sm">Blockchain Verified</p>
            <p className="text-2xl font-bold text-green-600">
              {logs.filter(l => l.blockchainHash).length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm">Today</p>
            <p className="text-2xl font-bold text-blue-600">
              {logs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm">This Week</p>
            <p className="text-2xl font-bold text-purple-600">
              {logs.filter(l => {
                const logDate = new Date(l.timestamp);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return logDate >= weekAgo;
              }).length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Recent Logs
          </h2>

          {logs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No logs recorded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log._id}
                  className="p-4 rounded-xl border bg-gray-50 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">{log.area}</h3>
                        {log.blockchainHash && (
                          <Shield className="w-5 h-5 text-green-600" title="Blockchain verified" />
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600">
                        <div>
                          <p className="text-xs text-gray-500">Cleaner</p>
                          <p className="font-semibold">{log.cleaner}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="font-semibold">{log.duration} min</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">VOC Level</p>
                          <p className="font-semibold">{log.vocLevel} ppb</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Water</p>
                          <p className="font-semibold">{log.waterUsed} L</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Chemical</p>
                          <p className="font-semibold">{log.chemicalUsed} ml</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Cleaning Log</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Area *</label>
                  <input
                    type="text"
                    value={newLog.area}
                    onChange={(e) => setNewLog({ ...newLog, area: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="Conference Room A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cleaner *</label>
                  <input
                    type="text"
                    value={newLog.cleaner}
                    onChange={(e) => setNewLog({ ...newLog, cleaner: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (min) *</label>
                  <input
                    type="number"
                    value={newLog.duration}
                    onChange={(e) => setNewLog({ ...newLog, duration: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">VOC Level (ppb) *</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newLog.vocLevel}
                    onChange={(e) => setNewLog({ ...newLog, vocLevel: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="25.5"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Water Used (L) *</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newLog.waterUsed}
                    onChange={(e) => setNewLog({ ...newLog, waterUsed: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="15.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Chemical Used (ml) *</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newLog.chemicalUsed}
                    onChange={(e) => setNewLog({ ...newLog, chemicalUsed: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="50.0"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddLog}
                disabled={actionLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Log"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}