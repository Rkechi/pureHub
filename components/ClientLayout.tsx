"use client";

import { useState, useEffect } from "react";
import PreLoader from "@/components/loaders/PreLoader";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Match the PreLoader's natural timing
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2800); // Slightly longer than PreLoader's 2.5s to ensure smooth transition

        return () => clearTimeout(timer);
    }, []);

    // Show only PreLoader during initial load
    if (isLoading) {
        return <PreLoader />;
    }

    // Show actual content after loading
    return <>{children}</>;
}
