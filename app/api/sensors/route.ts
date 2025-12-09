import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-app-router';
import { getLatestReading, parseReading } from '@/lib/thingspeak';

/**
 * Sensors API - Aggregates sensor data for all areas
 * Uses ThingSpeak integration
 */

export async function GET(request: NextRequest) {
    // Authentication check
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    try {
        //Define areas to monitor
        const areas = ['Main Lobby', 'Conference Room A', 'Office Floor 2', 'Storage Room', 'Restrooms'];

        // Fetch sensor data for all areas
        const readings = await Promise.all(
            areas.map(async (area) => {
                try {
                    const rawData = await getLatestReading();
                    if (!rawData) throw new Error('No sensor data');

                    const data = parseReading(rawData);
                    return {
                        area,
                        vocLevel: data.vocLevel,
                        humidity: data.humidity,
                        temperature: data.temperature,
                        waterUsed: data.waterUsed,
                        timestamp: new Date(data.timestamp),
                    };
                } catch (error) {
                    // Return default data if fetch fails
                    return {
                        area,
                        vocLevel: 0.3,
                        humidity: 50,
                        temperature: 22,
                        waterUsed: 0,
                        timestamp: new Date(),
                    };
                }
            })
        );

        return NextResponse.json({
            success: true,
            readings,
            timestamp: new Date(),
        });
    } catch (error: any) {
        console.error('Sensor data fetch error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
