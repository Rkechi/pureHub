"use client";
import { useState } from "react";
import { usePathname } from "next/navigation"; // ✅ ADD THIS
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    Settings,
    Activity,
    Users,
    Calendar,
    HelpCircle,
    ChevronLeft,
    BrushCleaning
} from "lucide-react";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname(); // ✅ Detect current route

    const menuItem = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { id: 'logs', label: 'Cleaning Logs', icon: BrushCleaning, href: '/dashboard/logs' },
        { id: 'reports', label: 'ESG Reports', icon: FileText, href: '/dashboard/reports' },
        { id: 'monitoring', label: "Live Monitoring", icon: Activity, href: '/dashboard/monitoring', badge: 'Live' },
        { id: 'schedule', label: 'Schedule', icon: Calendar, href: '/dashboard/schedule' },
        { id: 'team', label: 'Team', icon: Users, href: '/dashboard/team' },
    ];

    const bottomItems = [
        { id: 'settings', label: 'Settings', icon: Settings, href: '/dashboard/settings' },
        { id: 'help', label: 'Help & Support', icon: HelpCircle, href: '/help' }
    ];

    return (
        <aside className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
            
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-end hover:bg-gray-100 rounded-lg p-2 transition-colors"
                >
                    <ChevronLeft className={`w-5 h-5 text-gray-600 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Main Menu */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItem.map((item) => {
                    const isActive = pathname === item.href; // ✅ Correct active route
                    return (
                        <a
                            key={item.id}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl trasition-all group 
                            ${isActive ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/50 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <item.icon
                                className={`w-5 h-5 flex-shrink-0 
                                ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}`}
                            />
                            {!collapsed && (
                                <>
                                    <span className="font-medium flex-1">{item.label}</span>
                                    {item.badge && (
                                        <span
                                            className={`px-2 py-1 text-xs font-bold rounded-lg 
                                            ${isActive ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </>
                            )}
                        </a>
                    );
                })}
            </nav>

            {/* Bottom Menu */}
            <div className="p-4 border-t border-gray-200 space-y-2">
                {bottomItems.map((item) => {
                    const isActive = pathname === item.href; // ✅ Works here too
                    return (
                        <a
                            key={item.id}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group 
                            ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0 group-hover:text-blue-600" />
                            {!collapsed && <span className="font-medium">{item.label}</span>}
                        </a>
                    );
                })}
            </div>
        </aside>
    );
}
