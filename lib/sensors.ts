interface SensorData {
    area: string;
    vocLevel: number;
    humidity: number;
    temperature: number;
    waterUsed: number;
    timestamp: string;
    sensorId: string;
}

// Mock sensor data generation for testing
export async function fetchSensorData(area: string = 'Lobby'): Promise<SensorData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve , 100));

    return {
        area,
        vocLevel: parseFloat((Math.random() * 0.8).toFixed(2)),
        humidity:parseFloat((45 + Math.random() * 15).toFixed(1)),
        temperature:parseFloat((20) + Math.random().toFixed(1)),
        waterUsed:parseFloat((Math.random() * 3).toFixed(1)),
        timestamp: new Date().toISOString(),
        sensorId: `SENSOR-${area.toUpperCase().replace('', '-')}-001`,
    };
}

// Real AWS IoT Core Integration (for production)
export async function fetchRealSensorData(sensorId: string): Promise<SensorData> {
    // TODO: Implement real AWS IoT Core integration
    // This is a placeholder for future implementation

    const AWS_IOT_ENDPOINT = process.env.AWS_IOT_ENDPOINT;

    if (!AWS_IOT_ENDPOINT) {
        console.warn('AWS IoT not configured, using mock data');
        return fetchSensorData();
    }

    // Implement AWS IoT MQTT subscription here
    // Example: Subscribe to topic: `sensor/${sensorId}/data`

    throw new Error('Real sensors integration not yet implemented');
}

// Batch fetch multiple sensors 
export async function fetchMultipleSensors(areas: string[]): Promise<SensorData[]> {
    const promises = areas.map(area => fetchSensorData(area));
    return Promise.all(promises);
}