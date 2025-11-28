import { NextRequest, NextResponse } from 'next/server';
import { fetchSensorData, parseSensorReading } from '@/lib/thingspeak';

/**
 * GET /api/monitoring/areas/[areaId]
 * Get sensor data for a specific area
 * For now, this returns the same data but can be filtered by area when multiple sensors are deployed
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { areaId: string } }
) {
    try {
        const { areaId } = params;
        const { searchParams } = new URL(request.url);
        const results = parseInt(searchParams.get('results') || '50');

        // Fetch sensor data
        const readings = await fetchSensorData(results);
        const parsedData = readings.map(parseSensorReading);

        // In production, you would filter by actual area sensors
        // For now, we'll return the data with area metadata
        const areaData = {
            areaId,
            areaName: getAreaName(areaId),
            currentStatus: determineStatus(parsedData[0]),
            latestReading: parsedData[0],
            historicalData: parsedData,
            alerts: generateAlerts(parsedData[0]),
        };

        return NextResponse.json({
            success: true,
            data: areaData,
        });
    } catch (error: any) {
        console.error('Error fetching area data:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch area data',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * Get area name from ID (map to your actual areas)
 */
function getAreaName(areaId: string): string {
    const areaMap: Record<string, string> = {
        'area1': 'Main Lobby',
        'area2': 'Conference Room A',
        'area3': 'Office Floor 1',
        'area4': 'Restrooms',
        'area5': 'Kitchen',
    };

    return areaMap[areaId] || `Area ${areaId}`;
}

/**
 * Determine area status based on sensor readings
 */
function determineStatus(reading: any): 'good' | 'warning' | 'critical' {
    if (!reading) return 'good';

    const { vocLevel, airQuality } = reading;

    if (vocLevel > 60 || airQuality > 120) return 'critical';
    if (vocLevel > 45 || airQuality > 100) return 'warning';

    return 'good';
}

/**
 * Generate alerts based on thresholds
 */
function generateAlerts(reading: any): Array<{ type: string; message: string; severity: string }> {
    if (!reading) return [];

    const alerts = [];

    if (reading.vocLevel > 60) {
        alerts.push({
            type: 'voc',
            message: 'High VOC levels detected',
            severity: 'critical',
        });
    }

    if (reading.airQuality > 120) {
        alerts.push({
            type: 'air_quality',
            message: 'Poor air quality detected',
            severity: 'critical',
        });
    }

    if (reading.humidity > 65) {
        alerts.push({
            type: 'humidity',
            message: 'High humidity levels',
            severity: 'warning',
        });
    }

    if (reading.battery < 20) {
        alerts.push({
            type: 'battery',
            message: 'Low sensor battery',
            severity: 'warning',
        });
    }

    return alerts;
}
