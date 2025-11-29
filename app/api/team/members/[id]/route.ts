import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import TeamMember from '@/models/TeamMember';
import mongoose from 'mongoose';

/**
 * GET /api/team/members/[id]
 * Fetch a single team member by ID
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
                    message: 'Invalid team member ID',
                },
                { status: 400 }
            );
        }

        const member = await TeamMember.findById(id);

        if (!member) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Team member not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: member,
        });
    } catch (error: any) {
        console.error('Error fetching team member:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch team member',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/team/members/[id]
 * Update a team member
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
                    message: 'Invalid team member ID',
                },
                { status: 400 }
            );
        }

        // Remove fields that shouldn't be directly updated
        delete body._id;
        delete body.createdAt;
        delete body.updatedAt;

        const updatedMember = await TeamMember.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedMember) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Team member not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Team member updated successfully',
            data: updatedMember,
        });
    } catch (error: any) {
        console.error('Error updating team member:', error);

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
                message: 'Failed to update team member',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/team/members/[id]
 * Delete a team member
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
                    message: 'Invalid team member ID',
                },
                { status: 400 }
            );
        }

        const deletedMember = await TeamMember.findByIdAndDelete(id);

        if (!deletedMember) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Team member not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Team member deleted successfully',
            data: deletedMember,
        });
    } catch (error: any) {
        console.error('Error deleting team member:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to delete team member',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
