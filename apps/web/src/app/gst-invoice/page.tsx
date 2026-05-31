import type { Metadata } from 'next';
import Link from 'next/link';
import path from 'path';
import { readdir } from 'fs/promises';
import { PublicLayout } from '@/components/layout/PublicLayout';
import ProductSnapshotSlider from './ProductSnapshotSlider';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  FileText,
  PackageSearch,
  ScanLine,
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

export const dynamic = 'force-dynamic';

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

async function getSnapshotImages() {
  const screenshotsDir = path.join(process.cwd(), 'public', 'gst_invoice_screenshots');
  const allowedExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);

  try {
    const entries = await readdir(screenshotsDir, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => allowedExtensions.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map((name) => `/gst_invoice_screenshots/${name}`);
  } catch {
    return [];
  }
}

export default async function GSTInvoicePage() {
  const snapshotImages = await getSnapshotImages();

  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="public-hero relative overflow-hidden border-b border-gray-200/70 py-20 sm:py-24">
        <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-200/25 blur-3xl" />
        <div className="container-wide relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
              Built for high-speed GST billing operations
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Professional GST Billing with Scanner, Inventory, and Exports
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
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
            </div>

            <div className="mx-auto mt-12 max-w-5xl rounded-[1.6rem] border border-white/60 bg-white/40 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-xl">
              <div className="overflow-hidden rounded-[1.1rem] border border-white/50 bg-slate-900/90">
                <video
                  className="block aspect-video h-auto w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src="/app_video/app_demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white py-8">
        <div className="container-wide">
          <p className="text-center text-sm font-medium text-gray-600">GST Invoice</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {highlights.map((badge) => (
              <span key={badge} className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Everything Needed for Modern GST Billing</h2>
            <p className="mt-4 text-gray-600">
              One platform for GST invoices, Android scanning, inventory updates, and reporting workflows.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 ${
                  feature.highlight
                    ? 'border-blue-300 bg-white shadow-lg shadow-blue-100/40 hover:border-blue-400'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <feature.icon className={`h-6 w-6 ${feature.highlight ? 'text-blue-700' : 'text-gray-700'}`} />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Simple Workflow, Faster Billing</h2>
            <p className="mt-4 text-gray-600">A clean 4-step flow designed for teams that need speed and accuracy.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflow.map((item) => (
              <div key={item.step} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <p className="text-xs font-bold tracking-wider text-blue-700">STEP {item.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Product Snapshot</h2>
            <p className="mt-4 text-gray-600">A unified dashboard for invoice generation, inventory, and exports.</p>
          </div>

          <div className="relative rounded-3xl border border-white/50 bg-white/40 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-5">
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/60" />
            <ProductSnapshotSlider images={snapshotImages} />
          </div>

        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-gray-900">{faq.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-gray-900 py-16 text-center text-white">
        <div className="container-wide mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Start Faster GST Billing with Scanner + Inventory in One Platform</h2>
          <p className="mt-4 text-gray-300">
            Reduce billing time, improve stock accuracy, and keep export-ready GST records from one modern system.
          </p>
          <div className="mx-auto mt-6 grid max-w-2xl gap-2 text-left sm:grid-cols-2">
            <p className="inline-flex items-center gap-2 text-sm text-gray-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Faster checkout workflows
            </p>
            <p className="inline-flex items-center gap-2 text-sm text-gray-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Live inventory sync
            </p>
            <p className="inline-flex items-center gap-2 text-sm text-gray-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              GST-ready invoice templates
            </p>
            <p className="inline-flex items-center gap-2 text-sm text-gray-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              One-click PDF and Excel exports
            </p>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/dashboard?guest=1" className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100">
              Start Free Billing
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
