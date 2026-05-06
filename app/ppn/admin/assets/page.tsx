'use client';

import { useEffect, useState } from 'react';

interface Asset {
  id: string;
  type: string;
  title: string;
  fileUrl: string;
  size: string | null;
  language: string;
  active: boolean;
  product: { id: string; name: string; slug: string };
}

interface Product {
  id: string;
  name: string;
  slug: string;
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    productId: '',
    type: 'banner',
    title: '',
    fileUrl: '',
    size: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [assetsRes, productsRes] = await Promise.all([
          fetch('/api/v1/ppn/admin/assets'),
          fetch('/api/v1/ppn/admin/products'),
        ]);

        const assetsData = await assetsRes.json();
        const productsData = await productsRes.json();

        if (mounted) {
          if (assetsData.ok) setAssets(assetsData.data.assets);
          if (productsData.ok) setProducts(productsData.data.products);
          setLoading(false);
        }
      } catch {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [refreshKey]);

  const fetchData = () => {
    setRefreshKey(k => k + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/v1/ppn/admin/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.ok) {
        setSuccess('Asset created');
        setShowForm(false);
        setFormData({ productId: '', type: 'banner', title: '', fileUrl: '', size: '' });
        fetchData();
      } else {
        setError(result.error?.message || 'Failed to create');
      }
      setSubmitting(false);
    } catch {
      setError('An error occurred');
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (asset: Asset) => {
    try {
      const response = await fetch(`/api/v1/ppn/admin/assets?id=${asset.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !asset.active }),
      });

      const result = await response.json();

      if (result.ok) {
        setSuccess(`Asset ${result.data.asset.active ? 'activated' : 'deactivated'}`);
        fetchData();
      }
    } catch {
      setError('Failed to update');
    }
  };

  const handleDelete = async (asset: Asset) => {
    if (!confirm('Delete this asset?')) return;

    try {
      const response = await fetch(`/api/v1/ppn/admin/assets?id=${asset.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.ok) {
        setSuccess('Asset deleted');
        fetchData();
      }
    } catch {
      setError('Failed to delete');
    }
  };

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

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Marketing Assets</h1>
        <button
          onClick={() => { setShowForm(true); setFormData({ productId: products[0]?.id || '', type: 'banner', title: '', fileUrl: '', size: '' }); }}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Add Asset
        </button>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[900px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td className="px-6 py-4">
                  <span className="text-2xl">{getTypeIcon(asset.type)}</span>
                  <span className="ml-2 text-sm text-slate-600 capitalize">{asset.type}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{asset.title}</p>
                  <a href={asset.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-600 hover:underline break-all">View</a>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{asset.product.name}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{asset.size || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${asset.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {asset.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleToggleActive(asset)} className="text-sm text-slate-600 hover:underline px-3 py-2 -mx-3">
                      {asset.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => handleDelete(asset)} className="text-sm text-red-600 hover:underline px-3 py-2 -mx-3">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>

        {assets.length === 0 && (
          <div className="text-center py-12 text-slate-500">No assets yet. Add marketing materials for partners.</div>
        )}
      </div>

      {/* Add Asset Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add Asset</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Product</label>
                  <select
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                  {formData.type === 'widget' && (
                    <p className="mt-1 text-xs text-slate-500">Use the base embed URL only. Partner-specific ppn_ref will be generated automatically in partner dashboards.</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="banner">Banner</option>
                    <option value="widget">Widget</option>
                    <option value="pdf">PDF</option>
                    <option value="video">Video</option>
                    <option value="copy">Copy/Text</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">File URL</label>
                  <input
                    type="url"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Size (optional)</label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="300x250, A4, etc."
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50">
                  {submitting ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
