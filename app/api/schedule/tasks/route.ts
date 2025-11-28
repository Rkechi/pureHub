import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Task from '@/models/Task';
import { requireAuth } from '@/lib/auth-app-router';

/**
 * GET /api/schedule/tasks
 * Fetch all tasks with optional filtering
 * PROTECTED: Requires authentication
 */
export async function GET(request: NextRequest) {
    // Authentication check
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const priority = searchParams.get('priority');
        const assignedTo = searchParams.get('assignedTo');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        // Build query
        const query: any = {};

        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (assignedTo) query.assignedTo = assignedTo;

        // Date range filtering
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const tasks = await Task.find(query)
            .populate('assignedToId', 'name email role')
            .sort({ date: 1, time: 1 }); // Sort by date and time ascending

        return NextResponse.json({
            success: true,
            data: tasks,
            count: tasks.length,
        });
    } catch (error: any) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch tasks',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/schedule/tasks
 * Create a new task
 * PROTECTED: Requires authentication
 */
export async function POST(request: NextRequest) {
    // Authentication check
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;
    try {
        await connectDB();

        const body = await request.json();
        const { title, area, assignedTo, date, time, priority, description } = body;

        // Validation
        if (!title || !area || !assignedTo || !date || !time) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Please provide all required fields: title, area, assignedTo, date, time',
                },
                { status: 400 }
            );
        }

        // Create new task
        const newTask = await Task.create({
            title,
            area,
            assignedTo,
            date: new Date(date),
            time,
            priority: priority || 'medium',
            description,
            status: 'pending',
            ...body, // Include any additional fields
        });

        // Populate assignedTo details if assignedToId was provided
        const populatedTask = await Task.findById(newTask._id).populate('assignedToId', 'name email role');

        return NextResponse.json(
            {
                success: true,
                message: 'Task created successfully',
                data: populatedTask,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating task:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((e: any) => e.message);
            return NextResponse.json(
                {
                    success: false,
                    message: messages.join(', '),
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to create task',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
