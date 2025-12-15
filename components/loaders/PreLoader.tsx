"use client";
import { Shield, Activity } from 'lucide-react';

export default function PreLoader() {
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

                {/* Loading text */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Loading</h2>
                  <p className="text-cyan-400 text-sm">Initializing PureHive...</p>
                </div>
              </div>
            </div>
          );
        }