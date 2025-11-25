"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Settings,
    Activity,
    Users,
    Calendar,
    HelpCircle,
    ChevronLeft,
    BrushCleaning,
    X
} from "lucide-react";

interface SidebarProps {
    isMobileOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isMobileOpen = false, onClose }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

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
        <>
            {/* Mobile Backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar - Desktop: normal sidebar, Mobile: off-canvas overlay */}
            <aside
                className={`
                    bg-white border-r border-gray-200 flex flex-col
                    
                    /* Desktop styles */
                    lg:relative lg:flex
                    ${collapsed ? 'lg:w-20' : 'lg:w-64'}
                    
                    /* Mobile styles - fixed off-canvas */
                    fixed top-0 left-0 h-screen w-64 z-50
                    transition-transform duration-300 ease-in-out
                    
                    /* Show/hide based on state */
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Mobile Close Button */}
                <div className="lg:hidden p-4 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        PureHive
                    </span>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Desktop Collapse Button */}
                <div className="hidden lg:block p-4 border-b border-gray-200">
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
                        const isActive = pathname === item.href;
                        return (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group 
                                ${isActive ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/50 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                <item.icon
                                    className={`w-5 h-5 flex-shrink-0 
                                    ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}`}
                                />
                                <span className={`font-medium flex-1 ${collapsed ? 'hidden lg:hidden' : ''}`}>
                                    {item.label}
                                </span>
                                {item.badge && !collapsed && (
                                    <span
                                        className={`px-2 py-1 text-xs font-bold rounded-lg 
                                        ${isActive ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}
                                    >
                                        {item.badge}
                                    </span>
                                )}
                            </a>
                        );
                    })}
                </nav>

                {/* Bottom Menu */}
                <div className="p-4 border-t border-gray-200 space-y-2">
                    {bottomItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group 
                                ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0 group-hover:text-blue-600" />
                                <span className={`font-medium ${collapsed ? 'hidden lg:hidden' : ''}`}>
                                    {item.label}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </aside>
        </>
    );
}
