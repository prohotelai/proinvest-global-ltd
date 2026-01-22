'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface DashboardData {
  partner: {
    id: string;
    partnerCode: string;
    type: string;
    status: string;
    tier: { name: string } | null;
    email: string;
    name: string | null;
  };
  balance: {
    available: number;
    pending: number;
    paid: number;
    currency: string;
  };
  stats: {
    totalClicks: number;
    totalAttributions: number;
    thisMonthClicks: number;
    conversionRate: string;
  };
  recentCommissions: Array<{
    id: string;
    commissionAmount: number;
    status: string;
    occurredAt: string;
    product: { name: string };
  }>;
  currentMonthPayout: {
    status: string;
    amount: number;
    requestedAt: string;
  } | null;
}

export default function PartnerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/ppn/login');
      return;
    }

    if (status === 'authenticated') {
      if (session?.user?.role === 'admin') {
        router.push('/ppn/admin');
        return;
      }

      let mounted = true;
      const load = async () => {
        try {
          const response = await fetch('/api/v1/ppn/partner/dashboard');
          const result = await response.json();
          
          if (mounted) {
            if (!result.ok) {
              setError(result.error?.message || 'Failed to load dashboard');
              setLoading(false);
              return;
            }

            setData(result.data);
            setLoading(false);
          }
        } catch {
          if (mounted) {
            setError('Failed to load dashboard');
            setLoading(false);
          }
        }
      };
      load();
      return () => { mounted = false; };
    }
  }, [status, session, router, refreshKey]);

  const fetchDashboard = () => {
    setRefreshKey(k => k + 1);
    setError('');
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Failed to load dashboard'}</p>
          <button
            onClick={fetchDashboard}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Partner Dashboard</h1>
              <p className="text-sm text-slate-500">Welcome back, {data.partner.name || data.partner.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                data.partner.status === 'approved' ? 'bg-green-100 text-green-800' :
                data.partner.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {data.partner.status.charAt(0).toUpperCase() + data.partner.status.slice(1)}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/ppn/login' })}
                className="text-slate-600 hover:text-slate-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link href="/ppn/dashboard" className="border-b-2 border-teal-500 py-4 px-1 text-sm font-medium text-teal-600">
              Dashboard
            </Link>
            <Link href="/ppn/links" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">
              Links
            </Link>
            <Link href="/ppn/commissions" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">
              Commissions
            </Link>
            <Link href="/ppn/payouts" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">
              Payouts
            </Link>
            <Link href="/ppn/assets" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">
              Assets
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Partner Info */}
        {data.partner.status === 'pending' && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              Your partner application is pending approval. You&apos;ll be notified once approved.
            </p>
          </div>
        )}

        <div className="mb-8 p-4 bg-slate-50 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Your Partner Code</p>
            <p className="text-2xl font-mono font-bold text-slate-900">{data.partner.partnerCode}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Partner Type</p>
            <p className="text-lg font-semibold text-slate-900 capitalize">{data.partner.type}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Tier</p>
            <p className="text-lg font-semibold text-slate-900">{data.partner.tier?.name || 'Starter'}</p>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-slate-500 mb-1">Available Balance</p>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(data.balance.available)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-slate-500 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{formatCurrency(data.balance.pending)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-slate-500 mb-1">Total Paid</p>
            <p className="text-3xl font-bold text-slate-900">{formatCurrency(data.balance.paid)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-slate-500 mb-1">This Month</p>
            {data.currentMonthPayout ? (
              <p className="text-sm text-slate-600">
                Payout {data.currentMonthPayout.status}: {formatCurrency(data.currentMonthPayout.amount)}
              </p>
            ) : data.balance.available >= 100 ? (
              <Link href="/ppn/payouts" className="text-teal-600 font-semibold hover:underline">
                Request Payout →
              </Link>
            ) : (
              <p className="text-sm text-slate-500">Min. $100 to request</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-slate-500 mb-1">Total Clicks</p>
            <p className="text-2xl font-bold text-slate-900">{data.stats.totalClicks.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-slate-500 mb-1">This Month Clicks</p>
            <p className="text-2xl font-bold text-slate-900">{data.stats.thisMonthClicks.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-slate-500 mb-1">Total Conversions</p>
            <p className="text-2xl font-bold text-slate-900">{data.stats.totalAttributions.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-slate-500 mb-1">Conversion Rate</p>
            <p className="text-2xl font-bold text-slate-900">{data.stats.conversionRate}%</p>
          </div>
        </div>

        {/* Recent Commissions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Commissions</h2>
            <Link href="/ppn/commissions" className="text-teal-600 text-sm font-medium hover:underline">
              View All →
            </Link>
          </div>
          {data.recentCommissions.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No commissions yet. Start promoting to earn!</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500 border-b">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.recentCommissions.map((commission) => (
                  <tr key={commission.id} className="border-b last:border-0">
                    <td className="py-3">{commission.product.name}</td>
                    <td className="py-3 font-semibold">{formatCurrency(commission.commissionAmount)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        commission.status === 'available' ? 'bg-green-100 text-green-800' :
                        commission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        commission.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {commission.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500">
                      {new Date(commission.occurredAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
