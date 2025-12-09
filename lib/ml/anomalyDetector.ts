import * as stats from 'simple-statistics';

export interface SensorReading {
    area: string;
    vocLevel: number;
    humidity: number;
    temperature: number;
    waterUsed: number;
    timestamp: Date;
}

export interface Anomaly {
    type: 'VOC_SPIKE' | 'TEMPERATURE_ABNORMAL' | 'HUMIDITY_EXTREME' | 'WATER_LEAK';
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    recommendation: string;
    timestamp: Date;
    area: string;
    value: number;
    normalRange: { min: number; max: number };
}

export class AnomalyDetector {
    private readonly THRESHOLD_MULTIPLIER = 2.5; // Standard deviations for anomaly

    /**
     * Detect anomalies in sensor data using statistical analysis
     */
    async detectAnomalies(sensorData: SensorReading[], area?: string): Promise<Anomaly[]> {
        if (sensorData.length < 10) {
            // Not enough data for meaningful analysis
            return [];
        }

        const anomalies: Anomaly[] = [];
        const filteredData = area
            ? sensorData.filter(d => d.area === area)
            : sensorData;

        // Analyze VOC levels
        const vocAnomalies = this.detectFieldAnomalies(
            filteredData,
            'vocLevel',
            'VOC_SPIKE',
            'Volatile Organic Compounds',
            { low: 0, normal: 0.5, high: 0.8, critical: 1.0 }
        );
        anomalies.push(...vocAnomalies);

        // Analyze temperature
        const tempAnomalies = this.detectFieldAnomalies(
            filteredData,
            'temperature',
            'TEMPERATURE_ABNORMAL',
            'Temperature',
            { low: 18, normal: 21, high: 24, critical: 26 }
        );
        anomalies.push(...tempAnomalies);

        // Analyze humidity
        const humidityAnomalies = this.detectFieldAnomalies(
            filteredData,
            'humidity',
            'HUMIDITY_EXTREME',
            'Humidity',
            { low: 30, normal: 50, high: 65, critical: 75 }
        );
        anomalies.push(...humidityAnomalies);

        // Detect water leaks (sudden spikes in water usage)
        const waterAnomalies = this.detectWaterLeaks(filteredData);
        anomalies.push(...waterAnomalies);

        return anomalies.sort((a, b) =>
            this.severityToNumber(b.severity) - this.severityToNumber(a.severity)
        );
    }

    private detectFieldAnomalies(
        data: SensorReading[],
        field: keyof SensorReading,
        type: Anomaly['type'],
        fieldName: string,
        thresholds: { low: number; normal: number; high: number; critical: number }
    ): Anomaly[] {
        const anomalies: Anomaly[] = [];
        const values = data.map(d => d[field] as number);

        // Calculate statistical baseline
        const mean = stats.mean(values);
        const stdDev = stats.standardDeviation(values);
        const latest = data[data.length - 1];
        const latestValue = latest[field] as number;

        // Z-score method for anomaly detection
        const zScore = Math.abs((latestValue - mean) / stdDev);

        if (zScore > this.THRESHOLD_MULTIPLIER) {
            let severity: Anomaly['severity'];
            let recommendation: string;

            if (latestValue >= thresholds.critical) {
                severity = 'critical';
                recommendation = `URGENT: ${fieldName} is critically high. Immediate action required.`;
            } else if (latestValue >= thresholds.high) {
                severity = 'high';
                recommendation = `${fieldName} is significantly elevated. Investigation recommended.`;
            } else if (latestValue >= thresholds.normal) {
                severity = 'medium';
                recommendation = `${fieldName} is above normal. Monitor closely.`;
            } else {
                severity = 'low';
                recommendation = `${fieldName} anomaly detected. Review if pattern continues.`;
            }

            anomalies.push({
                type,
                severity,
                message: `Unusual ${fieldName.toLowerCase()} detected: ${latestValue.toFixed(2)} (normal: ${mean.toFixed(2)} ± ${stdDev.toFixed(2)})`,
                recommendation,
                timestamp: latest.timestamp,
                area: latest.area,
                value: latestValue,
                normalRange: {
                    min: mean - stdDev * 2,
                    max: mean + stdDev * 2
                }
            });
        }

        return anomalies;
    }

    private detectWaterLeaks(data: SensorReading[]): Anomaly[] {
        if (data.length < 5) return [];

        const anomalies: Anomaly[] = [];
        const waterUsage = data.map(d => d.waterUsed);
        const latest = data[data.length - 1];

        // Check for sudden spike (>3x higher than recent average)
        const recentAvg = stats.mean(waterUsage.slice(-5, -1));
        const currentUsage = latest.waterUsed;

        if (currentUsage > recentAvg * 3 && currentUsage > 1) {
            anomalies.push({
                type: 'WATER_LEAK',
                severity: 'critical',
                message: `Potential water leak detected: ${currentUsage.toFixed(2)}L (normal: ${recentAvg.toFixed(2)}L)`,
                recommendation: 'URGENT: Check for leaks or malfunctioning equipment immediately.',
                timestamp: latest.timestamp,
                area: latest.area,
                value: currentUsage,
                normalRange: { min: 0, max: recentAvg * 2 }
            });
        }

        return anomalies;
    }

    /**
     * Calculate baseline statistics for a specific area
     */
    calculateBaseline(data: SensorReading[], area: string) {
        const areaData = data.filter(d => d.area === area);

        if (areaData.length === 0) {
            return null;
        }

        return {
            area,
            vocLevel: {
                mean: stats.mean(areaData.map(d => d.vocLevel)),
                stdDev: stats.standardDeviation(areaData.map(d => d.vocLevel)),
                min: stats.min(areaData.map(d => d.vocLevel)),
                max: stats.max(areaData.map(d => d.vocLevel)),
            },
            temperature: {
                mean: stats.mean(areaData.map(d => d.temperature)),
                stdDev: stats.standardDeviation(areaData.map(d => d.temperature)),
                min: stats.min(areaData.map(d => d.temperature)),
                max: stats.max(areaData.map(d => d.temperature)),
            },
            humidity: {
                mean: stats.mean(areaData.map(d => d.humidity)),
                stdDev: stats.standardDeviation(areaData.map(d => d.humidity)),
                min: stats.min(areaData.map(d => d.humidity)),
                max: stats.max(areaData.map(d => d.humidity)),
            },
            dataPoints: areaData.length,
        };
    }

    private severityToNumber(severity: Anomaly['severity']): number {
        const map = { low: 1, medium: 2, high: 3, critical: 4 };
        return map[severity];
    }

    /**
     * Get health score for an area (0-100)
     */
    getAreaHealthScore(data: SensorReading[], area: string): number {
        const anomalies = this.detectAnomalies(data, area);
        const recent = anomalies.filter(a =>
            Date.now() - new Date(a.timestamp).getTime() < 24 * 60 * 60 * 1000
        );

        let score = 100;

        recent.forEach(a => {
            switch (a.severity) {
                case 'critical': score -= 25; break;
                case 'high': score -= 15; break;
                case 'medium': score -= 8; break;
                case 'low': score -= 3; break;
            }
        });

        return Math.max(0, Math.min(100, score));
    }
}

// Singleton instance
export const anomalyDetector = new AnomalyDetector();
