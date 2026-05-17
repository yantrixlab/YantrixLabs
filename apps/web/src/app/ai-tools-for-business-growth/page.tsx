import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'AI Tools for Business Growth and Automation',
  description:
    'AI-powered business tools for startups and SMEs. Improve lead quality, automate workflows, and accelerate revenue growth with practical AI systems.',
};

export default function AIToolsForBusinessGrowthPage() {
  return (
    <PublicLayout>
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container-wide max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI Tools for Business Growth and Automation
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Deploy AI tools that improve process speed, reduce repetitive work, and increase customer-facing productivity.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/business-automation-tools" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold">
              View Business Automation Tools
            </Link>
            <Link href="/contact" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700">
              Plan AI Implementation
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-wide max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Business Automation Use Cases</h2>
          <p className="text-gray-600 mb-6">
            Intelligent lead scoring, support copilots, document extraction, reporting automation, and recurring task orchestration.
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Internal Link Path</h2>
          <p className="text-gray-600">
            Connect this page with <Link href="/saas-development-services" className="text-indigo-600 font-semibold">SaaS product development</Link>,{' '}
            <Link href="/web-app-development-services" className="text-indigo-600 font-semibold">web app development services</Link>, and{' '}
            <Link href="/mobile-app-development-services" className="text-indigo-600 font-semibold">mobile app development services</Link>.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

