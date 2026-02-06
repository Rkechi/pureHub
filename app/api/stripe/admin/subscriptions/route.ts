// API route to list all subscriptions for admin dashboard
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { verifyAuthToken } from '@/lib/auth-app-router';

export async function GET(req: Request) {
  try {
    // Authenticate and check admin
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userPayload = await verifyAuthToken({ headers: req.headers } as any);
    if (!userPayload || userPayload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    await connectDB();
    const users = await User.find({ stripeSubscriptionId: { $exists: true, $ne: null } })
      .select('name email subscriptionPlan subscriptionStatus subscriptionPeriod currentPeriodStart currentPeriodEnd');
    return NextResponse.json({ subscriptions: users });
  } catch (err) {
    console.error('Admin subscriptions fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
