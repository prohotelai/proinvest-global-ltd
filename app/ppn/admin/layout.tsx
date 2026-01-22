import { redirect } from 'next/navigation';
import { auth } from '@/lib/ppn/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard | ProInvest Partner Network',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/ppn/login');
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/ppn/admin" className="text-xl font-bold">PPN Admin</Link>
              <span className="text-xs bg-red-500 px-2 py-1 rounded">Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300">{session.user.email}</span>
              <Link href="/api/auth/signout" className="text-sm text-slate-400 hover:text-white">
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            <Link href="/ppn/admin" className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-t">
              Overview
            </Link>
            <Link href="/ppn/admin/products" className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-t">
              Products
            </Link>
            <Link href="/ppn/admin/partners" className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-t">
              Partners
            </Link>
            <Link href="/ppn/admin/commissions" className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-t">
              Commissions
            </Link>
            <Link href="/ppn/admin/payouts" className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-t">
              Payouts
            </Link>
            <Link href="/ppn/admin/assets" className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-t">
              Assets
            </Link>
            <Link href="/ppn/admin/settings" className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-t">
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
