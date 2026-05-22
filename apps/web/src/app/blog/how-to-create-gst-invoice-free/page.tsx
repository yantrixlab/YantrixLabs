import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Create a GST Invoice for Free in 2026 (Step-by-Step Guide)',
  description: 'Step-by-step guide to create a GST invoice for free in India using a GST invoice generator.',
  alternates: { canonical: 'https://yantrixlab.com/blog/how-to-create-gst-invoice-free' },
  openGraph: {
    title: 'How to Create a GST Invoice for Free in 2026 (Step-by-Step Guide)',
    description: 'Step-by-step guide to create a GST invoice for free in India using a GST invoice generator.',
    url: 'https://yantrixlab.com/blog/how-to-create-gst-invoice-free',
    images: [{ url: 'https://yantrixlab.com/og-gst-tool.png', width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <main className="container-wide py-16 max-w-4xl mx-auto prose prose-gray">
      <div className="mb-6 text-sm text-gray-500"><Link href="/blog">Blog</Link> / How to Create a GST Invoice for Free in 2026 (Step-by-Step Guide)</div>
      <h1>How to Create a GST Invoice for Free in 2026 (Step-by-Step Guide)</h1>
      <p>Creating a GST invoice in India is simple when you follow a repeatable process. This guide shows each step so you can issue compliant invoices quickly.</p><h2>Step 1: Collect business details</h2><p>Add legal name, GSTIN, address, and contact information.</p><h2>Step 2: Add customer details</h2><p>Include buyer name, GSTIN (if registered), billing address, and place of supply.</p><h2>Step 3: Add line items</h2><p>Enter product/service names, HSN/SAC, quantity, rate, and discount.</p><h2>Step 4: Apply GST logic</h2><p>Use CGST+SGST for intra-state billing and IGST for inter-state billing.</p><h2>Step 5: Generate and download</h2><p>Generate the invoice and export PDF/Excel for records and filing.</p><p>Start now with our <a href="/gst-invoice">GST invoice generator</a>. If you need fast billing, use the <a href="/gst-invoice">free GST tool</a> directly. For daily invoicing, bookmark <a href="/gst-invoice">this GST invoice page</a>.</p>
    </main>
  );
}

