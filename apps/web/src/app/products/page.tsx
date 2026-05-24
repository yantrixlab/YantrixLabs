'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search, Package, Tag, TrendingUp, RefreshCw, Edit2, Trash2, AlertTriangle, BarChart2, ScanLine } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { useToast } from '@/components/ui/Toast';

interface Product { id: string; name: string; type: string; hsnSac: string | null; price: number; mrp: number | null; gstRate: number; category: string | null; stockCount: number | null; lowStockAlert: number | null; }
interface ScanSessionData { sessionId: string; pairingPayloadText: string; }

function AndroidLogoIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M7.05 8.15h9.9c-.44-1.2-1.25-2.2-2.3-2.89l1.07-1.57a.75.75 0 0 0-1.24-.84l-1.13 1.66A7.2 7.2 0 0 0 12 4.12c-.48 0-.95.05-1.4.15L9.47 2.6a.75.75 0 0 0-1.24.84L9.3 5.01c-1.05.69-1.86 1.69-2.25 2.89Zm-.68 1.5h-.62a1.75 1.75 0 0 0 0 3.5h.62v4.1c0 1.04.84 1.88 1.88 1.88h.9v2.12a1.25 1.25 0 0 0 2.5 0v-2.12h.7v2.12a1.25 1.25 0 0 0 2.5 0v-2.12h.9c1.04 0 1.88-.84 1.88-1.88v-4.1h.62a1.75 1.75 0 0 0 0-3.5h-.62v5.37a.37.37 0 0 1-.38.38H8.75a.37.37 0 0 1-.38-.38V9.65Zm3.05-1.13a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7Zm5.16 0a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7Z" />
    </svg>
  );
}

function StockBadge({ stockCount, lowStockAlert, type }: { stockCount: number | null; lowStockAlert: number | null; type: string }) {
  if (type === 'service') return <span className="text-xs text-gray-400 italic">N/A</span>;
  if (stockCount === null) return <span className="text-sm text-gray-400">-</span>;
  const isOut = stockCount === 0;
  const isLow = lowStockAlert !== null && stockCount > 0 && stockCount <= lowStockAlert;
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`text-sm font-semibold ${isOut ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-green-700'}`}>{stockCount.toLocaleString('en-IN')}</span>
      {isOut ? <span className="inline-flex items-center gap-1 text-xs text-red-600 bg-red-50 rounded-full px-1.5 py-0.5 font-medium w-fit"><AlertTriangle className="h-3 w-3" /> Out of Stock</span> : null}
      {isLow ? <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 rounded-full px-1.5 py-0.5 font-medium w-fit"><AlertTriangle className="h-3 w-3" /> Low Stock</span> : null}
      {!isOut && !isLow ? <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 rounded-full px-1.5 py-0.5 font-medium w-fit">In Stock</span> : null}
    </div>
  );
}

function CreateProductFromScanModal({ scannedCode, onClose, onCreated }: { scannedCode: string; onClose: () => void; onCreated: (p: Product) => void }) {
  const { success, error: toastError } = useToast();
  const [form, setForm] = useState({
    name: '',
    description: '',
    type: 'product',
    sku: scannedCode,
    barcode: scannedCode,
    hsnSac: '',
    unit: 'PCS',
    price: '0',
    costPrice: '',
    mrp: '',
    gstRate: '18',
    cessRate: '',
    category: '',
    brand: '',
    stockCount: '0',
    lowStockAlert: '',
    isTaxable: true,
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const create = async () => {
    setErr('');
    if (!form.name.trim()) {
      setErr('Product name is required');
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch<{ data: Product }>('/products', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description || undefined,
          type: form.type,
          sku: form.sku || undefined,
          barcode: form.barcode || undefined,
          hsnSac: form.hsnSac || undefined,
          unit: form.unit || 'PCS',
          price: parseFloat(form.price) || 0,
          costPrice: form.costPrice ? parseFloat(form.costPrice) : undefined,
          mrp: form.mrp ? parseFloat(form.mrp) : undefined,
          gstRate: parseFloat(form.gstRate) || 0,
          cessRate: form.cessRate ? parseFloat(form.cessRate) : undefined,
          category: form.category || undefined,
          brand: form.brand || undefined,
          stockCount: form.stockCount ? parseFloat(form.stockCount) : 0,
          lowStockAlert: form.lowStockAlert ? parseFloat(form.lowStockAlert) : undefined,
          isTaxable: form.isTaxable,
          isActive: form.isActive,
        }),
      });
      success('Product created', res.data.name);
      onCreated(res.data);
    } catch (e: any) {
      toastError('Create product failed', e?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10020] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl rounded-3xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h3 className="text-3xl font-semibold text-gray-900 tracking-tight">Create Product from Scanned Item</h3>
            <p className="text-lg text-gray-500 mt-1">Scanned code: <span className="font-mono">{scannedCode}</span></p>
          </div>
          <button onClick={onClose} className="text-3xl leading-none text-gray-400 hover:text-gray-700">×</button>
        </div>
        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">Product Name *</label>
            <input className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-2xl focus:border-indigo-500 focus:outline-none" placeholder="Enter product name" value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Type</label>
            <select className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-2xl focus:border-indigo-500 focus:outline-none" value={form.type} onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}>
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>
          </div>
          <div className="sm:col-span-3">
            <label className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
            <input className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" placeholder="Optional description" value={form.description} onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">SKU</label>
            <input className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.sku} onChange={(e) => setForm(prev => ({ ...prev, sku: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Barcode</label>
            <input className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.barcode} onChange={(e) => setForm(prev => ({ ...prev, barcode: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">HSN/SAC</label>
            <input className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.hsnSac} onChange={(e) => setForm(prev => ({ ...prev, hsnSac: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Unit</label>
            <input className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.unit} onChange={(e) => setForm(prev => ({ ...prev, unit: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Price *</label>
            <input type="number" className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.price} onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Cost Price</label>
            <input type="number" className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.costPrice} onChange={(e) => setForm(prev => ({ ...prev, costPrice: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">MRP</label>
            <input type="number" className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.mrp} onChange={(e) => setForm(prev => ({ ...prev, mrp: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">GST Rate (%)</label>
            <input type="number" className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.gstRate} onChange={(e) => setForm(prev => ({ ...prev, gstRate: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">CESS Rate (%)</label>
            <input type="number" className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.cessRate} onChange={(e) => setForm(prev => ({ ...prev, cessRate: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Category</label>
            <input className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.category} onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Brand</label>
            <input className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.brand} onChange={(e) => setForm(prev => ({ ...prev, brand: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Stock Count</label>
            <input type="number" className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.stockCount} onChange={(e) => setForm(prev => ({ ...prev, stockCount: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Low Stock Alert</label>
            <input type="number" className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-xl focus:border-indigo-500 focus:outline-none" value={form.lowStockAlert} onChange={(e) => setForm(prev => ({ ...prev, lowStockAlert: e.target.value }))} />
          </div>
          <div className="sm:col-span-3 flex items-center gap-6 text-xl">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={form.isTaxable} onChange={(e) => setForm(prev => ({ ...prev, isTaxable: e.target.checked }))} />
              <span>Taxable</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm(prev => ({ ...prev, isActive: e.target.checked }))} />
              <span>Active</span>
            </label>
          </div>
          {err ? <p className="sm:col-span-3 text-sm text-red-600">{err}</p> : null}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="rounded-2xl border border-gray-300 bg-white px-6 py-3 text-xl font-medium text-gray-700">Cancel</button>
          <button disabled={loading || !form.name.trim()} onClick={create} className="rounded-2xl bg-indigo-600 text-white px-6 py-3 text-xl font-semibold disabled:opacity-60">{loading ? 'Creating...' : 'Save & Add to Products'}</button>
        </div>
      </div>
    </div>
  );
}

function ExistingProductScanModal({
  product,
  onClose,
  onUpdated,
}: {
  product: Product;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const { success, error: toastError } = useToast();
  const [mode, setMode] = useState<'add' | 'set'>('add');
  const [qty, setQty] = useState('1');
  const [loading, setLoading] = useState(false);

  const currentStock = product.stockCount ?? 0;
  const parsedQty = Math.max(0, parseFloat(qty) || 0);
  const nextStock = mode === 'add' ? currentStock + parsedQty : parsedQty;

  const submit = async () => {
    setLoading(true);
    try {
      await apiFetch(`/products/${product.id}`, {
        method: 'PUT',
        body: JSON.stringify({ stockCount: nextStock }),
      });
      success('Stock updated', `${product.name} stock is now ${nextStock}`);
      onUpdated();
      onClose();
    } catch (e: any) {
      toastError('Update failed', e?.message || 'Unable to update stock');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10030] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/35" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-2xl">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Item already exists</h3>
          <p className="text-sm text-gray-500 mt-1">{product.name}</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 text-sm">
            <p><span className="text-gray-500">Code:</span> <span className="font-mono">{(product as any).barcode || (product as any).sku || '-'}</span></p>
            <p className="mt-1"><span className="text-gray-500">Current stock:</span> <span className="font-semibold">{currentStock}</span></p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setMode('add')} className={`px-3 py-2 rounded-lg text-sm border ${mode === 'add' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}>Add Qty</button>
            <button onClick={() => setMode('set')} className={`px-3 py-2 rounded-lg text-sm border ${mode === 'set' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}>Set Qty</button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{mode === 'add' ? 'Quantity to add' : 'Set stock quantity'}</label>
            <input type="number" min="0" step="1" value={qty} onChange={(e) => setQty(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
            <p className="text-xs text-gray-500 mt-1">New stock will be <span className="font-semibold">{nextStock}</span></p>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">Close</button>
          <button disabled={loading} onClick={submit} className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm disabled:opacity-60">{loading ? 'Updating...' : 'Update Quantity'}</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const router = useRouter();
  const { success, error: toastError } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [scanSession, setScanSession] = useState<ScanSessionData | null>(null);
  const [scanState, setScanState] = useState<'disconnected' | 'qr_ready' | 'connected' | 'receiving'>('disconnected');
  const [scanHint, setScanHint] = useState('Click connect to generate pairing QR for scanner app.');
  const [pendingScannedCode, setPendingScannedCode] = useState<string | null>(null);
  const [existingScannedProduct, setExistingScannedProduct] = useState<Product | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastLogAtRef = useRef<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch<{ data: Product[] }>('/products?limit=100');
      setProducts(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    return () => {
      eventSourceRef.current?.close();
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [fetchProducts]);

  const connectScanner = async () => {
    try {
      eventSourceRef.current?.close();
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      lastLogAtRef.current = null;
      const res = await apiFetch<{ data: ScanSessionData }>('/scan/sessions', { method: 'POST', body: JSON.stringify({ invoiceSessionId: `products-${Date.now()}` }) });
      setScanSession(res.data);
      setScanState('qr_ready');
      setScanHint('Scanner QR ready. Scan it in Android app.');
      const handleScanPayload = (payload: any) => {
        setScanState('receiving');
        if (payload?.found && payload?.product) {
          success('Item already exists', payload.product.name);
          setExistingScannedProduct(payload.product as Product);
        }
        else if (payload?.rawCode) setPendingScannedCode(payload.rawCode);
        setTimeout(() => setScanState('connected'), 1000);
      };
      const token = localStorage.getItem('accessToken');
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6000/api/v1';
      const root = apiBase.replace(/\/api\/v1\/?$/, '');
      const es = new EventSource(`${root}/api/v1/scan/sessions/${res.data.sessionId}/events?accessToken=${encodeURIComponent(token || '')}`);
      eventSourceRef.current = es;
      es.addEventListener('scan.status', (event: MessageEvent) => {
        const payload = JSON.parse(event.data);
        if (payload.state === 'paired' || payload.state === 'connected') {
          setScanState('connected');
          setScanHint('Scanner connected. Use Scan & Add Product in Android app.');
        }
      });
      es.addEventListener('scan.catalog', (event: MessageEvent) => {
        handleScanPayload(JSON.parse(event.data));
      });
      es.onerror = () => {
        setScanHint('Realtime channel blocked. Using fallback polling...');
      };

      pollTimerRef.current = setInterval(async () => {
        try {
          const sessionRes = await apiFetch<{ data: { status?: string } }>(`/scan/sessions/${res.data.sessionId}`);
          if (sessionRes?.data?.status === 'PAIRED') {
            setScanState('connected');
            setScanHint('Scanner connected. Use Scan & Add Product in Android app.');
          }
          const logsPath = lastLogAtRef.current
            ? `/scan/sessions/${res.data.sessionId}/logs?since=${encodeURIComponent(lastLogAtRef.current)}`
            : `/scan/sessions/${res.data.sessionId}/logs`;
          const logsRes = await apiFetch<{ data: Array<{ createdAt: string; rawCode: string; product: Product | null; status: string }> }>(logsPath);
          for (const log of logsRes.data || []) {
            lastLogAtRef.current = log.createdAt;
            handleScanPayload({
              found: log.status === 'FOUND' && !!log.product,
              product: log.product,
              rawCode: log.rawCode,
            });
          }
        } catch {
          // no-op: keep UI stable while retrying
        }
      }, 2500);
    } catch (e: any) {
      toastError('Scanner connect failed', e?.message || 'Failed to connect scanner');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiFetch(`/products/${deleteTarget.id}`, { method: 'DELETE' });
      success('Product deleted', `"${deleteTarget.name}" has been removed.`);
      setDeleteTarget(null);
      fetchProducts();
    } catch (err: any) {
      toastError('Failed to delete', err.message);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || (p.category && p.category.toLowerCase().includes(search.toLowerCase())));
  const productItems = products.filter(p => p.type !== 'service');
  const inStockCount = productItems.filter(p => p.stockCount !== null && p.stockCount > 0).length;
  const lowStockCount = productItems.filter(p => p.stockCount !== null && p.lowStockAlert !== null && p.stockCount <= p.lowStockAlert && p.stockCount > 0).length;
  const outOfStockCount = productItems.filter(p => p.stockCount !== null && p.stockCount === 0).length;
  const scannerStateUi = {
    disconnected: { ring: 'border-gray-300 bg-gray-50 text-gray-700', dot: 'bg-gray-500', wave: 'bg-gray-400/40' },
    qr_ready: { ring: 'border-amber-300 bg-amber-50 text-amber-800', dot: 'bg-amber-500', wave: 'bg-amber-400/40' },
    connected: { ring: 'border-emerald-300 bg-emerald-50 text-emerald-800', dot: 'bg-emerald-500', wave: 'bg-emerald-400/40' },
    receiving: { ring: 'border-indigo-300 bg-indigo-50 text-indigo-800', dot: 'bg-indigo-500', wave: 'bg-indigo-400/40' },
  } as const;
  const scannerUi = scannerStateUi[scanState];

  return (
    <div className="p-6 lg:p-8">
      {pendingScannedCode ? <CreateProductFromScanModal scannedCode={pendingScannedCode} onClose={() => setPendingScannedCode(null)} onCreated={() => { setPendingScannedCode(null); fetchProducts(); }} /> : null}
      {existingScannedProduct ? <ExistingProductScanModal product={existingScannedProduct} onClose={() => setExistingScannedProduct(null)} onUpdated={fetchProducts} /> : null}
      <ConfirmModal open={!!deleteTarget} title="Delete Product" message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`} confirmLabel="Delete" destructive loading={deleting} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />

      <div className="flex items-start justify-between mb-4">
        <div><h1 className="text-2xl font-bold text-gray-900">Products & Services</h1><p className="text-gray-500 mt-1">{filtered.length} items in catalog</p></div>
        <div className="flex items-center gap-2">
          <button onClick={connectScanner} className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100">
            <span className="pointer-events-none absolute inset-0 rounded-xl border border-indigo-300/60" />
            <span className="pointer-events-none absolute -inset-2">
              <span className="absolute inset-0 rounded-2xl bg-indigo-300/35 animate-ping" />
            </span>
            <ScanLine className="relative h-4 w-4" />
            <span className="relative">Connect Android Scanner</span>
          </button>
          <a
            href="/android_app_apk/product_scanner.apk"
            download
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 shadow-sm transition-all hover:bg-emerald-100"
          >
            <AndroidLogoIcon className="h-4 w-4" />
            <span>Download Product Scanner</span>
          </a>
          <button onClick={fetchProducts} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"><RefreshCw className="h-4 w-4" /></button>
          <Link href="/products/new" className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"><Plus className="h-4 w-4" /> Add Product</Link>
        </div>
      </div>

      <div className="products-scanner-card mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
        <div className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 ${scannerUi.ring}`}>
          <span className="relative flex h-3.5 w-3.5">
            <span className={`absolute inline-flex h-full w-full rounded-full ${scannerUi.wave} animate-ping`} />
            <span className={`relative inline-flex h-3.5 w-3.5 rounded-full ${scannerUi.dot}`} />
          </span>
          <p className="text-sm font-semibold uppercase tracking-wide">Scanner State: {scanState.replace('_', ' ')}</p>
        </div>
        <p className="text-xs text-indigo-700 mt-1">{scanHint}</p>
        {scanSession ? <div className="mt-3 rounded-xl border border-indigo-200 bg-white p-3 flex items-start gap-3"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(scanSession.pairingPayloadText)}`} alt="Scanner Pair QR" className="h-24 w-24 rounded" /><p className="text-[11px] text-gray-700 break-all font-mono">{scanSession.pairingPayloadText}</p></div> : null}
      </div>

      {productItems.length > 0 ? <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3"><div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"><p className="text-xs text-gray-500 font-medium flex items-center gap-1"><BarChart2 className="h-3.5 w-3.5" /> Total Products</p><p className="text-2xl font-bold text-gray-900 mt-0.5">{productItems.length}</p></div><div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 shadow-sm"><p className="text-xs text-green-700 font-medium">In Stock</p><p className="text-2xl font-bold text-green-700 mt-0.5">{inStockCount}</p></div><div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 shadow-sm"><p className="text-xs text-amber-700 font-medium">Low Stock</p><p className="text-2xl font-bold text-amber-700 mt-0.5">{lowStockCount}</p></div><div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 shadow-sm"><p className="text-xs text-red-700 font-medium">Out of Stock</p><p className="text-2xl font-bold text-red-700 mt-0.5">{outOfStockCount}</p></div></div> : null}
      {error ? <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div> : null}
      <div className="mb-4"><div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" /></div></div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <table className="w-full"><thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Product / Service</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">HSN/SAC</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th><th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Price</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">GST</th><th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stock</th><th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-50">{loading ? Array.from({ length: 4 }).map((_, i) => (<tr key={i}><td colSpan={7} className="px-4 py-4"><div className="h-8 bg-gray-100 rounded animate-pulse" /></td></tr>)) : filtered.length === 0 ? (<tr><td colSpan={7} className="px-4 py-12 text-center"><Package className="h-12 w-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No products found</p><Link href="/products/new" className="mt-3 inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"><Plus className="h-4 w-4" /> Add your first product</Link></td></tr>) : filtered.map((product, idx) => (<motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/products/${product.id}`)}><td className="px-4 py-4"><div className="flex items-center gap-3"><div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${product.type === 'service' ? 'bg-purple-50' : 'bg-blue-50'}`}>{product.type === 'service' ? <TrendingUp className="h-4 w-4 text-purple-600" /> : <Package className="h-4 w-4 text-blue-600" />}</div><div><p className="text-sm font-medium text-gray-900 hover:text-indigo-600">{product.name}</p><span className={`text-xs px-1.5 py-0.5 rounded-full ${product.type === 'service' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>{product.type}</span></div></div></td><td className="px-4 py-4 text-sm font-mono text-gray-500">{product.hsnSac || '-'}</td><td className="px-4 py-4">{product.category ? <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 rounded-full px-2.5 py-1"><Tag className="h-3 w-3" /> {product.category}</span> : '-'}</td><td className="px-4 py-4 text-right"><span className="text-sm font-semibold text-gray-900">Rs {product.price.toLocaleString('en-IN')}</span>{product.mrp && product.mrp > product.price ? <p className="text-xs text-gray-400 line-through">Rs {product.mrp.toLocaleString('en-IN')}</p> : null}</td><td className="px-4 py-4 text-sm text-gray-600">{product.gstRate}%</td><td className="px-4 py-4"><StockBadge stockCount={product.stockCount} lowStockAlert={product.lowStockAlert} type={product.type} /></td><td className="px-4 py-4" onClick={e => e.stopPropagation()}><div className="flex items-center justify-center gap-1 relative"><button onClick={() => router.push(`/products/${product.id}`)} className="rounded-lg p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" title="Edit"><Edit2 className="h-4 w-4" /></button><button onClick={() => setDeleteTarget(product)} className="rounded-lg p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button></div></td></motion.tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}
