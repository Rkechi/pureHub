import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-app-router';
import { anomalyDetector } from '@/lib/ml/anomalyDetector';
import { connectDB } from '@/lib/db';

/**
 * ML Anomaly Detection API
 * Analyzes sensor data and detects abnormal patterns
 */

export async function POST(request: NextRequest) {
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    try {
        await connectDB();

        const body = await request.json();
        const { sensorData, area } = body;

        if (!sensorData || !Array.isArray(sensorData)) {
            return NextResponse.json(
                { error: 'Sensor data array required' },
                { status: 400 }
            );
        }

        // Detect anomalies
        const anomalies = await anomalyDetector.detectAnomalies(sensorData, area);

        // Calculate health score if area specified
        const healthScore = area
            ? anomalyDetector.getAreaHealthScore(sensorData, area)
            : null;

        // Get baseline statistics
        const baseline = area
            ? anomalyDetector.calculateBaseline(sensorData, area)
            : null;

        return NextResponse.json({
            success: true,
            anomalies,
            healthScore,
            baseline,
            analysis: {
                totalDataPoints: sensorData.length,
                anomaliesDetected: anomalies.length,
                criticalAnomalies: anomalies.filter(a => a.severity === 'critical').length,
                highAnomalies: anomalies.filter(a => a.severity === 'high').length,
            },
        });
    } catch (error: any) {
        console.error('Anomaly detection error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Anomaly detection failed',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// GET endpoint for real-time monitoring
export async function GET(request: NextRequest) {
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    try {
        const area = request.nextUrl.searchParams.get('area');

        // In production, fetch real sensor data from database
        // For now, return structure for frontend integration

        return NextResponse.json({
            success: true,
            message: 'Real-time monitoring endpoint',
            usage: 'POST sensor data to this endpoint for anomaly detection',
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
