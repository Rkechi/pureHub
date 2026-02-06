
import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { verifyAuthToken } from '@/lib/auth-app-router';

// POST /api/stripe/cancel-subscription
export async function POST(req: Request) {
  try {
    // Authenticate user
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;
    const userPayload = await verifyAuthToken({ headers: req.headers } as any);
    if (!userPayload) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(userPayload.id);
    if (!user || !user.stripeSubscriptionId) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
    }

    // Cancel at period end
    await stripe.subscriptions.update(user.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });
    user.cancelAtPeriodEnd = true;
    await user.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Cancel subscription error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
