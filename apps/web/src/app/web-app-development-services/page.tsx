import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'Web App Development Services for Startups and SMEs',
  description:
    'Web app development services for startups and SMEs. Build fast, secure, SEO-ready web platforms with scalable backend architecture.',
};

export default function WebAppDevelopmentServicesPage() {
  return (
    <PublicLayout>
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container-wide max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Web App Development Services for Startups and SMEs
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We build high-performance web apps with strong UX, robust APIs, and conversion-focused product architecture.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold">
              Build Your Web App
            </Link>
            <Link href="/saas-development-services" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700">
              SaaS Product Development
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-wide max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Custom App Development for Startups</h2>
          <p className="text-gray-600 mb-6">
            From MVP to scale-up builds, we align features to business KPIs, user behavior, and growth loops.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Internal Links for Search Intent Coverage</h2>
          <p className="text-gray-600">
            Connect this page with <Link href="/mobile-app-development-services" className="text-indigo-600 font-semibold">mobile app development services</Link>,{' '}
            <Link href="/mvp-development-company" className="text-indigo-600 font-semibold">MVP app development services</Link>, and{' '}
            <Link href="/custom-software-development-services" className="text-indigo-600 font-semibold">custom software development services</Link>.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

