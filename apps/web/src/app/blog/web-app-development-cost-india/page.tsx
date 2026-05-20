import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Much Does Web App Development Cost in India? (2026 Breakdown)',
  description: 'Detailed 2026 breakdown of web app development cost in India by scope, timeline, and team model.',
  alternates: { canonical: 'https://yantrixlab.com/blog/web-app-development-cost-india' },
  openGraph: {
    title: 'How Much Does Web App Development Cost in India? (2026 Breakdown)',
    description: 'Detailed 2026 breakdown of web app development cost in India by scope, timeline, and team model.',
    url: 'https://yantrixlab.com/blog/web-app-development-cost-india',
    images: [{ url: 'https://yantrixlab.com/og-agency.png', width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <main className="container-wide py-16 max-w-4xl mx-auto prose prose-gray">
      <div className="mb-6 text-sm text-gray-500"><Link href="/blog">Blog</Link> / How Much Does Web App Development Cost in India? (2026 Breakdown)</div>
      <h1>How Much Does Web App Development Cost in India? (2026 Breakdown)</h1>
      <p>Web app development cost in India depends on scope, complexity, and timeline.</p><h2>Typical cost bands</h2><ul><li>MVP: lower scope with core workflows</li><li>Growth stage product: advanced features and integrations</li><li>Enterprise app: security, scale, and governance</li></ul><p>For execution planning, explore our <a href="/services">software development services</a>.</p>
    </main>
  );
}

