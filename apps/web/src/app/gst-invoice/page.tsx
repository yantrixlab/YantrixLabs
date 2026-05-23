import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import GSTInvoiceHero from '@/components/layout/GSTInvoiceHero';
import { BarChart3, Boxes, FileSpreadsheet, FileText, PackageSearch, QrCode, ScanLine, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GST Billing & Inventory Management Software India | Android Scanner Billing | Yantrix',
  description:
    'Modern GST billing and inventory software for Indian businesses. Create invoices, scan products from Android, track stock, and export PDF/Excel reports in one platform.',
  keywords: [
    'GST billing software India',
    'GST invoice scanner',
    'Android barcode scanner for billing',
    'barcode billing system India',
    'inventory scanner app',
    'GST inventory software India',
    'free GST invoice generator',
    'invoice generator with GST',
  ],
  alternates: {
    canonical: 'https://yantrixlab.com/gst-invoice',
  },
  openGraph: {
    title: 'GST Billing, Inventory & Mobile Scanner in One System | Yantrix Labs',
    description:
      'Run GST billing, inventory, exports, and Android scan-to-invoice workflows from one modern business platform.',
    url: 'https://yantrixlab.com/gst-invoice',
    siteName: 'Yantrix Labs',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://yantrixlab.com/og-gst-tool.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GST Billing & Inventory Software with Android Scanner',
    description: 'Create GST invoices, scan products live, update inventory, and export reports in one app.',
    images: ['https://yantrixlab.com/og-gst-tool.png'],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I use an Android phone as a GST invoice scanner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can pair Android with QR and scan barcode or QR products directly into invoice workflows.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a dedicated barcode scanner machine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Yantrix supports scan-based billing with Android phones, so extra hardware is optional.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does scanning also help with inventory updates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Scan actions can support both invoice line updates and real-time stock movement workflows.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I export invoices and reports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can generate PDF invoices and export business data to Excel for accounting and reporting.',
      },
    },
  ],
};

const trustBadges = ['GST Invoice', 'Inventory', 'Barcode Scanner', 'Stock Tracking', 'PDF Invoice', 'Excel Export', 'Reports', 'Multi Templates'];

const features = [
  {
    icon: FileText,
    title: 'Professional GST Invoicing',
    desc: 'Auto GST calculations, clean tax splits, customer details, and ready-to-share invoice formats.',
  },
  {
    icon: ScanLine,
    title: 'Instant Mobile Barcode Scanning',
    desc: 'Connect Android with QR and add products directly into live invoices without manual typing.',
    highlight: true,
  },
  {
    icon: Boxes,
    title: 'Real-Time Inventory Management',
    desc: 'Track stock movement, monitor low inventory, and update product records through scan workflows.',
  },
  {
    icon: BarChart3,
    title: 'Reports & Exports',
    desc: 'Get GST-ready summaries, business snapshots, and export data as PDF or Excel quickly.',
  },
  {
    icon: PackageSearch,
    title: 'Multiple Professional Templates',
    desc: 'Use polished templates that look credible for retailers, distributors, and service businesses.',
  },
];

const steps = [
  { step: '01', title: 'Create Invoice', desc: 'Start a bill with customer details and pricing setup.' },
  { step: '02', title: 'Scan Products Using Android', desc: 'Pair scanner app with QR and scan barcode or QR items.' },
  { step: '03', title: 'Inventory Updates Automatically', desc: 'Invoice rows and stock values sync instantly.' },
  { step: '04', title: 'Download PDF or Export Excel', desc: 'Share invoices fast and keep records reporting-ready.' },
];

const faqs = [
  {
    q: 'Can I use this as GST barcode billing software for my shop?',
    a: 'Yes. It is built for Indian shop owners and SMEs who need fast GST billing with scan-based product entry.',
  },
  {
    q: 'Does Android scanner flow require extra login every time?',
    a: 'No. You can pair the scanner through QR and continue scan workflows without repeated setup.',
  },
  {
    q: 'Is this suitable for inventory scanner app use cases?',
    a: 'Yes. Along with invoicing, the workflow supports stock tracking and product operations from the same system.',
  },
  {
    q: 'Can I export billing and inventory data for accounting?',
    a: 'Yes. You can export PDF invoices and Excel reports for business sharing and compliance records.',
  },
];

export default function GSTInvoicePage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <GSTInvoiceHero />

      <section className="border-y border-slate-800 bg-[#0f172a] py-8">
        <div className="container-wide">
          <p className="text-center text-sm font-medium text-slate-300">Everything needed to run GST billing efficiently</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {trustBadges.map((badge) => (
              <span key={badge} className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs font-semibold text-cyan-100">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1020] py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Everything you need to manage GST billing</h2>
            <p className="mt-4 text-slate-300">
              Built for fast, accurate GST billing with live scanning, inventory control, and export-ready reporting.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`group rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 ${
                  feature.highlight
                    ? 'border-cyan-400/50 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/20 shadow-xl shadow-cyan-950/40'
                    : 'border-slate-700 bg-slate-900/60 hover:border-slate-500'
                }`}
              >
                <feature.icon className={`h-6 w-6 ${feature.highlight ? 'text-cyan-200' : 'text-slate-200'}`} />
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-4 text-center text-sm font-semibold text-cyan-100">
            Scan · Sync · Save
          </div>
        </div>
      </section>

      <section className="bg-[#10182f] py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-slate-300">Simple flow for faster billing, cleaner operations, and fewer manual errors.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((item) => (
              <div key={item.step} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
                <p className="text-xs font-bold tracking-wider text-cyan-300">STEP {item.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1020] py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Live Dashboard Showcase</h2>
            <p className="mt-4 text-slate-300">Billing, stock, scanner status, and exports in one modern workspace.</p>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-5 shadow-2xl shadow-blue-950/40">
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-100">Invoice Table</p>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300">Scanner Connected</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200">
                    <span>A4 Copier Paper</span>
                    <span>₹1,950</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200">
                    <span>Packing Tape Roll</span>
                    <span>₹540</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200">
                    <span>Marker Set</span>
                    <span>₹380</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
                  <p className="text-xs font-semibold text-slate-400">Stock Movement</p>
                  <p className="mt-1 text-lg font-bold text-white">-13 units</p>
                  <p className="text-xs text-slate-400">Updated after live scan</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
                  <p className="text-xs font-semibold text-slate-400">GST Summary</p>
                  <p className="mt-1 text-lg font-bold text-white">₹2,870 tax</p>
                  <p className="text-xs text-slate-400">CGST + SGST split ready</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
                  <p className="text-xs font-semibold text-slate-400">Exports</p>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-blue-500/20 px-2.5 py-1 text-blue-200">PDF Ready</span>
                    <span className="rounded-full bg-violet-500/20 px-2.5 py-1 text-violet-200">Excel Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { icon: QrCode, label: 'QR Instant Connect' },
              { icon: ScanLine, label: 'Live Scan to Invoice' },
              { icon: ShieldCheck, label: 'Reliable Data Flow' },
              { icon: FileSpreadsheet, label: 'Business Exports' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                <item.icon className="h-5 w-5 text-cyan-300" />
                <p className="text-sm font-semibold text-slate-100">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#10182f] py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-100">{faq.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0e1a33] via-[#12335f] to-[#142b46] py-16 text-center text-white">
        <div className="container-wide mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Modern GST Billing &amp; Inventory Software for Growing Businesses</h2>
          <p className="mt-4 text-cyan-100">
            Faster billing, real-time stock tracking, Android barcode scanning, PDF invoices, and Excel exports in one platform.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard?guest=1"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0b3b5a] hover:bg-slate-100"
            >
              Start Free Billing
            </Link>
            <Link
              href="/scanner"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Download Scanner APK
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
