'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Calculator, ChevronDown, Loader2, Smartphone, Sparkles,
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

interface Platform {
  id: string;
  name: string;
  slug: string;
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
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Instant Estimate
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
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
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-indigo-500" />
                Choose Platform(s)
              </h2>
              {platforms.length === 0 ? (
                <p className="text-sm text-gray-400">No platforms configured yet.</p>
              ) : (
                <div className="grid sm:grid-cols-3 gap-3">
                  {platforms.map(p => {
                    const active = selectedPlatforms.has(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => togglePlatform(p.id)}
                        className={`rounded-2xl border-2 p-4 text-left transition-all ${
                          active
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <p className={`font-semibold ${active ? 'text-indigo-700' : 'text-gray-900'}`}>{p.name}</p>
                        <p className="text-xs text-gray-500 mt-1">From {formatPrice(p.basePrice)}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Feature categories */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-indigo-500" />
                Select Features
              </h2>
              {categories.length === 0 ? (
                <p className="text-sm text-gray-400">No features configured yet.</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {categories.map(category => {
                    const collapsed = collapsedCategories.has(category.id);
                    const selectedInCategory = category.features.filter(f => selectedFeatures.has(f.id)).length;
                    return (
                      <div key={category.id} className="py-4 first:pt-0 last:pb-0">
                        <button
                          type="button"
                          onClick={() => toggleCategoryCollapsed(category.id)}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <span className="font-semibold text-gray-900">
                            {category.name}
                            {selectedInCategory > 0 && (
                              <span className="ml-2 text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                                {selectedInCategory} selected
                              </span>
                            )}
                          </span>
                          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
                        </button>
                        {!collapsed && (
                          <div className="mt-3 space-y-2">
                            {category.features.length === 0 ? (
                              <p className="text-sm text-gray-400">No features in this category yet.</p>
                            ) : (
                              category.features.map(feature => {
                                const checked = selectedFeatures.has(feature.id);
                                return (
                                  <label
                                    key={feature.id}
                                    className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
                                      checked ? 'border-indigo-200 bg-indigo-50/60' : 'border-gray-100 hover:bg-gray-50'
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
                                        <span className="text-sm font-semibold text-gray-700 flex-shrink-0">{formatPrice(feature.price)}</span>
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
            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-xl shadow-indigo-200/50">
              <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-100 mb-1">Estimated Cost</p>
              <p className="text-4xl font-extrabold mb-4">{formatPrice(total)}</p>

              <div className="space-y-1.5 text-sm text-indigo-100 border-t border-white/20 pt-4">
                <div className="flex items-center justify-between">
                  <span>Platform base price</span>
                  <span className="font-medium">{formatPrice(basePriceTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Features ({selectedFeatures.size} selected)</span>
                  <span className="font-medium">{formatPrice(featurePriceTotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Platform multiplier</span>
                  <span className="font-medium">{multiplierSum.toFixed(2)}x</span>
                </div>
              </div>

              <p className="text-xs text-indigo-100/80 mt-4 leading-relaxed">
                This is an automated estimate. Final pricing depends on full requirements and timeline.
              </p>

              <Link
                href="/contact"
                className="mt-5 flex items-center justify-center gap-2 w-full rounded-xl bg-white text-indigo-700 px-4 py-2.5 text-sm font-bold hover:bg-indigo-50 transition-colors"
              >
                Get a Detailed Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
