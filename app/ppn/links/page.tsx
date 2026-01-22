'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface ProductLink {
  id: string;
  name: string;
  slug: string;
  domain: string;
  clicks: number;
  links: {
    home: string;
    pricing: string;
    landing: string;
    redirect: string;
  };
}

interface LinksData {
  partnerCode: string;
  products: ProductLink[];
}

export default function LinksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<LinksData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/ppn/login');
      return;
    }

    if (status === 'authenticated') {
      let mounted = true;
      const load = async () => {
        try {
          const response = await fetch('/api/v1/ppn/partner/links');
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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
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
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Referral Links</h1>
            <button
              onClick={() => signOut({ callbackUrl: '/ppn/login' })}
              className="text-slate-600 hover:text-slate-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link href="/ppn/dashboard" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700">
              Dashboard
            </Link>
            <Link href="/ppn/links" className="border-b-2 border-teal-500 py-4 px-1 text-sm font-medium text-teal-600">
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
        {data && (
          <>
            <div className="mb-8 p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <p className="text-sm text-teal-800">
                <strong>Your Partner Code:</strong>{' '}
                <span className="font-mono bg-white px-2 py-1 rounded">{data.partnerCode}</span>
                <button
                  onClick={() => copyToClipboard(data.partnerCode, 'code')}
                  className="ml-2 text-teal-600 hover:text-teal-800"
                >
                  {copied === 'code' ? '✓ Copied' : 'Copy'}
                </button>
              </p>
            </div>

            <div className="space-y-6">
              {data.products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>
                      <p className="text-slate-500">{product.domain}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Total Clicks</p>
                      <p className="text-2xl font-bold text-slate-900">{product.clicks.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">Home Page Link</span>
                        <button
                          onClick={() => copyToClipboard(product.links.home, `${product.id}-home`)}
                          className="text-sm text-teal-600 hover:text-teal-800"
                        >
                          {copied === `${product.id}-home` ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <code className="text-sm text-slate-600 break-all">{product.links.home}</code>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">Pricing Page Link</span>
                        <button
                          onClick={() => copyToClipboard(product.links.pricing, `${product.id}-pricing`)}
                          className="text-sm text-teal-600 hover:text-teal-800"
                        >
                          {copied === `${product.id}-pricing` ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <code className="text-sm text-slate-600 break-all">{product.links.pricing}</code>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">Redirect Link (Tracked)</span>
                        <button
                          onClick={() => copyToClipboard(`${window.location.origin}${product.links.redirect}`, `${product.id}-redirect`)}
                          className="text-sm text-teal-600 hover:text-teal-800"
                        >
                          {copied === `${product.id}-redirect` ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <code className="text-sm text-slate-600 break-all">
                        {typeof window !== 'undefined' ? window.location.origin : ''}{product.links.redirect}
                      </code>
                    </div>
                  </div>
                </div>
              ))}

              {data.products.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <p className="text-slate-500">No products available for promotion yet.</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
