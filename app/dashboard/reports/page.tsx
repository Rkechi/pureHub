"use client";
import { BarChart3, Download, Loader2, Leaf, Users, Shield } from "lucide-react";
import { useESGReports } from "@/hooks/useESGReports";

export default function ReportsPage() {
  const { data, loading, error, fetchReport } = useESGReports();

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
            <h1 className="text-3xl font-bold text-gray-900">ESG Reports</h1>
            <p className="text-gray-600 mt-1">Environmental, Social & Governance metrics</p>
          </div>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export PDF
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {data && (
          <>
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Report Period</h2>
                <Leaf className="w-8 h-8" />
              </div>
              <p className="text-lg opacity-90">
                {new Date(data.period.startDate).toLocaleDateString()} - {new Date(data.period.endDate).toLocaleDateString()}
              </p>
            </div>

            {/* Environmental */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Environmental Impact</h2>
              </div>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Total Water Used</p>
                  <p className="text-2xl font-bold text-blue-600">{data.environmental.totalWaterUsed} L</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Water Saved</p>
                  <p className="text-2xl font-bold text-green-600">{data.environmental.waterSaved} L</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Chemical</p>
                  <p className="text-2xl font-bold text-purple-600">{data.environmental.totalChemicalUsed} ml</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Avg VOC Level</p>
                  <p className="text-2xl font-bold text-yellow-600">{data.environmental.avgVOCLevel} ppb</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">CO₂ Reduced</p>
                  <p className="text-2xl font-bold text-emerald-600">{data.environmental.co2Reduced} kg</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Social Impact</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Total Cleanings</p>
                  <p className="text-2xl font-bold text-blue-600">{data.social.totalCleaning}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Areas Served</p>
                  <p className="text-2xl font-bold text-cyan-600">{data.social.areasServed}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Avg Quality Score</p>
                  <p className="text-2xl font-bold text-green-600">{data.social.avgQuality}%</p>
                </div>
              </div>
            </div>

            {/* Governance */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Governance & Compliance</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Blockchain Verified Logs</p>
                  <p className="text-2xl font-bold text-green-600">{data.governance.blockchainVerified}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Compliance Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{data.governance.complianceRate}%</p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">ESG Performance Summary</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="text-sm opacity-90 mb-2">Environmental Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/20 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <span className="font-bold">85%</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="text-sm opacity-90 mb-2">Social Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/20 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${data.social.avgQuality}%` }}></div>
                    </div>
                    <span className="font-bold">{data.social.avgQuality}%</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="text-sm opacity-90 mb-2">Governance Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/20 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: `${data.governance.complianceRate}%` }}></div>
                    </div>
                    <span className="font-bold">{data.governance.complianceRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {!data && !loading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No report data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
