// Admin Subscriptions Dashboard
"use client";
import React, { useEffect, useState } from 'react';

export default function AdminSubscriptionsPage() {
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubs = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login?redirect=/dashboard/admin/subscriptions';
          return;
        }
        const res = await fetch('/api/stripe/admin/subscriptions', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch subscriptions');
        setSubs(data.subscriptions || []);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchSubs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">All Subscriptions</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600 text-center">{error}</div>
      ) : (
        <table className="w-full border rounded-xl">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">User</th>
              <th className="p-2">Email</th>
              <th className="p-2">Plan</th>
              <th className="p-2">Status</th>
              <th className="p-2">Period</th>
              <th className="p-2">Start</th>
              <th className="p-2">End</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.subscriptionPlan}</td>
                <td className="p-2">{s.subscriptionStatus}</td>
                <td className="p-2">{s.subscriptionPeriod}</td>
                <td className="p-2">{s.currentPeriodStart ? new Date(s.currentPeriodStart).toLocaleDateString() : ''}</td>
                <td className="p-2">{s.currentPeriodEnd ? new Date(s.currentPeriodEnd).toLocaleDateString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
