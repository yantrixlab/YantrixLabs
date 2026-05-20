import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Top Mobile App Development Companies in Kolkata (2026)',
  description: 'What to evaluate when shortlisting mobile app development companies in Kolkata in 2026.',
  alternates: { canonical: 'https://yantrixlab.com/blog/mobile-app-development-kolkata' },
  openGraph: {
    title: 'Top Mobile App Development Companies in Kolkata (2026)',
    description: 'What to evaluate when shortlisting mobile app development companies in Kolkata in 2026.',
    url: 'https://yantrixlab.com/blog/mobile-app-development-kolkata',
    images: [{ url: 'https://yantrixlab.com/og-agency.png', width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <main className="container-wide py-16 max-w-4xl mx-auto prose prose-gray">
      <div className="mb-6 text-sm text-gray-500"><Link href="/blog">Blog</Link> / Top Mobile App Development Companies in Kolkata (2026)</div>
      <h1>Top Mobile App Development Companies in Kolkata (2026)</h1>
      <p>When comparing mobile app development companies in Kolkata, focus on outcomes rather than only hourly rates.</p><h2>What to evaluate</h2><ul><li>Portfolio relevance</li><li>Engineering quality</li><li>UX capability</li><li>Support model</li></ul><p>See how our team works on <a href="/services">mobile app development services</a>.</p>
    </main>
  );
}

