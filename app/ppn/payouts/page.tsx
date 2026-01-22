'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface PayoutMethod {
  id: string;
  method: string;
  isActive: boolean;
  details: Record<string, string>;
}

interface PayoutRequest {
  id: string;
  requestedAmount: number;
  currency: string;
  method: string;
  status: string;
  requestedAt: string;
  processedAt: string | null;
  monthKey: string;
  adminNote: string | null;
}

interface PayoutsData {
  payouts: PayoutRequest[];
  balance: {
    available: number;
    pending: number;
    paid: number;
    currency: string;
  };
  canRequestPayout: boolean;
  minimumPayout: number;
  pagination: { page: number; limit: number; total: number; pages: number };
}

export default function PayoutsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<PayoutsData | null>(null);
  const [methods, setMethods] = useState<PayoutMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showMethodForm, setShowMethodForm] = useState(false);
  const [requestAmount, setRequestAmount] = useState('');
  const [requestMethod, setRequestMethod] = useState('stripe');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // Method form state
  const [methodType, setMethodType] = useState<'stripe' | 'wise' | 'bank'>('stripe');
  const [methodDetails, setMethodDetails] = useState({
    // Stripe
    stripeAccountId: '',
    stripeEmail: '',
    // Wise
    wiseEmail: '',
    wiseAccountHolderName: '',
    // Bank
    bankName: '',
    bankAccountHolderName: '',
    bankAccountNumber: '',
    bankRoutingNumber: '',
    bankSwiftCode: '',
    bankIban: '',
    bankCountry: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/ppn/login');
      return;
    }

    if (status === 'authenticated') {
      let mounted = true;
      const load = async () => {
        try {
          const [payoutsRes, methodsRes] = await Promise.all([
            fetch('/api/v1/ppn/partner/payouts'),
            fetch('/api/v1/ppn/partner/payout-methods'),
          ]);
          
          const payoutsData = await payoutsRes.json();
          const methodsData = await methodsRes.json();
          
          if (mounted) {
            if (payoutsData.ok) setData(payoutsData.data);
            if (methodsData.ok) setMethods(methodsData.data.methods);
            setLoading(false);
          }
        } catch {
          if (mounted) setLoading(false);
        }
      };
      load();
      return () => { mounted = false; };
    }
  }, [status, router, refreshKey]);

  const fetchData = () => {
    setRefreshKey(k => k + 1);
  };

  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/v1/ppn/partner/payouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(requestAmount),
          method: requestMethod,
        }),
      });

      const result = await response.json();

      if (!result.ok) {
        setError(result.error?.message || 'Failed to request payout');
        setSubmitting(false);
        return;
      }

      setSuccess('Payout request submitted successfully!');
      setShowRequestForm(false);
      setRequestAmount('');
      fetchData();
      setSubmitting(false);
    } catch {
      setError('An error occurred');
      setSubmitting(false);
    }
  };

  const handleAddMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    let details: Record<string, string> = {};
    if (methodType === 'stripe') {
      details = { accountId: methodDetails.stripeAccountId, email: methodDetails.stripeEmail };
    } else if (methodType === 'wise') {
      details = { email: methodDetails.wiseEmail, accountHolderName: methodDetails.wiseAccountHolderName };
    } else if (methodType === 'bank') {
      details = {
        bankName: methodDetails.bankName,
        accountHolderName: methodDetails.bankAccountHolderName,
        accountNumber: methodDetails.bankAccountNumber,
        routingNumber: methodDetails.bankRoutingNumber,
        swiftCode: methodDetails.bankSwiftCode,
        iban: methodDetails.bankIban,
        country: methodDetails.bankCountry,
      };
    }

    try {
      const response = await fetch('/api/v1/ppn/partner/payout-methods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: methodType, details }),
      });

      const result = await response.json();

      if (!result.ok) {
        setError(result.error?.message || 'Failed to add payout method');
        setSubmitting(false);
        return;
      }

      setSuccess('Payout method added successfully!');
      setShowMethodForm(false);
      fetchData();
      setSubmitting(false);
    } catch {
      setError('An error occurred');
      setSubmitting(false);
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
            <h1 className="text-2xl font-bold text-slate-900">Payouts</h1>
            <button onClick={() => signOut({ callbackUrl: '/ppn/login' })} className="text-slate-600 hover:text-slate-900">Sign Out</button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link href="/ppn/dashboard" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">Dashboard</Link>
            <Link href="/ppn/links" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">Links</Link>
            <Link href="/ppn/commissions" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">Commissions</Link>
            <Link href="/ppn/payouts" className="border-b-2 border-teal-500 py-4 px-1 text-sm font-medium text-teal-600">Payouts</Link>
            <Link href="/ppn/assets" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">Assets</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
        {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>}

        {data && (
          <>
            {/* Balance & Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-slate-500 mb-1">Available Balance</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(data.balance.available)}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-sm text-slate-500 mb-1">Minimum Payout</p>
                <p className="text-3xl font-bold text-slate-900">{formatCurrency(data.minimumPayout)}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-center">
                {data.canRequestPayout ? (
                  <button
                    onClick={() => setShowRequestForm(true)}
                    className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700"
                  >
                    Request Payout
                  </button>
                ) : (
                  <p className="text-center text-slate-500 text-sm">
                    {data.balance.available < data.minimumPayout
                      ? `Need ${formatCurrency(data.minimumPayout - data.balance.available)} more to request payout`
                      : 'Already requested this month'}
                  </p>
                )}
              </div>
            </div>

            {/* Payout Methods */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Payout Methods</h2>
                <button
                  onClick={() => setShowMethodForm(true)}
                  className="text-sm text-teal-600 font-medium hover:text-teal-700"
                >
                  + Add Method
                </button>
              </div>
              {methods.length === 0 ? (
                <p className="text-slate-500">No payout methods configured. Add one to receive payouts.</p>
              ) : (
                <div className="space-y-3">
                  {methods.map((method) => (
                    <div key={method.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <div>
                        <span className="font-medium text-slate-900 capitalize">{method.method}</span>
                        {method.isActive && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Active</span>}
                        <p className="text-sm text-slate-500 mt-1">
                          {method.details.email || method.details.accountNumber || 'Configured'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payout History */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-slate-900">Payout History</h2>
              </div>
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Requested</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Processed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.payouts.map((payout) => (
                    <tr key={payout.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{formatCurrency(payout.requestedAmount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 capitalize">{payout.method}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>{payout.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(payout.requestedAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{payout.processedAt ? new Date(payout.processedAt).toLocaleDateString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.payouts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500">No payout requests yet.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Request Payout Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Request Payout</h3>
              <form onSubmit={handleRequestPayout}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Amount (USD)</label>
                  <input
                    type="number"
                    min="100"
                    max={data?.balance.available}
                    step="0.01"
                    value={requestAmount}
                    onChange={(e) => setRequestAmount(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                  <p className="text-sm text-slate-500 mt-1">Available: {formatCurrency(data?.balance.available || 0)}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Payout Method</label>
                  <select
                    value={requestMethod}
                    onChange={(e) => setRequestMethod(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  >
                    {methods.filter(m => m.isActive).map((m) => (
                      <option key={m.id} value={m.method}>{m.method.charAt(0).toUpperCase() + m.method.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowRequestForm(false)} className="flex-1 py-2 border rounded-lg">Cancel</button>
                  <button type="submit" disabled={submitting} className="flex-1 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50">
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Method Modal */}
        {showMethodForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 my-8">
              <h3 className="text-lg font-semibold mb-4">Add Payout Method</h3>
              <form onSubmit={handleAddMethod}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Method Type</label>
                  <select
                    value={methodType}
                    onChange={(e) => setMethodType(e.target.value as 'stripe' | 'wise' | 'bank')}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="stripe">Stripe</option>
                    <option value="wise">Wise</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>

                {methodType === 'stripe' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Stripe Account ID</label>
                      <input
                        type="text"
                        value={methodDetails.stripeAccountId}
                        onChange={(e) => setMethodDetails({ ...methodDetails, stripeAccountId: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="acct_xxx"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={methodDetails.stripeEmail}
                        onChange={(e) => setMethodDetails({ ...methodDetails, stripeEmail: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>
                  </>
                )}

                {methodType === 'wise' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={methodDetails.wiseEmail}
                        onChange={(e) => setMethodDetails({ ...methodDetails, wiseEmail: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Account Holder Name</label>
                      <input
                        type="text"
                        value={methodDetails.wiseAccountHolderName}
                        onChange={(e) => setMethodDetails({ ...methodDetails, wiseAccountHolderName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>
                  </>
                )}

                {methodType === 'bank' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Bank Name</label>
                      <input
                        type="text"
                        value={methodDetails.bankName}
                        onChange={(e) => setMethodDetails({ ...methodDetails, bankName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Account Holder Name</label>
                      <input
                        type="text"
                        value={methodDetails.bankAccountHolderName}
                        onChange={(e) => setMethodDetails({ ...methodDetails, bankAccountHolderName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Account Number / IBAN</label>
                      <input
                        type="text"
                        value={methodDetails.bankAccountNumber}
                        onChange={(e) => setMethodDetails({ ...methodDetails, bankAccountNumber: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Routing Number</label>
                        <input
                          type="text"
                          value={methodDetails.bankRoutingNumber}
                          onChange={(e) => setMethodDetails({ ...methodDetails, bankRoutingNumber: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">SWIFT Code</label>
                        <input
                          type="text"
                          value={methodDetails.bankSwiftCode}
                          onChange={(e) => setMethodDetails({ ...methodDetails, bankSwiftCode: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Country (2-letter code)</label>
                      <input
                        type="text"
                        maxLength={2}
                        value={methodDetails.bankCountry}
                        onChange={(e) => setMethodDetails({ ...methodDetails, bankCountry: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="US"
                        required
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowMethodForm(false)} className="flex-1 py-2 border rounded-lg">Cancel</button>
                  <button type="submit" disabled={submitting} className="flex-1 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50">
                    {submitting ? 'Adding...' : 'Add Method'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
