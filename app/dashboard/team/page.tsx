"use client";
import { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Award,
  Star,
  CheckCircle,
  X,
  Save,
  UserPlus,
  Edit,
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  rating: number;
  tasksCompleted: number;
  efficiency: number;
  specialization: string;
  status: string;
  joinDate: string;
  performance: {
    thisWeek: number;
    thisMonth: number;
    avgTime: string;
    quality: number;
  };
}

interface NewMember {
  name: string;
  email: string;
  phone: string;
  role: string;
  specialization: string;
}

export default function TeamPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMember, setNewMember] = useState<NewMember>({
    name: "",
    email: "",
    phone: "",
    role: "",
    specialization: "",
  });

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "John Doe",
      role: "Senior Cleaner",
      email: "john.doe@purehive.com",
      phone: "+234 123 456 7890",
      avatar: "JD",
      rating: 4.8,
      tasksCompleted: 156,
      efficiency: 94,
      specialization: "Deep Cleaning",
      status: "active",
      joinDate: "Jan 2024",
      performance: {
        thisWeek: 12,
        thisMonth: 48,
        avgTime: "25 mins",
        quality: 95,
      },
    },
    {
      id: 2,
      name: "Sarah Smith",
      role: "Cleaning Specialist",
      email: "sarah.smith@purehive.com",
      phone: "+234 123 456 7891",
      avatar: "SS",
      rating: 4.9,
      tasksCompleted: 189,
      efficiency: 97,
      specialization: "Office Spaces",
      status: "active",
      joinDate: "Feb 2024",
      performance: {
        thisWeek: 15,
        thisMonth: 52,
        avgTime: "22 mins",
        quality: 98,
      },
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Restroom Specialist",
      email: "mike.johnson@purehive.com",
      phone: "+234 123 456 7892",
      avatar: "MJ",
      rating: 4.7,
      tasksCompleted: 142,
      efficiency: 91,
      specialization: "Restrooms",
      status: "active",
      joinDate: "Mar 2024",
      performance: {
        thisWeek: 10,
        thisMonth: 45,
        avgTime: "28 mins",
        quality: 92,
      },
    },
    {
      id: 4,
      name: "Emily Brown",
      role: "Kitchen Specialist",
      email: "emily.brown@purehive.com",
      phone: "+234 123 456 7893",
      avatar: "EB",
      rating: 5.0,
      tasksCompleted: 98,
      efficiency: 99,
      specialization: "Food Areas",
      status: "active",
      joinDate: "Apr 2024",
      performance: {
        thisWeek: 8,
        thisMonth: 32,
        avgTime: "30 mins",
        quality: 100,
      },
    },
    {
      id: 5,
      name: "David Lee",
      role: "Floor Care Specialist",
      email: "david.lee@purehive.com",
      phone: "+234 123 456 7894",
      avatar: "DL",
      rating: 4.6,
      tasksCompleted: 134,
      efficiency: 89,
      specialization: "Floor Maintenance",
      status: "on-leave",
      joinDate: "Jan 2024",
      performance: {
        thisWeek: 0,
        thisMonth: 38,
        avgTime: "32 mins",
        quality: 90,
      },
    },
  ];

  const stats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter((m) => m.status === "active").length,
    avgRating: (
      teamMembers.reduce((sum, m) => sum + m.rating, 0) / teamMembers.length
    ).toFixed(1),
    totalTasks: teamMembers.reduce((sum, m) => sum + m.tasksCompleted, 0),
  };

  const handleAddMember = () => {
    console.log("Adding member:", newMember);
    setShowAddModal(false);
    setNewMember({
      name: "",
      email: "",
      phone: "",
      role: "",
      specialization: "",
    });
  };

  const filteredMembers = teamMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "on-leave":
        return "bg-yellow-100 text-yellow-700";
      case "inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600 mt-1">
              Manage your cleaning team and track performance
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Add Team Member
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm">Total Members</p>
            <p className="text-2xl font-bold">{stats.totalMembers}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm">Active Today</p>
            <p className="text-2xl font-bold text-green-600">
              {stats.activeMembers}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm">Avg Rating</p>
            <div className="flex items-center gap-1">
              <p className="text-2xl font-bold text-yellow-600">
                {stats.avgRating}
              </p>
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm">Total Tasks</p>
            <p className="text-2xl font-bold text-blue-600">
              {stats.totalTasks}
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, role or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-gray-100 rounded-xl px-4 py-3 hover:bg-gray-200 transition-colors font-semibold text-gray-700">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl cursor-pointer transition-all"
            >
              {/* TOP ROW */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>

                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-1 items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-900">{member.rating}</span>
                  <span className="text-sm text-gray-600">
                    ({member.tasksCompleted} tasks)
                  </span>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-lg font-semibold ${getStatusBadge(
                    member.status
                  )}`}
                >
                  {member.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">This Week</p>
                  <p className="font-bold text-lg text-gray-900">
                    {member.performance.thisWeek}
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">Efficiency</p>
                  <p className="font-bold text-lg text-gray-900">{member.efficiency}%</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs text-gray-600 mb-1">Specialization</p>
                <p className="font-semibold text-gray-900">{member.specialization}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TOP PERFORMERS */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <Award className="w-6 h-6 text-yellow-600" />
            Top Performers This Month
          </h2>

          <div className="space-y-3">
            {[...teamMembers]
              .sort(
                (a, b) => b.performance.thisMonth - a.performance.thisMonth
              )
              .slice(0, 5)
              .map((m, i) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex gap-4 items-center">
                    <div
                      className={`w-8 h-8 rounded-lg text-white font-bold flex items-center justify-center ${
                        i === 0
                          ? "bg-yellow-500"
                          : i === 1
                          ? "bg-gray-400"
                          : i === 2
                          ? "bg-orange-600"
                          : "bg-blue-500"
                      }`}
                    >
                      {i + 1}
                    </div>

                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {m.avatar}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">{m.name}</p>
                      <p className="text-sm text-gray-600">{m.role}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {m.performance.thisMonth} tasks
                    </p>
                    <p className="text-sm text-gray-600">
                      {m.performance.quality}% quality
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* PERFORMANCE + ATTENDANCE */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* TEAM PERFORMANCE */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Team Performance</h2>

            {[
              { label: "Average Efficiency", value: 94, color: "bg-green-500" },
              { label: "Task Completion Rate", value: 97, color: "bg-blue-500" },
              { label: "Quality Score", value: 95, color: "bg-purple-500" },
            ].map((item, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="font-bold text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* ATTENDANCE */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Attendance This Week</h2>

            <div className="space-y-3">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day) => (
                  <div
                    key={day}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-semibold text-gray-900">{day}</span>
                    <div className="flex gap-2 items-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">
                        {
                          teamMembers.filter((m) => m.status === "active")
                            .length
                        }
                        /{teamMembers.length}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ADD MEMBER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add Team Member</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {/* NAME */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter full name"
                />
              </div>

              {/* EMAIL + PHONE */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) =>
                        setNewMember({ ...newMember, email: e.target.value })
                      }
                      className="w-full border-2 border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={newMember.phone}
                      onChange={(e) =>
                        setNewMember({ ...newMember, phone: e.target.value })
                      }
                      className="w-full border-2 border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>
                </div>
              </div>

              {/* ROLE + SPECIALIZATION */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Role
                  </label>
                  <select
                    value={newMember.role}
                    onChange={(e) =>
                      setNewMember({ ...newMember, role: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select role...</option>
                    <option value="Senior Cleaner">Senior Cleaner</option>
                    <option value="Cleaning Specialist">Cleaning Specialist</option>
                    <option value="Restroom Specialist">Restroom Specialist</option>
                    <option value="Kitchen Specialist">Kitchen Specialist</option>
                    <option value="Floor Care Specialist">Floor Care Specialist</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Specialization
                  </label>
                  <input
                    type="text"
                    value={newMember.specialization}
                    onChange={(e) =>
                      setNewMember({
                        ...newMember,
                        specialization: e.target.value,
                      })
                    }
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., Deep Cleaning"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 border-2 border-gray-300 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleAddMember}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEMBER DETAIL MODAL */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl text-white flex items-center justify-center font-bold text-2xl">
                  {selectedMember.avatar}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
                  <p className="text-gray-600">{selectedMember.role}</p>

                  <div className="flex gap-2 items-center mt-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-gray-900">{selectedMember.rating}</span>

                    <span
                      className={`ml-2 px-3 py-1 text-xs rounded-lg font-semibold ${getStatusBadge(
                        selectedMember.status
                      )}`}
                    >
                      {selectedMember.status}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* CONTACT & SPECIALIZATION */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex gap-2 items-center text-gray-700">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span>{selectedMember.email}</span>
                </div>

                <div className="flex gap-2 items-center text-gray-700">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{selectedMember.phone}</span>
                </div>

                <div className="flex gap-2 items-center text-gray-700">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>Joined {selectedMember.joinDate}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold mb-2 text-gray-900">Specialization</h3>
                <p className="text-gray-700">{selectedMember.specialization}</p>
              </div>
            </div>

            {/* PERFORMANCE NUMBERS */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">This Week</p>
                <p className="text-2xl font-bold text-blue-600">
                  {selectedMember.performance.thisWeek}
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">This Month</p>
                <p className="text-2xl font-bold text-green-600">
                  {selectedMember.performance.thisMonth}
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Avg Time</p>
                <p className="text-2xl font-bold text-purple-600">
                  {selectedMember.performance.avgTime}
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Quality</p>
                <p className="text-2xl font-bold text-orange-600">
                  {selectedMember.performance.quality}%
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Edit className="w-5 h-5" />
                Edit Profile
              </button>

              <button className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                View Full History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}