import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'Passive Income Tools and Income Automation Tools for Businesses',
  description:
    'Passive income tools and income automation tools for businesses that want recurring revenue models, subscription workflows, and automated operations.',
};

export default function PassiveIncomeToolsForBusinessPage() {
  return (
    <PublicLayout>
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-indigo-50">
        <div className="container-wide max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Passive Income Tools and Income Automation Tools for Businesses
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Build recurring revenue channels through subscription software, workflow automation, and digital product operations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/business-automation-tools" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold">
              See Automation Tools
            </Link>
            <Link href="/saas-development-services" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700">
              Build a SaaS Product
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-wide max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscription-Based Business Tools Strategy</h2>
          <p className="text-gray-600 mb-6">
            Focus on repeat billing, customer lifecycle automation, retention workflows, and upsell systems.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Internal Links</h2>
          <p className="text-gray-600">
            Visit <Link href="/ai-tools-for-business-growth" className="text-indigo-600 font-semibold">AI tools for business growth</Link>,{' '}
            <Link href="/mvp-development-company" className="text-indigo-600 font-semibold">MVP app development services</Link>, and{' '}
            <Link href="/contact" className="text-indigo-600 font-semibold">consult with our team</Link>.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

