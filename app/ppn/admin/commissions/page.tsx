'use client';

import { useEffect, useState } from 'react';

interface Commission {
  id: string;
  commissionAmount: number;
  commissionPercent: number;
  amountPaid: number;
  currency: string;
  status: string;
  occurredAt: string;
  eligibleAt: string;
  voidReason: string | null;
  externalInvoiceId: string;
  partner: {
    partnerCode: string;
    user: { email: string; name: string | null };
  };
  product: { name: string; slug: string };
}

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const params = new URLSearchParams({ page: page.toString(), limit: '50' });
        if (filter) params.set('status', filter);

        const response = await fetch(`/api/v1/ppn/admin/commissions?${params}`);
        const result = await response.json();

        if (mounted) {
          if (result.ok) {
            setCommissions(result.data.commissions);
            setPagination(result.data.pagination);
          }
          setLoading(false);
        }
      } catch {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [filter, page, refreshKey]);

  const fetchCommissions = () => {
    setRefreshKey(k => k + 1);
  };

  const handleVoid = async (commission: Commission) => {
    const reason = prompt('Enter void reason:');
    if (!reason) return;

    try {
      const response = await fetch('/api/v1/ppn/admin/commissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commissionId: commission.id, reason }),
      });

      const result = await response.json();

      if (result.ok) {
        setSuccess(result.data.voided ? 'Commission voided' : 'Clawback created');
        fetchCommissions();
      } else {
        setError(result.error?.message || 'Failed to void');
      }
    } catch {
      setError('An error occurred');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      case 'void': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Commissions</h1>
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="available">Available</option>
          <option value="paid">Paid</option>
          <option value="void">Voided</option>
        </select>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1024px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Partner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Commission</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Eligible</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {commissions.map((commission) => (
              <tr key={commission.id}>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{commission.partner.user.name || commission.partner.user.email}</p>
                  <p className="text-sm text-slate-500">{commission.partner.partnerCode}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{commission.product.name}</td>
                <td className="px-6 py-4 text-sm text-slate-500 font-mono">{commission.externalInvoiceId.slice(0, 12)}...</td>
                <td className="px-6 py-4 text-sm text-slate-900">{formatCurrency(commission.amountPaid)}</td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900">{formatCurrency(commission.commissionAmount)}</p>
                  <p className="text-sm text-slate-500">{commission.commissionPercent}%</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                    {commission.status}
                  </span>
                  {commission.voidReason && <p className="text-xs text-red-500 mt-1">{commission.voidReason}</p>}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{new Date(commission.eligibleAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  {(commission.status === 'pending' || commission.status === 'available') && (
                    <button onClick={() => handleVoid(commission)} className="text-sm text-red-600 hover:underline px-3 py-2 -mx-3">Void</button>
                  )}
                  {commission.status === 'paid' && (
                    <button onClick={() => handleVoid(commission)} className="text-sm text-red-600 hover:underline px-3 py-2 -mx-3">Clawback</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {commissions.length === 0 && (
          <div className="text-center py-12 text-slate-500">No commissions found.</div>
        )}

        {pagination.pages > 1 && (
          <div className="px-6 py-4 border-t flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-sm text-slate-500">Showing page {page} of {pagination.pages}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded text-sm disabled:opacity-50">Previous</button>
              <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page >= pagination.pages} className="px-3 py-1 border rounded text-sm disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
