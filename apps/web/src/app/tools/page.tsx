'use client';

import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import Link from 'next/link';
import {
  FileText, Users, ShoppingCart, Building2, UtensilsCrossed,
  Car, MapPin, BarChart3, Briefcase, Settings, ArrowRight, Zap,
} from 'lucide-react';

const FALLBACK_PRODUCTS = [
  { icon: FileText, title: 'GST Invoice Tool', description: 'Professional GST billing, invoicing, and compliance. Auto-calculate CGST, SGST, IGST. Generate GSTR-1 and GSTR-3B reports. Built for Indian businesses.', href: '/gst-invoice', badge: 'Live', color: 'bg-indigo-50 text-indigo-600', badgeColor: 'bg-indigo-100 text-indigo-700' },
  { icon: Users, title: 'Attendance System', description: 'Biometric and digital attendance tracking for teams. Real-time reports, leave management, and payroll integration.', href: '/contact', badge: 'Coming Soon', color: 'bg-green-50 text-green-600', badgeColor: 'bg-green-100 text-green-700' },
  { icon: ShoppingCart, title: 'Ecommerce Platform', description: 'Full-featured online store with payments, inventory management, and order tracking. Launch your store in days.', href: '/contact', badge: 'Coming Soon', color: 'bg-amber-50 text-amber-600', badgeColor: 'bg-amber-100 text-amber-700' },
  { icon: Building2, title: 'Hotel Booking System', description: 'Property management and room booking for hospitality businesses. Online reservations, housekeeping, and billing.', href: '/contact', badge: 'Coming Soon', color: 'bg-blue-50 text-blue-600', badgeColor: 'bg-blue-100 text-blue-700' },
  { icon: UtensilsCrossed, title: 'Restaurant POS', description: 'Order management and billing for restaurants and F&B businesses. Table management, kitchen display, and GST billing.', href: '/contact', badge: 'Coming Soon', color: 'bg-rose-50 text-rose-600', badgeColor: 'bg-rose-100 text-rose-700' },
  { icon: Car, title: 'Taxi Booking App', description: 'Driver and ride management platform. Passenger app, driver app, and admin dashboard with real-time tracking.', href: '/contact', badge: 'Coming Soon', color: 'bg-purple-50 text-purple-600', badgeColor: 'bg-purple-100 text-purple-700' },
  { icon: MapPin, title: 'GPS Fleet Tracking', description: 'Real-time fleet tracking and route optimization for logistics businesses. Live map, trip history, and fuel monitoring.', href: '/contact', badge: 'Coming Soon', color: 'bg-cyan-50 text-cyan-600', badgeColor: 'bg-cyan-100 text-cyan-700' },
  { icon: BarChart3, title: 'CRM', description: 'Manage leads, customers, and sales pipelines. Track deals, send follow-ups, and measure conversion.', href: '/contact', badge: 'Coming Soon', color: 'bg-orange-50 text-orange-600', badgeColor: 'bg-orange-100 text-orange-700' },
  { icon: Briefcase, title: 'HRMS', description: 'HR, payroll, and employee lifecycle management. Onboarding, leaves, appraisals, and salary processing.', href: '/contact', badge: 'Coming Soon', color: 'bg-pink-50 text-pink-600', badgeColor: 'bg-pink-100 text-pink-700' },
  { icon: Settings, title: 'Custom ERP', description: 'Tailored enterprise resource planning systems built for your specific workflow and industry requirements.', href: '/contact', badge: 'Custom Build', color: 'bg-violet-50 text-violet-600', badgeColor: 'bg-violet-100 text-violet-700' },
];

const ICON_GRADIENTS = [
  'linear-gradient(135deg,#eef2ff 0%,#c7d2fe 100%)',
  'linear-gradient(135deg,#f0fdf4 0%,#bbf7d0 100%)',
  'linear-gradient(135deg,#fffbeb 0%,#fde68a 100%)',
  'linear-gradient(135deg,#eff6ff 0%,#bfdbfe 100%)',
  'linear-gradient(135deg,#fff1f2 0%,#fecdd3 100%)',
  'linear-gradient(135deg,#faf5ff 0%,#e9d5ff 100%)',
  'linear-gradient(135deg,#ecfeff 0%,#a5f3fc 100%)',
  'linear-gradient(135deg,#fff7ed 0%,#fed7aa 100%)',
  'linear-gradient(135deg,#fdf2f8 0%,#fbcfe8 100%)',
  'linear-gradient(135deg,#f5f3ff 0%,#ddd6fe 100%)',
];

function getIconGradient(idx: number) { return ICON_GRADIENTS[idx % ICON_GRADIENTS.length]; }

function getFallbackBadgeClass(badgeColor: string): string {
  if (badgeColor.includes('green')) return 'border-emerald-200/80 text-emerald-700';
  if (badgeColor.includes('indigo')) return 'border-indigo-200/80 text-indigo-700';
  if (badgeColor.includes('violet')) return 'border-violet-200/80 text-violet-700';
  return 'border-gray-200/80 text-gray-500';
}

function getFallbackBadgeStyle(badgeColor: string): React.CSSProperties {
  if (badgeColor.includes('green')) return { background: 'linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' };
  if (badgeColor.includes('indigo')) return { background: 'linear-gradient(135deg,#eef2ff 0%,#e0e7ff 100%)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' };
  if (badgeColor.includes('violet')) return { background: 'linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' };
  return { background: '#f9fafb' };
}

export default function ToolsPage() {
  return (
    <PublicLayout>
      <section className="public-hero py-20 bg-gradient-to-br from-brand-50 via-white to-brand-200/40">
        <div className="container-wide text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6">
            <Zap className="h-3.5 w-3.5" />
            Products &amp; Tools
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            All Products &amp;
            <span className="block gradient-text">Business Tools</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Browse our ready-to-deploy business software solutions.
            From invoicing to booking platforms &mdash; built for India.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FALLBACK_PRODUCTS.map((product, idx) => (
              <div
                key={product.title}
                className="group relative flex flex-col rounded-2xl border border-[rgb(var(--public-border))] bg-[rgb(var(--public-surface-card))] p-6 overflow-hidden transition-all duration-[220ms] ease-out hover:-translate-y-1.5 hover:shadow-xl"
                style={{ boxShadow: '0 1px 4px 0 rgb(0 0 0/0.06),0 1px 2px -1px rgb(0 0 0/0.04)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent" />
                <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-[220ms]" style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.10) 0%,transparent 70%)' }} />

                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 transition-transform duration-[220ms] group-hover:scale-105 ${product.color}`}
                    style={{ background: getIconGradient(idx), boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.07),0 1px 3px rgba(0,0,0,0.06)' }}
                  >
                    <product.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border ${getFallbackBadgeClass(product.badgeColor)}`}
                    style={getFallbackBadgeStyle(product.badgeColor)}
                  >
                    {product.badge}
                  </span>
                </div>

                <h3 className="text-[18px] font-bold text-[rgb(var(--public-text))] mb-2 leading-snug tracking-tight">{product.title}</h3>
                <p className="text-[rgb(var(--public-text-muted))] text-[13.5px] leading-relaxed flex-1 mb-5">{product.description}</p>

                <Link
                  href={product.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-[220ms]"
                >
                  {product.badge === 'Live' ? 'View Product' : product.badge === 'Custom Build' ? 'Build Custom' : 'Get Notified'}
                  <ArrowRight className="h-4 w-4 transition-transform duration-[220ms] group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-900 text-center">
        <div className="container-wide max-w-2xl mx-auto">
          <div className="mb-8 text-indigo-100 text-sm leading-relaxed">
            <Link href="/tools" className="font-semibold text-white hover:underline">business automation tools</Link>
            {' '}|{' '}
            <Link href="/passive-income-tools-for-business" className="font-semibold text-white hover:underline">passive income tools</Link>
            {' '}|{' '}
            <Link href="/ai-tools-for-business-growth" className="font-semibold text-white hover:underline">AI business tools</Link>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Don&apos;t see what you need?</h2>
          <p className="text-indigo-200 mb-8 text-lg">We build custom software for any business requirement. Tell us what you need.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#001a4d] px-8 py-4 text-base font-semibold text-[#0b6bff] hover:bg-[#001238] transition-all shadow-lg shadow-black/30">Start a Project<ArrowRight className="h-4 w-4" /></Link>
            <Link href="/gst-invoice" className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-400 px-8 py-4 text-base font-semibold text-white hover:bg-indigo-500/20 transition-all">Try GST Tool</Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
