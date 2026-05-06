'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  slug: string;
  domain: string;
  status: string;
  webhookSecret: string;
  defaultLandingUrl: string | null;
  pricingUrl: string | null;
  createdAt: string;
  _count: { clicks: number; attributions: number; commissionEntries: number };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    domain: '',
    defaultLandingUrl: '',
    pricingUrl: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSecret, setShowSecret] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const maskUUID = (uuid: string) => {
    if (!uuid || uuid.length < 8) return uuid;
    return `${uuid.slice(0, 4)}…${uuid.slice(-4)}`;
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const response = await fetch('/api/v1/ppn/admin/products');
        const result = await response.json();
        if (mounted) {
          if (result.ok) {
            setProducts(result.data.products);
          }
          setLoading(false);
        }
      } catch {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [refreshKey]);

  const fetchProducts = () => {
    setRefreshKey(k => k + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const url = editingProduct
        ? `/api/v1/ppn/admin/products?id=${editingProduct.id}`
        : '/api/v1/ppn/admin/products';
      const method = editingProduct ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.ok) {
        setError(result.error?.message || 'Failed to save product');
        setSubmitting(false);
        return;
      }

      setSuccess(editingProduct ? 'Product updated!' : 'Product created!');
      setShowForm(false);
      setEditingProduct(null);
      setFormData({ name: '', slug: '', domain: '', defaultLandingUrl: '', pricingUrl: '' });
      fetchProducts();
      setSubmitting(false);
    } catch {
      setError('An error occurred');
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      domain: product.domain,
      defaultLandingUrl: product.defaultLandingUrl || '',
      pricingUrl: product.pricingUrl || '',
    });
    setShowForm(true);
  };

  const handleRegenerateSecret = async (productId: string) => {
    if (!confirm('Are you sure you want to regenerate the webhook secret? This will invalidate the current secret.')) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/ppn/admin/products?id=${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regenerateSecret: true }),
      });

      const result = await response.json();

      if (result.ok) {
        setShowSecret(result.data.product.webhookSecret);
        setSuccess('Secret regenerated! Copy it now - it won\'t be shown again.');
        fetchProducts();
      }
    } catch {
      setError('Failed to regenerate secret');
    }
  };

  const handleToggleStatus = async (product: Product) => {
    try {
      const response = await fetch(`/api/v1/ppn/admin/products?id=${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: product.status === 'active' ? 'inactive' : 'active' }),
      });

      const result = await response.json();

      if (result.ok) {
        setSuccess(`Product ${result.data.product.status === 'active' ? 'activated' : 'deactivated'}`);
        fetchProducts();
      }
    } catch {
      setError('Failed to update status');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Products</h1>
        <button
          onClick={() => { setShowForm(true); setEditingProduct(null); setFormData({ name: '', slug: '', domain: '', defaultLandingUrl: '', pricingUrl: '' }); }}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 w-full sm:w-auto"
        >
          Add Product
        </button>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>}
      {showSecret && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="font-medium text-yellow-800">New Webhook Secret (copy now):</p>
          <code className="block mt-2 p-2 bg-white rounded text-sm break-all">{showSecret}</code>
          <button onClick={() => setShowSecret(null)} className="mt-2 text-sm text-yellow-700 hover:underline">Dismiss</button>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1024px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Domain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Stats</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Secret</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-500">{product.slug}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-slate-500 font-mono">{maskUUID(product.id)}</code>
                    <button
                      onClick={() => copyToClipboard(product.id, product.id)}
                      className="p-1 hover:bg-slate-100 rounded transition-colors group relative"
                      title="Copy Product ID"
                    >
                      {copiedId === product.id ? (
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{product.domain}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {product._count.clicks} clicks / {product._count.attributions} attrs / {product._count.commissionEntries} comms
                </td>
                <td className="px-6 py-4 text-sm">
                  <code className="text-slate-500">{product.webhookSecret}</code>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleEdit(product)} className="text-sm text-teal-600 hover:underline">Edit</button>
                    <button onClick={() => handleToggleStatus(product)} className="text-sm text-slate-600 hover:underline">
                      {product.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => handleRegenerateSecret(product.id)} className="text-sm text-red-600 hover:underline">New Secret</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {products.length === 0 && (
          <div className="text-center py-12 text-slate-500">No products yet. Add your first product to get started.</div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {editingProduct && (
                  <div className="pb-4 border-b border-slate-200">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product ID</label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-700 select-all">
                        {editingProduct.id}
                      </code>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(editingProduct.id, `modal-${editingProduct.id}`)}
                        className="p-2 hover:bg-slate-100 rounded transition-colors"
                        title="Copy Product ID"
                      >
                        {copiedId === `modal-${editingProduct.id}` ? (
                          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Use this UUID in X-PPN-Product-Id header</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="ProHotelAI"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL-safe)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="prohotelai"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Domain (without https://)</label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="prohotelai.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Default Landing URL</label>
                  <input
                    type="url"
                    value={formData.defaultLandingUrl}
                    onChange={(e) => setFormData({ ...formData, defaultLandingUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="https://prohotelai.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pricing URL</label>
                  <input
                    type="url"
                    value={formData.pricingUrl}
                    onChange={(e) => setFormData({ ...formData, pricingUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="https://prohotelai.com/pricing"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => { setShowForm(false); setEditingProduct(null); }} className="flex-1 py-2 border rounded-lg">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="flex-1 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50">
                  {submitting ? 'Saving...' : (editingProduct ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
