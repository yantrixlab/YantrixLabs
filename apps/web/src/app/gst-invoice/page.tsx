import { PublicLayout } from '@/components/layout/PublicLayout';
import GSTInvoiceHero from '@/components/layout/GSTInvoiceHero';
import GetStartedButton from '@/components/GetStartedButton';
import Link from 'next/link';
import { FileText, BarChart3, Shield, Star, IndianRupee, Users, Package } from 'lucide-react';
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
  { icon: FileText, title: 'GST Invoicing in 30 Seconds', description: 'Create professional GST-compliant invoices with auto-calculations for CGST, SGST, and IGST.', color: 'bg-indigo-50 text-indigo-600' },
  { icon: BarChart3, title: 'Automated GST Reports', description: 'Generate GSTR-1 and compliance reports with a single click.', color: 'bg-green-50 text-green-600' },
  { icon: IndianRupee, title: 'Payment Tracking', description: 'Track due payments and keep your cash flow healthy.', color: 'bg-amber-50 text-amber-600' },
  { icon: Users, title: 'Customer Management', description: 'Maintain customer GST details and transaction history.', color: 'bg-blue-50 text-blue-600' },
  { icon: Package, title: 'Inventory Management', description: 'Track stock with HSN/SAC mapping support.', color: 'bg-purple-50 text-purple-600' },
  { icon: Shield, title: 'Bank-Grade Security', description: 'Your business data remains encrypted and protected.', color: 'bg-rose-50 text-rose-600' },
];

export default function GSTInvoicePage() {
  return (
    <PublicLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gstSoftwareJsonLd) }} />

      <GSTInvoiceHero />

      <section className="py-24">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to manage GST billing</h2>
            <p className="text-xl text-gray-600">From invoicing to reports, the complete toolkit for GST compliance.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="group rounded-2xl border border-gray-100 bg-white p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-center">
        <div className="container-wide max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Start your free account today</h2>
          <p className="text-indigo-200 mb-8 text-lg">No credit card required. Setup in 5 minutes. Cancel anytime.</p>
          <GetStartedButton />
        </div>
      </section>

      <section className="py-8 text-center text-sm text-gray-500">
        Built by <Link href="/" className="font-medium text-gray-700 hover:underline">Yantrix Labs</Link>
      </section>
    </PublicLayout>
  );
}
