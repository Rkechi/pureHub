// Mock IoT sensor data fetching
export async function fetchSensorData(area: string) {
    return {
        area: "Lobby", 
        vocLevel:
        parseFloat((Math.random() * 0.8 ).toFixed(2)),
        humidity: 45 + Math.random() * 10,
        waterUsed: parseFloat((Math.random() * 2).toFixed(1)),
        timestamp: new Date().toISOString(),
    };
}