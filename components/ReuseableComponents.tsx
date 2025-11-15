import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

// Metric Card Component
interface MetricCardProps {
    title: string;
    value: string | number;
    unit?: string;
    icon: React.ComponentType<{ className?: string }>;
    trend?: number;
    gradient: string;
    status?: 'good' | 'warning' | 'danger';
}

export function MetricCard({
    title,
    value,
    unit,
    icon: Icon,
    trend,
    gradient,
    status = 'good'
}: MetricCardProps) {
    const statusColors = {
        good: 'bg-green-500',
        warning: 'bg-yellow-500',
        danger: 'bg-red-500',
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${trend > 0 ? 'bg-red-100 text-red-100' : 'bg-green-100 text-green-700'
                        }`}>
                        {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <p className="text-gray-600 text-sm">
                    {title}
                </p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                        {value}
                    </span>
                    {unit && <span className="text-gray-500 text-sm">
                        {unit}
                    </span>}
                </div>
            </div>
            <div className={`mt-4 h-1 rounded-full ${statusColors[status]}`}></div>
        </div>
    );
}

// ChartCard Component
interface ChartCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function ChartCard({ title, subtitle, children, action }: ChartCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        {title}
                    </h3>
                    {subtitle && <p className="text-gray-600 text-sm mt-1">
                        {subtitle}
                    </p>}
                </div>
                {action && (
                    <button
                        onClick={action.onClick}
                        className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                        {action.label} →
                    </button>
                )}
            </div>
            <div className="w-full overflow-x-auto">
                {children}
            </div>
        </div>
    );
}

//ProofCard Component
interface ProofCardProps {
    area: string;
    timestamp: string;
    cleaner: string;
    vocLevel: number;
    waterUsed: number,
    blockchainHash: string,
    verified: boolean,
}

export function ProofCard({
    area,
    timestamp,
    cleaner,
    vocLevel,
    waterUsed,
    blockchainHash,
    verified
}: ProofCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-600">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-lg font-bold text-gray-900">
                        {area}
                    </h4>
                    <p className="text-sm text-gray-600">
                        {timestamp}
                    </p>
                </div>
                {verified && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-semibold">Verfied</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">VOC Level</p>
                    <p className="text-lg font-bold text-gray-900">
                        {vocLevel}
                        <span className="text-sm font-normal">ppm</span>
                    </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Water Used</p>
                    <p className="text-lg font-bold text-gray-900">
                        {waterUsed}
                        <span className="text-sm font-normal">L</span>
                    </p>
                </div>
            </div>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Cleaner:</span>
                    <span className="font-semibold text-gray-900">
                        {cleaner}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Blockchain:</span>
                    <span className="font-mono text-xs text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {blockchainHash.substring(0, 12)}...
                    </span>
                </div>
            </div>
        </div>
    );
}

// StatCard Component (for simpler stats)
interface StatCardProps {
    label: string;
    value: string | number;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
}

export function StatCard({ label, value, change, changeType = 'neutral' }: StatCardProps) {
    const changeColors = {
        positive: 'text-green-600 bg-green-100',
        negative: 'text-red-600 bg-red-100',
        neutral: 'text-gray-600 bg-gray-100'
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-600 text-sm mb-1">
                {label}
            </p>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                    {value}
                </span>
                {change && (
                    <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${changeColors[changeType]}`}
                    >
                        {change}
                    </span>
                )}
            </div>
        </div>
    );
}

// Example Usage Component
export default function ComponentShowcase() {
    return (
        <div className="min-h-screen bg-gray-100 p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Component Showcase
            </h1>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="VOC Level"
                    value={0.42}
                    unit="ppm"
                    icon={({ className }) => <div className={className}>💨</div>}
                    trend={-12}
                    gradient="from-blue-500 to-cyan-500"
                    status="good"
                />
                <MetricCard
                    title="Water Usage"
                    value={2.3}
                    unit="L/day"
                    icon={({ className }) => <div className={className}>💧</div>}
                    trend={-12}
                    gradient="from-green-500 to-emerald-500"
                    status="good"
                />
            </div>

            {/* ChartCard */}
            <ChartCard
                title="Weekly performace"
                subtitle="Last 7 days overview"
                action={{ label: 'View Details', onClick: () => console.log("View details") }}
            >
                <div className="h-64 flex items-center justify-center text-gray-400">
                    Chart content goes here (use Recharts)
                </div>
            </ChartCard>

            {/* ProofCard */}
            <ProofCard
                area="Lobby Area"
                timestamp="2024-11-11 14:30"
                cleaner="Jon Doe"
                vocLevel={0.32}
                waterUsed={1.8}
                blockchainHash="0x1234567890abcdef1234567890abcdef"
                verified={true}
            />

            {/* StatCards */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard 
                value='156'
                label="Total Cleaning"
                change="+12" 
                changeType="positive"
                />
                <StatCard
                label="Active Sensors"
                value='24'
                />
                <StatCard 
                label="Avg Response Time"
                value='5 min'
                change="-2 min"
                changeType="positive"
                />
                <StatCard
                label="Compliance Score"
                value='98%'
                change="+3%"
                changeType="positive"
                />
            </div>
        </div>
    );
}