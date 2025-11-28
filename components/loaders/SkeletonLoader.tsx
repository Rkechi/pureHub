"use client";

// Base Skeleton Component
export function Skeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <div
            className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded ${className}`}
            style={{ animation: 'shimmer 2s infinite linear', ...style }}
        >
            <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
        </div>
    );
}

// Dashboard Card Skeleton
export function DashboardCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex justify-between items-start">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="w-16 h-6 rounded-lg" />
            </div>
            <Skeleton className="w-24 h-4 rounded" />
            <Skeleton className="w-32 h-8 rounded" />
            <Skeleton className="w-full h-1 rounded-full" />
        </div>
    );
}

// Table Row Skeleton
export function TableRowSkeleton() {
    return (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <div className="flex-1 space-y-2">
                <Skeleton className="w-3/4 h-4 rounded" />
                <Skeleton className="w-1/2 h-3 rounded" />
            </div>
            <Skeleton className="w-20 h-6 rounded-lg" />
        </div>
    );
}

// Team Member Card Skeleton
export function TeamMemberSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex items-start gap-3">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="w-32 h-4 rounded" />
                    <Skeleton className="w-24 h-3 rounded" />
                </div>
                <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
                <Skeleton className="w-16 h-5 rounded" />
                <Skeleton className="w-20 h-5 rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-16 rounded-lg" />
                <Skeleton className="h-16 rounded-lg" />
            </div>
            <div className="pt-3 border-t border-gray-200">
                <Skeleton className="w-full h-4 rounded" />
            </div>
        </div>
    );
}

// Chart Skeleton
export function ChartSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex justify-between items-center">
                <Skeleton className="w-48 h-6 rounded" />
                <Skeleton className="w-24 h-4 rounded" />
            </div>
            <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-end gap-2" style={{ height: '40px' }}>
                        <Skeleton
                            className="flex-1 rounded-t"
                            style={{ height: `${Math.random() * 100 + 20}%` }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

// Full Page Skeleton Example
export function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 space-y-6">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <Skeleton className="w-64 h-8 rounded" />
                    <Skeleton className="w-48 h-4 rounded" />
                </div>
                <Skeleton className="w-32 h-10 rounded-xl" />
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <DashboardCardSkeleton key={i} />
                ))}
            </div>

            {/* Content Grid Skeleton */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <TeamMemberSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

// List Skeleton
export function ListSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="space-y-3">
            {[...Array(count)].map((_, i) => (
                <TableRowSkeleton key={i} />
            ))}
        </div>
    );
}