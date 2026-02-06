
import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { verifyAuthToken } from '@/lib/auth-app-router';

// POST /api/stripe/create-portal-session
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
    if (!user || !user.stripeCustomerId) {
      return NextResponse.json({ error: 'User or Stripe customer not found' }, { status: 404 });
    }

    // Create Stripe Customer Portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings/billing`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    console.error('Stripe portal session error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
