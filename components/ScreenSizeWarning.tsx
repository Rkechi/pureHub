"use client";

import { Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScreenSizeWarning() {
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setShowWarning(window.innerWidth < 425);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    if (!showWarning) return null;

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 z-50 flex items-center justify-center p-6">
            <div className="max-w-md text-center">
                <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                        <Monitor className="w-10 h-10 text-white" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-white mb-4">
                    Screen Too Small
                </h1>

                <p className="text-white/90 mb-6 leading-relaxed">
                    PureHive Dashboard is optimized for tablets and desktop screens.
                    Please access this application on a device with a larger screen for the best experience.
                </p>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-white/80 text-sm">
                        Minimum recommended width: <strong className="text-white">425px</strong>
                    </p>
                    <p className="text-white/80 text-sm mt-1">
                        Your current width: <strong className="text-white">{typeof window !== 'undefined' ? window.innerWidth : 0}px</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
