import { NextRequest, NextResponse } from 'next/server';
import { fetchSensorData, getLatestReading, parseSensorReading } from '@/lib/thingspeak';
import { requireAuth } from '@/lib/auth-app-router';

/**
 * GET /api/monitoring/sensors
 * Fetch real-time sensor data from ThingSpeak
 * PROTECTED: Requires authentication
 */
export async function GET(request: NextRequest) {
    // Authentication check
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;
    try {
        const { searchParams } = new URL(request.url);
        const results = parseInt(searchParams.get('results') || '100');
        const days = searchParams.get('days') ? parseInt(searchParams.get('days')) : undefined;
        const latest = searchParams.get('latest') === 'true';

        if (latest) {
            // Get only the latest reading
            const reading = await getLatestReading();

            if (!reading) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'No sensor data available',
                    },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                success: true,
                data: parseSensorReading(reading),
                timestamp: reading.created_at,
            });
        }

        // Get multiple readings
        const readings = await fetchSensorData(results, days);

        const parsedData = readings.map(parseSensorReading);

        // Calculate averages and stats
        const stats = {
            avgVocLevel: average(parsedData.map(d => d.vocLevel)),
            avgWaterUsage: average(parsedData.map(d => d.waterUsage)),
            avgChemicalUsage: average(parsedData.map(d => d.chemicalUsage)),
            avgTemperature: average(parsedData.map(d => d.temperature)),
            avgHumidity: average(parsedData.map(d => d.humidity)),
            avgAirQuality: average(parsedData.map(d => d.airQuality)),
            totalReadings: readings.length,
        };

        return NextResponse.json({
            success: true,
            data: parsedData,
            stats,
            count: readings.length,
        });
    } catch (error: any) {
        console.error('Error fetching sensor data:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch sensor data',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * Helper function to calculate average
 */
function average(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b, 0);
    return Math.round((sum / numbers.length) * 100) / 100;
}
