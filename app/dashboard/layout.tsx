"use client";

import { ReactNode, useState } from "react";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ScreenSizeWarning from '@/components/ScreenSizeWarning';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
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
