"use client";

import { useState } from "react";
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Repeat,
  Edit,
  Trash2,
  X,
  Save,
  CheckCircle,
} from "lucide-react";

// Types
type ScheduleStatus = "scheduled" | "in-progress" | "completed" | "overdue";

interface ScheduleItem {
  id: number;
  area: string;
  cleaner: string;
  date: string;
  time: string;
  duration: number;
  status: ScheduleStatus;
  recurring: string;
  color: keyof typeof colorMap;
}

interface NewTask {
  area: string;
  cleaner: string;
  time: string;
  duration: string;
  recurring: string;
  notes: string;
}

// Safe Tailwind color classes
const colorMap = {
  blue: "border-blue-500 bg-blue-50",
  green: "border-green-500 bg-green-50",
  purple: "border-purple-500 bg-purple-50",
  orange: "border-orange-500 bg-orange-50",
  cyan: "border-cyan-500 bg-cyan-50",
  pink: "border-pink-500 bg-pink-50",
  gray: "border-gray-500 bg-gray-50",
};

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState<NewTask>({
    area: "",
    cleaner: "",
    time: "",
    duration: "30",
    recurring: "once",
    notes: "",
  });

  // Sample Data
  const schedules: ScheduleItem[] = [
    {
      id: 1,
      area: "Lobby",
      cleaner: "John Doe",
      date: "2024-11-15",
      time: "09:00",
      duration: 30,
      status: "scheduled",
      recurring: "daily",
      color: "blue",
    },
    {
      id: 2,
      area: "Conference Room A",
      cleaner: "Sarah Smith",
      date: "2024-11-15",
      time: "10:30",
      duration: 45,
      status: "scheduled",
      recurring: "weekly",
      color: "green",
    },
    {
      id: 3,
      area: "Restroom B",
      cleaner: "Mike Johnson",
      date: "2024-11-15",
      time: "08:00",
      duration: 30,
      status: "completed",
      recurring: "daily",
      color: "purple",
    },
    {
      id: 4,
      area: "Kitchen",
      cleaner: "Emily Brown",
      date: "2024-11-15",
      time: "14:00",
      duration: 60,
      status: "in-progress",
      recurring: "daily",
      color: "orange",
    },
    {
      id: 5,
      area: "Office Floor 2",
      cleaner: "David Lee",
      date: "2024-11-15",
      time: "16:00",
      duration: 45,
      status: "scheduled",
      recurring: "daily",
      color: "cyan",
    },
    {
      id: 6,
      area: "Cafeteria",
      cleaner: "John Doe",
      date: "2024-11-16",
      time: "10:00",
      duration: 50,
      status: "scheduled",
      recurring: "weekly",
      color: "pink",
    },
  ];

  const cleaners = ["John Doe", "Sarah Smith", "Mike Johnson", "Emily Brown", "David Lee"];
  const areas = ["Lobby", "Conference Room A", "Restroom B", "Kitchen", "Office Floor 2", "Cafeteria", "Parking Lot"];

  const getStatusBadge = (status: ScheduleStatus) => {
    return {
      completed: "bg-green-100 text-green-700 border-green-500",
      "in-progress": "bg-blue-100 text-blue-700 border-blue-500",
      scheduled: "bg-gray-100 text-gray-700 border-gray-500",
      overdue: "bg-red-100 text-red-700 border-red-500",
    }[status];
  };

  const todaySchedules = schedules.filter((s) => s.date === "2024-11-15");
  const upcomingSchedules = schedules.filter((s) => s.date > "2024-11-15");

  const stats = {
    totalTasks: schedules.length,
    completed: schedules.filter((s) => s.status === "completed").length,
    inProgress: schedules.filter((s) => s.status === "in-progress").length,
    scheduled: schedules.filter((s) => s.status === "scheduled").length,
  };

  const handleAddTask = () => {
    console.log("Adding new task:", newTask);
    setShowAddModal(false);
    setNewTask({
      area: "",
      cleaner: "",
      time: "",
      duration: "30",
      recurring: "once",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cleaning Schedule</h1>
            <p className="text-gray-600 mt-1">Manage and optimize cleaning tasks</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm mb-1">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm mb-1">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm mb-1">Scheduled</p>
            <p className="text-2xl font-bold text-gray-600">{stats.scheduled}</p>
          </div>
        </div>

        {/* CALENDAR */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {currentDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
                <p className="text-sm text-gray-600">Week of November 11–17</p>
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              {["day", "week", "month"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    viewMode === mode
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div key={i} className="text-center">
                <p className="text-sm font-semibold text-gray-600 mb-2">{day}</p>

                <div
                  className={`w-full aspect-square rounded-lg flex items-center justify-center font-bold ${
                    i === 4 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {11 + i}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TODAY'S SCHEDULE */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Today&apos;s Schedule
          </h2>

          <div className="space-y-3">
            {todaySchedules.map((schedule) => (
              <div
                key={schedule.id}
                className={`p-4 rounded-xl border-l-4 ${colorMap[schedule.color]} hover:shadow-md transition-all`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded border ${getStatusBadge(
                          schedule.status
                        )}`}
                      >
                        {schedule.status}
                      </span>

                      {schedule.recurring !== "once" && (
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <Repeat className="w-3 h-3" />
                          {schedule.recurring}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {schedule.area}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {schedule.time} ({schedule.duration} min)
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {schedule.cleaner}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TWO COLUMN SECTION */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Tasks */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Tasks</h2>

            <div className="space-y-3">
              {upcomingSchedules.slice(0, 5).map((schedule) => (
                <div
                  key={schedule.id}
                  className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{schedule.area}</h3>

                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                        <span>{schedule.date}</span>
                        <span>{schedule.time}</span>
                        <span>{schedule.cleaner}</span>
                      </div>
                    </div>

                    {schedule.recurring !== "once" && (
                      <Repeat className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Workload */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Team Workload</h2>

            <div className="space-y-4">
              {cleaners.map((cleaner, i) => {
                const tasks = schedules.filter(
                  (s) => s.cleaner === cleaner && s.status !== "completed"
                ).length;

                const percentage = (tasks / 8) * 100;

                return (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{cleaner}</span>
                      <span className="text-sm text-gray-600">{tasks} tasks</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          percentage > 75
                            ? "bg-red-500"
                            : percentage > 50
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI SUGGESTIONS */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 shadow-lg text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">AI Scheduling Suggestions</h3>

              <ul className="space-y-2 text-purple-100">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>
                    Consider scheduling Conference Room A cleaning before 9 AM
                    meeting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>David Lee has capacity for 2 more tasks this week</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>
                    Restroom B needs more frequent cleaning based on usage
                    patterns
                  </span>
                </li>
              </ul>
            </div>

            <button className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
              Optimize Schedule
            </button>
          </div>
        </div>
      </div>

      {/* ADD TASK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Schedule New Task</h2>

              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Area & Cleaner */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Area / Location
                  </label>
                  <select
                    value={newTask.area}
                    onChange={(e) =>
                      setNewTask({ ...newTask, area: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select area...</option>
                    {areas.map((area, i) => (
                      <option key={i} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Assign Cleaner
                  </label>
                  <select
                    value={newTask.cleaner}
                    onChange={(e) =>
                      setNewTask({ ...newTask, cleaner: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select cleaner...</option>
                    {cleaners.map((cleaner, i) => (
                      <option key={i} value={cleaner}>
                        {cleaner}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time & Duration */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newTask.time}
                    onChange={(e) =>
                      setNewTask({ ...newTask, time: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={newTask.duration}
                    onChange={(e) =>
                      setNewTask({ ...newTask, duration: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="30"
                  />
                </div>
              </div>

              {/* Recurring */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recurring
                </label>
                <select
                  value={newTask.recurring}
                  onChange={(e) =>
                    setNewTask({ ...newTask, recurring: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="once">One time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  rows={3}
                  value={newTask.notes}
                  onChange={(e) =>
                    setNewTask({ ...newTask, notes: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Any special instructions..."
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleAddTask}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Schedule Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
