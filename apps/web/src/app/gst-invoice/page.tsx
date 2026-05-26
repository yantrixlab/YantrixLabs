import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import GSTInvoiceHero from '@/components/layout/GSTInvoiceHero';
import { BarChart3, Boxes, FileSpreadsheet, FileText, PackageSearch, QrCode, ScanLine, ShieldCheck } from 'lucide-react';

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

      <GSTInvoiceHero />

      <section className="border-y border-slate-800 bg-[#0f172a] py-8">
        <div className="container-wide">
          <p className="text-center text-sm font-medium text-slate-300">Built for high-speed GST billing operations</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {highlights.map((badge) => (
              <span key={badge} className="rounded-full border border-slate-700 bg-slate-900/75 px-4 py-2 text-xs font-semibold text-cyan-100">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1020] py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Everything Needed for Modern GST Billing</h2>
            <p className="mt-4 text-slate-300">
              One platform for GST invoices, Android scanning, inventory updates, and reporting workflows.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 ${
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
        </div>
      </section>

      <section className="bg-[#10182f] py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Simple Workflow, Faster Billing</h2>
            <p className="mt-4 text-slate-300">A clean 4-step flow designed for teams that need speed and accuracy.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflow.map((item) => (
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
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Product Snapshot</h2>
            <p className="mt-4 text-slate-300">A unified dashboard for invoice generation, inventory, and exports.</p>
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
                    <span>Rs 1,950</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200">
                    <span>Packing Tape Roll</span>
                    <span>Rs 540</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200">
                    <span>Marker Set</span>
                    <span>Rs 380</span>
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
                  <p className="mt-1 text-lg font-bold text-white">Rs 2,870 tax</p>
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
              { icon: QrCode, label: 'QR Pairing' },
              { icon: ScanLine, label: 'Live Scan Billing' },
              { icon: ShieldCheck, label: 'Reliable Data Flow' },
              { icon: FileSpreadsheet, label: 'Excel Exports' },
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
          <h2 className="text-3xl font-bold sm:text-4xl">Start Faster GST Billing with Scanner + Inventory in One Platform</h2>
          <p className="mt-4 text-cyan-100">
            Reduce billing time, improve stock accuracy, and keep export-ready GST records from one modern system.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/dashboard?guest=1" className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0b3b5a] hover:bg-slate-100">
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
