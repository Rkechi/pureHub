"use client";
import { Loader, Loader2 } from "lucide-react";

interface PageLoaderProps {
    message?: string;
}

export default function PageLoader({ message = "Loading..."}: PageLoaderProps) {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="text-center space-y-4">
                {/* Spinner */}
                <div className="relative">
                    {/* Outer ring */}
                    <div className="w-16 h-16 border-4 border-blue-200 rounded-full" />

                    {/* Spinning gradient ring */}
                    <div className="absolute inset-0 w-16 h-16 border-4 border-r-cyan-600 rounded-full animate-spin" />

                    {/* Inner Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <p className="text-gray-700 font-medium">
                        {message}
                    </p>
                    <div className="flex justify-center gap-1">
                        <div className="w-2 h2- bg-blue-600 rounded-full animate-bounce"
                        style={{
                            animationDelay: "0.1s"
                        }}
                        />
                        <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce"
                        style={{
                            animationDelay: '150ms'
                        }}
                        />
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                        style={{
                            animationDelay: '300ms'
                        }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}