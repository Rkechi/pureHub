"use client";

interface ButtonLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'blue' | 'gray';
}

export default function ButtonLoader({ 
  size = 'md', 
  color = 'white' 
}: ButtonLoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const colorClasses = {
    white: 'border-white/30 border-t-white',
    blue: 'border-blue-200 border-t-blue-600',
    gray: 'border-gray-300 border-t-gray-600',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full animate-spin`}
    />
  );
}

// Usage example component
export function LoadingButton() {
  return (
    <div className="flex gap-4 p-6 bg-gray-50 rounded-xl">
      {/* Primary Button */}
      <button
        disabled
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold flex items-center gap-2 opacity-75 cursor-not-allowed"
      >
        <ButtonLoader size="md" color="white" />
        Processing...
      </button>

      {/* Secondary Button */}
      <button
        disabled
        className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold flex items-center gap-2 opacity-75 cursor-not-allowed"
      >
        <ButtonLoader size="md" color="gray" />
        Loading...
      </button>

      {/* Small Button */}
      <button
        disabled
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 opacity-75 cursor-not-allowed"
      >
        <ButtonLoader size="sm" color="white" />
        Wait...
      </button>
    </div>
  );
}