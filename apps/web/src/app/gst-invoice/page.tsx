import { PublicLayout } from '@/components/layout/PublicLayout';
import GSTInvoiceHero from '@/components/layout/GSTInvoiceHero';
import Link from 'next/link';
import { QrCode, ScanLine, Boxes, Smartphone, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GST Barcode Billing Software India | Scan Products Into GST Invoices | Yantrix',
  description:
    'Scan products directly into GST invoices using any Android phone. QR instant pairing, live invoice scanning, and inventory updates in one GST barcode billing system for India.',
  keywords: [
    'GST barcode billing software',
    'Android barcode scanner for billing',
    'GST invoice scanner',
    'mobile billing scanner app',
    'barcode billing system India',
    'inventory scanner app',
    'GST stock management software',
    'free GST invoice generator',
  ],
  alternates: {
    canonical: 'https://yantrixlab.com/gst-invoice',
  },
  openGraph: {
    title: 'Scan Products Directly Into GST Invoices | Yantrix Labs',
    description: 'Turn any Android phone into a live GST billing scanner with QR instant pairing.',
    url: 'https://yantrixlab.com/gst-invoice',
    siteName: 'Yantrix Labs',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: 'https://yantrixlab.com/og-gst-tool.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GST Invoice Scanner + Billing | Yantrix Labs',
    description: 'QR pair Android scanner and add products live to GST invoices.',
    images: ['https://yantrixlab.com/og-gst-tool.png'],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I use my Android phone as a GST billing scanner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can pair your Android phone with QR and scan products directly into GST invoices.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a barcode machine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Yantrix scanner flow is designed to work with Android phones, so dedicated scanner hardware is optional.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does scanning update invoice and stock in real time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Product scan events can instantly update invoice rows and inventory workflows.',
      },
    },
  ],
};

const HOW_IT_WORKS = [
  { icon: QrCode, title: 'Pair with QR', desc: 'Open scanner app and scan pairing QR from billing screen.' },
  { icon: ScanLine, title: 'Scan Product', desc: 'Scan barcode or QR from product packaging using Android phone.' },
  { icon: CheckCircle2, title: 'Invoice Updates Live', desc: 'Item details, GST, and totals appear instantly in invoice table.' },
];

const BENEFITS = [
  { icon: QrCode, title: 'Connect in 3 Seconds', desc: 'Open APK -> Scan QR -> Start billing instantly.' },
  { icon: ScanLine, title: 'Products Added Live to Invoice', desc: 'Barcode scan inserts product rows into GST invoice automatically.' },
  { icon: Boxes, title: 'Manage Inventory by Scanning', desc: 'Update stock, add products, and track inventory via scan flow.' },
  { icon: Smartphone, title: 'No Barcode Machine Needed', desc: 'Use existing Android phones instead of costly hardware scanners.' },
];

export default function GSTInvoicePage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <GSTInvoiceHero />

      <section className="bg-white py-16">
        <div className="container-wide">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How It Works</h2>
            <p className="mt-3 text-slate-600">Pair with QR, scan product, and invoice updates live in seconds.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <step.icon className="h-6 w-6 text-indigo-600" />
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#07112b] py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(circle at 18% 18%, rgba(56,189,248,0.16), transparent 35%), radial-gradient(circle at 82% 22%, rgba(124,58,237,0.16), transparent 40%)',
          }}
        />
        <div className="container-wide relative">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Scanner Benefits for Indian SMEs</h2>
            <p className="mt-3 text-slate-300">
              Built for speed, low hardware cost, and real-time GST invoice scanner workflows.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {BENEFITS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/25"
              >
                <item.icon className="h-6 w-6 text-cyan-300" />
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-300/30 bg-rose-400/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-200">Before</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Manual Typing Every Invoice</h3>
              <p className="mt-2 text-sm text-slate-200">
                Enter product name, HSN, quantity, price, and GST each time, which slows billing and increases errors.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">After</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Scan Once, Auto-Add to Invoice</h3>
              <p className="mt-2 text-sm text-slate-200">
                Scan barcode and product details appear in invoice table instantly with faster checkout and fewer mistakes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-wide">
          <div className="grid gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-900 md:grid-cols-4">
            <p>No account login required.</p>
            <p>Works with barcode and QR products.</p>
            <p>Update inventory in real time.</p>
            <p>Lightweight Android scanner app.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4">
            {[
              {
                q: 'Can I use this as a GST invoice scanner?',
                a: 'Yes. You can scan products from Android and add them directly into GST invoice workflows.',
              },
              {
                q: 'Do I need a dedicated barcode scanner machine?',
                a: 'No. Existing Android phones can be used for live scan-based billing operations.',
              },
              {
                q: 'Can this help with inventory tracking?',
                a: 'Yes. The scanner flow can also support stock updates and product catalog operations.',
              },
            ].map((faq) => (
              <details key={faq.q} className="rounded-2xl border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">{faq.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b3b5a] to-[#0e7490] py-16 text-center text-white">
        <div className="container-wide max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold sm:text-4xl">Turn Any Android Phone Into a Live Billing Scanner</h2>
          <p className="mt-4 text-cyan-100">QR pair billing, instant barcode invoicing, and mobile-first GST operations.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard?guest=1"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0b3b5a] hover:bg-slate-100"
            >
              Try scanner demo
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
