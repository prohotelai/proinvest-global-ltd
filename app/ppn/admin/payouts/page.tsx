'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Payout {
  id: string;
  requestedAmount: number;
  currency: string;
  method: string;
  status: string;
  requestedAt: string;
  processedAt: string | null;
  monthKey: string;
  adminNote: string | null;
  partner: {
    partnerCode: string;
    user: { email: string; name: string | null };
  };
}

export default function PayoutsPage() {
  const searchParams = useSearchParams();
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(searchParams.get('status') || '');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPayouts();
  }, [filter, page]);

  const fetchPayouts = async () => {
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '50' });
      if (filter) params.set('status', filter);

      const response = await fetch(`/api/v1/ppn/admin/payouts?${params}`);
      const result = await response.json();

      if (result.ok) {
        setPayouts(result.data.payouts);
        setPagination(result.data.pagination);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (payout: Payout, newStatus: string) => {
    const adminNote = newStatus === 'rejected' ? prompt('Enter rejection reason:') : undefined;
    if (newStatus === 'rejected' && !adminNote) return;

    try {
      const response = await fetch('/api/v1/ppn/admin/payouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payoutId: payout.id,
          status: newStatus,
          adminNote,
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setSuccess(`Payout ${newStatus}`);
        fetchPayouts();
      } else {
        setError(result.error?.message || 'Failed to update');
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
      case 'requested': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Payout Requests</h1>
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Status</option>
          <option value="requested">Requested</option>
          <option value="approved">Approved</option>
          <option value="processing">Processing</option>
          <option value="paid">Paid</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Partner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Requested</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {payouts.map((payout) => (
              <tr key={payout.id}>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{payout.partner.user.name || payout.partner.user.email}</p>
                  <p className="text-sm text-slate-500">{payout.partner.partnerCode}</p>
                </td>
                <td className="px-6 py-4 font-semibold text-slate-900">{formatCurrency(payout.requestedAmount)}</td>
                <td className="px-6 py-4 text-sm text-slate-600 capitalize">{payout.method}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                    {payout.status}
                  </span>
                  {payout.adminNote && <p className="text-xs text-slate-500 mt-1">{payout.adminNote}</p>}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{new Date(payout.requestedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{payout.monthKey}</td>
                <td className="px-6 py-4">
                  {payout.status === 'requested' && (
                    <div className="flex gap-2">
                      <button onClick={() => handleUpdateStatus(payout, 'approved')} className="text-sm text-green-600 hover:underline">Approve</button>
                      <button onClick={() => handleUpdateStatus(payout, 'rejected')} className="text-sm text-red-600 hover:underline">Reject</button>
                    </div>
                  )}
                  {payout.status === 'approved' && (
                    <button onClick={() => handleUpdateStatus(payout, 'processing')} className="text-sm text-blue-600 hover:underline">Processing</button>
                  )}
                  {payout.status === 'processing' && (
                    <button onClick={() => handleUpdateStatus(payout, 'paid')} className="text-sm text-green-600 hover:underline">Mark Paid</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payouts.length === 0 && (
          <div className="text-center py-12 text-slate-500">No payout requests found.</div>
        )}

        {pagination.pages > 1 && (
          <div className="px-6 py-4 border-t flex justify-between items-center">
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
