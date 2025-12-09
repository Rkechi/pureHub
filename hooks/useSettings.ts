import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';
import { useAuth } from '@/app/context/AuthContext';

interface Settings {
    notifications: {
        email: boolean;
        push: boolean;
        taskReminders: boolean;
        teamUpdates: boolean;
        reportAlerts: boolean;
    };
    dashboard: {
        defaultView: 'overview' | 'tasks' | 'team' | 'reports';
        theme: 'light' | 'dark' | 'auto';
        language: string;
        timezone: string;
    };
    tasks: {
        defaultDuration: string;
        defaultPriority: 'low' | 'medium' | 'high' | 'urgent';
        autoAssign: boolean;
        reminderMinutes: number;
    };
    iot: {
        thingspeak: {
            enabled: boolean;
            channelId: string;
            readApiKey: string;
            writeApiKey: string;
            description: string;
        };
        awsIot: {
            enabled: boolean;
            endpoint: string;
            region: string;
            description: string;
        };
        devices: Array<{
            id: string;
            name: string;
            type: 'VOC' | 'Water' | 'Temperature' | 'Humidity' | 'Multi';
            location: string;
            status: 'active' | 'inactive' | 'error';
            lastReading?: Date;
        }>;
    };
}

export function useSettings() {
    const { user } = useAuth();
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSettings = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const response = await api.get<Settings>(`/api/settings?userId=${user.id}`);

            if (response.success && response.data) {
                setSettings(response.data);
                setError(null);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch settings');
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (newSettings: Partial<Settings>) => {
        if (!user) return { success: false, error: 'User not authenticated' };

        try {
            const response = await api.put<Settings>('/api/settings', {
                userId: user.id,
                ...newSettings,
            });

            if (response.success && response.data) {
                setSettings(response.data);
                return { success: true };
            } else {
                return { success: false, error: response.message || 'Failed to update settings' };
            }
        } catch (err: any) {
            return { success: false, error: err.message || 'Failed to update settings' };
        }
    };

    const updateSection = async (section: string, data: any) => {
        if (!user) return { success: false, error: 'User not authenticated' };

        try {
            const response = await api.patch<Settings>('/api/settings', {
                userId: user.id,
                section,
                data,
            });

            if (response.success && response.data) {
                setSettings(response.data);
                return { success: true };
            } else {
                return { success: false, error: response.message || 'Failed to update settings' };
            }
        } catch (err: any) {
            return { success: false, error: err.message || 'Failed to update settings' };
        }
    };

    useEffect(() => {
        if (user) {
            fetchSettings();
        }
    }, [user]);

    return {
        settings,
        loading,
        error,
        updateSettings,
        updateSection,
        refresh: fetchSettings,
    };
}
