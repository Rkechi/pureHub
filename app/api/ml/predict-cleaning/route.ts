import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { cleaningPredictor } from '@/lib/ml/cleaningPredictor';
import { connectDB } from '@/lib/db';

/**
 * ML Predictive Scheduling API
 * Predicts optimal cleaning times based on patterns
 */

export async function POST(request: NextRequest) {
    try {
        const auth = await requireAuth(request);
        if (!auth.success) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const body = await request.json();
        const { area, sensorData, historicalCleanings } = body;

        if (!area) {
            return NextResponse.json(
                { error: 'Area parameter required' },
                { status: 400 }
            );
        }

        // Predict next cleaning time
        const prediction = await cleaningPredictor.predictNextCleaning(
            area,
            sensorData || [],
            historicalCleanings || []
        );

        return NextResponse.json({
            success: true,
            prediction,
            metadata: {
                dataPoints: {
                    sensor: sensorData?.length || 0,
                    historical: historicalCleanings?.length || 0,
                },
                generatedAt: new Date(),
            },
        });
    } catch (error: any) {
        console.error('Prediction error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Prediction failed',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// GET endpoint for schedule optimization
export async function GET(request: NextRequest) {
    try {
        const auth = await requireAuth(request);
        if (!auth.success) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // This would fetch predictions for all areas
        // For now, return usage info

        return NextResponse.json({
            success: true,
            message: 'Predictive scheduling endpoint',
            usage: 'POST with area, sensorData, and historicalCleanings to get predictions',
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
