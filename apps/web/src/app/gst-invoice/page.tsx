import { PublicLayout } from '@/components/layout/PublicLayout';
import GSTInvoiceHero from '@/components/layout/GSTInvoiceHero';
import Link from 'next/link';
import {
  FileText,
  Shield,
  Users,
  QrCode,
  Layers3,
  ReceiptIndianRupee,
  WalletCards,
  CheckCircle2,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free GST Invoice Generator Online — Create GST Bills in 30 Seconds | Yantrix',
  description:
    'Generate GST-compliant invoices instantly. Auto-calculates CGST, SGST, and IGST. Export to PDF and Excel. Free for Indian businesses, retailers, freelancers, and SMEs.',
  keywords: [
    'free GST invoice generator',
    'GST invoice tool India',
    'online GST billing software',
    'CGST SGST IGST invoice calculator',
    'GST invoice for small business',
    'GST invoice for freelancers India',
    'create GST invoice online free',
  ],
  alternates: {
    canonical: 'https://yantrixlab.com/gst-invoice',
  },
  openGraph: {
    title: 'Free GST Invoice Generator — Create Bills in 30 Seconds',
    description: 'Auto-calculates CGST, SGST, IGST. Export PDF and Excel. Free for Indian businesses.',
    url: 'https://yantrixlab.com/gst-invoice',
    siteName: 'Yantrix Labs',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://yantrixlab.com/og-gst-tool.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free GST Invoice Generator | Yantrix Labs',
    description: 'Create GST-compliant invoices in 30 seconds. Free for Indian SMEs.',
    images: ['https://yantrixlab.com/og-gst-tool.png'],
  },
};

const gstSoftwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'GST Invoice Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://yantrixlab.com/gst-invoice',
  description: 'Free online GST invoice generator for Indian businesses. Auto-calculates CGST, SGST, IGST. Export to PDF and Excel.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  provider: { '@type': 'Organization', name: 'Yantrix Labs', url: 'https://yantrixlab.com' },
  featureList: [
    'CGST SGST IGST auto-calculation',
    'PDF export',
    'Excel export',
    'Payment tracking',
    'Customer management',
    'GSTR-1 report generation',
  ],
};

const FEATURES = [
  { icon: FileText, title: 'Free GST Invoice Creation', description: 'Create unlimited GST invoices without setup complexity.', accent: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-400/30' },
  { icon: ReceiptIndianRupee, title: 'GST Calculation Automation', description: 'Auto-calculate CGST, SGST, and IGST with clean tax breakup.', accent: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-400/30' },
  { icon: WalletCards, title: 'Professional Templates', description: 'Use polished invoice templates designed for Indian businesses.', accent: 'from-violet-500/20 to-fuchsia-500/20 text-violet-300 border-violet-400/30' },
  { icon: CheckCircle2, title: 'PDF Export', description: 'Download and share tax-ready GST invoices in PDF instantly.', accent: 'from-indigo-500/20 to-sky-500/20 text-indigo-300 border-indigo-400/30' },
  { icon: Users, title: 'Customer Management', description: 'Save customer details and reuse them for faster billing.', accent: 'from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-400/30' },
  { icon: QrCode, title: 'QR + Business Details', description: 'Attach business profile, payment details, and QR codes.', accent: 'from-teal-500/20 to-emerald-500/20 text-teal-300 border-teal-400/30' },
  { icon: Layers3, title: 'Invoice History', description: 'Track and retrieve all your past invoices anytime.', accent: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-400/30' },
  { icon: Shield, title: 'Cloud-Backed Security', description: 'Reliable storage and access across your devices.', accent: 'from-rose-500/20 to-pink-500/20 text-rose-300 border-rose-400/30' },
];

export default function GSTInvoicePage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gstSoftwareJsonLd) }} />

      <GSTInvoiceHero />

      <section className="relative overflow-hidden bg-[#070f24] py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(circle at 20% 15%, rgba(56,189,248,0.14), transparent 38%), radial-gradient(circle at 85% 25%, rgba(139,92,246,0.14), transparent 40%), linear-gradient(180deg, rgba(9,18,43,0.98) 0%, rgba(5,11,28,0.98) 100%)',
          }}
        />
        <div className="container-wide relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything you need to manage GST billing</h2>
            <p className="text-xl text-slate-300">From invoicing to reports, the complete toolkit for GST compliance.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08] hover:shadow-[0_18px_48px_rgba(2,6,23,0.45)]"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-br ${feature.accent}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-center">
        <div className="container-wide max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Start your free account today</h2>
          <p className="text-indigo-200 mb-8 text-lg">No credit card required. Setup in 5 minutes. Cancel anytime.</p>
          <Link
            href="/dashboard?guest=1"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      <section className="py-8 text-center text-sm text-gray-500">
        Built by <Link href="/" className="font-medium text-gray-700 hover:underline">Yantrix Labs</Link>
      </section>
    </PublicLayout>
  );
}
