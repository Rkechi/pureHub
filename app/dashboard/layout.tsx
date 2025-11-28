"use client";

import { ReactNode, useState, useEffect } from "react";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ScreenSizeWarning from '@/components/ScreenSizeWarning';
import PreLoader from '@/components/loaders/PreLoader';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load - adjust timing as needed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Matches roughly with PreLoader's completion time

    return () => clearTimeout(timer);
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Show only PreLoader during initial load
  if (isLoading) {
    return <PreLoader />;
  }

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

