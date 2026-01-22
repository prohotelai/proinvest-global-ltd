'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface Commission {
  id: string;
  commissionAmount: number;
  commissionPercent: number;
  status: string;
  occurredAt: string;
  eligibleAt: string;
  product: { name: string; slug: string };
}

interface Summary {
  pending: { count: number; amount: number };
  available: { count: number; amount: number };
  paid: { count: number; amount: number };
  voided: { count: number; amount: number };
}

interface CommissionsData {
  commissions: Commission[];
  summary: Summary;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function CommissionsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<CommissionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/ppn/login');
      return;
    }

    if (status === 'authenticated') {
      let mounted = true;
      const load = async () => {
        try {
          const params = new URLSearchParams({ page: page.toString(), limit: '20' });
          if (filter) params.set('status', filter);
          
          const response = await fetch(`/api/v1/ppn/partner/commissions?${params}`);
          const result = await response.json();
          
          if (mounted) {
            if (result.ok) {
              setData(result.data);
            }
            setLoading(false);
          }
        } catch {
          if (mounted) setLoading(false);
        }
      };
      load();
      return () => { mounted = false; };
    }
  }, [status, router, filter, page]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Commissions</h1>
            <button onClick={() => signOut({ callbackUrl: '/ppn/login' })} className="text-slate-600 hover:text-slate-900">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link href="/ppn/dashboard" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">Dashboard</Link>
            <Link href="/ppn/links" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">Links</Link>
            <Link href="/ppn/commissions" className="border-b-2 border-teal-500 py-4 px-1 text-sm font-medium text-teal-600">Commissions</Link>
            <Link href="/ppn/payouts" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">Payouts</Link>
            <Link href="/ppn/assets" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">Assets</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-slate-500 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{formatCurrency(data.summary.pending.amount)}</p>
                <p className="text-sm text-slate-400">{data.summary.pending.count} commissions</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-slate-500 mb-1">Available</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(data.summary.available.amount)}</p>
                <p className="text-sm text-slate-400">{data.summary.available.count} commissions</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-slate-500 mb-1">Paid</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(data.summary.paid.amount)}</p>
                <p className="text-sm text-slate-400">{data.summary.paid.count} commissions</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-slate-500 mb-1">Voided</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(data.summary.voided.amount)}</p>
                <p className="text-sm text-slate-400">{data.summary.voided.count} commissions</p>
              </div>
            </div>

            {/* Filter */}
            <div className="mb-6 flex items-center gap-4">
              <label className="text-sm font-medium text-slate-700">Filter by status:</label>
              <select
                value={filter}
                onChange={(e) => { setFilter(e.target.value); setPage(1); }}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="available">Available</option>
                <option value="paid">Paid</option>
                <option value="void">Voided</option>
              </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Eligible At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.commissions.map((commission) => (
                    <tr key={commission.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{commission.product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{formatCurrency(commission.commissionAmount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{commission.commissionPercent}%</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          commission.status === 'available' ? 'bg-green-100 text-green-800' :
                          commission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          commission.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {commission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(commission.occurredAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(commission.eligibleAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {data.commissions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500">No commissions found.</p>
                </div>
              )}

              {/* Pagination */}
              {data.pagination.pages > 1 && (
                <div className="px-6 py-4 border-t flex justify-between items-center">
                  <p className="text-sm text-slate-500">
                    Showing {((page - 1) * data.pagination.limit) + 1} to {Math.min(page * data.pagination.limit, data.pagination.total)} of {data.pagination.total}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(p => Math.min(data.pagination.pages, p + 1))}
                      disabled={page >= data.pagination.pages}
                      className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
