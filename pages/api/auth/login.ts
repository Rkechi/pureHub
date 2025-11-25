import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

interface LoginResponse {
    success: boolean;
    message?: string;
    token?: string;
    user?: {
        id: string;
        name: string;
        email: string;
        role: 'admin' | 'manager' | 'cleaner';
    };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginResponse>) {
    // Only allow POST requests 
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }

    try {
        // Connect to db
        await dbConnect();

        const { email, password } = req.body;

        // Validation 
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user by email (include password field)
        const user = await User.findOne({
            email: email.toLowerCase().trim()
        }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if User is active
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Account has been deactivated. Please contact support.'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Get JWT secret
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id.toString(),
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            {
                expiresIn: '7d' // Token valid for 7 days
            }
        );

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error: any) {
        console.error('Login error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
}