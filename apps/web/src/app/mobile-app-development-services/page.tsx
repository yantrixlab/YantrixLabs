import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'Mobile App Development Company for Business Growth',
  description:
    'Mobile app development services for startups and growing businesses. Build Android, iOS, and cross-platform apps designed for revenue and retention.',
};

export default function MobileAppDevelopmentServicesPage() {
  return (
    <PublicLayout>
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container-wide max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Mobile App Development Services for Business Growth
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We build mobile products that drive acquisition, engagement, and long-term customer value for startups and established businesses.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold">
              Talk to Mobile App Experts
            </Link>
            <Link href="/website-development-company-kolkata" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700">
              Kolkata Development Team
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-wide max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Startup App Development Delivery Model</h2>
          <p className="text-gray-600 mb-6">
            Discovery, UX wireframes, app architecture, API integrations, QA automation, launch support, and iteration sprints.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Pages</h2>
          <p className="text-gray-600">
            Continue to <Link href="/web-app-development-services" className="text-indigo-600 font-semibold">web app development services</Link>,{' '}
            <Link href="/saas-development-services" className="text-indigo-600 font-semibold">SaaS development services</Link>, and{' '}
            <Link href="/mvp-development-company" className="text-indigo-600 font-semibold">MVP development company</Link>.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

