"use client";

import { useState } from "react";
import { Bell, User, Search, Menu, Shield, LogOut, Settings } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
    onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        {
            id: 1,
            type: "alert",
            message: "High VOC detected in Room 201",
            time: "5m ago",
            unread: true
        },
        {
            id: 2,
            type: "success",
            message: "Cleaning completed for Floor 3",
            time: "1h ago",
            unread: false
        },
        {
            id: 3,
            type: "info",
            message: "Weekly report is ready",
            time: "1h ago",
            unread: false
        },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 w-full max-w-full">
            <div className="px-3 sm:px-4 lg:px-6 w-full max-w-full">
                <div className="flex justify-between items-center h-16 w-full">

                    {/* Left Section - Logo & Menu */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Menu className="w-5 h-5 text-gray-600" />
                        </button>

                        <Link href="/">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hidden sm:block">
                                    PureHive
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Center Section - Search */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                            <input type="text"
                                placeholder="Search areas, logs, or reports..."
                                className="w-full pl-12 pr-4 py-2.5 bg-gray-300/30 text-black border-gray-200 rounded-xl focus:outline-none focuse:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowNotifications(!showNotifications);
                                    setShowProfile(false);
                                }}
                                className="relative p-2 hover:bg-gray-300/90 rounded-lg transition-colors"
                            >
                                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs sm:text-sm font-bold rounded-full flex items-center justify-center">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-w-[calc(100vw-2rem)]">
                                    <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600">
                                        <h3 className="text-white font-semibold">Notifications</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.map((notif) => (
                                            <div
                                                key={notif.id}
                                                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${notif.unread ? "bg-blue-50" : ''
                                                    }`}>
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.type === 'alert' ? 'bg-red-500' : notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                                        }`}></div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-gray-900 font-medium">
                                                            {notif.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-3 bg-gray-50 text-center">
                                        <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                                            View All Notifications
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowProfile(!showProfile);
                                    setShowNotifications(false);
                                }}
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <span className="hidden sm:block text-sm font-semibold text-gray-700">
                                    Admin User
                                </span>
                            </button>

                            {/* Profile Dropdown */}
                            {showProfile && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-w-[calc(100vw-2rem)]">
                                    <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center">
                                                <User className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold">Admin User</p>
                                                <p className="text-white/80 text-sm">admin@purehive.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <a href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Settings className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-700 font-medium">Settings</span>
                                        </a>
                                        <button
                                            onClick={() => {/* I'll Add Layout Logic Later */ }}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg transition-colors text-left"
                                        >
                                            <LogOut className="w-5 h-5 text-red-600" />
                                            <span className="text-red-600 font-medium">Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}