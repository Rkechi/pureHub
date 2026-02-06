
"use client";
import React, { useState } from 'react';
import { getStripe } from '@/lib/stripe-client';

const plans = [
  { key: 'starter', name: 'Starter', monthly: 99, annual: 950 },
  { key: 'professional', name: 'Professional', monthly: 300, annual: 3000 },
];

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = `/login?redirect=/checkout?plan=${selectedPlan}&period=${billing}`;
        return;
      }
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: selectedPlan, period: billing }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout session');
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Plan</h1>
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-6 py-2 rounded-full font-semibold ${billing === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setBilling('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold ${billing === 'annual' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setBilling('annual')}
        >
          Annual
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 mb-8">
        {plans.map(plan => (
          <div
            key={plan.key}
            className={`border rounded-xl p-6 flex items-center justify-between cursor-pointer ${selectedPlan === plan.key ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}
            onClick={() => setSelectedPlan(plan.key)}
          >
            <div>
              <div className="text-lg font-bold">{plan.name}</div>
              <div className="text-gray-600">£{plan[billing]} / {billing === 'monthly' ? 'month' : 'year'}</div>
            </div>
            {selectedPlan === plan.key && <span className="text-blue-600 font-bold">Selected</span>}
          </div>
        ))}
      </div>
      <button
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl text-lg disabled:opacity-60"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? 'Redirecting...' : 'Start Free Trial'}
      </button>
      {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
    </div>
  );
}
