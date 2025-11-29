import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';
import { useCleaningLogs } from './useCleaningLogs';
import { useESGReports } from './useESGReports';

interface SensorData {
    timestamp: string;
    vocLevel: number;
    waterUsage: number;
    chemicalUsage: number;
    temperature: number;
    humidity: number;
    airQuality: number;
    battery: number;
    signal: number;
}

interface DashboardMetric {
    title: string;
    value: number | string;
    unit: string;
    icon: string;
    trend: number;
    status: 'good' | 'warning' | 'error';
    gradient: string;
}

interface RecentActivity {
    area: string;
    time: string;
    status: string;
    cleaner: string;
}

interface EnvironmentalImpact {
    waterSaved: number;
    co2Reduced: number;
    efficiency: number;
}

export function useDashboard(pollingInterval: number = 5000) {
    const { logs, loading: logsLoading } = useCleaningLogs();
    const { data: esgData, loading: esgLoading } = useESGReports();

    const [sensorData, setSensorData] = useState<SensorData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSensorData = async () => {
        try {
            const response = await api.get<SensorData>('/api/monitoring/sensors?latest=true');
            if (response.success && response.data) {
                setSensorData(response.data);
                setError(null);
            }
        } catch (err: any) {
            console.error('Failed to fetch sensor data:', err);
            setError(err.message || 'Failed to fetch sensor data');
        }
    };

    useEffect(() => {
        fetchSensorData();
        const interval = setInterval(fetchSensorData, pollingInterval);
        return () => clearInterval(interval);
    }, [pollingInterval]);

    useEffect(() => {
        if (!logsLoading && !esgLoading) {
            setLoading(false);
        }
    }, [logsLoading, esgLoading]);

    // Calculate metrics from real data
    const metrics: DashboardMetric[] = [
        {
            title: 'VOC Level',
            value: sensorData?.vocLevel.toFixed(2) || 0,
            unit: 'ppb',
            icon: 'Wind',
            trend: -12, // Could calculate from historical data
            status: (sensorData?.vocLevel || 0) < 50 ? 'good' : 'warning',
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Water Usage',
            value: sensorData?.waterUsage.toFixed(1) || 0,
            unit: 'L/day',
            icon: 'Droplets',
            trend: -8,
            status: 'good',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Humidity',
            value: Math.round(sensorData?.humidity || 0),
            unit: '%',
            icon: 'Activity',
            trend: 5,
            status: 'good',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            title: 'Areas Cleaned',
            value: getTodayLogs().length,
            unit: 'today',
            icon: 'CheckCircle',
            trend: 15,
            status: 'good',
            gradient: 'from-orange-500 to-red-500',
        },
    ];

    // Get today's cleaning logs
    function getTodayLogs() {
        const today = new Date().toDateString();
        return logs.filter(log => new Date(log.timestamp).toDateString() === today);
    }

    // Get recent activities (last 3-5 logs)
    const recentActivities: RecentActivity[] = logs.slice(0, 5).map(log => {
        const timeDiff = Date.now() - new Date(log.timestamp).getTime();
        const minutesAgo = Math.floor(timeDiff / 60000);
        const hoursAgo = Math.floor(minutesAgo / 60);

        let timeStr;
        if (minutesAgo < 60) {
            timeStr = `${minutesAgo} mins ago`;
        } else if (hoursAgo < 24) {
            timeStr = `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
        } else {
            timeStr = new Date(log.timestamp).toLocaleDateString();
        }

        return {
            area: log.area,
            time: timeStr,
            status: 'completed',
            cleaner: log.cleaner,
        };
    });

    // Calculate environmental impact from ESG data
    const environmentalImpact: EnvironmentalImpact = {
        waterSaved: esgData?.environmental.waterSaved || 0,
        co2Reduced: esgData?.environmental.co2Reduced || 0,
        efficiency: esgData?.governance.complianceRate || 0,
    };

    return {
        metrics,
        recentActivities,
        environmentalImpact,
        sensorData,
        loading,
        error,
        refresh: () => {
            fetchSensorData();
        },
    };
}
