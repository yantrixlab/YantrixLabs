import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CGST vs SGST vs IGST: Which Tax Applies to Your Invoice?',
  description: 'Understand the difference between CGST, SGST, and IGST with examples and an easy comparison table.',
  alternates: { canonical: 'https://yantrixlab.com/blog/cgst-sgst-igst-difference' },
  openGraph: {
    title: 'CGST vs SGST vs IGST: Which Tax Applies to Your Invoice?',
    description: 'Understand the difference between CGST, SGST, and IGST with examples and an easy comparison table.',
    url: 'https://yantrixlab.com/blog/cgst-sgst-igst-difference',
    images: [{ url: 'https://yantrixlab.com/og-gst-tool.png', width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <main className="container-wide py-16 max-w-4xl mx-auto prose prose-gray">
      <div className="mb-6 text-sm text-gray-500"><Link href="/blog">Blog</Link> / CGST vs SGST vs IGST: Which Tax Applies to Your Invoice?</div>
      <h1>CGST vs SGST vs IGST: Which Tax Applies to Your Invoice?</h1>
      <p>Choosing the right GST type is critical for compliance. The tax applied depends on supplier state and place of supply.</p><h2>Quick comparison table</h2><table><thead><tr><th>Type</th><th>When used</th><th>Who collects</th></tr></thead><tbody><tr><td>CGST</td><td>Intra-state sale</td><td>Central Govt</td></tr><tr><td>SGST</td><td>Intra-state sale</td><td>State Govt</td></tr><tr><td>IGST</td><td>Inter-state sale</td><td>Central Govt</td></tr></tbody></table><p>Use our <a href="/tools/gst-invoice">GST invoice tool</a> to auto-calculate the correct split.</p>
    </main>
  );
}
