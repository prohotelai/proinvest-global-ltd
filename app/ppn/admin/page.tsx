import { prisma } from '@/lib/ppn/db';

export default async function AdminOverview() {
  // Fetch dashboard stats
  const [
    totalPartners,
    pendingPartners,
    approvedPartners,
    totalProducts,
    totalCommissions,
    pendingCommissions,
    availableCommissions,
    pendingPayouts,
  ] = await Promise.all([
    prisma.partner.count(),
    prisma.partner.count({ where: { status: 'pending' } }),
    prisma.partner.count({ where: { status: 'approved' } }),
    prisma.product.count({ where: { status: 'active' } }),
    prisma.commissionEntry.aggregate({ _sum: { commissionAmount: true } }),
    prisma.commissionEntry.aggregate({ where: { status: 'pending' }, _sum: { commissionAmount: true } }),
    prisma.commissionEntry.aggregate({ where: { status: 'available' }, _sum: { commissionAmount: true } }),
    prisma.payoutRequest.count({ where: { status: 'requested' } }),
  ]);

  const formatCurrency = (amount: number | null) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500 mb-1">Total Partners</p>
          <p className="text-3xl font-bold text-slate-900">{totalPartners}</p>
          <p className="text-sm text-slate-400 mt-1">{approvedPartners} approved</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500 mb-1">Pending Approval</p>
          <p className="text-3xl font-bold text-yellow-600">{pendingPartners}</p>
          <p className="text-sm text-slate-400 mt-1">partners waiting</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500 mb-1">Active Products</p>
          <p className="text-3xl font-bold text-slate-900">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500 mb-1">Pending Payouts</p>
          <p className="text-3xl font-bold text-red-600">{pendingPayouts}</p>
          <p className="text-sm text-slate-400 mt-1">requests to review</p>
        </div>
      </div>

      {/* Commission Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500 mb-1">Total Commissions</p>
          <p className="text-3xl font-bold text-slate-900">{formatCurrency(totalCommissions._sum.commissionAmount)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500 mb-1">Pending (60 day hold)</p>
          <p className="text-3xl font-bold text-yellow-600">{formatCurrency(pendingCommissions._sum.commissionAmount)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-slate-500 mb-1">Available for Payout</p>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(availableCommissions._sum.commissionAmount)}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/ppn/admin/partners?status=pending" className="p-4 border rounded-lg hover:border-teal-300 hover:bg-teal-50 transition">
            <p className="font-medium text-slate-900">Review Pending Partners</p>
            <p className="text-sm text-slate-500">{pendingPartners} partners waiting</p>
          </a>
          <a href="/ppn/admin/payouts?status=requested" className="p-4 border rounded-lg hover:border-teal-300 hover:bg-teal-50 transition">
            <p className="font-medium text-slate-900">Process Payout Requests</p>
            <p className="text-sm text-slate-500">{pendingPayouts} requests pending</p>
          </a>
          <a href="/ppn/admin/products" className="p-4 border rounded-lg hover:border-teal-300 hover:bg-teal-50 transition">
            <p className="font-medium text-slate-900">Manage Products</p>
            <p className="text-sm text-slate-500">{totalProducts} active products</p>
          </a>
        </div>
      </div>
    </div>
  );
}
