'use client';

import { useEffect, useState } from 'react';

interface Tier {
  id: string;
  name: string;
  description: string | null;
  sortOrder: number;
  _count: { partners: number };
}

export default function SettingsPage() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTierForm, setShowTierForm] = useState(false);
  const [editingTier, setEditingTier] = useState<Tier | null>(null);
  const [tierData, setTierData] = useState({ name: '', description: '', sortOrder: 0 });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      const response = await fetch('/api/v1/ppn/admin/tiers');
      const result = await response.json();
      if (result.ok) {
        setTiers(result.data.tiers);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleSubmitTier = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingTier
        ? `/api/v1/ppn/admin/tiers?id=${editingTier.id}`
        : '/api/v1/ppn/admin/tiers';
      const method = editingTier ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tierData),
      });

      const result = await response.json();

      if (result.ok) {
        setSuccess(editingTier ? 'Tier updated' : 'Tier created');
        setShowTierForm(false);
        setEditingTier(null);
        setTierData({ name: '', description: '', sortOrder: 0 });
        fetchTiers();
      } else {
        setError(result.error?.message || 'Failed to save');
      }
      setSubmitting(false);
    } catch {
      setError('An error occurred');
      setSubmitting(false);
    }
  };

  const handleDeleteTier = async (tier: Tier) => {
    if (!confirm(`Delete tier "${tier.name}"?`)) return;

    try {
      const response = await fetch(`/api/v1/ppn/admin/tiers?id=${tier.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.ok) {
        setSuccess('Tier deleted');
        fetchTiers();
      } else {
        setError(result.error?.message || 'Failed to delete');
      }
    } catch {
      setError('An error occurred');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Settings</h1>

      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>}

      {/* Partner Tiers */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Partner Tiers</h2>
          <button
            onClick={() => { setShowTierForm(true); setEditingTier(null); setTierData({ name: '', description: '', sortOrder: tiers.length }); }}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Add Tier
          </button>
        </div>
        <p className="text-sm text-slate-500 mb-4">Manage partner tiers and their commission rates.</p>

        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-slate-500 border-b">
              <th className="pb-2">Order</th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Description</th>
              <th className="pb-2">Partners</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier) => (
              <tr key={tier.id} className="border-b last:border-0">
                <td className="py-3 text-slate-500">{tier.sortOrder}</td>
                <td className="py-3 font-medium text-slate-900">{tier.name}</td>
                <td className="py-3 text-slate-600">{tier.description || '-'}</td>
                <td className="py-3 text-slate-500">{tier._count.partners}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditingTier(tier); setTierData({ name: tier.name, description: tier.description || '', sortOrder: tier.sortOrder }); setShowTierForm(true); }}
                      className="text-sm text-teal-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteTier(tier)} className="text-sm text-red-600 hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tiers.length === 0 && (
          <div className="text-center py-8 text-slate-500">No tiers configured. Add the default tiers to get started.</div>
        )}
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">System Settings</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-medium text-slate-900">Cookie Duration</p>
              <p className="text-sm text-slate-500">Attribution window for referral tracking</p>
            </div>
            <span className="text-lg font-mono text-slate-700">90 days</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-medium text-slate-900">Commission Eligibility</p>
              <p className="text-sm text-slate-500">Days after payment before commission is available</p>
            </div>
            <span className="text-lg font-mono text-slate-700">60 days</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-medium text-slate-900">Minimum Payout</p>
              <p className="text-sm text-slate-500">Minimum balance required to request payout</p>
            </div>
            <span className="text-lg font-mono text-slate-700">$100.00</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-medium text-slate-900">Commission Rate Range</p>
              <p className="text-sm text-slate-500">Allowed commission percentage range</p>
            </div>
            <span className="text-lg font-mono text-slate-700">5% - 30%</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <div>
              <p className="font-medium text-slate-900">Payout Frequency</p>
              <p className="text-sm text-slate-500">How often partners can request payouts</p>
            </div>
            <span className="text-lg font-mono text-slate-700">Once per month</span>
          </div>
        </div>
      </div>

      {/* API Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">API Information</h2>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-slate-700 mb-2">Events Endpoint Base URL</p>
            <code className="block p-3 bg-slate-100 rounded text-sm">{typeof window !== 'undefined' ? window.location.origin : ''}/api/v1/ppn/events</code>
          </div>
          <div>
            <p className="font-medium text-slate-700 mb-2">Available Event Types</p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• <code>/click</code> - Track referral clicks</li>
              <li>• <code>/signup</code> - Customer sign up</li>
              <li>• <code>/subscription_started</code> - Subscription created</li>
              <li>• <code>/invoice_paid</code> - Payment received</li>
              <li>• <code>/subscription_canceled</code> - Subscription canceled</li>
              <li>• <code>/refund</code> - Refund or chargeback</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-slate-700 mb-2">Documentation</p>
            <a href="/docs/ppn-api-spec-v1.md" className="text-teal-600 hover:underline">View API Specification →</a>
          </div>
        </div>
      </div>

      {/* Tier Form Modal */}
      {showTierForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">{editingTier ? 'Edit Tier' : 'Add Tier'}</h3>
            <form onSubmit={handleSubmitTier}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={tierData.name}
                    onChange={(e) => setTierData({ ...tierData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g., Starter, Pro, Elite"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={tierData.description}
                    onChange={(e) => setTierData({ ...tierData, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Brief description of this tier"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={tierData.sortOrder}
                    onChange={(e) => setTierData({ ...tierData, sortOrder: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => { setShowTierForm(false); setEditingTier(null); }} className="flex-1 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50">
                  {submitting ? 'Saving...' : (editingTier ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
