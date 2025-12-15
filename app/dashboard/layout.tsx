"use client";
import { Analytics } from "@vercel/analytics/next"

import { ReactNode, useState, useEffect } from "react";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ScreenSizeWarning from '@/components/ScreenSizeWarning';
// PreLoader removed

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // PreLoader removed

  // PreLoader removed

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // PreLoader removed

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <Analytics />
      <ScreenSizeWarning />
      <Navbar onToggleSidebar={toggleMobileSidebar} />
      <div className="flex w-full">
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
        <main className="flex-1 w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

