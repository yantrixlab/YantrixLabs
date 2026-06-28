'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Calculator, Plus, Pencil, Trash2, GripVertical,
  AlertCircle, RefreshCw, X, Check, Eye, EyeOff, Smartphone, FolderTree,
} from 'lucide-react';
import { adminFetch, API_URL, getAdminToken } from '@/lib/api';

// ─── Shared types ─────────────────────────────────────────────────────────

interface Platform {
  id: string;
  name: string;
  slug: string;
  iconUrl: string | null;
  basePrice: number;
  multiplier: number;
  isActive: boolean;
  sortOrder: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  _count?: { features: number };
}

interface Feature {
  id: string;
  name: string;
  description: string | null;
  price: number;
  categoryId: string;
  isActive: boolean;
  sortOrder: number;
  category?: { id: string; name: string };
}

type Tab = 'platforms' | 'categories' | 'features';

const TABS: { id: Tab; label: string; icon: typeof Smartphone }[] = [
  { id: 'platforms', label: 'Platforms', icon: Smartphone },
  { id: 'categories', label: 'Categories', icon: FolderTree },
  { id: 'features', label: 'Features', icon: Calculator },
];

async function apiCall<T>(path: string, method: string, body?: unknown): Promise<T> {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || `HTTP ${res.status}`);
  return data.data;
}

export default function AdminCalculatorPage() {
  const [tab, setTab] = useState<Tab>('platforms');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Cost Calculator</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage platforms, feature categories, and feature pricing shown on the public estimator.</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mb-6 border-b border-gray-800">
        {TABS.map(t => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                active ? 'border-orange-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === 'platforms' && <PlatformsTab />}
      {tab === 'categories' && <CategoriesTab />}
      {tab === 'features' && <FeaturesTab />}
    </div>
  );
}

// ─── Platforms ────────────────────────────────────────────────────────────

const EMPTY_PLATFORM = { name: '', iconUrl: '', basePrice: 0, multiplier: 1, isActive: true };

function PlatformsTab() {
  const [items, setItems] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Platform | null>(null);
  const [form, setForm] = useState(EMPTY_PLATFORM);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const dragIndex = useRef<number | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await adminFetch<{ data: Platform[] }>('/calculator/platforms');
      setItems(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load platforms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY_PLATFORM); setShowForm(true); };
  const openEdit = (p: Platform) => {
    setEditing(p);
    setForm({ name: p.name, iconUrl: p.iconUrl || '', basePrice: p.basePrice, multiplier: p.multiplier, isActive: p.isActive });
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(EMPTY_PLATFORM); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        const updated = await apiCall<Platform>(`/calculator/platforms/${editing.id}`, 'PUT', form);
        setItems(prev => prev.map(p => p.id === editing.id ? updated : p));
      } else {
        const created = await apiCall<Platform>('/calculator/platforms', 'POST', form);
        setItems(prev => [...prev, created]);
      }
      closeForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this platform?')) return;
    setActionLoading(id);
    try {
      await apiCall(`/calculator/platforms/${id}`, 'DELETE');
      setItems(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setActionLoading(null);
    }
  };

  const toggleActive = async (p: Platform) => {
    setActionLoading(p.id);
    try {
      const updated = await apiCall<Platform>(`/calculator/platforms/${p.id}`, 'PUT', { isActive: !p.isActive });
      setItems(prev => prev.map(x => x.id === p.id ? updated : x));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDragStart = (index: number) => { dragIndex.current = index; };
  const handleDragEnter = (index: number) => {
    if (dragIndex.current === null || dragIndex.current === index) return;
    setItems(prev => {
      const updated = [...prev];
      const [dragged] = updated.splice(dragIndex.current!, 1);
      updated.splice(index, 0, dragged);
      dragIndex.current = index;
      return updated;
    });
  };
  const handleDragEnd = async () => {
    dragIndex.current = null;
    setReordering(true);
    try {
      await apiCall('/calculator/platforms/reorder', 'PUT', { ids: items.map(p => p.id) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reorder failed');
    } finally {
      setReordering(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm">
          {items.length} platform{items.length === 1 ? '' : 's'}
          {reordering && <span className="ml-2 text-orange-400">Saving order…</span>}
        </p>
        <div className="flex items-center gap-2">
          <button onClick={fetchItems} className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors">
            <Plus className="h-4 w-4" /> Add Platform
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-900/30 border border-red-800 px-4 py-3 text-sm text-red-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
          <button onClick={() => setError('')} className="ml-auto"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {showForm && (
        <div className="mb-6 rounded-2xl border border-gray-700 bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">{editing ? 'Edit Platform' : 'New Platform'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Name <span className="text-red-400">*</span></label>
              <input
                type="text" required value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Android, iOS, Web"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Icon URL</label>
              <div className="flex items-center gap-3">
                {form.iconUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.iconUrl} alt="" className="h-9 w-9 rounded-lg object-contain bg-gray-800 border border-gray-700 flex-shrink-0" onError={e => { e.currentTarget.style.display = 'none'; }} />
                )}
                <input
                  type="text" value={form.iconUrl}
                  onChange={e => setForm(p => ({ ...p, iconUrl: e.target.value }))}
                  placeholder="https://example.com/icons/android.svg"
                  className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:border-orange-500 focus:outline-none"
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">Shown on the public calculator's platform card. Leave blank to use a generic icon.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Base Price (₹)</label>
                <input
                  type="number" min={0} step="0.01" value={form.basePrice}
                  onChange={e => setForm(p => ({ ...p, basePrice: Number(e.target.value) }))}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-gray-200 focus:border-orange-500 focus:outline-none"
                />
                <p className="text-xs text-gray-600 mt-1">Added once if this platform is selected.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Feature Multiplier</label>
                <input
                  type="number" min={0} step="0.05" value={form.multiplier}
                  onChange={e => setForm(p => ({ ...p, multiplier: Number(e.target.value) }))}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-gray-200 focus:border-orange-500 focus:outline-none"
                />
                <p className="text-xs text-gray-600 mt-1">Applied to the sum of selected feature prices.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox" id="platformActive" checked={form.isActive}
                onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))}
                className="rounded border-gray-600 bg-gray-800 accent-orange-500"
              />
              <label htmlFor="platformActive" className="text-sm text-gray-300">Active (visible on the public calculator)</label>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-500 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50 transition-colors">
                <Check className="h-4 w-4" /> {saving ? 'Saving…' : editing ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={closeForm} className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-16 rounded-xl bg-gray-900 border border-gray-800 animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <Smartphone className="h-12 w-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No platforms yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((p, index) => (
            <div
              key={p.id} draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={e => e.preventDefault()}
              className="rounded-xl border border-gray-800 bg-gray-900 px-4 py-3.5 flex items-center gap-3 group cursor-grab active:cursor-grabbing hover:border-gray-700 transition-colors"
            >
              <GripVertical className="h-4 w-4 text-gray-700 group-hover:text-gray-500 transition-colors flex-shrink-0" />
              {p.iconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.iconUrl} alt="" className="h-8 w-8 rounded-lg object-contain bg-gray-800 border border-gray-700 flex-shrink-0" onError={e => { e.currentTarget.style.display = 'none'; }} />
              ) : (
                <div className="h-8 w-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-3.5 w-3.5 text-gray-600" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{p.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">Base ₹{p.basePrice.toLocaleString()} · {p.multiplier}x multiplier</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => toggleActive(p)} disabled={actionLoading === p.id}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
                    p.isActive ? 'bg-green-900/30 text-green-400 border border-green-800/40 hover:bg-green-900/50' : 'bg-gray-800 text-gray-500 border border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  {p.isActive ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />} {p.isActive ? 'Active' : 'Hidden'}
                </button>
                <button onClick={() => openEdit(p)} className="rounded-lg p-1.5 text-gray-500 hover:text-orange-400 hover:bg-gray-800 transition-colors" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(p.id)} disabled={actionLoading === p.id} className="rounded-lg p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 transition-colors disabled:opacity-50" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────

const EMPTY_CATEGORY = { name: '', isActive: true };

function CategoriesTab() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(EMPTY_CATEGORY);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const dragIndex = useRef<number | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await adminFetch<{ data: Category[] }>('/calculator/categories');
      setItems(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY_CATEGORY); setShowForm(true); };
  const openEdit = (c: Category) => { setEditing(c); setForm({ name: c.name, isActive: c.isActive }); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(EMPTY_CATEGORY); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editing) {
        const updated = await apiCall<Category>(`/calculator/categories/${editing.id}`, 'PUT', form);
        setItems(prev => prev.map(c => c.id === editing.id ? updated : c));
      } else {
        const created = await apiCall<Category>('/calculator/categories', 'POST', form);
        setItems(prev => [...prev, created]);
      }
      closeForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? Features inside it will also be deleted.')) return;
    setActionLoading(id);
    try {
      await apiCall(`/calculator/categories/${id}`, 'DELETE');
      setItems(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setActionLoading(null);
    }
  };

  const toggleActive = async (c: Category) => {
    setActionLoading(c.id);
    try {
      const updated = await apiCall<Category>(`/calculator/categories/${c.id}`, 'PUT', { isActive: !c.isActive });
      setItems(prev => prev.map(x => x.id === c.id ? updated : x));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDragStart = (index: number) => { dragIndex.current = index; };
  const handleDragEnter = (index: number) => {
    if (dragIndex.current === null || dragIndex.current === index) return;
    setItems(prev => {
      const updated = [...prev];
      const [dragged] = updated.splice(dragIndex.current!, 1);
      updated.splice(index, 0, dragged);
      dragIndex.current = index;
      return updated;
    });
  };
  const handleDragEnd = async () => {
    dragIndex.current = null;
    setReordering(true);
    try {
      await apiCall('/calculator/categories/reorder', 'PUT', { ids: items.map(c => c.id) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reorder failed');
    } finally {
      setReordering(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm">
          {items.length} categor{items.length === 1 ? 'y' : 'ies'}
          {reordering && <span className="ml-2 text-orange-400">Saving order…</span>}
        </p>
        <div className="flex items-center gap-2">
          <button onClick={fetchItems} className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors">
            <Plus className="h-4 w-4" /> Add Category
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-900/30 border border-red-800 px-4 py-3 text-sm text-red-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
          <button onClick={() => setError('')} className="ml-auto"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {showForm && (
        <div className="mb-6 rounded-2xl border border-gray-700 bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">{editing ? 'Edit Category' : 'New Category'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Name <span className="text-red-400">*</span></label>
              <input
                type="text" required value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Maps & Location, AI/ML, Payments"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox" id="categoryActive" checked={form.isActive}
                onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))}
                className="rounded border-gray-600 bg-gray-800 accent-orange-500"
              />
              <label htmlFor="categoryActive" className="text-sm text-gray-300">Active (visible on the public calculator)</label>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-500 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50 transition-colors">
                <Check className="h-4 w-4" /> {saving ? 'Saving…' : editing ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={closeForm} className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-16 rounded-xl bg-gray-900 border border-gray-800 animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <FolderTree className="h-12 w-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No categories yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((c, index) => (
            <div
              key={c.id} draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={e => e.preventDefault()}
              className="rounded-xl border border-gray-800 bg-gray-900 px-4 py-3.5 flex items-center gap-3 group cursor-grab active:cursor-grabbing hover:border-gray-700 transition-colors"
            >
              <GripVertical className="h-4 w-4 text-gray-700 group-hover:text-gray-500 transition-colors flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{c._count?.features ?? 0} feature{(c._count?.features ?? 0) === 1 ? '' : 's'}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => toggleActive(c)} disabled={actionLoading === c.id}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
                    c.isActive ? 'bg-green-900/30 text-green-400 border border-green-800/40 hover:bg-green-900/50' : 'bg-gray-800 text-gray-500 border border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  {c.isActive ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />} {c.isActive ? 'Active' : 'Hidden'}
                </button>
                <button onClick={() => openEdit(c)} className="rounded-lg p-1.5 text-gray-500 hover:text-orange-400 hover:bg-gray-800 transition-colors" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(c.id)} disabled={actionLoading === c.id} className="rounded-lg p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 transition-colors disabled:opacity-50" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────

function emptyFeatureForm(categoryId = '') {
  return { name: '', description: '', price: 0, categoryId, isActive: true };
}

function FeaturesTab() {
  const [items, setItems] = useState<Feature[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Feature | null>(null);
  const [form, setForm] = useState(emptyFeatureForm());
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const dragIndex = useRef<number | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    setError('');
    try {
      const [featuresRes, categoriesRes] = await Promise.all([
        adminFetch<{ data: Feature[] }>('/calculator/features'),
        adminFetch<{ data: Category[] }>('/calculator/categories'),
      ]);
      setItems(featuresRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load features');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyFeatureForm(categories[0]?.id || '')); setShowForm(true); };
  const openEdit = (f: Feature) => {
    setEditing(f);
    setForm({ name: f.name, description: f.description || '', price: f.price, categoryId: f.categoryId, isActive: f.isActive });
    setShowForm(true);
  };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(emptyFeatureForm()); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.categoryId) return;
    setSaving(true);
    try {
      if (editing) {
        const updated = await apiCall<Feature>(`/calculator/features/${editing.id}`, 'PUT', form);
        setItems(prev => prev.map(f => f.id === editing.id ? { ...updated, category: categories.find(c => c.id === updated.categoryId) } : f));
      } else {
        const created = await apiCall<Feature>('/calculator/features', 'POST', form);
        setItems(prev => [...prev, { ...created, category: categories.find(c => c.id === created.categoryId) }]);
      }
      closeForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this feature?')) return;
    setActionLoading(id);
    try {
      await apiCall(`/calculator/features/${id}`, 'DELETE');
      setItems(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setActionLoading(null);
    }
  };

  const toggleActive = async (f: Feature) => {
    setActionLoading(f.id);
    try {
      const updated = await apiCall<Feature>(`/calculator/features/${f.id}`, 'PUT', { isActive: !f.isActive });
      setItems(prev => prev.map(x => x.id === f.id ? { ...x, isActive: updated.isActive } : x));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setActionLoading(null);
    }
  };

  const visibleItems = filterCategory ? items.filter(f => f.categoryId === filterCategory) : items;

  const handleDragStart = (index: number) => { dragIndex.current = index; };
  const handleDragEnter = (index: number) => {
    if (dragIndex.current === null || dragIndex.current === index) return;
    setItems(prev => {
      const updated = [...prev];
      const [dragged] = updated.splice(dragIndex.current!, 1);
      updated.splice(index, 0, dragged);
      dragIndex.current = index;
      return updated;
    });
  };
  const handleDragEnd = async () => {
    dragIndex.current = null;
    setReordering(true);
    try {
      await apiCall('/calculator/features/reorder', 'PUT', { ids: visibleItems.map(f => f.id) });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reorder failed');
    } finally {
      setReordering(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <p className="text-gray-400 text-sm">
            {visibleItems.length} feature{visibleItems.length === 1 ? '' : 's'}
            {reordering && <span className="ml-2 text-orange-400">Saving order…</span>}
          </p>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs text-gray-300 focus:border-orange-500 focus:outline-none"
          >
            <option value="">All categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchAll} className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <button
            onClick={openCreate}
            disabled={categories.length === 0}
            title={categories.length === 0 ? 'Add a category first' : undefined}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-50"
          >
            <Plus className="h-4 w-4" /> Add Feature
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-900/30 border border-red-800 px-4 py-3 text-sm text-red-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
          <button onClick={() => setError('')} className="ml-auto"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      {categories.length === 0 && !loading && (
        <div className="mb-4 rounded-lg bg-amber-900/20 border border-amber-800/40 px-4 py-3 text-sm text-amber-400">
          Create at least one category in the Categories tab before adding features.
        </div>
      )}

      {showForm && (
        <div className="mb-6 rounded-2xl border border-gray-700 bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">{editing ? 'Edit Feature' : 'New Feature'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Name <span className="text-red-400">*</span></label>
              <input
                type="text" required value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Face Detection & Recognition"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
              <textarea
                rows={2} value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Short note shown under the feature name (optional)"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:border-orange-500 focus:outline-none resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Price (₹)</label>
                <input
                  type="number" min={0} step="0.01" value={form.price}
                  onChange={e => setForm(p => ({ ...p, price: Number(e.target.value) }))}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-gray-200 focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Category <span className="text-red-400">*</span></label>
                <select
                  required value={form.categoryId}
                  onChange={e => setForm(p => ({ ...p, categoryId: e.target.value }))}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-gray-200 focus:border-orange-500 focus:outline-none"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox" id="featureActive" checked={form.isActive}
                onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))}
                className="rounded border-gray-600 bg-gray-800 accent-orange-500"
              />
              <label htmlFor="featureActive" className="text-sm text-gray-300">Active (visible on the public calculator)</label>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-500 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50 transition-colors">
                <Check className="h-4 w-4" /> {saving ? 'Saving…' : editing ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={closeForm} className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 rounded-xl bg-gray-900 border border-gray-800 animate-pulse" />)}</div>
      ) : visibleItems.length === 0 ? (
        <div className="text-center py-16">
          <Calculator className="h-12 w-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No features yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {visibleItems.map((f, index) => (
            <div
              key={f.id} draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={e => e.preventDefault()}
              className="rounded-xl border border-gray-800 bg-gray-900 px-4 py-3.5 flex items-center gap-3 group cursor-grab active:cursor-grabbing hover:border-gray-700 transition-colors"
            >
              <GripVertical className="h-4 w-4 text-gray-700 group-hover:text-gray-500 transition-colors flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{f.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  ₹{f.price.toLocaleString()} · {categories.find(c => c.id === f.categoryId)?.name || f.category?.name || 'Uncategorized'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => toggleActive(f)} disabled={actionLoading === f.id}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
                    f.isActive ? 'bg-green-900/30 text-green-400 border border-green-800/40 hover:bg-green-900/50' : 'bg-gray-800 text-gray-500 border border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  {f.isActive ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />} {f.isActive ? 'Active' : 'Hidden'}
                </button>
                <button onClick={() => openEdit(f)} className="rounded-lg p-1.5 text-gray-500 hover:text-orange-400 hover:bg-gray-800 transition-colors" title="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(f.id)} disabled={actionLoading === f.id} className="rounded-lg p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 transition-colors disabled:opacity-50" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
