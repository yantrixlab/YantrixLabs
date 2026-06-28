'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Calculator, ChevronDown, Layers, Loader2, Smartphone, Sparkles,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

interface Platform {
  id: string;
  name: string;
  slug: string;
  iconUrl: string | null;
  basePrice: number;
  multiplier: number;
}

interface Feature {
  id: string;
  name: string;
  description: string | null;
  price: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  features: Feature[];
}

function formatPrice(value: number): string {
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

export function CostCalculatorClient() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch(`${API_URL}/calculator/data`, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(data => {
        if (data.success && data.data) {
          setPlatforms(data.data.platforms || []);
          setCategories(data.data.categories || []);
        } else {
          throw new Error('Failed to load calculator data');
        }
      })
      .catch(() => setError('Could not load the calculator right now. Please try again shortly.'))
      .finally(() => setLoading(false));
  }, []);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleCategoryCollapsed = (id: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const allFeatures = useMemo(() => categories.flatMap(c => c.features), [categories]);

  const { basePriceTotal, multiplierSum, featurePriceTotal, total } = useMemo(() => {
    const chosenPlatforms = platforms.filter(p => selectedPlatforms.has(p.id));
    const chosenFeatures = allFeatures.filter(f => selectedFeatures.has(f.id));

    const basePriceTotal = chosenPlatforms.reduce((sum, p) => sum + p.basePrice, 0);
    const multiplierSum = chosenPlatforms.reduce((sum, p) => sum + p.multiplier, 0);
    const featurePriceTotal = chosenFeatures.reduce((sum, f) => sum + f.price, 0);
    const total = basePriceTotal + multiplierSum * featurePriceTotal;

    return { basePriceTotal, multiplierSum, featurePriceTotal, total };
  }, [platforms, allFeatures, selectedPlatforms, selectedFeatures]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 text-center">
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-indigo-50/60 via-gray-50 to-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-sm font-semibold text-indigo-700 mb-4 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Instant Estimate
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            App &amp; Software Cost Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pick your platform and the features you need. We&apos;ll show you a live estimate as you go.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* ── Selection area ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform selector */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-7">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-5 flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-indigo-500" />
                Choose Platform(s)
              </h2>
              {platforms.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No platforms configured yet.</p>
              ) : (
                <div className="grid sm:grid-cols-3 gap-3">
                  {platforms.map(p => {
                    const active = selectedPlatforms.has(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => togglePlatform(p.id)}
                        className={`rounded-2xl border-2 p-4 text-left transition-all hover:-translate-y-0.5 ${
                          active
                            ? 'border-indigo-600 bg-indigo-50 shadow-md shadow-indigo-100'
                            : 'border-gray-200 bg-white hover:border-indigo-200 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          {p.iconUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.iconUrl} alt="" className="h-7 w-7 object-contain flex-shrink-0" />
                          ) : (
                            <div className={`h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                              <Smartphone className={`h-3.5 w-3.5 ${active ? 'text-indigo-600' : 'text-gray-400'}`} />
                            </div>
                          )}
                          <p className={`font-semibold ${active ? 'text-indigo-700' : 'text-gray-900'}`}>{p.name}</p>
                        </div>
                        <p className="text-xs text-gray-500">From {formatPrice(p.basePrice)}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Feature categories */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-7">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-5 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-indigo-500" />
                Select Features
              </h2>
              {categories.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No features configured yet.</p>
              ) : (
                <div className="space-y-3">
                  {categories.map(category => {
                    const collapsed = collapsedCategories.has(category.id);
                    const selectedInCategory = category.features.filter(f => selectedFeatures.has(f.id)).length;
                    return (
                      <div key={category.id} className="rounded-2xl border border-gray-100 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => toggleCategoryCollapsed(category.id)}
                          className="w-full flex items-center justify-between text-left px-4 py-3.5 bg-gray-50 hover:bg-gray-100/80 transition-colors"
                        >
                          <span className="flex items-center gap-2.5">
                            <Layers className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                            <span className="font-semibold text-gray-900 text-sm">{category.name}</span>
                            {selectedInCategory > 0 && (
                              <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                                {selectedInCategory} selected
                              </span>
                            )}
                          </span>
                          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform flex-shrink-0 ${collapsed ? '' : 'rotate-180'}`} />
                        </button>
                        {!collapsed && (
                          <div className="p-3 space-y-2 bg-white">
                            {category.features.length === 0 ? (
                              <p className="text-sm text-gray-400 italic px-1 py-1">No features in this category yet.</p>
                            ) : (
                              category.features.map(feature => {
                                const checked = selectedFeatures.has(feature.id);
                                return (
                                  <label
                                    key={feature.id}
                                    className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
                                      checked ? 'border-indigo-300 bg-indigo-50/70' : 'border-gray-100 hover:bg-gray-50'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={() => toggleFeature(feature.id)}
                                      className="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-3">
                                        <span className="text-sm font-medium text-gray-900">{feature.name}</span>
                                        <span className="text-sm font-semibold text-indigo-700 flex-shrink-0">{formatPrice(feature.price)}</span>
                                      </div>
                                      {feature.description && (
                                        <p className="text-xs text-gray-500 mt-0.5">{feature.description}</p>
                                      )}
                                    </div>
                                  </label>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ── Sticky summary ── */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 shadow-xl shadow-indigo-200/60 overflow-hidden">
              <div className="px-6 pt-6 pb-5">
                <p className="text-xs font-bold uppercase tracking-widest text-white/90 mb-2">Estimated Cost</p>
                <p className="text-4xl font-extrabold text-white mb-0">{formatPrice(total)}</p>
              </div>

              <div className="bg-black/15 px-6 py-5 space-y-2 text-sm text-indigo-50">
                <div className="flex items-center justify-between">
                  <span>Platform base price</span>
                  <span className="font-semibold text-white">{formatPrice(basePriceTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Features ({selectedFeatures.size} selected)</span>
                  <span className="font-semibold text-white">{formatPrice(featurePriceTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Platform multiplier</span>
                  <span className="font-semibold text-white">{multiplierSum.toFixed(2)}x</span>
                </div>
              </div>

              <div className="px-6 pt-4 pb-6">
                <p className="text-xs text-indigo-100/90 leading-relaxed mb-5">
                  This is an automated estimate. Final pricing depends on full requirements and timeline.
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-white text-indigo-700 px-4 py-2.5 text-sm font-bold hover:bg-indigo-50 transition-colors"
                >
                  Get a Detailed Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
