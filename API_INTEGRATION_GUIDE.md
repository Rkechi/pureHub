# API Integration Guide

## How to Connect Dashboards to Real Data

### Prerequisites

You need these API endpoints to be functional:
1. `/api/sensors` - For sensor data (or use existing ThingSpeak integration)
2. `/api/tasks` - For task/cleaning history
3. `/api/ml/anomaly-detection` - Already created ✅
4. `/api/ml/predict-cleaning` - Already created ✅
5. `/api/blockchain/audit` - Already created ✅

---

## Step 1: Create Missing API Endpoints

### A. Sensor Data API (if not using ThingSpeak directly)

Create: `app/api/sensors/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { fetchSensorData } from '@/lib/thingspeak'; // Use your existing ThingSpeak integration

export async function GET(request: NextRequest) {
    try {
        // Fetch from ThingSpeak or your sensor database
        const areas = ['Main Lobby', 'Conference Room A', 'Office Floor 2', 'Storage Room', 'Restrooms'];
        
        const readings = await Promise.all(
            areas.map(async (area) => {
                const data = await fetchSensorData(area);
                return {
                    area,
                    vocLevel: data.vocLevel,
                    humidity: data.humidity,
                    temperature: data.temperature,
                    waterUsed: data.waterUsed,
                    timestamp: data.timestamp,
                };
            })
        );

        return NextResponse.json({
            success: true,
            readings,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
```

---

## Step 2: Integrate Blockchain with Task Lifecycle

Update your task creation/completion logic to automatically create blockchain records.

### Example: Update Task Completion Handler

In `app/api/tasks/[id]/route.ts` (or wherever you handle task updates):

```typescript
import { blockchainAudit } from '@/lib/blockchain/auditTrail';

// When task is created
const createTaskWithBlockchain = async (taskData: any) => {
    // Create task in MongoDB
    const task = await Task.create(taskData);
    
    // Create blockchain audit trail
    const auditResponse = await fetch('/api/blockchain/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            taskId: task._id.toString(),
            action: 'created',
            data: {
                area: task.area,
                priority: task.priority,
                assignedTo: task.assignedTo,
            },
        }),
    });
    
    const auditResult = await auditResponse.json();
    
    // Store blockchain transaction ID in task
    task.blockchainTxId = auditResult.auditTrail.lastHash;
    await task.save();
    
    return task;
};

// When task is completed
const completeTaskWithBlockchain = async (taskId: string, completionData: any) => {
    const task = await Task.findById(taskId);
    
    // Update task
    task.status = 'completed';
    task.completedAt = new Date();
    await task.save();
    
    // Add blockchain block
    await fetch('/api/blockchain/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            taskId: taskId,
            action: 'completed',
            data: {
                duration: completionData.duration,
                photoProof: completionData.photoProof,
            },
        }),
    });
};
```

---

## Step 3: Configuration for Real-Time Updates

### Automatic Refresh in Dashboards

Add auto-refresh to dashboards:

```typescript
// In ML Analytics dashboard
useEffect(() => {
    loadAnalytics();
    
    // Refresh every 5 minutes
    const interval = setInterval(loadAnalytics, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
}, []);
```

---

## Step 4: Environment Variables

Add to `.env.local`:

```env
# ML Configuration
ML_REFRESH_INTERVAL=300000  # 5 minutes in ms
ML_CONFIDENCE_THRESHOLD=0.75

# Blockchain
BLOCKCHAIN_ENABLED=true
BLOCKCHAIN_AUTO_VERIFY=true

# Data Sources
USE_REAL_SENSORS=true  # Set to false to use mock data
THINGSPEAK_CHANNEL_ID=your_channel_id
THINGSPEAK_READ_API_KEY=your_api_key
```

---

## Step 5: Testing Real Data Flow

### Test ML Anomaly Detection

```bash
# 1. Post real sensor data
curl -X POST http://localhost:3000/api/ml/anomaly-detection \
  -H "Content-Type: application/json" \
  -d '{
    "sensorData": [
      {"area": "Lobby", "vocLevel": 0.85, "humidity": 65, "temperature": 24, "waterUsed": 1.5, "timestamp": "2025-12-09T10:00:00Z"}
    ],
    "area": "Lobby"
  }'

# Expected: Anomalies detected if VOC is abnormal
```

### Test Blockchain Audit Trail

```bash
# 1. Create audit block
curl -X POST http://localhost:3000/api/blockchain/audit \
  -H "Content-Type: application/json" \
  -d '{
    "taskId": "test_123",
    "action": "created",
    "data": {"area": "Lobby", "priority": "high"}
  }'

# 2. Verify audit trail
curl http://localhost:3000/api/blockchain/audit?taskId=test_123
```

---

## Step 6: Data Flow Overview

```
┌─────────────────┐
│  Sensor Data    │ → ThingSpeak API → `/api/sensors`
└─────────────────┘

┌─────────────────┐
│  Task Actions   │ → MongoDB → `/api/tasks`
└─────────────────┘

┌─────────────────┐
│  ML Analytics   │ → Reads sensor data → Runs anomaly detection → Dashboard
└─────────────────┘

┌─────────────────┐
│  Blockchain     │ → Task lifecycle events → Creates blocks → Dashboard
└─────────────────┘
```

---

## Quick Integration Checklist

- [ ] Create `/api/sensors` endpoint (or use existing ThingSpeak)
- [ ] Update task creation to call `/api/blockchain/audit`
- [ ] Update task completion to call `/api/blockchain/audit`
- [ ] Verify ML Analytics dashboard shows real anomalies
- [ ] Verify Blockchain dashboard shows real task trails
- [ ] Set up auto-refresh intervals
- [ ] Configure environment variables
- [ ] Test end-to-end data flow

---

## Production Tips

1. **Caching**: Cache ML predictions for 5-15 minutes to reduce API calls
2. **Rate Limiting**: ML predictions can be compute-intensive
3. **Error Handling**: Dashboards should gracefully handle API failures
4. **Loading States**: Show skeletons while data loads
5. **Pagination**: For blockchain trails, paginate if you have 100+ tasks

---

## Example: Complete Integration

```typescript
// In your task completion handler
const handleTaskCompletion = async (taskId: string, data: any) => {
    // 1. Update task in database
    await updateTask(taskId, { status: 'completed', ...data });
    
    // 2. Create blockchain record
    await fetch('/api/blockchain/audit', {
        method: 'POST',
        body: JSON.stringify({
            taskId,
            action: 'completed',
            data: { duration: data.duration }
        })
    });
    
    // 3. Fetch sensor data for ML analysis
    const sensorData = await fetch('/api/sensors').then(r => r.json());
    
    // 4. Run anomaly detection
    await fetch('/api/ml/anomaly-detection', {
        method: 'POST',
        body: JSON.stringify({
            sensorData: sensorData.readings,
            area: data.area
        })
    });
    
    // 5. Get next cleaning prediction
    const prediction = await fetch('/api/ml/predict-cleaning', {
        method: 'POST',
        body: JSON.stringify({
            area: data.area,
            sensorData: sensorData.readings,
            historicalCleanings: await getHistoricalCleanings(data.area)
        })
    });
};
```

---

## Need Help?

Check the walkthroughs for examples:
- `walkthrough.md` - Full IoT integration examples
- `ml_blockchain_plan.md` - Architecture details

The dashboards are now configured to use real APIs! Just ensure your endpoints return data in the expected format.
