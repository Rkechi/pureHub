
import { NextRequest, NextResponse } from 'next/server';
import stripe, { priceIds } from '@/lib/stripe';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { verifyAuthToken } from '@/lib/auth-app-router';

// POST /api/stripe/create-checkout-session
export async function POST(req: Request) {
  try {
    // Parse body
    const { plan, period } = await req.json();
    if (!plan || !period) {
      return NextResponse.json({ error: 'Missing plan or period' }, { status: 400 });
    }

    // Validate plan/period
    if (!['starter', 'professional'].includes(plan) || !['monthly', 'annual'].includes(period)) {
      return NextResponse.json({ error: 'Invalid plan or period' }, { status: 400 });
    }

    // Authenticate user
    // (Assume JWT in Authorization header)
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
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Cast to correct types after validation
    const planKey = plan as keyof typeof priceIds;
    const periodKey = period as keyof (typeof priceIds)[typeof planKey];

    // Get or create Stripe customer
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user._id.toString() },
      });
      stripeCustomerId = customer.id;
      user.stripeCustomerId = stripeCustomerId;
      await user.save();
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceIds[planKey][periodKey],
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          userId: user._id.toString(),
          plan,
          period,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      metadata: {
        userId: user._id.toString(),
        plan,
        period,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout session error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
