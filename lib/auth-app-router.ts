import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

/**
 * JWT Payload Interface
 */
export interface JWTPayload {
    id: string;
    email: string;
    role: 'admin' | 'manager' | 'cleaner';
    iat?: number;
    exp?: number;
}

/**
 * Extract and verify JWT token from request
 * Works with Next.js 13+ App Router (NextRequest)
 */
export async function verifyAuthToken(request: NextRequest): Promise<JWTPayload | null> {
    try {
        // Get token from Authorization header
        const authHeader = request.headers.get('authorization');

        if (!authHeader) {
            return null;
        }

        // Support both "Bearer TOKEN" and just "TOKEN" formats
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : authHeader;

        const JWT_SECRET = process.env.JWT_SECRET;

        if (!JWT_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables');
            return null;
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

/**
 * Middleware wrapper for protected App Router routes
 * Returns user if authenticated, otherwise returns error response
 */
export async function requireAuth(
    request: NextRequest
): Promise<{ user: JWTPayload } | { error: NextResponse }> {
    const user = await verifyAuthToken(request);

    if (!user) {
        return {
            error: NextResponse.json(
                {
                    success: false,
                    message: 'Authentication required. Please provide a valid token.',
                },
                { status: 401 }
            ),
        };
    }

    return { user };
}

/**
 * Check if user has required role
 */
export async function requireRole(
    request: NextRequest,
    allowedRoles: Array<'admin' | 'manager' | 'cleaner'>
): Promise<{ user: JWTPayload } | { error: NextResponse }> {
    const authResult = await requireAuth(request);

    if ('error' in authResult) {
        return authResult;
    }

    const { user } = authResult;

    if (!allowedRoles.includes(user.role)) {
        return {
            error: NextResponse.json(
                {
                    success: false,
                    message: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
                },
                { status: 403 }
            ),
        };
    }

    return { user };
}

/**
 * Require admin role
 */
export async function requireAdmin(
    request: NextRequest
): Promise<{ user: JWTPayload } | { error: NextResponse }> {
    return requireRole(request, ['admin']);
}

/**
 * Require manager or admin role
 */
export async function requireManager(
    request: NextRequest
): Promise<{ user: JWTPayload } | { error: NextResponse }> {
    return requireRole(request, ['admin', 'manager']);
}
