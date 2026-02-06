
import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { resend } from '@/lib/resend';

// Helper to buffer the raw request body
async function buffer(readable: ReadableStream<Uint8Array>) {
  const reader = readable.getReader();
  let chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    const rawBody = await buffer(req.body as any);
    const sig = req.headers.get('stripe-signature');
    if (!sig || !webhookSecret) {
      return new Response('Missing signature or webhook secret', { status: 400 });
    }
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Connect to DB
  await connectDB();

  // Handle event types
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        if (userId && session.subscription) {
          const user = await User.findByIdAndUpdate(userId, {
            stripeSubscriptionId: session.subscription,
            subscriptionStatus: 'trialing',
            subscriptionPlan: session.metadata.plan,
            subscriptionPeriod: session.metadata.period,
            currentPeriodStart: new Date(session.created * 1000),
            trialEnd: session.trial_end ? new Date(session.trial_end * 1000) : undefined,
          }, { new: true });
          // Send trial started email
          if (user && user.email) {
            await resend.emails.send({
              from: 'PureHive <noreply@purehive.com>',
              to: user.email,
              subject: 'Your 14-day free trial has started',
              html: `<p>Hi ${user.name || ''},<br>Your free trial is now active! Enjoy exploring PureHive for 14 days.</p>`
            });
          }
        }
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const sub = event.data.object;
        const user = await User.findOne({ stripeSubscriptionId: sub.id });
        if (user) {
          await User.findByIdAndUpdate(user._id, {
            subscriptionStatus: sub.status,
            currentPeriodStart: new Date(sub.current_period_start * 1000),
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
            cancelAtPeriodEnd: sub.cancel_at_period_end,
            trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : undefined,
          });
          // Send trial ending soon email (3 days before trial end)
          if (sub.status === 'trialing' && sub.trial_end) {
            const trialEnd = new Date(sub.trial_end * 1000);
            const now = new Date();
            const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            if (daysLeft === 3) {
              await resend.emails.send({
                from: 'PureHive <noreply@purehive.com>',
                to: user.email,
                subject: 'Your free trial is ending soon',
                html: `<p>Hi ${user.name || ''},<br>Your free trial will end in 3 days. Add payment details to continue enjoying PureHive without interruption.</p>`
              });
            }
          }
          // Send payment success email
          if (sub.status === 'active') {
            await resend.emails.send({
              from: 'PureHive <noreply@purehive.com>',
              to: user.email,
              subject: 'Payment successful',
              html: `<p>Hi ${user.name || ''},<br>Your payment was successful and your subscription is active.</p>`
            });
          }
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        const user = await User.findOne({ stripeSubscriptionId: sub.id });
        if (user) {
          await User.findByIdAndUpdate(user._id, {
            subscriptionStatus: 'canceled',
            cancelAtPeriodEnd: false,
          });
          // Send subscription canceled email
          await resend.emails.send({
            from: 'PureHive <noreply@purehive.com>',
            to: user.email,
            subject: 'Subscription canceled',
            html: `<p>Hi ${user.name || ''},<br>Your subscription has been canceled. You can resubscribe anytime from your dashboard.</p>`
          });
        }
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const user = await User.findOne({ stripeSubscriptionId: invoice.subscription });
        if (user) {
          await User.findByIdAndUpdate(user._id, {
            subscriptionStatus: 'past_due',
          });
          // Send payment failed email
          await resend.emails.send({
            from: 'PureHive <noreply@purehive.com>',
            to: user.email,
            subject: 'Payment failed',
            html: `<p>Hi ${user.name || ''},<br>Your recent payment failed. Please update your payment method to avoid interruption.</p>`
          });
        }
        break;
      }
      // Add more event types as needed
      default:
        break;
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook event handling error:', err);
    return new Response('Webhook handler error', { status: 500 });
  }
}
