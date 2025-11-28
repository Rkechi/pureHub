"use client";
import { useState, useEffect } from 'react';
import { Shield, Activity } from 'lucide-react';

export default function PreLoader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-8">
        {/* Logo Animation */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 w-32 h-32 border-4 border-blue-500/30 rounded-full animate-spin" 
                 style={{ animationDuration: '3s' }} />
            
            {/* Inner rotating ring */}
            <div className="absolute inset-2 w-28 h-28 border-4 border-cyan-500/30 rounded-full animate-spin" 
                 style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
            
            {/* Logo */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse">
              <Shield className="w-16 h-16 text-white" />
            </div>

            {/* Pulse effect */}
            <div className="absolute inset-0 w-32 h-32 bg-blue-500 rounded-full animate-ping opacity-20" />
          </div>
        </div>

        {/* Brand Name */}
        <div>
          <h1 className="text-5xl font-bold text-white mb-2 animate-pulse">
            PureHive
          </h1>
          <p className="text-cyan-300 text-lg font-medium">
            Smart ESG Cleaning Dashboard
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto space-y-2">
          <div className="flex justify-between text-sm text-cyan-200">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Loading indicator */}
        <div className="flex items-center justify-center gap-2 text-cyan-300">
          <Activity className="w-5 h-5 animate-pulse animate-spin" />
          <span className="text-sm">Initializing system...</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}