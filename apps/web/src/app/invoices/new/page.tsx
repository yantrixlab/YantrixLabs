'use client';

export const dynamic = 'force-dynamic';

import { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Search, Save, Send, ArrowLeft, Calculator, UserPlus, X, Check, Lock, FileText, AlertTriangle, ScanLine, Layers, Settings, Info, CheckCircle2, XCircle } from 'lucide-react';
import { apiFetch, getUserData } from '@/lib/api';
import { useToast } from '@/components/ui/Toast';
import theme from './InvoiceNewTheme.module.css';

interface Customer { id: string; name: string; email: string | null; phone: string | null; gstin: string | null; billingCity: string | null; billingState: string | null; }
interface InvoiceItem { id: string; description: string; productId: string | null; hsnSac: string; quantity: number; unit: string; price: number; discount: number; gstRate: number; taxableAmount: number; cgst: number; sgst: number; igst: number; total: number; }
interface Product { id: string; name: string; hsnSac: string | null; price: number; gstRate: number; unit: string; barcode?: string | null; sku?: string | null; }
interface ScanSessionData {
  sessionId: string;
  invoiceSessionId: string;
  status: string;
  pairingPayloadText: string;
}
interface ScanLogData {
  id: string;
  rawCode: string;
  status: string;
  message: string | null;
  createdAt: string;
  product: Product | null;
}
interface BusinessSettings {
  id: string;
  name: string;
  legalName: string | null;
  gstin: string | null;
  pan: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  invoicePrefix: string;
  termsAndConditions: string | null;
  logo: string | null;
  defaultTemplateId: string | null;
}
interface InvoiceTemplate {
  id: string;
  name: string;
}
interface SetupChecklistItem {
  key: string;
  label: string;
  isComplete: boolean;
  hint: string;
  tabTarget: 'business' | 'invoice';
}

interface CreateProductFromScanModalProps {
  scannedCode: string;
  onClose: () => void;
  onCreated: (product: Product) => void;
}

function CreateProductFromScanModal({ scannedCode, onClose, onCreated }: CreateProductFromScanModalProps) {
  const { success, error: toastError } = useToast();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({
    name: '',
    description: '',
    sku: scannedCode,
    barcode: scannedCode,
    hsnSac: '',
    type: 'product',
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

  const set = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  const handleCreate = async () => {
    setErr('');
    if (!form.name.trim()) {
      setErr('Product name is required');
      return;
    }
    if ((parseFloat(form.price) || 0) < 0) {
      setErr('Price cannot be negative');
      return;
    }
    setLoading(true);
    try {
      const payload: Record<string, any> = {
        name: form.name.trim(),
        description: form.description || undefined,
        sku: form.sku || undefined,
        barcode: form.barcode || undefined,
        hsnSac: form.hsnSac || undefined,
        type: form.type,
        unit: form.unit,
        price: parseFloat(form.price) || 0,
        gstRate: parseFloat(form.gstRate) || 0,
        category: form.category || undefined,
        brand: form.brand || undefined,
        isTaxable: form.isTaxable,
        isActive: form.isActive,
      };
      if (form.costPrice) payload.costPrice = parseFloat(form.costPrice);
      if (form.mrp) payload.mrp = parseFloat(form.mrp);
      if (form.cessRate) payload.cessRate = parseFloat(form.cessRate);
      if (form.stockCount) payload.stockCount = parseFloat(form.stockCount);
      if (form.lowStockAlert) payload.lowStockAlert = parseFloat(form.lowStockAlert);

      const res = await apiFetch<{ data: Product }>('/products', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      success('Product created', res.data.name);
      onCreated(res.data);
    } catch (e: any) {
      const msg = e?.message || 'Failed to create product';
      setErr(msg);
      toastError('Create product failed', msg);
    } finally {
      setLoading(false);
    }
  };

  const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none";
  const label = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="fixed inset-0 z-[10020] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Create Product from Scanned Item</h3>
            <p className="text-xs text-gray-500 mt-1">Scanned code: <span className="font-mono">{scannedCode}</span></p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className={label}>Product Name *</label>
            <input className={input} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Enter product name" />
          </div>
          <div>
            <label className={label}>Type</label>
            <select className={input} value={form.type} onChange={e => set('type', e.target.value)}>
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className={label}>Description</label>
            <input className={input} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Optional description" />
          </div>
          <div>
            <label className={label}>SKU</label>
            <input className={input} value={form.sku} onChange={e => set('sku', e.target.value)} />
          </div>
          <div>
            <label className={label}>Barcode</label>
            <input className={input} value={form.barcode} onChange={e => set('barcode', e.target.value)} />
          </div>
          <div>
            <label className={label}>HSN/SAC</label>
            <input className={input} value={form.hsnSac} onChange={e => set('hsnSac', e.target.value)} />
          </div>
          <div>
            <label className={label}>Unit</label>
            <input className={input} value={form.unit} onChange={e => set('unit', e.target.value)} placeholder="PCS" />
          </div>
          <div>
            <label className={label}>Price *</label>
            <input className={input} type="number" min="0" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} />
          </div>
          <div>
            <label className={label}>Cost Price</label>
            <input className={input} type="number" min="0" step="0.01" value={form.costPrice} onChange={e => set('costPrice', e.target.value)} />
          </div>
          <div>
            <label className={label}>MRP</label>
            <input className={input} type="number" min="0" step="0.01" value={form.mrp} onChange={e => set('mrp', e.target.value)} />
          </div>
          <div>
            <label className={label}>GST Rate (%)</label>
            <input className={input} type="number" min="0" max="100" step="0.01" value={form.gstRate} onChange={e => set('gstRate', e.target.value)} />
          </div>
          <div>
            <label className={label}>CESS Rate (%)</label>
            <input className={input} type="number" min="0" max="100" step="0.01" value={form.cessRate} onChange={e => set('cessRate', e.target.value)} />
          </div>
          <div>
            <label className={label}>Category</label>
            <input className={input} value={form.category} onChange={e => set('category', e.target.value)} />
          </div>
          <div>
            <label className={label}>Brand</label>
            <input className={input} value={form.brand} onChange={e => set('brand', e.target.value)} />
          </div>
          <div>
            <label className={label}>Stock Count</label>
            <input className={input} type="number" step="0.01" value={form.stockCount} onChange={e => set('stockCount', e.target.value)} />
          </div>
          <div>
            <label className={label}>Low Stock Alert</label>
            <input className={input} type="number" step="0.01" value={form.lowStockAlert} onChange={e => set('lowStockAlert', e.target.value)} />
          </div>
          <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-3 mt-1">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.isTaxable} onChange={e => set('isTaxable', e.target.checked)} />
              Taxable
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} />
              Active
            </label>
          </div>
          {err && (
            <div className="sm:col-span-2 lg:col-span-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {err}
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-5 py-4">
          <button onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={handleCreate} disabled={loading} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
            {loading ? 'Creating...' : 'Save & Add to Invoice'}
          </button>
        </div>
      </div>
    </div>
  );
}

const GST_RATES = [0, 5, 12, 18, 28];
const INVOICE_WARNING_THRESHOLD = 2;

function generateId() { return crypto.randomUUID().replace(/-/g, '').slice(0, 9); }

function calcItem(item: Partial<InvoiceItem>, interState: boolean): InvoiceItem {
  const q = item.quantity || 1, p = item.price || 0, d = item.discount || 0, g = item.gstRate || 0;
  const sub = q * p, disc = (sub * d) / 100, taxable = sub - disc;
  const gstAmt = (taxable * g) / 100;
  return {
    id: item.id || generateId(), description: item.description || '',
    productId: item.productId || null, hsnSac: item.hsnSac || '',
    quantity: q, unit: item.unit || 'PCS', price: p, discount: d, gstRate: g,
    taxableAmount: taxable,
    cgst: interState ? 0 : gstAmt / 2, sgst: interState ? 0 : gstAmt / 2,
    igst: interState ? gstAmt : 0, total: taxable + gstAmt,
  };
}

import { INDIAN_STATES as INDIAN_STATES_MODAL } from '@/lib/constants';

function AndroidLogoIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M7.05 8.15h9.9c-.44-1.2-1.25-2.2-2.3-2.89l1.07-1.57a.75.75 0 0 0-1.24-.84l-1.13 1.66A7.2 7.2 0 0 0 12 4.12c-.48 0-.95.05-1.4.15L9.47 2.6a.75.75 0 0 0-1.24.84L9.3 5.01c-1.05.69-1.86 1.69-2.25 2.89Zm-.68 1.5h-.62a1.75 1.75 0 0 0 0 3.5h.62v4.1c0 1.04.84 1.88 1.88 1.88h.9v2.12a1.25 1.25 0 0 0 2.5 0v-2.12h.7v2.12a1.25 1.25 0 0 0 2.5 0v-2.12h.9c1.04 0 1.88-.84 1.88-1.88v-4.1h.62a1.75 1.75 0 0 0 0-3.5h-.62v5.37a.37.37 0 0 1-.38.38H8.75a.37.37 0 0 1-.38-.38V9.65Zm3.05-1.13a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7Zm5.16 0a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7Z" />
    </svg>
  );
}

function AddCustomerModal({ onClose, onCreated, customerLimitReached }: { onClose: () => void; onCreated: (c: Customer) => void; customerLimitReached?: boolean }) {
  const { success, error: toastError } = useToast();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', gstin: '',
    billingAddress: '', billingCity: '', billingState: '', billingPincode: '',
    shippingAddress: '', shippingCity: '', shippingState: '', shippingPincode: '',
  });
  const [sameAsB, setSameAsB] = useState(true);
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));
  const handleCreate = async () => {
    if (customerLimitReached) { toastError('Customer limit reached', 'Please upgrade your plan to add more customers.'); return; }
    if (!form.name.trim()) { toastError('Name required'); return; }
    setLoading(true);
    try {
      const payload: Record<string, any> = {
        name: form.name,
        ...(form.email && { email: form.email }),
        ...(form.phone && { phone: form.phone }),
        ...(form.gstin && { gstin: form.gstin }),
        ...(form.billingAddress && { billingAddress: form.billingAddress }),
        ...(form.billingCity && { billingCity: form.billingCity }),
        ...(form.billingState && { billingState: form.billingState }),
        ...(form.billingPincode && { billingPincode: form.billingPincode }),
      };
      if (sameAsB) {
        if (form.billingAddress) payload.shippingAddress = form.billingAddress;
        if (form.billingCity) payload.shippingCity = form.billingCity;
        if (form.billingState) payload.shippingState = form.billingState;
        if (form.billingPincode) payload.shippingPincode = form.billingPincode;
      } else {
        if (form.shippingAddress) payload.shippingAddress = form.shippingAddress;
        if (form.shippingCity) payload.shippingCity = form.shippingCity;
        if (form.shippingState) payload.shippingState = form.shippingState;
        if (form.shippingPincode) payload.shippingPincode = form.shippingPincode;
      }
      const res = await apiFetch<{ data: Customer }>('/customers', { method: 'POST', body: JSON.stringify(payload) });
      success('Customer created', form.name);
      onCreated(res.data);
    } catch (err: any) { toastError('Failed', err.message); }
    finally { setLoading(false); }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Add New Customer</h3>
          <button onClick={onClose}><X className="h-4 w-4 text-gray-400" /></button>
        </div>
        {customerLimitReached && (
          <div className="mb-3 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700">
            <strong>Customer limit reached.</strong> Please upgrade your plan to add more customers.
          </div>
        )}
        <div className="space-y-3">
          {([
            { label: 'Name *', key: 'name', placeholder: 'Customer name' },
            { label: 'Email', key: 'email', placeholder: 'email@example.com' },
            { label: 'Phone', key: 'phone', placeholder: '+91 98765 43210' },
            { label: 'GSTIN', key: 'gstin', placeholder: '22AAAAA0000A1Z5' },
          ] as const).map(f => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{f.label}</label>
              <input value={(form as any)[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
            </div>
          ))}

          {/* Billing Address */}
          <div className="pt-1">
            <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Billing Address</p>
            <div className="space-y-2">
              <input value={form.billingAddress} onChange={e => set('billingAddress', e.target.value)} placeholder="Street address"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
              <div className="grid grid-cols-3 gap-2">
                <input value={form.billingCity} onChange={e => set('billingCity', e.target.value)} placeholder="City"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
                <select value={form.billingState} onChange={e => set('billingState', e.target.value)}
                  className="rounded-lg border border-gray-300 px-2 py-2 text-sm focus:border-indigo-500 focus:outline-none">
                  <option value="">State</option>
                  {INDIAN_STATES_MODAL.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <input value={form.billingPincode} onChange={e => set('billingPincode', e.target.value)} placeholder="Pincode"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Shipping Address</p>
              <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                <input type="checkbox" checked={sameAsB} onChange={e => setSameAsB(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600" />
                Same as billing
              </label>
            </div>
            {sameAsB ? (
              <p className="text-xs text-gray-400 italic">Shipping address will be same as billing address.</p>
            ) : (
              <div className="space-y-2">
                <input value={form.shippingAddress} onChange={e => set('shippingAddress', e.target.value)} placeholder="Street address"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
                <div className="grid grid-cols-3 gap-2">
                  <input value={form.shippingCity} onChange={e => set('shippingCity', e.target.value)} placeholder="City"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
                  <select value={form.shippingState} onChange={e => set('shippingState', e.target.value)}
                    className="rounded-lg border border-gray-300 px-2 py-2 text-sm focus:border-indigo-500 focus:outline-none">
                    <option value="">State</option>
                    {INDIAN_STATES_MODAL.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input value={form.shippingPincode} onChange={e => set('shippingPincode', e.target.value)} placeholder="Pincode"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={handleCreate} disabled={loading || customerLimitReached}
            className="flex-1 rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : <Check className="h-4 w-4" />}
            Add Customer
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function InvoiceQuickSettingsModal({
  open,
  onClose,
  activeTab,
  setActiveTab,
  settings,
  setSettings,
  templates,
  loading,
  saving,
  logoUploading,
  onLogoUpload,
  onRemoveLogo,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  activeTab: 'business' | 'invoice';
  setActiveTab: (tab: 'business' | 'invoice') => void;
  settings: BusinessSettings | null;
  setSettings: (updater: any) => void;
  templates: InvoiceTemplate[];
  loading: boolean;
  saving: boolean;
  logoUploading: boolean;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveLogo: () => void;
  onSave: () => void;
}) {
  if (!open) return null;
  const update = (key: keyof BusinessSettings, value: any) => {
    setSettings(prev => (prev ? { ...prev, [key]: value } : prev));
  };
  const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none";
  const label = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="fixed inset-0 z-[10040] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Invoice Quick Settings</h3>
            <p className="text-xs text-gray-500 mt-1">Update business profile and invoice preferences without leaving this page.</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5">
          <div className="mb-4 flex gap-2 rounded-xl bg-gray-100 p-1 w-fit">
            <button onClick={() => setActiveTab('business')} className={`rounded-lg px-4 py-1.5 text-sm font-medium ${activeTab === 'business' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>Business Info</button>
            <button onClick={() => setActiveTab('invoice')} className={`rounded-lg px-4 py-1.5 text-sm font-medium ${activeTab === 'invoice' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>Invoice Settings</button>
          </div>
          {loading || !settings ? (
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-sm text-gray-500">Loading settings…</div>
          ) : activeTab === 'business' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-3">
                <div className="h-14 w-14 rounded-xl overflow-hidden bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                  {settings.logo ? <img src={settings.logo} alt="Business logo" className="h-full w-full object-contain" /> : settings.name?.charAt(0)?.toUpperCase() || 'B'}
                </div>
                <div className="flex items-center gap-2">
                  <label className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                    {logoUploading ? 'Uploading...' : settings.logo ? 'Change Logo' : 'Upload Logo'}
                    <input type="file" accept="image/*" className="hidden" onChange={onLogoUpload} disabled={logoUploading} />
                  </label>
                  {settings.logo && !logoUploading && (
                    <button onClick={onRemoveLogo} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100">Remove</button>
                  )}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><label className={label}>Business Name</label><input className={input} value={settings.name || ''} onChange={e => update('name', e.target.value)} /></div>
                <div><label className={label}>Legal Name</label><input className={input} value={settings.legalName || ''} onChange={e => update('legalName', e.target.value)} /></div>
                <div><label className={label}>GSTIN</label><input className={input} value={settings.gstin || ''} onChange={e => update('gstin', e.target.value)} /></div>
                <div><label className={label}>PAN</label><input className={input} value={settings.pan || ''} onChange={e => update('pan', e.target.value)} /></div>
                <div><label className={label}>Email</label><input className={input} value={settings.email || ''} onChange={e => update('email', e.target.value)} /></div>
                <div><label className={label}>Phone</label><input className={input} value={settings.phone || ''} onChange={e => update('phone', e.target.value)} /></div>
                <div className="sm:col-span-2"><label className={label}>Website</label><input className={input} value={settings.website || ''} onChange={e => update('website', e.target.value)} /></div>
                <div className="sm:col-span-2"><label className={label}>Address</label><input className={input} value={settings.address || ''} onChange={e => update('address', e.target.value)} /></div>
                <div><label className={label}>City</label><input className={input} value={settings.city || ''} onChange={e => update('city', e.target.value)} /></div>
                <div><label className={label}>State</label><input className={input} value={settings.state || ''} onChange={e => update('state', e.target.value)} /></div>
                <div><label className={label}>Pincode</label><input className={input} value={settings.pincode || ''} onChange={e => update('pincode', e.target.value)} /></div>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              <div><label className={label}>Invoice Prefix</label><input className={input} value={settings.invoicePrefix || ''} onChange={e => update('invoicePrefix', e.target.value)} /></div>
              <div>
                <label className={label}>Default Template</label>
                <select className={input} value={settings.defaultTemplateId || ''} onChange={e => update('defaultTemplateId', e.target.value || null)}>
                  <option value="">Select template</option>
                  {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Terms & Conditions</label>
                <textarea className={`${input} min-h-24 resize-y`} value={settings.termsAndConditions || ''} onChange={e => update('termsAndConditions', e.target.value)} />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-5 py-4">
          <button onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Close</button>
          <button onClick={onSave} disabled={saving || loading || !settings} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">{saving ? 'Saving...' : 'Save Settings'}</button>
        </div>
      </div>
    </div>
  );
}

export default function NewInvoicePage() {
  const router = useRouter();
  const { success, error: toastError, warning } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isInterState, setIsInterState] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerResults, setCustomerResults] = useState<Customer[]>([]);
  const [showCustomerDrop, setShowCustomerDrop] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [invoiceLimitReached, setInvoiceLimitReached] = useState(false);
  const [customerLimitReached, setCustomerLimitReached] = useState(false);
  const [invoicesLeft, setInvoicesLeft] = useState<number | null>(null);
  const [subscriptionEnforced, setSubscriptionEnforced] = useState(true);
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [bulkProducts, setBulkProducts] = useState<Product[]>([]);
  const [bulkSearch, setBulkSearch] = useState('');
  const [bulkSelected, setBulkSelected] = useState<Record<string, boolean>>({});
  const [scanInput, setScanInput] = useState('');
  const [scanLoading, setScanLoading] = useState(false);
  const scanInputRef = useRef<HTMLInputElement>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'listening' | 'found' | 'not_found' | 'no_input'>('idle');
  const scanIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scannerConnectionState, setScannerConnectionState] = useState<'disconnected' | 'qr_ready' | 'connected' | 'receiving' | 'offline'>('disconnected');
  const [scanSession, setScanSession] = useState<ScanSessionData | null>(null);
  const [pairingQrUrl, setPairingQrUrl] = useState<string>('');
  const [lastScanLogAt, setLastScanLogAt] = useState<string | null>(null);
  const [showCreateFromScanModal, setShowCreateFromScanModal] = useState(false);
  const [pendingScannedCode, setPendingScannedCode] = useState('');
  const [showQuickSettingsModal, setShowQuickSettingsModal] = useState(false);
  const [showInvoiceInfoPopover, setShowInvoiceInfoPopover] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<'business' | 'invoice'>('business');
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings | null>(null);
  const [invoiceTemplates, setInvoiceTemplates] = useState<InvoiceTemplate[]>([]);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);

  const scannerStateUi: Record<
    'disconnected' | 'qr_ready' | 'connected' | 'receiving' | 'offline',
    { label: string; hint: string; dot: string; pulse: string; ring: string; badge: string; text: string }
  > = {
    disconnected: {
      label: 'Disconnected',
      hint: 'Generate a QR and pair scanner app to begin.',
      dot: 'bg-slate-500',
      pulse: 'bg-slate-400/35',
      ring: 'ring-slate-300',
      badge: 'bg-slate-100 border-slate-300',
      text: 'text-slate-700',
    },
    qr_ready: {
      label: 'QR Ready',
      hint: 'Waiting for scanner app to scan and pair.',
      dot: 'bg-indigo-500',
      pulse: 'bg-indigo-400/35',
      ring: 'ring-indigo-300',
      badge: 'bg-indigo-50 border-indigo-200',
      text: 'text-indigo-700',
    },
    connected: {
      label: 'Connected',
      hint: 'Scanner paired and ready to receive product scans.',
      dot: 'bg-emerald-500',
      pulse: 'bg-emerald-400/35',
      ring: 'ring-emerald-300',
      badge: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-700',
    },
    receiving: {
      label: 'Receiving',
      hint: 'Live scans are being processed in this invoice session.',
      dot: 'bg-cyan-500',
      pulse: 'bg-cyan-400/35',
      ring: 'ring-cyan-300',
      badge: 'bg-cyan-50 border-cyan-200',
      text: 'text-cyan-700',
    },
    offline: {
      label: 'Offline',
      hint: 'Realtime stream interrupted. Polling fallback is active.',
      dot: 'bg-amber-500',
      pulse: 'bg-amber-400/35',
      ring: 'ring-amber-300',
      badge: 'bg-amber-50 border-amber-200',
      text: 'text-amber-700',
    },
  };
  const scannerUi = scannerStateUi[scannerConnectionState];

  const [items, setItems] = useState<InvoiceItem[]>([
    calcItem({ id: generateId(), description: '', quantity: 1, price: 0, gstRate: 18, unit: 'PCS' }, false),
  ]);
  const [formData, setFormData] = useState({
    type: 'INVOICE', issueDate: new Date().toISOString().split('T')[0],
    dueDate: '', notes: '', terms: '', placeOfSupply: '',
  });

  const getNotesStorageKey = () => {
    const bid = getUserData()?.businessId || 'default';
    return `gst_invoice_last_note_${bid}`;
  };

  // Product suggestion state
  const [productSuggestions, setProductSuggestions] = useState<Record<string, Product[]>>({});
  const [activeSuggestionItem, setActiveSuggestionItem] = useState<string | null>(null);
  const descSearchTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const descInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    const tokenData = getUserData();
    const businessId = tokenData?.businessId;
    if (businessId) {
      setSettingsLoading(true);
      Promise.all([
        apiFetch<{ data: BusinessSettings }>(`/business/${businessId}`),
        apiFetch<{ data: InvoiceTemplate[] }>('/invoices/templates').catch(() => ({ data: [] as InvoiceTemplate[] })),
      ])
        .then(([bizRes, tplRes]) => {
          if (bizRes.data) {
            setBusinessSettings(bizRes.data);
            if (bizRes.data.termsAndConditions) {
              setFormData(prev => ({ ...prev, terms: bizRes.data.termsAndConditions! }));
            }
          }
          setInvoiceTemplates(tplRes.data || []);
        })
        .catch(() => {})
        .finally(() => setSettingsLoading(false));
    }

    Promise.all([
      apiFetch('/settings/subscription-control'),
      apiFetch('/subscriptions'),
      apiFetch('/business/stats'),
    ]).then(([controlRes, subRes, statsRes]: [any, any, any]) => {
      const enforced = controlRes?.data?.isSubscriptionEnforced !== false;
      setSubscriptionEnforced(enforced);
      if (!enforced) {
        setInvoiceLimitReached(false);
        setCustomerLimitReached(false);
        setInvoicesLeft(null);
        return;
      }
      const subs: any[] = subRes.data || [];
      const sub = subs.find((s: any) => s.status === 'ACTIVE' || s.status === 'TRIAL') || null;
      if (!sub) return;
      const invoiceLimit: number = sub.plan?.invoiceLimit || 0;
      const customerLimit: number = sub.plan?.customerLimit || 0;
      const invoicesUsed: number = statsRes.data?.invoicesThisMonth ?? 0;
      const customersUsed: number = statsRes.data?.activeCustomers ?? 0;
      // Block invoice creation if plan is expired
      if (sub.status === 'EXPIRED') {
        setInvoiceLimitReached(true);
        setInvoicesLeft(0);
      } else if (invoiceLimit > 0) {
        setInvoiceLimitReached(invoicesUsed >= invoiceLimit);
        setInvoicesLeft(Math.max(0, invoiceLimit - invoicesUsed));
      }
      if (customerLimit > 0) {
        setCustomerLimitReached(customersUsed >= customerLimit);
      }
    }).catch(() => {});
  }, []);

  const handleSettingsSave = async () => {
    if (!businessSettings?.id) return;
    setSettingsSaving(true);
    try {
      await apiFetch(`/business/${businessSettings.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: businessSettings.name,
          legalName: businessSettings.legalName,
          gstin: businessSettings.gstin,
          pan: businessSettings.pan,
          email: businessSettings.email,
          phone: businessSettings.phone,
          website: businessSettings.website,
          address: businessSettings.address,
          city: businessSettings.city,
          state: businessSettings.state,
          pincode: businessSettings.pincode,
          logo: businessSettings.logo,
          invoicePrefix: businessSettings.invoicePrefix,
          termsAndConditions: businessSettings.termsAndConditions,
          defaultTemplateId: businessSettings.defaultTemplateId,
        }),
      });
      if (businessSettings.termsAndConditions) {
        setFormData(prev => ({ ...prev, terms: businessSettings.termsAndConditions || prev.terms }));
      }
      success('Settings updated');
      setShowQuickSettingsModal(false);
    } catch (err: any) {
      toastError('Failed to save settings', err?.message || 'Please try again');
    } finally {
      setSettingsSaving(false);
    }
  };

  const handleSettingsLogoUpload = async (e: any) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !businessSettings) return;
    if (!file.type.startsWith('image/')) {
      warning('Invalid file', 'Please select an image file');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      warning('Image too large', 'Logo must be under 2MB');
      return;
    }
    setLogoUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result || '');
        setBusinessSettings(prev => (prev ? { ...prev, logo: dataUrl } : prev));
        setLogoUploading(false);
      };
      reader.onerror = () => {
        setLogoUploading(false);
        toastError('Logo upload failed', 'Could not read selected file');
      };
      reader.readAsDataURL(file);
    } catch {
      setLogoUploading(false);
      toastError('Logo upload failed', 'Could not read selected file');
    }
  };

  const setupChecklist: SetupChecklistItem[] = [
    { key: 'logo', label: 'Business logo uploaded', isComplete: !!businessSettings?.logo, hint: 'Improve professional look', tabTarget: 'business' },
    { key: 'name', label: 'Business name present', isComplete: !!businessSettings?.name?.trim(), hint: 'Show clear brand identity', tabTarget: 'business' },
    { key: 'gstin', label: 'GSTIN configured', isComplete: !!businessSettings?.gstin?.trim(), hint: 'Improve compliance clarity', tabTarget: 'business' },
    { key: 'addr', label: 'Address + state configured', isComplete: !!businessSettings?.address?.trim() && !!businessSettings?.state?.trim(), hint: 'Improve compliance clarity', tabTarget: 'business' },
    { key: 'prefix', label: 'Invoice prefix configured', isComplete: !!businessSettings?.invoicePrefix?.trim(), hint: 'Keep numbering consistent', tabTarget: 'invoice' },
    { key: 'terms', label: 'Terms & conditions configured', isComplete: !!businessSettings?.termsAndConditions?.trim(), hint: 'Avoid payment disputes', tabTarget: 'invoice' },
    { key: 'template', label: 'Default template selected', isComplete: !!businessSettings?.defaultTemplateId, hint: 'Keep invoice style consistent', tabTarget: 'invoice' },
  ];
  const checklistCompleteCount = setupChecklist.filter(i => i.isComplete).length;

  useEffect(() => {
    if (showQuickSettingsModal && !invoiceTemplates.length) {
      apiFetch<{ data: InvoiceTemplate[] }>('/invoices/templates')
        .then(res => setInvoiceTemplates(res.data || []))
        .catch(() => {});
    }
  }, [showQuickSettingsModal, invoiceTemplates.length]);

  useEffect(() => {
    const cid = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('customerId')
      : null;
    if (cid) {
      apiFetch<{ data: Customer }>(`/customers/${cid}`).then(r => {
        setSelectedCustomer(r.data); setCustomerSearch(r.data.name);
      }).catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedNote = localStorage.getItem(getNotesStorageKey());
      if (savedNote && savedNote.trim()) {
        setFormData(prev => (prev.notes && prev.notes.trim() ? prev : { ...prev, notes: savedNote }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!customerSearch || selectedCustomer) return;
    const t = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await apiFetch<{ data: Customer[] }>(`/customers?search=${encodeURIComponent(customerSearch)}&limit=8`);
        setCustomerResults(res.data); setShowCustomerDrop(true);
      } catch {} finally { setSearchLoading(false); }
    }, 250);
    return () => clearTimeout(t);
  }, [customerSearch, selectedCustomer]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowCustomerDrop(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const addItem = () => setItems(prev => [...prev, calcItem({ id: generateId(), quantity: 1, price: 0, gstRate: 18, unit: 'PCS' }, isInterState)]);
  const removeItem = (id: string) => { if (items.length > 1) setItems(prev => prev.filter(i => i.id !== id)); };
  const updateItem = useCallback((id: string, field: keyof InvoiceItem, value: number | string) => {
    setItems(prev => prev.map(item => item.id === id ? calcItem({ ...item, [field]: value }, isInterState) : item));
  }, [isInterState]);
  const updateItemAmount = useCallback((id: string, enteredTotal: number) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id !== id) return item;
        const qty = item.quantity > 0 ? item.quantity : 1;
        const discountFactor = 1 - (item.discount || 0) / 100;
        const safeDiscountFactor = discountFactor > 0 ? discountFactor : 1;
        const gstRate = item.gstRate || 0;
        const taxable = enteredTotal / (1 + gstRate / 100);
        const unitPrice = taxable / (qty * safeDiscountFactor);
        return calcItem({ ...item, price: Number.isFinite(unitPrice) ? Math.max(0, unitPrice) : 0 }, isInterState);
      }),
    );
  }, [isInterState]);
  useEffect(() => { setItems(prev => prev.map(i => calcItem(i, isInterState))); }, [isInterState]);

  const handleDescriptionChange = useCallback((id: string, value: string) => {
    updateItem(id, 'description', value);
    // Clear previous timer for this item
    if (descSearchTimers.current[id]) {
      clearTimeout(descSearchTimers.current[id]);
      delete descSearchTimers.current[id];
    }
    if (!value.trim()) {
      setProductSuggestions(prev => { const next = { ...prev }; delete next[id]; return next; });
      setActiveSuggestionItem(null);
      return;
    }
    descSearchTimers.current[id] = setTimeout(async () => {
      delete descSearchTimers.current[id];
      try {
        const res = await apiFetch<{ data: Product[] }>(`/products?search=${encodeURIComponent(value.trim())}&limit=8`);
        if (res.data && res.data.length > 0) {
          setProductSuggestions(prev => ({ ...prev, [id]: res.data }));
          setActiveSuggestionItem(id);
        } else {
          setProductSuggestions(prev => { const next = { ...prev }; delete next[id]; return next; });
          setActiveSuggestionItem(null);
        }
      } catch {}
    }, 250);
  }, [updateItem]);

  const applyProductSuggestion = useCallback((itemId: string, product: Product) => {
    setItems(prev => prev.map(item =>
      item.id === itemId
        ? calcItem({ ...item, description: product.name, productId: product.id, hsnSac: product.hsnSac || '', price: product.price, gstRate: product.gstRate, unit: product.unit }, isInterState)
        : item
    ));
    setProductSuggestions(prev => { const next = { ...prev }; delete next[itemId]; return next; });
    setActiveSuggestionItem(null);
  }, [isInterState]);

  const openBulkAdd = async () => {
    setShowBulkAdd(true);
    try {
      const res = await apiFetch<{ data: Product[] }>(`/products?limit=100`);
      setBulkProducts(res.data || []);
    } catch {
      setBulkProducts([]);
    }
  };

  const toggleBulkProduct = (id: string) => {
    setBulkSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addBulkSelectedProducts = () => {
    const selected = bulkProducts.filter(p => bulkSelected[p.id]);
    if (selected.length === 0) return;
    setItems(prev => {
      const next = [...prev];
      for (const p of selected) {
        const existingIdx = next.findIndex(i => i.productId === p.id);
        if (existingIdx !== -1) {
          const existing = next[existingIdx];
          next[existingIdx] = calcItem(
            {
              ...existing,
              quantity: (existing.quantity || 0) + 1,
            },
            isInterState,
          );
        } else {
          next.push(
            calcItem(
              {
                id: generateId(),
                description: p.name,
                productId: p.id,
                hsnSac: p.hsnSac || '',
                quantity: 1,
                unit: p.unit || 'PCS',
                price: p.price || 0,
                gstRate: p.gstRate || 0,
                discount: 0,
              },
              isInterState,
            ),
          );
        }
      }
      return next;
    });
    setShowBulkAdd(false);
    setBulkSearch('');
    setBulkSelected({});
  };

  const addOrIncrementProduct = (p: Product) => {
    setItems(prev => {
      const next = [...prev];
      const existingIdx = next.findIndex(i => i.productId === p.id);
      if (existingIdx !== -1) {
        const existing = next[existingIdx];
        next[existingIdx] = calcItem(
          {
            ...existing,
            quantity: (existing.quantity || 0) + 1,
          },
          isInterState,
        );
      } else {
        next.push(
          calcItem(
            {
              id: generateId(),
              description: p.name,
              productId: p.id,
              hsnSac: p.hsnSac || '',
              quantity: 1,
              unit: p.unit || 'PCS',
              price: p.price || 0,
              gstRate: p.gstRate || 0,
              discount: 0,
            },
            isInterState,
          ),
        );
      }
      return next;
    });
  };

  const connectScanner = async () => {
    try {
      const invoiceSessionId = crypto.randomUUID();
      const res = await apiFetch<{ data: ScanSessionData }>('/scan/sessions', {
        method: 'POST',
        body: JSON.stringify({ invoiceSessionId }),
      });
      setScanSession(res.data);
      setScannerConnectionState('qr_ready');
      const encoded = encodeURIComponent(res.data.pairingPayloadText);
      setPairingQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encoded}`);
      success('Scanner session ready', 'Open scanner app and scan this QR.');
    } catch (err: any) {
      toastError('Scanner connect failed', err?.message || 'Could not create scanner session');
    }
  };

  const handleScanSubmit = async () => {
    const code = scanInput.trim();
    if (!code || scanLoading) return;
    setScanLoading(true);
    setScanStatus('listening');
    try {
      const res = await apiFetch<{ data: Product[] }>(`/products?search=${encodeURIComponent(code)}&limit=20`);
      const products = res.data || [];
      const exact = products.find(
        p =>
          p.barcode?.toLowerCase() === code.toLowerCase() ||
          p.sku?.toLowerCase() === code.toLowerCase() ||
          p.name.toLowerCase() === code.toLowerCase(),
      ) || products[0];
      if (exact) {
        addOrIncrementProduct(exact);
        success('Item scanned', exact.name);
        setScanStatus('found');
      } else {
        warning('Item not found', `No product matched "${code}"`);
        setScanStatus('not_found');
        setPendingScannedCode(code);
        setShowCreateFromScanModal(true);
      }
    } catch {
      warning('Scan failed', 'Could not fetch products for scanned code.');
      setScanStatus('not_found');
    } finally {
      setScanLoading(false);
      setScanInput('');
      setTimeout(() => scanInputRef.current?.focus(), 0);
    }
  };

  const activateScanMode = () => {
    if (scanIdleTimerRef.current) clearTimeout(scanIdleTimerRef.current);
    setScanStatus('listening');
    scanInputRef.current?.focus();
    success('Scanner ready', 'USB scanners usually type like a keyboard. Scan into the scanner field.');
    scanIdleTimerRef.current = setTimeout(() => {
      setScanStatus('no_input');
    }, 8000);
  };

  useEffect(() => {
    scanInputRef.current?.focus();
    return () => {
      if (scanIdleTimerRef.current) clearTimeout(scanIdleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!scanSession?.sessionId) return;
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) return;
    const es = new EventSource(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:4000/api/v1'}/scan/sessions/${scanSession.sessionId}/events?accessToken=${encodeURIComponent(token)}`);
    es.addEventListener('scan.status', (evt: MessageEvent) => {
      try {
        const payload = JSON.parse(evt.data);
        if (payload?.state === 'paired' || payload?.state === 'connected') setScannerConnectionState('connected');
      } catch {}
    });
    es.addEventListener('scan.item', (evt: MessageEvent) => {
      try {
        const payload = JSON.parse(evt.data);
        setScannerConnectionState('receiving');
        if (payload?.found && payload.product) {
          addOrIncrementProduct(payload.product as Product);
          setScanStatus('found');
          success('Scanned item added', payload.product.name);
        } else {
          setScanStatus('not_found');
          warning('Item not found', payload?.message || 'No matching product found');
        }
      } catch {}
    });
    es.onerror = () => {
      setScannerConnectionState('offline');
    };
    return () => es.close();
  }, [scanSession?.sessionId]);

  useEffect(() => {
    if (!scanSession?.sessionId) return;
    let cancelled = false;
    const tick = async () => {
      try {
        const [sessionRes, logsRes] = await Promise.all([
          apiFetch<{ data: { connectedDeviceId?: string | null; status?: string } }>(`/scan/sessions/${scanSession.sessionId}`),
          apiFetch<{ data: ScanLogData[] }>(`/scan/sessions/${scanSession.sessionId}/logs${lastScanLogAt ? `?since=${encodeURIComponent(lastScanLogAt)}` : ''}`),
        ]);
        if (cancelled) return;

        if (sessionRes.data?.connectedDeviceId) {
          setScannerConnectionState((prev) => (prev === 'receiving' ? prev : 'connected'));
        }

        const logs = logsRes.data || [];
        if (logs.length > 0) {
          for (const log of logs) {
            if (log.product) {
              addOrIncrementProduct(log.product);
              setScanStatus('found');
              setScannerConnectionState('receiving');
              success('Scanned item added', log.product.name);
            } else {
              setScanStatus('not_found');
              warning('Item not found', log.message || `No matching product for ${log.rawCode}`);
              setPendingScannedCode(log.rawCode);
              setShowCreateFromScanModal(true);
            }
          }
          setLastScanLogAt(logs[logs.length - 1].createdAt);
        }
      } catch {
        // ignore polling failure; SSE may still be active
      }
    };

    tick();
    const interval = setInterval(tick, 2000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [scanSession?.sessionId, lastScanLogAt]);

  // Close product suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('[data-product-suggestions]')) {
        setActiveSuggestionItem(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  useEffect(() => {
    if (activeSuggestionItem && descInputRefs.current[activeSuggestionItem]) {
      const rect = descInputRefs.current[activeSuggestionItem]!.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 4, left: rect.left, width: Math.max(288, rect.width) });
    } else {
      setDropdownPos(null);
    }
  }, [activeSuggestionItem]);
  useEffect(() => {
    const update = () => {
      if (activeSuggestionItem && descInputRefs.current[activeSuggestionItem]) {
        const rect = descInputRefs.current[activeSuggestionItem]!.getBoundingClientRect();
        setDropdownPos({ top: rect.bottom + 4, left: rect.left, width: Math.max(288, rect.width) });
      }
    };
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [activeSuggestionItem]);

  const totals = items.reduce((acc, item) => ({
    subtotal: acc.subtotal + item.quantity * item.price,
    taxableAmount: acc.taxableAmount + item.taxableAmount,
    cgst: acc.cgst + item.cgst, sgst: acc.sgst + item.sgst, igst: acc.igst + item.igst,
    total: acc.total + item.total,
  }), { subtotal: 0, taxableAmount: 0, cgst: 0, sgst: 0, igst: 0, total: 0 });

  const handleSave = async (statusOverride?: string) => {
    if (subscriptionEnforced && invoiceLimitReached) {
      warning('Invoice limit reached', 'Please upgrade your plan to create more invoices.');
      return;
    }
    if (!selectedCustomer) { warning('Customer required', 'Please select or add a customer first.'); return; }
    const validItems = items.filter(i => i.description.trim());
    if (validItems.length === 0) { warning('Items required', 'Add at least one line item.'); return; }
    setIsLoading(true);
    try {
      const res = await apiFetch<{ data: { id: string } }>('/invoices', {
        method: 'POST',
        body: JSON.stringify({
          customerId: selectedCustomer.id, type: formData.type, issueDate: formData.issueDate,
          dueDate: formData.dueDate || undefined, isInterState,
          placeOfSupply: formData.placeOfSupply || selectedCustomer.billingState || undefined,
          notes: formData.notes || undefined, terms: formData.terms || undefined,
          items: validItems.map(item => ({
            productId: item.productId || undefined, description: item.description,
            hsnSac: item.hsnSac || undefined, quantity: item.quantity, unit: item.unit,
            price: item.price, discount: item.discount, gstRate: item.gstRate,
          })),
        }),
      });
      if (statusOverride === 'SENT') {
        try { await apiFetch(`/invoices/${res.data.id}/send`, { method: 'POST' }); } catch {}
        success('Invoice saved & sent');
      } else {
        success('Draft saved');
      }
      if (typeof window !== 'undefined') {
        const noteToSave = (formData.notes || '').trim();
        const key = getNotesStorageKey();
        if (noteToSave) localStorage.setItem(key, noteToSave);
        else localStorage.removeItem(key);
      }
      if (statusOverride === 'SENT') {
        router.push(`/invoices/${res.data.id}?reviewPrompt=1`);
      } else {
        router.push(`/invoices/${res.data.id}`);
      }
    } catch (err: any) {
      toastError('Failed to save invoice', err.message);
    } finally { setIsLoading(false); }
  };

  const inputCls = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all";
  const labelCls = "block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5";

  return (
    <>
      {showAddCustomer && (
        <AddCustomerModal onClose={() => setShowAddCustomer(false)}
          customerLimitReached={customerLimitReached}
          onCreated={(c) => { setSelectedCustomer(c); setCustomerSearch(c.name); setShowAddCustomer(false); }} />
      )}
      {showCreateFromScanModal && (
        <CreateProductFromScanModal
          scannedCode={pendingScannedCode}
          onClose={() => setShowCreateFromScanModal(false)}
          onCreated={(product) => {
            addOrIncrementProduct(product);
            setShowCreateFromScanModal(false);
            setPendingScannedCode('');
          }}
        />
      )}
      <InvoiceQuickSettingsModal
        open={showQuickSettingsModal}
        onClose={() => setShowQuickSettingsModal(false)}
        activeTab={activeSettingsTab}
        setActiveTab={setActiveSettingsTab}
        settings={businessSettings}
        setSettings={setBusinessSettings}
        templates={invoiceTemplates}
        loading={settingsLoading}
        saving={settingsSaving}
        logoUploading={logoUploading}
        onLogoUpload={handleSettingsLogoUpload}
        onRemoveLogo={() => setBusinessSettings(prev => (prev ? { ...prev, logo: null } : prev))}
        onSave={handleSettingsSave}
      />
      <div className={`${theme.pageShell} p-4 lg:p-6 xl:p-7 w-full max-w-full min-h-screen`}>

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-5">
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-700 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className={`${theme.pageTitle} text-2xl font-bold tracking-tight`}>New Invoice</h1>
            <p className={`${theme.pageSubTitle} text-sm mt-0.5`}>Create a GST-compliant invoice</p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-2">
            {invoiceLimitReached && (
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-red-600 ring-1 ring-red-200"
              >
                <Lock className="h-3.5 w-3.5" />
                <span className="text-xs font-semibold">Limit reached</span>
              </motion.div>
            )}
            <div className="relative flex items-center gap-2">
              <button
                onClick={() => { setActiveSettingsTab('business'); setShowQuickSettingsModal(true); }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50 hover:text-indigo-600 transition-all"
                title="Invoice quick settings"
              >
                <Settings className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowInvoiceInfoPopover(prev => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50 hover:text-indigo-600 transition-all"
                title="Invoice setup guidance"
              >
                <Info className="h-4 w-4" />
              </button>
              {showInvoiceInfoPopover && (
                <div className="absolute right-0 top-12 z-30 w-80 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">Invoice Setup Quality</p>
                    <span className="text-xs font-semibold text-indigo-700">{checklistCompleteCount}/7 complete</span>
                  </div>
                  <div className="space-y-2">
                    {setupChecklist.map((item) => (
                      <div key={item.key} className="flex items-start justify-between gap-2 rounded-lg border border-gray-100 px-2 py-2">
                        <div>
                          <p className={`text-xs font-medium flex items-center gap-1.5 ${item.isComplete ? 'text-green-700' : 'text-red-600'}`}>
                            {item.isComplete ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                            <span>{item.label}</span>
                          </p>
                          {!item.isComplete && <p className="text-[11px] text-gray-500 mt-0.5">{item.hint}</p>}
                        </div>
                        {!item.isComplete && (
                          <button
                            onClick={() => {
                              setActiveSettingsTab(item.tabTarget);
                              setShowQuickSettingsModal(true);
                              setShowInvoiceInfoPopover(false);
                            }}
                            className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-700 hover:bg-red-100"
                          >
                            Fix now
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alert Banners */}
        {invoiceLimitReached && (
          <div className="mb-5 rounded-2xl bg-red-50 border border-red-200 p-4 flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-red-100">
              <Lock className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">Invoice limit reached</p>
              <p className="text-xs text-red-500 mt-0.5">You have used all invoices for this month. Upgrade to create more.</p>
            </div>
            <a href="/settings/billing" className="flex-shrink-0 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition-colors">Upgrade Plan</a>
          </div>
        )}
        {invoicesLeft !== null && invoicesLeft <= INVOICE_WARNING_THRESHOLD && !invoiceLimitReached && (
          <div className="mb-5 rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-sm font-medium text-amber-800 flex-1">
              Only <strong>{invoicesLeft}</strong> invoice{invoicesLeft === 1 ? '' : 's'} left this month.{' '}
              <a href="/settings/billing" className="underline underline-offset-2 font-semibold">Upgrade your plan</a> to avoid interruption.
            </p>
          </div>
        )}

        <div className={`${theme.softPanel} mb-4 rounded-xl p-3.5`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ScanLine className="h-4 w-4 text-indigo-600" />
              <p className={`${theme.sectionTitle} text-sm font-semibold`}>Item Details</p>
            </div>
            <div className="flex items-center gap-2">
              <p className={`${theme.mutedText} text-xs`}>Scan barcode, SKU, serial no, or item code</p>
              <button
                type="button"
                onClick={connectScanner}
                className={`${theme.outlineBtn} rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-700`}
              >
                Connect Scanner
              </button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={connectScanner}
              className="scanner-connect-btn inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-sm transition-colors"
            >
              <ScanLine className="h-3.5 w-3.5" />
              <span>Connect Android Scanner</span>
            </button>
            <a
              href="/android_app_apk/product_scanner.apk"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm transition-all hover:bg-emerald-100"
            >
              <AndroidLogoIcon className="h-4 w-4" />
              <span>Download Product Scanner</span>
            </a>
            {!scanSession && (
              <p className="text-xs text-indigo-700">
                Click connect to generate pairing QR for scanner app.
              </p>
            )}
          </div>
          {scanSession && (
            <div className={`${theme.softPanel} mt-2 rounded-xl p-3`}>
              <div className="grid gap-3 md:grid-cols-[auto,1fr]">
                <div className="w-fit">
                  {pairingQrUrl && <img src={pairingQrUrl} alt="Scanner Pairing QR" className="h-24 w-24 rounded-lg border border-gray-200 shadow-sm" />}
                </div>
                <div className="min-w-0">
                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${scannerUi.badge}`}>
                    <div className="relative h-3 w-3">
                      <motion.span
                        className={`absolute inset-0 rounded-full ${scannerUi.dot}`}
                        animate={{ scale: [1, 0.92, 1], opacity: [1, 0.85, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.span
                        className={`absolute inset-0 rounded-full ${scannerUi.pulse}`}
                        animate={{ scale: [1, 2.2], opacity: [0.65, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.span
                        className={`absolute inset-[-4px] rounded-full ring-1 ${scannerUi.ring}`}
                        animate={{ scale: [0.9, 1.5], opacity: [0.35, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.25 }}
                      />
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-wide ${scannerUi.text}`}>
                      Scanner State: {scannerUi.label}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-600">{scannerUi.hint}</p>
                  <div className="mt-2 rounded-lg border border-gray-100 bg-gray-50/80 px-2.5 py-2">
                    <p className="text-[11px] text-gray-500 mb-1">Pairing Payload</p>
                    <p className="text-[11px] text-gray-700 break-all font-mono">{scanSession.pairingPayloadText}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-3 flex gap-2">
            <input
              ref={scanInputRef}
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleScanSubmit();
                }
              }}
              placeholder="Scan item by barcode, SKU, or name"
              className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleScanSubmit}
              disabled={scanLoading}
              className={`${theme.accentBtn} rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-60`}
            >
              {scanLoading ? 'Scanning...' : 'Scan'}
            </button>
          </div>
          <div className="mt-2 text-xs min-h-4">
            {scanStatus === 'listening' && <p className="text-indigo-600">Listening for scanner input...</p>}
            {scanStatus === 'found' && <p className="text-green-600">Scan received and item added.</p>}
            {scanStatus === 'not_found' && <p className="text-amber-600">Scan received, but product was not found.</p>}
            {scanStatus === 'no_input' && <p className="text-amber-600">No scan input detected. Ensure scanner is in keyboard (HID) mode.</p>}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">

            {/* Invoice Details */}
            <div className={`${theme.surfaceCard} rounded-xl overflow-hidden`}>
              <div className={`${theme.surfaceHeader} px-5 py-3.5 flex items-center gap-3`}>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50">
                  <FileText className="h-3.5 w-3.5 text-indigo-600" />
                </span>
                <h2 className={`${theme.sectionTitle} text-sm font-semibold`}>Invoice Details</h2>
              </div>
              <div className="p-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Invoice Type</label>
                    <select value={formData.type} onChange={e => setFormData(p => ({ ...p, type: e.target.value }))} className={inputCls}>
                      <option value="INVOICE">Tax Invoice</option>
                      <option value="PROFORMA">Proforma Invoice</option>
                      <option value="ESTIMATE">Estimate/Quote</option>
                      <option value="CREDIT_NOTE">Credit Note</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Place of Supply</label>
                    <input type="text" value={formData.placeOfSupply} onChange={e => setFormData(p => ({ ...p, placeOfSupply: e.target.value }))} placeholder="e.g. Karnataka" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Invoice Date</label>
                    <input type="date" value={formData.issueDate} onChange={e => setFormData(p => ({ ...p, issueDate: e.target.value }))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Due Date</label>
                    <input type="date" value={formData.dueDate} onChange={e => setFormData(p => ({ ...p, dueDate: e.target.value }))} className={inputCls} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" checked={isInterState} onChange={e => setIsInterState(e.target.checked)} className="sr-only peer" />
                    <div className="peer h-5 w-9 rounded-full bg-gray-300 transition-all after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-indigo-600 peer-checked:after:translate-x-full" />
                  </label>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Inter-State Supply</span>
                    <span className="ml-2 text-xs text-gray-400">(IGST applies)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div className={`${theme.surfaceCard} rounded-xl`}>
              <div className={`${theme.surfaceHeader} px-5 py-3.5 flex items-center gap-3`}>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50">
                  <UserPlus className="h-3.5 w-3.5 text-violet-600" />
                </span>
                <h2 className={`${theme.sectionTitle} text-sm font-semibold`}>Bill To</h2>
              </div>
              <div className="p-5">
                {selectedCustomer ? (
                  <div className="flex items-start justify-between rounded-xl bg-gray-50 border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm">
                        {selectedCustomer.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{selectedCustomer.name}</p>
                        {selectedCustomer.email && <p className="text-xs text-gray-600 mt-0.5">{selectedCustomer.email}</p>}
                        {selectedCustomer.gstin && <p className="text-xs font-mono text-gray-600 mt-1 bg-gray-100 px-2 py-0.5 rounded-md inline-block">{selectedCustomer.gstin}</p>}
                        {selectedCustomer.billingCity && (
                          <p className="text-xs text-gray-500 mt-1">{selectedCustomer.billingCity}, {selectedCustomer.billingState}</p>
                        )}
                      </div>
                    </div>
                    <button onClick={() => { setSelectedCustomer(null); setCustomerSearch(''); }} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div ref={searchRef} className="relative">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by name, email, or GSTIN…"
                          value={customerSearch}
                          onChange={e => { setCustomerSearch(e.target.value); setShowCustomerDrop(true); }}
                          onFocus={() => customerResults.length > 0 && setShowCustomerDrop(true)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm shadow-sm placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                        {searchLoading && (
                          <svg className="animate-spin absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                        )}
                      </div>
                      <button
                        onClick={() => setShowAddCustomer(true)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-100 whitespace-nowrap transition-all"
                      >
                        <UserPlus className="h-4 w-4" />
                        Add New
                      </button>
                    </div>
                    <AnimatePresence>
                      {showCustomerDrop && customerResults.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="absolute top-full left-0 right-0 mt-1.5 z-20 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden"
                        >
                          {customerResults.map(c => (
                            <button
                              key={c.id}
                              onClick={() => { setSelectedCustomer(c); setCustomerSearch(c.name); setShowCustomerDrop(false); }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50 border-b border-gray-50 last:border-0 transition-colors"
                            >
                              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-700 text-sm">
                                {c.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                                <p className="text-xs text-gray-400">{c.email || c.phone || c.gstin || ''}</p>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Items & Services */}
            <div className={`${theme.surfaceCard} rounded-xl overflow-hidden`}>
              <div className={`${theme.surfaceHeader} px-5 py-3 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                  <Calculator className="h-3.5 w-3.5 text-emerald-600" />
                </span>
                  <h2 className={`${theme.sectionTitle} text-sm font-semibold`}>Item Table</h2>
                </div>
                <button
                  type="button"
                  onClick={activateScanMode}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  <ScanLine className="h-4 w-4" />
                  Scan Item
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 min-w-[220px]">Item Details</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 w-24">HSN/SAC</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 w-20">Quantity</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 w-28">Rate</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 w-20">Disc%</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 w-20">GST%</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 w-28">Amount</th>
                      <th className="px-3 py-3 w-10" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {items.map((item, idx) => (
                      <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5" data-product-suggestions>
                          <input type="text" value={item.description}
                            ref={el => { descInputRefs.current[item.id] = el; }}
                            onChange={e => handleDescriptionChange(item.id, e.target.value)}
                            onFocus={() => { if (productSuggestions[item.id]?.length) setActiveSuggestionItem(item.id); }}
                            placeholder={idx === 0 ? "Type or click to select an item." : `Item ${idx + 1}`}
                            className="w-full border-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none" />
                        </td>
                        <td className="px-4 py-2.5">
                          <input type="text" value={item.hsnSac} onChange={e => updateItem(item.id, 'hsnSac', e.target.value)} placeholder="998314"
                            className="w-full border-0 bg-transparent text-sm text-gray-600 placeholder:text-gray-300 focus:outline-none" />
                        </td>
                        <td className="px-4 py-2.5">
                          <input type="number" min="0.01" step="0.01" value={item.quantity} onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                            className="w-full border-0 bg-transparent text-sm text-gray-700 focus:outline-none" />
                        </td>
                        <td className="px-4 py-2.5">
                          <input type="number" min="0" step="0.01" value={item.price} onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                            className="w-full border-0 bg-transparent text-sm text-gray-700 focus:outline-none" />
                        </td>
                        <td className="px-4 py-2.5">
                          <input type="number" min="0" max="100" step="0.5" value={item.discount} onChange={e => updateItem(item.id, 'discount', parseFloat(e.target.value) || 0)}
                            className="w-full border-0 bg-transparent text-sm text-gray-700 focus:outline-none" />
                        </td>
                        <td className="px-4 py-2.5">
                          <select value={item.gstRate} onChange={e => updateItem(item.id, 'gstRate', parseFloat(e.target.value))}
                            className="w-full border-0 bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer">
                            {GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={Number(item.total.toFixed(2))}
                            onChange={e => updateItemAmount(item.id, parseFloat(e.target.value) || 0)}
                            className="w-24 border-0 bg-transparent text-right text-sm font-semibold text-gray-900 focus:outline-none"
                          />
                        </td>
                        <td className="px-3 py-2.5">
                          <button onClick={() => removeItem(item.id)} disabled={items.length === 1}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-500 disabled:opacity-20 transition-all opacity-0 group-hover:opacity-100">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={`${theme.surfaceHeader} px-5 py-3 border-t flex flex-wrap items-center gap-2`}>
                <button onClick={addItem} className={`${theme.outlineBtn} inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold text-indigo-600 transition-all shadow-sm`}>
                  <Plus className="h-4 w-4" />
                  Add New Row
                </button>
                <button onClick={openBulkAdd} className={`${theme.outlineBtn} inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold text-indigo-600 transition-all shadow-sm`}>
                  <Layers className="h-4 w-4" />
                  Add Items in Bulk
                </button>
              </div>
            </div>

            {/* Notes & Terms */}
            <div className={`${theme.surfaceCard} rounded-xl overflow-hidden`}>
              <div className={`${theme.surfaceHeader} px-5 py-3.5 flex items-center gap-3`}>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50">
                  <FileText className="h-3.5 w-3.5 text-amber-600" />
                </span>
                <h2 className={`${theme.sectionTitle} text-sm font-semibold`}>Notes &amp; Terms</h2>
              </div>
              <div className="p-5 grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Notes</label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                    placeholder="Thank you for your business!"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
                  />
                </div>
                <div>
                  <label className={labelCls}>Terms &amp; Conditions</label>
                  <textarea
                    rows={4}
                    value={formData.terms}
                    onChange={e => setFormData(p => ({ ...p, terms: e.target.value }))}
                    placeholder="Payment due within 30 days…"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className={`${theme.summaryPanel} rounded-xl sticky top-6 overflow-hidden`}>

              {/* Header */}
              <div className="px-5 pt-5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100/80">
                    <Calculator className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-semibold text-gray-900 leading-tight">Tax Summary</h2>
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">Calculated automatically</p>
                  </div>
                </div>
              </div>

              {/* Line items */}
              <div className="px-5 pb-4 space-y-0.5">
                <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                  <span className="text-sm text-gray-500 font-medium">Subtotal</span>
                  <span className="text-sm font-semibold text-gray-800 tabular-nums">&#8377;{totals.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                  <span className="text-sm text-gray-500 font-medium">Taxable Amount</span>
                  <span className="text-sm font-semibold text-gray-800 tabular-nums">&#8377;{totals.taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-1 space-y-0.5">
                  {!isInterState ? (
                    <>
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[4px] text-[9px] font-bold bg-violet-50 text-violet-600 ring-1 ring-violet-100 leading-none">C</span>
                          <span className="text-sm text-gray-500 font-medium">CGST</span>
                        </div>
                        <span className="text-sm text-gray-700 tabular-nums font-medium">&#8377;{totals.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[4px] text-[9px] font-bold bg-violet-50 text-violet-600 ring-1 ring-violet-100 leading-none">S</span>
                          <span className="text-sm text-gray-500 font-medium">SGST</span>
                        </div>
                        <span className="text-sm text-gray-700 tabular-nums font-medium">&#8377;{totals.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[4px] text-[9px] font-bold bg-violet-50 text-violet-600 ring-1 ring-violet-100 leading-none">I</span>
                        <span className="text-sm text-gray-500 font-medium">IGST</span>
                      </div>
                      <span className="text-sm text-gray-700 tabular-nums font-medium">&#8377;{totals.igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total hero block */}
              <div className={`${theme.summaryTotal} mx-4 mb-4 rounded-xl px-5 py-4 text-white`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-200 mb-2">Invoice Total</p>
                <p className="text-[2.25rem] font-bold tracking-tight leading-none tabular-nums">&#8377;{totals.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                <p className="text-[11px] text-indigo-300/90 mt-2.5 font-medium">Includes all applicable taxes</p>
              </div>

              {/* CTA buttons */}
              <div className="px-4 pb-4 space-y-2.5">
                {invoiceLimitReached && (
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-red-50 py-2 text-red-600 ring-1 ring-red-200"
                  >
                    <Lock className="h-4 w-4" />
                    <span className="text-xs font-semibold">Invoice limit reached</span>
                  </motion.div>
                )}
                <button
                  onClick={() => handleSave()}
                  disabled={isLoading || invoiceLimitReached}
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 shadow-xs hover:border-gray-300 hover:bg-gray-50/80 hover:shadow-sm hover:-translate-y-px active:translate-y-0 active:shadow-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:ring-offset-1"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => handleSave('SENT')}
                  disabled={isLoading || invoiceLimitReached}
                  className={`${theme.accentBtn} group w-full rounded-xl py-3 text-sm font-semibold shadow-[0_4px_14px_0_rgba(91,75,255,0.35)] hover:shadow-[0_6px_20px_0_rgba(91,75,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:ring-offset-1`}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  ) : (
                    <Send className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                  )}
                  Save &amp; Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${theme.stickyActions} sticky bottom-0 z-30 px-4 py-3`}>
        <div className="mx-auto flex w-full max-w-[1600px] items-center gap-2">
          <button
            onClick={() => handleSave()}
            disabled={isLoading || (subscriptionEnforced && invoiceLimitReached)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSave('SENT')}
            disabled={isLoading || (subscriptionEnforced && invoiceLimitReached)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            Save and Send
          </button>
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
      {typeof window !== 'undefined' && activeSuggestionItem && productSuggestions[activeSuggestionItem]?.length > 0 && dropdownPos && createPortal(
        <AnimatePresence>
          <motion.div
            key={activeSuggestionItem}
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            style={{ top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width }}
            className="fixed z-[9999] rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden"
            data-product-suggestions
          >
            {productSuggestions[activeSuggestionItem].map(p => (
              <button key={p.id} type="button"
                onMouseDown={e => { e.preventDefault(); applyProductSuggestion(activeSuggestionItem, p); }}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-indigo-50 border-b border-gray-50 last:border-0 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">&#8377;{p.price} · GST {p.gstRate}%{p.hsnSac ? ` · ${p.hsnSac}` : ''}</p>
                </div>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
      <AnimatePresence>
        {showBulkAdd && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowBulkAdd(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="relative z-10 w-full max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <h3 className="text-base font-semibold text-gray-900">Add Items in Bulk</h3>
                <button onClick={() => setShowBulkAdd(false)} className="rounded-lg p-1 text-gray-500 hover:bg-gray-100">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-5">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    value={bulkSearch}
                    onChange={(e) => setBulkSearch(e.target.value)}
                    placeholder="Search product by name, barcode, or SKU"
                    className="w-full rounded-xl border border-gray-200 pl-9 pr-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"
                  />
                </div>
                <div className="max-h-80 overflow-y-auto rounded-xl border border-gray-200">
                  {bulkProducts
                    .filter(p => !bulkSearch.trim() || p.name.toLowerCase().includes(bulkSearch.toLowerCase()))
                    .map((p) => (
                      <label key={p.id} className="flex cursor-pointer items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 last:border-0 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={!!bulkSelected[p.id]}
                            onChange={() => toggleBulkProduct(p.id)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{p.name}</p>
                            <p className="text-xs text-gray-500">₹{p.price} · GST {p.gstRate}% {p.hsnSac ? `· HSN ${p.hsnSac}` : ''}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-5 py-4">
                <button onClick={() => setShowBulkAdd(false)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={addBulkSelectedProducts} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                  Add Selected Items
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
