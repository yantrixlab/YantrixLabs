import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Freelancers and Consultants Should Create GST Invoices in India',
  description: 'GST invoice guide for freelancers in India, including threshold, tax application, and invoicing best practices.',
  alternates: { canonical: 'https://yantrixlab.com/blog/gst-invoice-for-freelancers' },
  openGraph: {
    title: 'How Freelancers and Consultants Should Create GST Invoices in India',
    description: 'GST invoice guide for freelancers in India, including threshold, tax application, and invoicing best practices.',
    url: 'https://yantrixlab.com/blog/gst-invoice-for-freelancers',
    images: [{ url: 'https://yantrixlab.com/og-gst-tool.png', width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <main className="container-wide py-16 max-w-4xl mx-auto prose prose-gray">
      <div className="mb-6 text-sm text-gray-500"><Link href="/blog">Blog</Link> / How Freelancers and Consultants Should Create GST Invoices in India</div>
      <h1>How Freelancers and Consultants Should Create GST Invoices in India</h1>
      <p>Freelancers should issue professional invoices and handle GST correctly when applicable.</p><h2>Threshold check (₹20L)</h2><p>In many states, GST registration applies once aggregate turnover crosses ₹20 lakh (special category states may differ).</p><h2>When to charge GST</h2><p>Charge GST once registered and when the supply is taxable. Keep your invoice sequence consistent.</p><p>Use this <a href="/gst-invoice">GST invoice tool</a> to avoid manual errors.</p>
    </main>
  );
}

