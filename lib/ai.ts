interface Task {
    id: string;
    area: string;
    location: {
        lat: number;
        lng: number;
    };
    duration: number;
    priority: number;
}

interface OptimizedRoute {
    tasks: Task[];
    totalDistance: number;
    totalTime: number;
    efficiency: number;
}

// Calculate distance between two points (Haversine formula)
function calculateDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
): number {
    const R = 6371; // Earth's radius in Kilometers
    const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
    const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((point1.lat * Math.PI) / 180) * Math.cos((point2.lat * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

//Simple greedy algorithm for route optimization
export function optimizeRoute(tasks: Task[]): OptimizedRoute {
    if (tasks.length === 0) {
        return { tasks: [], totalDistance: 0, totalTime: 0, efficiency: 100 };
    }

    if (tasks.length === 1) {
        return {
            tasks,
            totalDistance: 0,
            totalTime: tasks[0].duration,
            efficiency: 100,
        };
    }

    // Start with highest priority tasks
    const sortedByPriority = [...tasks].sort((a, b) => b.priority - a.priority);
    const optimized: Task[] = [sortedByPriority[0]];

    const remaining = sortedByPriority.slice(1);

    let totalDistance = 0;
    let totalTime = optimized[0].duration;

    // Greedy algorithm: always pick the nearest remaining task
    while (remaining.length > 0) {
        const current = optimized[optimized.length - 1];

        // Find the nearest task from remaining tasks
        let nearestIndex = 0;
        let minDistance = calculateDistance(current.location, remaining[0].location);

        for (let i = 1; i < remaining.length; i++) {
            const distance = calculateDistance(current.location, remaining[i].location);
            if (distance < minDistance) {
                minDistance = distance;
                nearestIndex = i;
            }
        }

        // Add the nearest task to optimized route
        const nearestTask = remaining.splice(nearestIndex, 1)[0];
        optimized.push(nearestTask);
        totalDistance += minDistance;
        totalTime += nearestTask.duration;
    }

    // Calculate efficiency (could be based on various metrics)
    const efficiency = Math.max(0, 100 - (totalDistance / tasks.length) * 2);

    return {
        tasks: optimized,
        totalDistance,
        totalTime,
        efficiency,
    };
}

// Predict optimal cleaning time based on historical data
export function predictOptimalTime(area: string, historicalData: any[]): string {
    // Simple average-based prediction
    const areaData = historicalData.filter(d => d.area === area);

    if (areaData.length === 0) {
        return '09:00'; // Default Morning Time
    }

    const times = areaData.map(d => new Date(d.timestamp).getHours());
    const avgHour = Math.round(times.reduce((sum, h) => sum + h, 0) / times.length);

    return `${avgHour.toString().padStart(2, '0')}:00`;
}