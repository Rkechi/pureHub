# Quick Integration Guide

## ✅ Fixed Errors

The ML Analytics dashboard has been repaired and is now working!

## 🚀 How to Use Real Data

### 1. Sensor Data (Already Working!)

Your ML dashboard now uses the `/api/sensors` endpoint which pulls from ThingSpeak.

**Test it:**
```bash
# Visit in browser (must be logged in)
http://localhost:3000/api/sensors
```

### 2. Blockchain Integration with Tasks

Add this to your task completion handler:

**When a task is CREATED:**
```typescript
// In your task creation code
const createTask = async (taskData) => {
    const task = await Task.create(taskData);
    
    // Add blockchain record
    await fetch('/api/blockchain/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            taskId: task._id.toString(),
            action: 'created',
            data: {
                area: task.area,
                priority: task.priority
            }
        })
    });
    
    return task;
};
```

**When a task is COMPLETED:**
```typescript
// In your task completion code
const completeTask = async (taskId, data) => {
    await Task.findByIdAndUpdate(taskId, { status: 'completed' });
    
    // Add blockchain record
    await fetch('/api/blockchain/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            taskId: taskId,
            action: 'completed',
            data: {
                duration: data.duration,
                photoProof: data.photoUrl
            }
        })
    });
};
```

## Test Everything

1. **ML Dashboard:** http://localhost:3000/dashboard/ml-analytics
2. **Blockchain:** http://localhost:3000/dashboard/blockchain
3. **Sensors API:** http://localhost:3000/api/sensors

All working! 🎉
