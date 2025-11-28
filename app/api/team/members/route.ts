import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import TeamMember from '@/models/TeamMember';
import { requireManager } from '@/lib/auth-app-router';

/**
 * GET /api/team/members
 * Fetch all team members with optional filtering
 * PROTECTED: Requires manager or admin role
 */
export async function GET(request: NextRequest) {
    // Authentication check
    const authResult = await requireManager(request);
    if ('error' in authResult) return authResult.error;
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const specialization = searchParams.get('specialization');

        // Build query
        const query: any = {};
        if (status) query.status = status;
        if (specialization) query.specialization = specialization;

        const members = await TeamMember.find(query).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: members,
            count: members.length,
        });
    } catch (error: any) {
        console.error('Error fetching team members:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch team members',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/team/members
 * Create a new team member
 * PROTECTED: Requires manager or admin role
 */
export async function POST(request: NextRequest) {
    // Authentication check
    const authResult = await requireManager(request);
    if ('error' in authResult) return authResult.error;
    try {
        await connectDB();

        const body = await request.json();
        const { name, role, email, phone, specialization } = body;

        // Validation
        if (!name || !role || !email || !phone || !specialization) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Please provide all required fields: name, role, email, phone, specialization',
                },
                { status: 400 }
            );
        }

        // Check if member with email already exists
        const existingMember = await TeamMember.findOne({ email: email.toLowerCase() });
        if (existingMember) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'A team member with this email already exists',
                },
                { status: 400 }
            );
        }

        // Create new team member
        const newMember = await TeamMember.create({
            name,
            role,
            email,
            phone,
            specialization,
            status: 'active',
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Team member added successfully',
                data: newMember,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating team member:', error);

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
                message: 'Failed to create team member',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
