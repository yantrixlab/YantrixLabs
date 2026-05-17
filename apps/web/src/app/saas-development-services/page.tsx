import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'SaaS Development Company for Startups and Small Business',
  description:
    'SaaS development company for startups and small businesses. We build subscription-ready products with secure architecture, billing, and scalable product roadmaps.',
};

export default function SaaSDevelopmentServicesPage() {
  return (
    <PublicLayout>
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="container-wide max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            SaaS Development Company for Startups and Small Business
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We design, build, and scale SaaS products with subscription billing,
            multi-tenant architecture, and growth-focused product strategy.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold">
              Start Your SaaS Project
            </Link>
            <Link href="/mvp-development-company" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700">
              MVP App Development Services
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-wide max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Build in SaaS Product Development</h2>
          <p className="text-gray-600 mb-6">
            Product discovery, user onboarding flows, role-based access, subscription billing, analytics dashboards, and AI-enabled features.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Internal Growth Stack</h2>
          <p className="text-gray-600">
            Pair this page with <Link href="/web-app-development-services" className="text-indigo-600 font-semibold">web app development services</Link>,{' '}
            <Link href="/mobile-app-development-services" className="text-indigo-600 font-semibold">mobile app development services</Link>, and{' '}
            <Link href="/ai-tools-for-business-growth" className="text-indigo-600 font-semibold">AI tools for business growth</Link> to improve topical authority.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

