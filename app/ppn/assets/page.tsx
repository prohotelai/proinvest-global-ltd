'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface Asset {
  id: string;
  type: string;
  title: string;
  fileUrl: string;
  size: string | null;
  language: string;
  product: { name: string; slug: string };
}

interface AssetsData {
  assets: Asset[];
  groupedByProduct: Record<string, Asset[]>;
}

export default function AssetsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<AssetsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/ppn/login');
      return;
    }

    if (status === 'authenticated') {
      let mounted = true;
      const load = async () => {
        try {
          const response = await fetch('/api/v1/ppn/partner/assets');
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
  }, [status, router]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'banner': return '🖼️';
      case 'widget': return '📱';
      case 'pdf': return '📄';
      case 'video': return '🎬';
      case 'copy': return '📝';
      default: return '📁';
    }
  };

  // filteredAssets available for future iteration-based rendering
  const _filteredAssets = filter
    ? data?.assets.filter(a => a.type === filter) || []
    : data?.assets || [];

  const groupedFiltered = filter
    ? Object.fromEntries(
        Object.entries(data?.groupedByProduct || {}).map(([product, assets]) => [
          product,
          assets.filter(a => a.type === filter),
        ]).filter(([, assets]) => (assets as Asset[]).length > 0)
      )
    : data?.groupedByProduct || {};

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
            <h1 className="text-2xl font-bold text-slate-900">Marketing Assets</h1>
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
            <Link href="/ppn/payouts" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">Payouts</Link>
            <Link href="/ppn/assets" className="border-b-2 border-teal-500 py-4 px-1 text-sm font-medium text-teal-600">Assets</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter */}
        <div className="mb-6 flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700">Filter by type:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="banner">Banners</option>
            <option value="widget">Widgets</option>
            <option value="pdf">PDFs</option>
            <option value="video">Videos</option>
            <option value="copy">Copy/Text</option>
          </select>
        </div>

        {/* Assets by Product */}
        {Object.keys(groupedFiltered).length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-slate-500">No marketing assets available yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedFiltered).map(([productName, assets]) => (
              <div key={productName} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-slate-50 border-b">
                  <h2 className="text-lg font-semibold text-slate-900">{productName}</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(assets as Asset[]).map((asset) => (
                      <div key={asset.id} className="border rounded-lg p-4 hover:border-teal-300 transition">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-2xl">{getTypeIcon(asset.type)}</span>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full capitalize">{asset.type}</span>
                        </div>
                        <h3 className="font-medium text-slate-900 mb-1">{asset.title}</h3>
                        {asset.size && <p className="text-sm text-slate-500 mb-3">Size: {asset.size}</p>}
                        <a
                          href={asset.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-teal-600 font-medium hover:text-teal-700"
                        >
                          Download
                          <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
