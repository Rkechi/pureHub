"use client";
import { useState } from 'react';
import { 
  Download, 
  FileText, 
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Droplets,
  Wind,
  Zap,
  CheckCircle,
  Filter
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('overview');

  // Sample data
  const weeklyData = [
    { day: 'Mon', waterUsed: 12.5, vocLevel: 0.35, cleanings: 8 },
    { day: 'Tue', waterUsed: 15.2, vocLevel: 0.42, cleanings: 10 },
    { day: 'Wed', waterUsed: 11.8, vocLevel: 0.38, cleanings: 9 },
    { day: 'Thu', waterUsed: 14.1, vocLevel: 0.31, cleanings: 11 },
    { day: 'Fri', waterUsed: 16.3, vocLevel: 0.45, cleanings: 12 },
    { day: 'Sat', waterUsed: 9.7, vocLevel: 0.29, cleanings: 6 },
    { day: 'Sun', waterUsed: 8.2, vocLevel: 0.26, cleanings: 5 },
  ];

  const areaData = [
    { name: 'Lobby', value: 35, cleanings: 28 },
    { name: 'Restrooms', value: 25, cleanings: 42 },
    { name: 'Offices', value: 20, cleanings: 35 },
    { name: 'Kitchen', value: 12, cleanings: 21 },
    { name: 'Conference', value: 8, cleanings: 14 },
  ];

  const performanceData = [
    { month: 'Jan', efficiency: 75, costSavings: 1200 },
    { month: 'Feb', efficiency: 78, costSavings: 1350 },
    { month: 'Mar', efficiency: 82, costSavings: 1500 },
    { month: 'Apr', efficiency: 85, costSavings: 1680 },
    { month: 'May', efficiency: 88, costSavings: 1820 },
    { month: 'Jun', efficiency: 91, costSavings: 2100 },
  ];

  const COLORS = ['#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  const metrics = [
    {
      title: "Total Cleanings",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: CheckCircle,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Water Saved",
      value: "245L",
      change: "-18%",
      trend: "down",
      icon: Droplets,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Avg VOC Level",
      value: "0.36ppm",
      change: "-8%",
      trend: "down",
      icon: Wind,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Cost Savings",
      value: "$2,100",
      change: "+15%",
      trend: "up",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const reportTemplates = [
    {
      title: "ESG Compliance Report",
      description: "Comprehensive environmental, social, and governance metrics",
      icon: FileText,
      color: "blue"
    },
    {
      title: "Tender Submission Pack",
      description: "Complete documentation for tender applications",
      icon: BarChart3,
      color: "green"
    },
    {
      title: "Monthly Performance",
      description: "Detailed monthly operations and efficiency report",
      icon: Activity,
      color: "purple"
    },
    {
      title: "Audit Documentation",
      description: "Blockchain-verified records for compliance audits",
      icon: CheckCircle,
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ESG Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights and compliance documentation</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Date Range Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <Calendar className="w-6 h-6 text-gray-600" />
            <div className="flex gap-2">
              {['Today', 'Week', 'Month', 'Year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range.toLowerCase())}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    dateRange === range.toLowerCase()
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-xl flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                  metric.trend === 'up' && metric.title.includes('Cost')
                    ? 'bg-green-100 text-green-700'
                    : metric.trend === 'down'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {metric.change}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{metric.title}</p>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Water Usage & VOC Levels */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="waterUsed" fill="#06B6D4" name="Water Used (L)" />
                <Bar dataKey="cleanings" fill="#3B82F6" name="Cleanings" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Area Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Cleaning Distribution by Area</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={areaData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {areaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Efficiency Trends */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">6-Month Efficiency & Cost Savings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="efficiency" stroke="#3B82F6" strokeWidth={3} name="Efficiency %" />
              <Line yAxisId="right" type="monotone" dataKey="costSavings" stroke="#10B981" strokeWidth={3} name="Cost Savings ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Report Templates */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Reports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportTemplates.map((template, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                <div className={`w-12 h-12 bg-${template.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <template.icon className={`w-6 h-6 text-${template.color}-600`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{template.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <button className={`w-full py-2 bg-${template.color}-50 text-${template.color}-700 rounded-lg font-semibold hover:bg-${template.color}-100 transition-all flex items-center justify-center gap-2`}>
                  <Download className="w-4 h-4" />
                  Generate
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ESG Impact Summary */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 shadow-lg text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Environmental Impact This Month</h2>
              <p className="text-green-100">Your contribution to sustainability goals</p>
            </div>
            <Zap className="w-12 h-12 text-white opacity-50" />
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-green-100 text-sm mb-1">Water Saved</p>
              <p className="text-4xl font-bold">245L</p>
              <p className="text-green-100 text-xs mt-1">vs last month</p>
            </div>
            <div>
              <p className="text-green-100 text-sm mb-1">CO₂ Reduced</p>
              <p className="text-4xl font-bold">86kg</p>
              <p className="text-green-100 text-xs mt-1">carbon footprint</p>
            </div>
            <div>
              <p className="text-green-100 text-sm mb-1">Chemical Reduction</p>
              <p className="text-4xl font-bold">32%</p>
              <p className="text-green-100 text-xs mt-1">eco-friendly</p>
            </div>
            <div>
              <p className="text-green-100 text-sm mb-1">Efficiency Score</p>
              <p className="text-4xl font-bold">91%</p>
              <p className="text-green-100 text-xs mt-1">industry leading</p>
            </div>
          </div>
        </div>

        {/* Blockchain Verification Badge */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">All Reports Blockchain-Verified</h3>
                <p className="text-gray-600">Every data point is cryptographically secured and tamper-proof</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              View Ledger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}