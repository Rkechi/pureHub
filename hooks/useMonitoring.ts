import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';

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

interface SensorStats {
    avgVocLevel: number;
    avgWaterUsage: number;
    avgChemicalUsage: number;
    avgTemperature: number;
    avgHumidity: number;
    avgAirQuality: number;
    totalReadings: number;
}

export function useMonitoring(pollingInterval: number = 30000) {
    const [latestData, setLatestData] = useState<SensorData | null>(null);
    const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
    const [stats, setStats] = useState<SensorStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLatest = async () => {
        try {
            const response = await api.get<SensorData>('/api/monitoring/sensors?latest=true');

            if (response.success && response.data) {
                setLatestData(response.data);
                setError(null);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch sensor data');
        }
    };

    const fetchHistorical = async (results: number = 100) => {
        try {
            setLoading(true);
            const response = await api.get<{ data: SensorData[]; stats: SensorStats }>(
                `/api/monitoring/sensors?results=${results}`
            );

            if (response.success && response.data) {
                setHistoricalData(response.data.data);
                setStats(response.data.stats);
                setError(null);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch historical data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistorical();
        fetchLatest();

        // Poll for latest data
        const interval = setInterval(fetchLatest, pollingInterval);

        return () => clearInterval(interval);
    }, [pollingInterval]);

    return {
        latestData,
        historicalData,
        stats,
        loading,
        error,
        refresh: () => {
            fetchLatest();
            fetchHistorical();
        },
    };
}
