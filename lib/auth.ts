import { NextApiRequest, NextApiResponse } from 'next';
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
 * Extended Request with user data
 */
export interface AuthenticatedRequest extends NextApiRequest {
    user?: JWTPayload;
}

/**
 * Verify JWT token and extract user data
 * @param token - JWT token string
 * @returns Decoded user payload or null if invalid
 */
export function verifyToken(token: string): JWTPayload | null {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;

        if (!JWT_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables');
            return null;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

/**
 * Extract token from Authorization header
 * @param req - Next.js API request
 * @returns Token string or null
 */
export function extractToken(req: NextApiRequest): string | null {
    const authHeader = req.headers.authorization;

    if (!authHeader) return null;

    // Support both "Bearer TOKEN" and just "TOKEN" formats
    if (authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    return authHeader;
}

/**
 * Middleware to protect API routes
 * Usage: Call this at the start of your API handler
 * 
 * @example
 * ```ts
 * export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 *   const user = await requireAuth(req, res);
 *   if (!user) return; // Response already sent by requireAuth
 *   
 *   // Your protected route logic here
 * }
 * ```
 */
export async function requireAuth(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<JWTPayload | null> {
    const token = extractToken(req);

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Authentication required. Please provide a valid token.'
        });
        return null;
    }

    const user = verifyToken(token);

    if (!user) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token. Please login again.'
        });
        return null;
    }

    // Attach user to request for later use
    (req as AuthenticatedRequest).user = user;

    return user;
}

/**
 * Middleware to check if user has specific role(s)
 * @param req - API request
 * @param res - API response
 * @param allowedRoles - Array of allowed roles
 * @returns User if authorized, null otherwise
 */
export async function requireRole(
    req: NextApiRequest,
    res: NextApiResponse,
    allowedRoles: Array<'admin' | 'manager' | 'cleaner'>
): Promise<JWTPayload | null> {
    const user = await requireAuth(req, res);

    if (!user) return null;

    if (!allowedRoles.includes(user.role)) {
        res.status(403).json({
            success: false,
            message: `Access denied. Required role: ${allowedRoles.join(' or ')}`
        });
        return null;
    }

    return user;
}

/**
 * Admin-only middleware
 * @param req - API request
 * @param res - API response
 * @returns User if admin, null otherwise
 */
export async function requireAdmin(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<JWTPayload | null> {
    return requireRole(req, res, ['admin']);
}

/**
 * Manager or Admin middleware
 * @param req - API request
 * @param res - API response
 * @returns User if manager or admin, null otherwise
 */
export async function requireManager(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<JWTPayload | null> {
    return requireRole(req, res, ['admin', 'manager']);
}
