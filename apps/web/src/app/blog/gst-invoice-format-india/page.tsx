import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GST Invoice Format in India: Mandatory Fields Explained (2026)',
  description: 'GST invoice format in India with mandatory fields every business must include in 2026.',
  alternates: { canonical: 'https://yantrixlab.com/blog/gst-invoice-format-india' },
  openGraph: {
    title: 'GST Invoice Format in India: Mandatory Fields Explained (2026)',
    description: 'GST invoice format in India with mandatory fields every business must include in 2026.',
    url: 'https://yantrixlab.com/blog/gst-invoice-format-india',
    images: [{ url: 'https://yantrixlab.com/og-gst-tool.png', width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <main className="container-wide py-16 max-w-4xl mx-auto prose prose-gray">
      <div className="mb-6 text-sm text-gray-500"><Link href="/blog">Blog</Link> / GST Invoice Format in India: Mandatory Fields Explained (2026)</div>
      <h1>GST Invoice Format in India: Mandatory Fields Explained (2026)</h1>
      <p>A valid GST invoice must contain specific fields under GST rules.</p><h2>Mandatory fields</h2><ul><li>Supplier legal name and GSTIN</li><li>Invoice number and date</li><li>Recipient details and GSTIN (if registered)</li><li>HSN/SAC, quantity, taxable value</li><li>Tax rate and CGST/SGST/IGST breakup</li><li>Total invoice value and signature</li></ul><h2>Sample invoice preview</h2><img src="/og-gst-tool.png" alt="Sample GST invoice preview" /><p>Generate a correctly structured bill from <a href="/tools/gst-invoice">the free GST invoice generator</a>.</p>
    </main>
  );
}
