
"use client";
import React, { useEffect, useState } from 'react';

export default function BillingPage() {
  const [sub, setSub] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const fetchSub = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login?redirect=/dashboard/settings/billing';
          return;
        }
        const res = await fetch('/api/stripe/subscriptions', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch subscription');
        setSub(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchSub();
  }, []);

  const handleManageBilling = async () => {
    setPortalLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create portal session');
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setPortalLoading(false);
    }
  };

  const handleCancel = async () => {
    setCancelLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to cancel subscription');
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Billing & Subscription</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600 text-center">{error}</div>
      ) : sub ? (
        <div className="space-y-6">
          <div>
            <div className="font-bold">Plan:</div>
            <div>{sub.subscriptionPlan || 'N/A'} ({sub.subscriptionPeriod})</div>
          </div>
          <div>
            <div className="font-bold">Status:</div>
            <div>{sub.subscriptionStatus}</div>
          </div>
          {sub.currentPeriodEnd && (
            <div>
              <div className="font-bold">Next Billing Date:</div>
              <div>{new Date(sub.currentPeriodEnd).toLocaleDateString()}</div>
            </div>
          )}
          {sub.trialEnd && (
            <div>
              <div className="font-bold">Trial Ends:</div>
              <div>{new Date(sub.trialEnd).toLocaleDateString()}</div>
            </div>
          )}
          <div className="flex gap-4">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-60"
              onClick={handleManageBilling}
              disabled={portalLoading}
            >
              {portalLoading ? 'Loading...' : 'Manage Billing'}
            </button>
            {sub.subscriptionStatus !== 'canceled' && (
              <button
                className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold disabled:opacity-60"
                onClick={handleCancel}
                disabled={cancelLoading}
              >
                {cancelLoading ? 'Processing...' : 'Cancel Subscription'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>No subscription found.</div>
      )}
    </div>
  );
}
