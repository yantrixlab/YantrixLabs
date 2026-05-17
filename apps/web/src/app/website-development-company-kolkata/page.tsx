import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'Website Development Company in Kolkata | Web & Mobile App Experts',
  description:
    'Yantrix Labs is a website development company in Kolkata offering web app, mobile app, SaaS product development, and business automation solutions.',
};

export default function WebsiteDevelopmentCompanyKolkataPage() {
  return (
    <PublicLayout>
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-rose-50">
        <div className="container-wide max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Website Development Company in Kolkata for Startups and Businesses
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We help founders and teams in Kolkata, West Bengal build websites, mobile apps, SaaS products, and automation platforms that drive growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold">
              Book a Kolkata Consultation
            </Link>
            <Link href="/mobile-app-development-services" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700">
              Mobile App Development Company in Kolkata
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-wide max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Local Development Services in Kolkata, West Bengal</h2>
          <p className="text-gray-600 mb-6">
            Website and mobile app development, SaaS engineering, MVP builds, and AI-powered business automation for local and global delivery teams.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recommended Local SEO Internal Links</h2>
          <p className="text-gray-600">
            Link this page from homepage and contact page using anchor text like website development company in Kolkata and mobile app development company in Kolkata.
            Also link to <Link href="/saas-development-services" className="text-indigo-600 font-semibold">SaaS development services</Link>.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

