'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Partner {
  id: string;
  partnerCode: string;
  type: string;
  status: string;
  country: string | null;
  isGlobal: boolean;
  websiteUrl: string | null;
  marketingPlan: string | null;
  createdAt: string;
  user: { id: string; email: string; name: string | null };
  tier: { id: string; name: string } | null;
  commissionOverrides: Array<{
    id: string;
    percent: number;
    product: { name: string; slug: string };
    plan: { name: string; planKey: string } | null;
  }>;
  _count: { clicks: number; attributions: number; commissionEntries: number; payoutRequests: number };
}

interface Tier {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
}

export default function PartnersPage() {
  const searchParams = useSearchParams();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(searchParams.get('status') || '');
  const [showCommissionForm, setShowCommissionForm] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [commissionData, setCommissionData] = useState({ productId: '', percent: 15 });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const params = new URLSearchParams();
        if (filter) params.set('status', filter);

        const [partnersRes, tiersRes, productsRes] = await Promise.all([
          fetch(`/api/v1/ppn/admin/partners?${params}`),
          fetch('/api/v1/ppn/admin/tiers'),
          fetch('/api/v1/ppn/admin/products'),
        ]);

        const partnersData = await partnersRes.json();
        const tiersData = await tiersRes.json();
        const productsData = await productsRes.json();

        if (mounted) {
          if (partnersData.ok) setPartners(partnersData.data.partners);
          if (tiersData.ok) setTiers(tiersData.data.tiers);
          if (productsData.ok) setProducts(productsData.data.products);
          setLoading(false);
        }
      } catch {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [filter, refreshKey]);

  const fetchData = () => {
    setRefreshKey(k => k + 1);
  };

  const handleUpdateStatus = async (partner: Partner, newStatus: string) => {
    try {
      const response = await fetch(`/api/v1/ppn/admin/partners?id=${partner.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (result.ok) {
        setSuccess(`Partner ${newStatus}`);
        fetchData();
      } else {
        setError(result.error?.message || 'Failed to update');
      }
    } catch {
      setError('An error occurred');
    }
  };

  const handleUpdateTier = async (partner: Partner, tierId: string | null) => {
    try {
      const response = await fetch(`/api/v1/ppn/admin/partners?id=${partner.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tierId }),
      });

      const result = await response.json();

      if (result.ok) {
        setSuccess('Tier updated');
        fetchData();
      } else {
        setError(result.error?.message || 'Failed to update');
      }
    } catch {
      setError('An error occurred');
    }
  };

  const handleSetCommission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPartner) return;
    setSubmitting(true);

    try {
      const response = await fetch('/api/v1/ppn/admin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId: selectedPartner.id,
          productId: commissionData.productId,
          percent: commissionData.percent,
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setSuccess('Commission rate set');
        setShowCommissionForm(false);
        fetchData();
      } else {
        setError(result.error?.message || 'Failed to set commission');
      }
      setSubmitting(false);
    } catch {
      setError('An error occurred');
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Partners</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>}

      {/* Partners Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1024px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Partner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Website / Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Tier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Commissions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Stats</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {partners.map((partner) => (
              <tr key={partner.id}>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{partner.user.name || partner.user.email}</p>
                  <p className="text-sm text-slate-500">{partner.user.email}</p>
                  <p className="text-xs text-slate-400 capitalize">{partner.type}</p>
                </td>
                <td className="px-6 py-4 font-mono text-sm">{partner.partnerCode}</td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    {partner.websiteUrl ? (
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-teal-600 hover:underline truncate block"
                        title={partner.websiteUrl}
                      >
                        {partner.websiteUrl.replace(/^https?:\/\//, '').slice(0, 30)}{partner.websiteUrl.length > 40 ? '...' : ''}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-400">No website</span>
                    )}
                    {partner.marketingPlan && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2" title={partner.marketingPlan}>
                        {partner.marketingPlan.slice(0, 100)}{partner.marketingPlan.length > 100 ? '...' : ''}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                    {partner.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={partner.tier?.id || ''}
                    onChange={(e) => handleUpdateTier(partner, e.target.value || null)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="">No Tier</option>
                    {tiers.map((tier) => (
                      <option key={tier.id} value={tier.id}>{tier.name}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-sm">
                  {partner.commissionOverrides.length === 0 ? (
                    <span className="text-red-500">Not set</span>
                  ) : (
                    <ul className="text-slate-600">
                      {partner.commissionOverrides.map((override) => (
                        <li key={override.id}>
                          {override.product.name}: {override.percent}%
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {partner._count.clicks} clicks<br />
                  {partner._count.commissionEntries} comms
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    {partner.status === 'pending' && (
                      <>
                        <button onClick={() => handleUpdateStatus(partner, 'approved')} className="text-sm text-green-600 hover:underline">Approve</button>
                        <button onClick={() => handleUpdateStatus(partner, 'rejected')} className="text-sm text-red-600 hover:underline">Reject</button>
                      </>
                    )}
                    {partner.status === 'approved' && (
                      <button onClick={() => handleUpdateStatus(partner, 'suspended')} className="text-sm text-red-600 hover:underline">Suspend</button>
                    )}
                    {partner.status === 'suspended' && (
                      <button onClick={() => handleUpdateStatus(partner, 'approved')} className="text-sm text-green-600 hover:underline">Reactivate</button>
                    )}
                    <button
                      onClick={() => { setSelectedPartner(partner); setCommissionData({ productId: products[0]?.id || '', percent: 15 }); setShowCommissionForm(true); }}
                      className="text-sm text-teal-600 hover:underline"
                    >
                      Set Commission
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {partners.length === 0 && (
          <div className="text-center py-12 text-slate-500">No partners found.</div>
        )}
      </div>

      {/* Set Commission Modal */}
      {showCommissionForm && selectedPartner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Set Commission Rate</h3>
            <p className="text-sm text-slate-500 mb-4">Partner: {selectedPartner.user.email}</p>
            <form onSubmit={handleSetCommission}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Product</label>
                  <select
                    value={commissionData.productId}
                    onChange={(e) => setCommissionData({ ...commissionData, productId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Commission Percent (5-30%)</label>
                  <input
                    type="number"
                    min="5"
                    max="30"
                    value={commissionData.percent}
                    onChange={(e) => setCommissionData({ ...commissionData, percent: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button type="button" onClick={() => setShowCommissionForm(false)} className="flex-1 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50">
                  {submitting ? 'Saving...' : 'Set Commission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
