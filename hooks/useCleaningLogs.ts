import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';

interface CleaningLog {
    _id: string;
    area: string;
    cleaner: string;
    timestamp: Date;
    duration: number;
    vocLevel: number;
    waterUsed: number;
    chemicalUsed: number;
    blockchainHash?: string;
}

export function useCleaningLogs() {
    const [logs, setLogs] = useState<CleaningLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const response = await api.get<CleaningLog[]>('/api/cleaning/log');

            if (response.success && response.data) {
                setLogs(response.data);
                setError(null);
            } else {
                setError(response.message || 'Failed to fetch logs');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch logs');
        } finally {
            setLoading(false);
        }
    };

    const addLog = async (logData: Omit<CleaningLog, '_id' | 'blockchainHash'>) => {
        try {
            const response = await api.post<CleaningLog>('/api/cleaning/log', logData);

            if (response.success && response.data) {
                setLogs(prev => [response.data!, ...prev]);
                return { success: true };
            } else {
                return { success: false, error: response.message || 'Failed to add log' };
            }
        } catch (err: any) {
            return { success: false, error: err.message || 'Failed to add log' };
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return {
        logs,
        loading,
        error,
        addLog,
        refresh: fetchLogs,
    };
}
