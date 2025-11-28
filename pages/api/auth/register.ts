import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { error } from 'console';

interface RegisterResponse {
    success: boolean;
    message?: string;
    token?: string;
    user?: {
        id: string;
        name: string;
        email: string;
    };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<RegisterResponse>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        // Connect to db
        await connectDB();

        const { name, email, password, company, phone } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and password'
            });
        }

        // Validate email format 
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            company: company.trim(),
            phone: phone?.trim(),
            role: 'manager', // Default role
            isActive: true,
        });

        // Get JWT secret
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({
                success: false,
                message: 'Sever configuration error'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id.toString(),
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            {
                expiresIn: '7d' // Token valid for 7 days
            }
        );

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            }
        });
    } catch (error: any) {
        console.error('Registration error.', error);

        // Handle mongoose validation error
        if (error.name === 'ValidationError') {
            const messages = Object(error.errors).map((e: any) => e.message);
            Object.values(error.errors).map((e: any) => e.message);
            return res.status(400).json({
                success: false,
                message: messages.join(',')
            });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
}

