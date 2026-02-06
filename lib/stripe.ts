// lib/stripe.ts
// Server-side Stripe SDK initialization and helpers
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});


// Price ID mappings for each plan (from env)
export const priceIds = {
  starter: {
    monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY!,
    annual: process.env.STRIPE_PRICE_STARTER_ANNUAL!,
  },
  professional: {
    monthly: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY!,
    annual: process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL!,
  },
};

export default stripe;
