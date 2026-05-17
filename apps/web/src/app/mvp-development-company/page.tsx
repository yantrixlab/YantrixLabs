import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'MVP Development Company for Startup App Development',
  description:
    'MVP app development services for founders who need faster validation. Launch with essential features, measurable KPIs, and a clear scale roadmap.',
};

export default function MVPDevelopmentCompanyPage() {
  return (
    <PublicLayout>
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="container-wide max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            MVP Development Company for Startup App Development
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Launch your MVP with the right feature scope, user onboarding, and analytics foundation to validate demand and reduce development risk.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold">
              Plan My MVP
            </Link>
            <Link href="/saas-development-services" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700">
              SaaS MVP Path
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-wide max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">MVP App Development Services Process</h2>
          <p className="text-gray-600 mb-6">
            Product discovery, feature prioritization, rapid build sprint, usability testing, launch, and data-driven iteration.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recommended Next Pages</h2>
          <p className="text-gray-600">
            Explore <Link href="/web-app-development-services" className="text-indigo-600 font-semibold">web app development services</Link>,{' '}
            <Link href="/mobile-app-development-services" className="text-indigo-600 font-semibold">mobile app development services</Link>, and{' '}
            <Link href="/ai-tools-for-business-growth" className="text-indigo-600 font-semibold">AI tools for business growth</Link>.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

