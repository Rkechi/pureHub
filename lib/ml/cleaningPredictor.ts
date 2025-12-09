import * as stats from 'simple-statistics';

export interface CleaningTask {
    area: string;
    taskType: string;
    complexity: number; // 1-5
    priority: string;
    assignedTo?: string;
    estimatedDuration?: number;
}

export interface HistoricalTask extends CleaningTask {
    actualDuration: number;
    completedAt: Date;
    cleanerExperience: number; // years
    cleanerPerformanceScore: number; // 0-100
}

export interface PredictionResult {
    recommendedTime: Date;
    confidence: number;
    estimatedDuration: number;
    reason: string;
    factors: {
        vocTrend: string;
        historicalFrequency: number;
        lastCleaned: Date | null;
        urgency: string;
    };
}

export class CleaningPredictor {
    /**
     * Predict when an area should be cleaned next based on multiple factors
     */
    async predictNextCleaning(
        area: string,
        sensorData: any[],
        historicalCleanings: HistoricalTask[]
    ): Promise<PredictionResult> {
        const factors = await this.analyzeFactors(area, sensorData, historicalCleanings);

        // Calculate optimal cleaning interval in hours
        const baseInterval = this.calculateBaseInterval(historicalCleanings, area);
        const adjustedInterval = this.adjustForConditions(baseInterval, factors);

        const recommendedTime = new Date(Date.now() + adjustedInterval * 60 * 60 * 1000);
        const confidence = this.calculateConfidence(factors, historicalCleanings.length);
        const estimatedDuration = this.estimateDuration(area, historicalCleanings);

        return {
            recommendedTime,
            confidence,
            estimatedDuration,
            reason: this.generateReason(factors),
            factors: {
                vocTrend: factors.vocTrend,
                historicalFrequency: factors.historicalFrequency,
                lastCleaned: factors.lastCleaned,
                urgency: factors.urgency,
            },
        };
    }

    /**
     * Predict optimal duration for a task based on historical data
     */
    predictTaskDuration(task: CleaningTask, cleanerExperience: number): number {
        // Simple regression model based on complexity and experience
        const baseTime = 30; // minutes
        const complexityFactor = task.complexity * 15;
        const experienceFactor = Math.max(1 - (cleanerExperience / 10), 0.5);

        return Math.round(baseTime + complexityFactor * experienceFactor);
    }

    /**
     * Optimize cleaning schedule for multiple areas
     */
    optimizeSchedule(
        areas: string[],
        sensorData: any[],
        historicalData: HistoricalTask[],
        availableHours: number
    ): { area: string; priority: number; estimatedDuration: number }[] {
        const predictions = areas.map(area => {
            const areaSensors = sensorData.filter(s => s.area === area);
            const areaHistory = historicalData.filter(h => h.area === area);

            // Calculate urgency score (0-100)
            const urgency = this.calculateUrgency(areaSensors, areaHistory);
            const duration = this.estimateDuration(area, areaHistory);

            return {
                area,
                priority: urgency,
                estimatedDuration: duration,
            };
        });

        // Sort by priority and fit into available hours
        return predictions
            .sort((a, b) => b.priority - a.priority)
            .filter((_, index, array) => {
                const total = array.slice(0, index + 1)
                    .reduce((sum, p) => sum + p.estimatedDuration, 0);
                return total <= availableHours * 60;
            });
    }

    private async analyzeFactors(
        area: string,
        sensorData: any[],
        historicalCleanings: HistoricalTask[]
    ) {
        const areaSensors = sensorData.filter(s => s.area === area);
        const areaCleanings = historicalCleanings.filter(h => h.area === area);

        // VOC trend analysis
        const vocTrend = this.analyzeTrend(areaSensors, 'vocLevel');

        // Historical frequency
        const historicalFrequency = this.calculateHistoricalFrequency(areaCleanings);

        // Last cleaned
        const lastCleaned = areaCleanings.length > 0
            ? new Date(Math.max(...areaCleanings.map(c => c.completedAt.getTime())))
            : null;

        // Current urgency
        const urgency = this.calculateUrgency(areaSensors, areaCleanings);

        return {
            vocTrend,
            historicalFrequency,
            lastCleaned,
            urgency: this.urgencyToString(urgency),
            sensorDataPoints: areaSensors.length,
            historicalDataPoints: areaCleanings.length,
        };
    }

    private analyzeTrend(sensorData: any[], field: string): string {
        if (sensorData.length < 5) return 'insufficient_data';

        const values = sensorData.slice(-10).map(s => s[field]);

        // Simple linear regression to detect trend
        const n = values.length;
        const indices = Array.from({ length: n }, (_, i) => i);

        try {
            const linearRegression = stats.linearRegression(
                indices.map((x, i) => [x, values[i]])
            );

            const slope = linearRegression.m;

            if (slope > 0.05) return 'increasing';
            if (slope < -0.05) return 'decreasing';
            return 'stable';
        } catch {
            return 'stable';
        }
    }

    private calculateBaseInterval(cleanings: HistoricalTask[], area: string): number {
        const areaCleanings = cleanings.filter(c => c.area === area);

        if (areaCleanings.length < 2) {
            return 24; // Default 24 hours
        }

        // Calculate average interval between cleanings
        const sorted = areaCleanings.sort((a, b) =>
            a.completedAt.getTime() - b.completedAt.getTime()
        );

        const intervals: number[] = [];
        for (let i = 1; i < sorted.length; i++) {
            const hoursDiff = (sorted[i].completedAt.getTime() - sorted[i - 1].completedAt.getTime())
                / (1000 * 60 * 60);
            intervals.push(hoursDiff);
        }

        return stats.median(intervals);
    }

    private adjustForConditions(baseInterval: number, factors: any): number {
        let adjusted = baseInterval;

        // Adjust based on VOC trend
        if (factors.vocTrend === 'increasing') {
            adjusted *= 0.7; // Clean sooner
        } else if (factors.vocTrend === 'decreasing') {
            adjusted *= 1.2; // Can wait longer
        }

        // Adjust based on urgency
        const urgencyNum = this.urgencyFromString(factors.urgency);
        if (urgencyNum > 70) {
            adjusted *= 0.5; // High urgency - clean much sooner
        } else if (urgencyNum < 30) {
            adjusted *= 1.3; // Low urgency - can wait
        }

        return Math.max(2, Math.min(72, adjusted)); // Clamp between 2-72 hours
    }

    private calculateConfidence(factors: any, dataPoints: number): number {
        let confidence = 50; // Base confidence

        // More historical data = higher confidence
        if (dataPoints > 20) confidence += 30;
        else if (dataPoints > 10) confidence += 20;
        else if (dataPoints > 5) confidence += 10;

        // More sensor data = higher confidence
        if (factors.sensorDataPoints > 50) confidence += 20;
        else if (factors.sensorDataPoints > 20) confidence += 10;

        return Math.min(95, confidence);
    }

    private calculateHistoricalFrequency(cleanings: HistoricalTask[]): number {
        if (cleanings.length === 0) return 0;

        const daysSpan = 30; // Last 30 days
        const recentCleanings = cleanings.filter(c =>
            Date.now() - c.completedAt.getTime() < daysSpan * 24 * 60 * 60 * 1000
        );

        return recentCleanings.length / daysSpan; // Cleanings per day
    }

    private calculateUrgency(sensorData: any[], cleanings: HistoricalTask[]): number {
        let urgency = 0;

        if (sensorData.length > 0) {
            const latest = sensorData[sensorData.length - 1];

            // VOC contribution
            if (latest.vocLevel > 0.8) urgency += 40;
            else if (latest.vocLevel > 0.5) urgency += 20;

            // Humidity contribution  
            if (latest.humidity > 70) urgency += 20;
            else if (latest.humidity > 60) urgency += 10;
        }

        // Time since last cleaning
        if (cleanings.length > 0) {
            const lastCleaning = new Date(Math.max(...cleanings.map(c => c.completedAt.getTime())));
            const hoursSince = (Date.now() - lastCleaning.getTime()) / (1000 * 60 * 60);

            if (hoursSince > 48) urgency += 30;
            else if (hoursSince > 24) urgency += 15;
        } else {
            urgency += 40; // Never cleaned
        }

        return Math.min(100, urgency);
    }

    private estimateDuration(area: string, historicalData: HistoricalTask[]): number {
        const areaData = historicalData.filter(h => h.area === area);

        if (areaData.length === 0) {
            return 45; // Default estimate in minutes
        }

        return Math.round(stats.mean(areaData.map(d => d.actualDuration)));
    }

    private urgencyToString(urgency: number): string {
        if (urgency > 75) return 'critical';
        if (urgency > 50) return 'high';
        if (urgency > 25) return 'medium';
        return 'low';
    }

    private urgencyFromString(urgency: string): number {
        const map: Record<string, number> = {
            critical: 90,
            high: 70,
            medium: 40,
            low: 15,
        };
        return map[urgency] || 50;
    }

    private generateReason(factors: any): string {
        const reasons: string[] = [];

        if (factors.vocTrend === 'increasing') {
            reasons.push('VOC levels are rising');
        }

        if (factors.urgency === 'critical' || factors.urgency === 'high') {
            reasons.push('Area requires urgent attention');
        }

        if (factors.lastCleaned) {
            const hoursSince = (Date.now() - factors.lastCleaned.getTime()) / (1000 * 60 * 60);
            if (hoursSince > 48) {
                reasons.push(`Last cleaned ${Math.round(hoursSince / 24)} days ago`);
            }
        } else {
            reasons.push('No cleaning history available');
        }

        if (factors.historicalFrequency > 1) {
            reasons.push('High-traffic area');
        }

        return reasons.join('. ') + '.';
    }
}

// Singleton instance
export const cleaningPredictor = new CleaningPredictor();
