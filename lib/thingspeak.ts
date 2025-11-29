/**
 * ThingSpeak IoT Integration
 * For reading sensor data (VOC levels, water usage, chemical usage, etc.)
 */

interface ThingSpeakConfig {
    channelId: string;
    readApiKey: string;
    writeApiKey?: string;
}

interface SensorReading {
    created_at: string;
    entry_id: number;
    field1?: number; // VOC Level
    field2?: number; // Water Usage
    field3?: number; // Chemical Usage
    field4?: number; // Temperature
    field5?: number; // Humidity
    field6?: number; // Air Quality Index
    field7?: number; // Battery Level
    field8?: number; // Signal Strength
}

interface ThingSpeakResponse {
    channel: {
        id: number;
        name: string;
        description: string;
        latitude: string;
        longitude: string;
        field1: string;
        field2: string;
        field3: string;
        field4: string;
        field5: string;
        field6: string;
        field7: string;
        field8: string;
        created_at: string;
        updated_at: string;
        last_entry_id: number;
    };
    feeds: SensorReading[];
}

/**
 * Get ThingSpeak configuration from environment
 */
function getConfig(): ThingSpeakConfig {
    const channelId = process.env.THINGSPEAK_CHANNEL_ID || '';
    const readApiKey = process.env.THINGSPEAK_READ_API_KEY || '';
    const writeApiKey = process.env.THINGSPEAK_WRITE_API_KEY || '';

    if (!channelId || !readApiKey) {
        console.warn('ThingSpeak credentials not configured. Using mock data.');
    }

    return { channelId, readApiKey, writeApiKey };
}

/**
 * Fetch sensor data from ThingSpeak
 * @param results - Number of results to fetch (default: 100, max: 8000)
 * @param days - Number of days of data to fetch
 */
export async function fetchSensorData(
    results: number = 100,
    days?: number
): Promise<SensorReading[]> {
    const config = getConfig();

    if (!config.channelId || !config.readApiKey) {
        // Return mock data if not configured
        return generateMockSensorData(results);
    }

    try {
        let url = `https://api.thingspeak.com/channels/${config.channelId}/feeds.json?api_key=${config.readApiKey}&results=${results}`;

        if (days) {
            url += `&days=${days}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`ThingSpeak API error: ${response.status}`);
        }

        const data: ThingSpeakResponse = await response.json();
        return data.feeds;
    } catch (error) {
        console.error('Error fetching ThingSpeak data:', error);
        // Fallback to mock data
        return generateMockSensorData(results);
    }
}

/**
 * Get latest sensor reading
 */
export async function getLatestReading(): Promise<SensorReading | null> {
    const config = getConfig();

    if (!config.channelId || !config.readApiKey) {
        const mockData = generateMockSensorData(1);
        return mockData[0] || null;
    }

    try {
        const url = `https://api.thingspeak.com/channels/${config.channelId}/feeds/last.json?api_key=${config.readApiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`ThingSpeak API error: ${response.status}`);
        }

        const data: SensorReading = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching latest reading:', error);
        const mockData = generateMockSensorData(1);
        return mockData[0] || null;
    }
}

/**
 * Get sensor data for a specific field
 * @param fieldNumber - Field number (1-8)
 * @param results - Number of results
 */
export async function getFieldData(
    fieldNumber: number,
    results: number = 100
): Promise<Array<{ created_at: string; value: number }>> {
    const config = getConfig();

    if (!config.channelId || !config.readApiKey || fieldNumber < 1 || fieldNumber > 8) {
        return [];
    }

    try {
        const url = `https://api.thingspeak.com/channels/${config.channelId}/fields/${fieldNumber}.json?api_key=${config.readApiKey}&results=${results}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`ThingSpeak API error: ${response.status}`);
        }

        const data: ThingSpeakResponse = await response.json();

        return data.feeds.map(feed => ({
            created_at: feed.created_at,
            value: (feed as any)[`field${fieldNumber}`] || 0
        }));
    } catch (error) {
        console.error('Error fetching field data:', error);
        return [];
    }
}

/**
 * Write sensor data to ThingSpeak
 * @param data - Sensor readings (field1-field8)
 */
export async function writeSensorData(data: {
    field1?: number;
    field2?: number;
    field3?: number;
    field4?: number;
    field5?: number;
    field6?: number;
    field7?: number;
    field8?: number;
}): Promise<boolean> {
    const config = getConfig();

    if (!config.channelId || !config.writeApiKey) {
        console.log('Mock write:', data);
        return true; // Mock success
    }

    try {
        const params = new URLSearchParams({
            api_key: config.writeApiKey,
            ...Object.fromEntries(
                Object.entries(data).map(([key, value]) => [key, String(value)])
            )
        });

        const url = `https://api.thingspeak.com/update?${params.toString()}`;

        const response = await fetch(url);
        const entryId = await response.text();

        return parseInt(entryId) > 0;
    } catch (error) {
        console.error('Error writing to ThingSpeak:', error);
        return false;
    }
}

/**
 * Generate mock sensor data for development/fallback
 */
function generateMockSensorData(count: number): SensorReading[] {
    const data: SensorReading[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
        const timestamp = new Date(now.getTime() - i * 5 * 60 * 1000); // 5 min intervals

        data.push({
            created_at: timestamp.toISOString(),
            entry_id: count - i,
            field1: Math.random() * 50 + 20, // VOC Level (20-70)
            field2: Math.random() * 100 + 50, // Water Usage (50-150L)
            field3: Math.random() * 50 + 10, // Chemical Usage (10-60ml)
            field4: Math.random() * 10 + 20, // Temperature (20-30°C)
            field5: Math.random() * 30 + 40, // Humidity (40-70%)
            field6: Math.random() * 100 + 50, // Air Quality (50-150)
            field7: Math.random() * 30 + 70, // Battery (70-100%)
            field8: Math.random() * 30 + 70, // Signal (70-100%)
        });
    }

    return data;
}

/**
 * Parse sensor reading to friendly format
 */
export function parseSensorReading(reading: SensorReading) {
    return {
        timestamp: reading.created_at,
        vocLevel: reading.field1 || 0,
        waterUsage: reading.field2 || 0,
        chemicalUsage: reading.field3 || 0,
        temperature: reading.field4 || 0,
        humidity: reading.field5 || 0,
        airQuality: reading.field6 || 0,
        battery: reading.field7 || 0,
        signal: reading.field8 || 0,
    };
}

/**
 * Get sensor data in parsed format
 * @param results - Number of results to fetch
 */
export async function getSensorData(results: number = 100) {
    const rawData = await fetchSensorData(results);
    return rawData.map(parseSensorReading);
}

/**
 * Get latest sensor data in parsed format
 */
export async function getLatestSensorData() {
    const rawData = await getLatestReading();
    return rawData ? parseSensorReading(rawData) : null;
}
