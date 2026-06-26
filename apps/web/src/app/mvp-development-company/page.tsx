import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'MVP Development Company in India | Startup App Agency',
  description:
    'Launch your startup faster. MVP development company in India specializing in rapid mobile and web app sprints, cross-platform builds, and scalable architectures.',
  keywords: [
    'MVP development company India',
    'startup app development',
    'hire MVP developers',
    'React Native MVP',
    'MVP cost in India',
    'agile app development',
  ],
  alternates: {
    canonical: 'https://yantrixlab.com/mvp-development-company',
  },
  openGraph: {
    type: 'website',
    title: 'MVP Development Company in India | Startup App Agency',
    description:
      'Test your app idea in the market quickly with a high-performance, scalable MVP built by expert developers in India.',
    images: ['/og-agency.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MVP Development Company in India',
    description:
      'Validate your startup idea with a custom-engineered MVP. We build scalable web and mobile apps in 8-12 weeks.',
    images: ['/og-agency.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does it cost to build an MVP in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The cost of an MVP varies based on the complexity of core features and platform scope. Typically, a high-quality custom MVP developed in India ranges from INR 5,00,000 to INR 15,00,000, with fixed-price estimates after discovery.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to launch an MVP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most MVP projects are launched in 8 to 12 weeks, depending on feature complexity, integrations, and QA requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will I need to rewrite the code when my app scales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. We build production-ready architecture from day one so your MVP codebase can evolve into the full product without a complete rewrite.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens after the MVP is launched?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Post-launch, we move into data-driven iteration: user behavior analysis, bug fixes, and feature roadmap expansion based on real usage metrics.',
      },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'MVP Development',
  name: 'MVP Development Services',
  provider: { '@type': 'Organization', name: 'Yantrix Labs', url: 'https://yantrixlab.com' },
  areaServed: 'IN',
  description: 'Rapid MVP development for startups, including mobile and web app sprints, cross-platform builds, and production-ready scalable architecture.',
  url: 'https://yantrixlab.com/mvp-development-company',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yantrixlab.com' },
    { '@type': 'ListItem', position: 2, name: 'MVP Development Company', item: 'https://yantrixlab.com/mvp-development-company' },
  ],
};

export default function MVPDevelopmentCompanyPage() {
  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="container-wide max-w-5xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            MVP Development Company in India for Startup App Development
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Don&apos;t build in the dark. Launch your Minimum Viable Product with the right feature scope,
            frictionless user onboarding, and a strong analytics foundation to validate market demand and
            reduce development risk.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold">
              Plan My MVP
            </Link>
            <Link href="/saas-development-services" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700">
              Explore the SaaS MVP Path
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide max-w-5xl space-y-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Startups Need an MVP Before Scaling</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Startups often fail by building too much, too early. An MVP helps you validate demand with real users,
              launch quickly, and iterate with evidence instead of assumptions.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Risk mitigation through controlled early-stage investment.</li>
              <li>Faster time-to-market to test positioning and beat slower competitors.</li>
              <li>Early customer feedback tied to real user behavior analytics.</li>
              <li>Stronger investor confidence with a working proof of concept.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our MVP App Development Services Process</h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-2">1. Product Discovery and Market Alignment</h3>
            <p className="text-gray-600 mb-5">We define user personas, pain points, and product outcomes before writing code.</p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-2">2. Feature Prioritization with the MoSCoW Method</h3>
            <p className="text-gray-600 mb-5">We focus on must-have features and defer non-essential scope to later sprints.</p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-2">3. Rapid Build Sprints and Scalable Architecture</h3>
            <p className="text-gray-600 mb-5">We run agile sprints with biweekly delivery while keeping cloud architecture scale-ready.</p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-2">4. Usability Testing and QA</h3>
            <p className="text-gray-600 mb-5">We validate onboarding, core workflows, and cross-device reliability before launch.</p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-2">5. Launch and Data-Driven Iteration</h3>
            <p className="text-gray-600">We track user behavior and evolve the roadmap based on usage insights and retention metrics.</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Technology Stack Built for Speed and Scalability</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Cross-platform mobile development with React Native CLI.</li>
              <li>Native Android workflows with Java and Kotlin when deep hardware integration is needed.</li>
              <li>Realtime backend acceleration with Firebase and modular API systems.</li>
              <li>API-first integrations with Node.js and REST bridges for payment and SaaS ecosystems.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner With Our Indian MVP Development Agency</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Capital-efficient delivery that can reduce development cost by up to 50%.</li>
              <li>Startup-first execution focused on growth rather than bloated enterprise scope.</li>
              <li>Strict NDA process and full IP ownership transfer post-launch.</li>
              <li>Transparent global collaboration through sprint updates and shared boards.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions About MVP Development in India</h2>
            <div className="space-y-6 text-gray-600">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">How much does it cost to build an MVP in India?</h3>
                <p>Most custom MVP projects range between INR 5,00,000 and INR 15,00,000 depending on platform and feature complexity.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">How long does it take to launch an MVP?</h3>
                <p>Typical delivery is 8 to 12 weeks from discovery to release-ready deployment.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Will I need to rewrite the code when my app scales?</h3>
                <p>No. We structure MVP architecture to support future expansion without complete rebuilds.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">What happens after the MVP is launched?</h3>
                <p>We run post-launch iteration cycles based on analytics, user behavior, and roadmap priorities.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recommended Next Pages and Internal Growth Stack</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><Link href="/web-app-development-services" className="text-indigo-600 font-semibold">Web App Development Services</Link></li>
              <li><Link href="/mobile-app-development-services" className="text-indigo-600 font-semibold">Mobile App Development Services</Link></li>
              <li><Link href="/ai-tools-for-business-growth" className="text-indigo-600 font-semibold">AI Tools for Business Growth</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
