import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/settings/test-connection
 * Test IoT service connections (ThingSpeak, AWS IoT)
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type, config } = body;

        if (!type || !config) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'type and config are required',
                },
                { status: 400 }
            );
        }

        if (type === 'thingspeak') {
            return await testThingSpeakConnection(config);
        } else if (type === 'awsiot') {
            return await testAwsIotConnection(config);
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid type. Must be "thingspeak" or "awsiot"',
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error('Error testing connection:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to test connection',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * Test ThingSpeak connection with provided credentials
 */
async function testThingSpeakConnection(config: {
    channelId: string;
    readApiKey: string;
}) {
    const { channelId, readApiKey } = config;

    if (!channelId || !readApiKey) {
        return NextResponse.json(
            {
                success: false,
                message: 'ThingSpeak Channel ID and Read API Key are required',
            },
            { status: 400 }
        );
    }

    try {
        // Test by fetching the latest reading
        const url = `https://api.thingspeak.com/channels/${channelId}/feeds/last.json?api_key=${readApiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                return NextResponse.json({
                    success: false,
                    message: 'Invalid API credentials. Please check your Channel ID and Read API Key.',
                });
            }
            if (response.status === 404) {
                return NextResponse.json({
                    success: false,
                    message: 'Channel not found. Please verify your Channel ID.',
                });
            }
            throw new Error(`ThingSpeak API error: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json({
            success: true,
            message: 'ThingSpeak connection successful!',
            details: {
                entryId: data.entry_id,
                createdAt: data.created_at,
                fields: {
                    vocLevel: data.field1,
                    waterUsage: data.field2,
                    chemicalUsage: data.field3,
                    temperature: data.field4,
                    humidity: data.field5,
                },
            },
        });
    } catch (error: any) {
        console.error('ThingSpeak connection test failed:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to connect to ThingSpeak. Please check your credentials.',
            error: error.message,
        });
    }
}

/**
 * Test AWS IoT connection (placeholder)
 */
async function testAwsIotConnection(config: {
    endpoint: string;
    region: string;
}) {
    const { endpoint, region } = config;

    if (!endpoint) {
        return NextResponse.json(
            {
                success: false,
                message: 'AWS IoT endpoint is required',
            },
            { status: 400 }
        );
    }

    // AWS IoT Core integration is not yet implemented
    // This is a placeholder for future implementation
    return NextResponse.json({
        success: false,
        message: 'AWS IoT Core integration is not yet implemented. This feature will be available in a future update.',
        details: {
            providedEndpoint: endpoint,
            providedRegion: region,
            status: 'not_implemented',
        },
    });
}
