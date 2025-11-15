type Log = { vocLevel: number; timestamp: string; area: string; };
export function optimiseRoute(logs: Log[]) : Log[] {
    // Example: sort by highest VOC level (so clean worst-area first)
    return logs.sort((a, b) => b.vocLevel - a.vocLevel);
}