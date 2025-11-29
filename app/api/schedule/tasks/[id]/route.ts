import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Task from '@/models/Task';
import mongoose from 'mongoose';

/**
 * GET /api/schedule/tasks/[id]
 * Fetch a single task by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid task ID',
                },
                { status: 400 }
            );
        }

        const task = await Task.findById(id).populate('assignedToId', 'name email role');

        if (!task) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Task not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: task,
        });
    } catch (error: any) {
        console.error('Error fetching task:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch task',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/schedule/tasks/[id]
 * Update a task
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;
        const body = await request.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid task ID',
                },
                { status: 400 }
            );
        }

        // Remove fields that shouldn't be directly updated
        delete body._id;
        delete body.createdAt;
        delete body.updatedAt;

        // If status is being changed to completed, set completedAt and completedBy
        if (body.status === 'completed' && !body.completedAt) {
            body.completedAt = new Date();
            // You can set completedBy from auth token if implemented
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        ).populate('assignedToId', 'name email role');

        if (!updatedTask) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Task not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Task updated successfully',
            data: updatedTask,
        });
    } catch (error: any) {
        console.error('Error updating task:', error);

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
                message: 'Failed to update task',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/schedule/tasks/[id]
 * Update task status only (quick status change)
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;
        const { status } = await request.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid task ID',
                },
                { status: 400 }
            );
        }

        if (!status) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Status is required',
                },
                { status: 400 }
            );
        }

        const updateData: any = { status };

        // Auto-set completedAt when marking as completed
        if (status === 'completed') {
            updateData.completedAt = new Date();
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).populate('assignedToId', 'name email role');

        if (!updatedTask) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Task not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Task status updated successfully',
            data: updatedTask,
        });
    } catch (error: any) {
        console.error('Error updating task status:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update task status',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/schedule/tasks/[id]
 * Delete a task
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid task ID',
                },
                { status: 400 }
            );
        }

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Task not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Task deleted successfully',
            data: deletedTask,
        });
    } catch (error: any) {
        console.error('Error deleting task:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to delete task',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
