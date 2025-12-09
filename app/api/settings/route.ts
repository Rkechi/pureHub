import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Settings from '@/models/Settings';

/**
 * GET /api/settings
 * Fetch user settings (requires userId in query param for now)
 * TODO: Get userId from JWT token when auth is fully integrated
 */
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User ID is required',
                },
                { status: 400 }
            );
        }

        let settings = await Settings.findOne({ userId });

        // If settings don't exist for this user, create default settings
        if (!settings) {
            settings = await Settings.create({
                userId,
                // Defaults will be applied from schema
            });
        }

        return NextResponse.json({
            success: true,
            data: settings,
        });
    } catch (error: any) {
        console.error('Error fetching settings:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch settings',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/settings
 * Update user settings
 */
export async function PUT(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { userId, ...settingsData } = body;

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User ID is required',
                },
                { status: 400 }
            );
        }

        // Find and update settings, or create if doesn't exist
        const updatedSettings = await Settings.findOneAndUpdate(
            { userId },
            { $set: settingsData },
            {
                new: true,
                upsert: true, // Create if doesn't exist
                runValidators: true
            }
        );

        return NextResponse.json({
            success: true,
            message: 'Settings updated successfully',
            data: updatedSettings,
        });
    } catch (error: any) {
        console.error('Error updating settings:', error);

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
                message: 'Failed to update settings',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/settings
 * Partially update specific settings sections
 */
export async function PATCH(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const { userId, section, data } = body;

        if (!userId || !section || !data) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'userId, section, and data are required',
                },
                { status: 400 }
            );
        }

        // Validate section exists
        const validSections = ['notifications', 'dashboard', 'tasks', 'reports', 'privacy', 'iot'];
        if (!validSections.includes(section)) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Invalid section. Must be one of: ${validSections.join(', ')}`,
                },
                { status: 400 }
            );
        }

        // Update only the specified section
        const updateQuery: any = {};
        updateQuery[section] = data;

        const updatedSettings = await Settings.findOneAndUpdate(
            { userId },
            { $set: updateQuery },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        return NextResponse.json({
            success: true,
            message: `${section.charAt(0).toUpperCase() + section.slice(1)} settings updated successfully`,
            data: updatedSettings,
        });
    } catch (error: any) {
        console.error('Error updating settings section:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update settings section',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/settings
 * Reset settings to defaults
 */
export async function DELETE(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User ID is required',
                },
                { status: 400 }
            );
        }

        // Delete existing settings
        await Settings.findOneAndDelete({ userId });

        // Create new default settings
        const defaultSettings = await Settings.create({
            userId,
        });

        return NextResponse.json({
            success: true,
            message: 'Settings reset to defaults successfully',
            data: defaultSettings,
        });
    } catch (error: any) {
        console.error('Error resetting settings:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to reset settings',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
