import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'Business Automation Tools for Operations and Revenue Growth',
  description:
    'Discover business automation tools to streamline workflows, reduce manual work, and improve revenue operations across sales, finance, and support.',
};

export default function BusinessAutomationToolsPage() {
  return (
    <PublicLayout>
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="container-wide max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Business Automation Tools for Operations and Revenue Growth
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Use automation workflows, reporting systems, and AI-assisted operations tools to save time and scale business output.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/tools" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold">
              Explore All Tools
            </Link>
            <Link href="/passive-income-tools-for-business" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700">
              Passive Income Tools
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-wide max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Business Automation Tools</h2>
          <p className="text-gray-600 mb-6">
            Prioritize processes with repeatable tasks: billing, reminders, lead qualification, reporting, and document workflows.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Internal Links for Commercial Intent</h2>
          <p className="text-gray-600">
            Link to <Link href="/ai-tools-for-business-growth" className="text-indigo-600 font-semibold">AI business tools</Link>,{' '}
            <Link href="/custom-software-development-services" className="text-indigo-600 font-semibold">custom software development</Link>, and{' '}
            <Link href="/contact" className="text-indigo-600 font-semibold">project consultation</Link>.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

