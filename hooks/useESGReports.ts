import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';

interface ESGData {
    environmental: {
        totalWaterUsed: number;
        totalChemicalUsed: number;
        avgVOCLevel: number;
        waterSaved: number;
        co2Reduced: number;
    };
    social: {
        totalCleaning: number;
        areasServed: number;
        avgQuality: number;
    };
    governance: {
        blockchainVerified: number;
        complianceRate: number;
    };
    period: {
        startDate: string;
        endDate: string;
    };
}

export function useESGReports() {
    const [data, setData] = useState<ESGData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReport = async (startDate?: string, endDate?: string) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);

            const endpoint = `/api/reports/esg${params.toString() ? `?${params.toString()}` : ''}`;
            const response = await api.get<ESGData>(endpoint);

            if (response.success && response.data) {
                setData(response.data);
                setError(null);
            } else {
                setError(response.message || 'Failed to fetch ESG report');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch ESG report');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, []);

    return {
        data,
        loading,
        error,
        fetchReport,
    };
}
