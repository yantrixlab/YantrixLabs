import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  PackageSearch,
  QrCode,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'GST Billing & Inventory Software for Indian Businesses | Yantrix Labs',
  description:
    'Create GST invoices, scan products from Android, manage inventory, and export PDF/Excel reports from one modern billing platform.',
  keywords: [
    'GST billing software India',
    'GST invoice generator',
    'Android barcode scanner billing',
    'inventory management software India',
    'barcode billing system',
    'GST inventory software',
    'PDF invoice generator',
    'Excel billing reports',
  ],
  alternates: { canonical: 'https://yantrixlab.com/gst-invoice' },
  openGraph: {
    title: 'GST Billing + Inventory + Android Scanner | Yantrix Labs',
    description: 'Fast GST billing with live product scanning, stock updates, and export-ready reports.',
    url: 'https://yantrixlab.com/gst-invoice',
    siteName: 'Yantrix Labs',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://yantrixlab.com/og-gst-tool.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GST Billing & Inventory with Android Scanner',
    description: 'Generate GST invoices, scan products, track stock, and export reports in one workflow.',
    images: ['https://yantrixlab.com/og-gst-tool.png'],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I use an Android phone for GST billing product scanning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can pair Android using QR and scan product barcodes directly into invoice workflows.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it support inventory updates while billing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Product scans can update invoice rows and stock movement in real time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I export GST invoices and business reports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can download invoices in PDF and export business data in Excel format.',
      },
    },
  ],
};

const highlights = ['GST Invoice', 'Inventory', 'Barcode Scanner', 'PDF Invoice', 'Excel Export', 'Reports'];

const features = [
  {
    icon: FileText,
    title: 'GST Invoice Generation',
    desc: 'Create tax-ready invoices with clean customer details, item-level tax, and polished templates.',
  },
  {
    icon: ScanLine,
    title: 'Android Product Scanner',
    desc: 'Scan products from Android and push them into invoices instantly for faster billing counters.',
    highlight: true,
  },
  {
    icon: Boxes,
    title: 'Inventory Control',
    desc: 'Monitor stock levels, track movement, and reduce manual errors across daily operations.',
  },
  {
    icon: BarChart3,
    title: 'Business Reports',
    desc: 'Generate actionable summaries for sales, tax, and inventory in one unified dashboard.',
  },
  {
    icon: PackageSearch,
    title: 'Multi-Template Billing',
    desc: 'Use modern invoice templates tailored for retailers, wholesalers, and service businesses.',
  },
];

const workflow = [
  { step: '01', title: 'Create Bill', desc: 'Add customer and start invoice instantly.' },
  { step: '02', title: 'Scan Products', desc: 'Use Android scanner to add items quickly.' },
  { step: '03', title: 'Sync Stock', desc: 'Inventory updates as items are billed.' },
  { step: '04', title: 'Export & Share', desc: 'Download PDF or Excel in one click.' },
];

const faqs = [
  {
    q: 'Is this suitable for small and medium businesses in India?',
    a: 'Yes. It is designed for Indian shops, trading businesses, and service teams that need faster GST billing and stock management.',
  },
  {
    q: 'Do I need dedicated scanner hardware?',
    a: 'No. Android scan workflows are supported, so additional scanner devices are optional.',
  },
  {
    q: 'Can my team use it for both billing and inventory?',
    a: 'Yes. Billing and stock operations run together to reduce duplicate work and improve accuracy.',
  },
  {
    q: 'Can I keep records for accounting and compliance?',
    a: 'Yes. Export-ready PDF invoices and Excel reports make audits and accounting workflows easier.',
  },
];

export default function GSTInvoicePage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-slate-50 via-white to-blue-50/70 py-20 sm:py-24">
        <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" />
        <div className="container-wide relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
              Built for high-speed GST billing operations
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Professional GST Billing with Scanner, Inventory, and Exports
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              One modern platform for GST invoice creation, Android product scanning, real-time stock updates, and export-ready
              reporting workflows.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard?guest=1"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                Start Free Billing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/scanner"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Download Scanner APK
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-8">
        <div className="container-wide">
          <p className="text-center text-sm font-medium text-slate-600">GST Invoice</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {highlights.map((badge) => (
              <span key={badge} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Everything Needed for Modern GST Billing</h2>
            <p className="mt-4 text-slate-600">
              One platform for GST invoices, Android scanning, inventory updates, and reporting workflows.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 ${
                  feature.highlight
                    ? 'border-blue-300 bg-gradient-to-br from-blue-50 via-cyan-50 to-white shadow-lg shadow-blue-100/70'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <feature.icon className={`h-6 w-6 ${feature.highlight ? 'text-blue-700' : 'text-slate-700'}`} />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Simple Workflow, Faster Billing</h2>
            <p className="mt-4 text-slate-600">A clean 4-step flow designed for teams that need speed and accuracy.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflow.map((item) => (
              <div key={item.step} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-bold tracking-wider text-blue-700">STEP {item.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Product Snapshot</h2>
            <p className="mt-4 text-slate-600">A unified dashboard for invoice generation, inventory, and exports.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">Invoice Table</p>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">Scanner Connected</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm text-slate-700">
                    <span>A4 Copier Paper</span>
                    <span>Rs 1,950</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm text-slate-700">
                    <span>Packing Tape Roll</span>
                    <span>Rs 540</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm text-slate-700">
                    <span>Marker Set</span>
                    <span>Rs 380</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">Stock Movement</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">-13 units</p>
                  <p className="text-xs text-slate-500">Updated after live scan</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">GST Summary</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">Rs 2,870 tax</p>
                  <p className="text-xs text-slate-500">CGST + SGST split ready</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">Exports</p>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-blue-700">PDF Ready</span>
                    <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-700">Excel Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { icon: QrCode, label: 'QR Pairing' },
              { icon: ScanLine, label: 'Live Scan Billing' },
              { icon: ShieldCheck, label: 'Reliable Data Flow' },
              { icon: FileSpreadsheet, label: 'Excel Exports' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <item.icon className="h-5 w-5 text-blue-700" />
                <p className="text-sm font-semibold text-slate-800">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">{faq.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-900 py-16 text-center text-white">
        <div className="container-wide mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Start Faster GST Billing with Scanner + Inventory in One Platform</h2>
          <p className="mt-4 text-slate-300">
            Reduce billing time, improve stock accuracy, and keep export-ready GST records from one modern system.
          </p>
          <div className="mx-auto mt-6 grid max-w-2xl gap-2 text-left sm:grid-cols-2">
            <p className="inline-flex items-center gap-2 text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Faster checkout workflows
            </p>
            <p className="inline-flex items-center gap-2 text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Live inventory sync
            </p>
            <p className="inline-flex items-center gap-2 text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              GST-ready invoice templates
            </p>
            <p className="inline-flex items-center gap-2 text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              One-click PDF and Excel exports
            </p>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/dashboard?guest=1" className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100">
              Start Free Billing
            </Link>
            <Link href="/scanner" className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Download Scanner APK
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
