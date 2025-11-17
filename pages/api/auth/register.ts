import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: 'Server missing JWT secret' });
        }

        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });

        return res.status(201).json({ token, user });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
