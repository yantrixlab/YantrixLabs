import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'SaaS Development Company in India | Startups & Small Business',
  description:
    'Top SaaS development company in India. We design, build, and scale custom cloud applications, multi-tenant architectures, and MVPs for global startups.',
  keywords: [
    'SaaS development company India',
    'custom SaaS application',
    'SaaS MVP development',
    'hire SaaS developers India',
    'multi tenant architecture',
  ],
  alternates: {
    canonical: 'https://yantrixlab.com/saas-development-services',
  },
  openGraph: {
    type: 'website',
    title: 'SaaS Development Company in India | Startups & Small Business',
    description:
      "Scale your software concept with a secure, production-ready SaaS application built by India's premier engineering talent.",
    images: ['/og-agency.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Development Company in India',
    description:
      'Launch scalable MVPs and full-cycle enterprise platforms faster with optimized multi-tenant architectures.',
    images: ['/og-agency.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between single-tenant and multi-tenant SaaS architecture?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In a single-tenant architecture, each customer has a dedicated app instance and database. In multi-tenant architecture, customers share infrastructure while data remains isolated. Multi-tenancy lowers operational costs and simplifies updates.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a custom SaaS MVP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A custom SaaS MVP usually takes 8 to 12 weeks depending on feature complexity, third-party integrations, and onboarding requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you guarantee the security of our application data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We follow DevSecOps and OWASP top-10 practices, including encryption at rest and in transit, strict access controls, MFA support, and automated vulnerability testing before deployment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you help migrate an existing legacy system into a modern cloud SaaS model?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We modernize legacy systems by migrating databases to cloud infrastructure, rebuilding frontends in modern frameworks, and adding subscription-ready SaaS modules with minimal disruption.',
      },
    },
  ],
};

export default function SaaSDevelopmentServicesPage() {
  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="container-wide max-w-5xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            SaaS Development Company in India for Startups and Small Businesses
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Turn your software concept into a secure, market-ready web or mobile application. We design, build,
            and scale custom SaaS products engineered with robust multi-tenant architectures, flexible
            subscription billing engines, and growth-focused product strategies.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold">
              Start Your SaaS Project
            </Link>
            <Link href="/mvp-development-company" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700">
              Explore MVP Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide max-w-5xl space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Full-Cycle SaaS Product Development Services in India</h2>
            <p className="text-gray-600 leading-relaxed">
              Building software for the cloud requires deep expertise in shared infrastructure, data isolation,
              and user onboarding. As a dedicated SaaS development agency, we cover every stage of the product lifecycle.
            </p>
          </div>

          <div className="grid gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Custom Multi-Tenant Architecture and Cloud Engineering</h3>
              <p className="text-gray-600 leading-relaxed">
                We architect single-tenant and multi-tenant models with strong data isolation and scalable cloud-native infrastructure on AWS, GCP, and Azure.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">End-to-End SaaS MVP Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Our MVP framework helps startups launch functional products in 8-12 weeks while staying focused on core value and early user validation.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">API-First Development and Third-Party Integrations</h3>
              <p className="text-gray-600 leading-relaxed">
                We implement REST and GraphQL architectures with reliable integrations, backend automation, and secure data flow management.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Subscription Billing and Payment Gateway Routing</h3>
              <p className="text-gray-600 leading-relaxed">
                We integrate Stripe, Paddle, Razorpay, and Chargebee for tiered pricing, usage-based billing, dunning workflows, and compliant checkouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-wide max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Advanced Tech Stack We Use for Modern SaaS Engineering</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Layer</th>
                  <th className="text-left px-4 py-3 font-semibold">Technologies and Frameworks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr><td className="px-4 py-3 font-semibold">Frontend Frameworks</td><td className="px-4 py-3">React.js, Next.js, Vue.js, Tailwind CSS, TypeScript</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Backend and APIs</td><td className="px-4 py-3">Node.js, Python (FastAPI, Django), Go, Express, GraphQL, REST APIs</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Mobile Applications</td><td className="px-4 py-3">React Native, Flutter, Android (Java, Kotlin), iOS (Swift)</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Databases and Caching</td><td className="px-4 py-3">PostgreSQL, MongoDB, Redis, MySQL, Firebase</td></tr>
                <tr><td className="px-4 py-3 font-semibold">DevOps and Cloud</td><td className="px-4 py-3">AWS, GCP, Docker, Kubernetes, GitHub Actions</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide max-w-5xl space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">What We Build: Core Capabilities of Our SaaS Infrastructure</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-600">
            <li>Product discovery and user onboarding flows with OAuth and guided activation steps.</li>
            <li>Granular role-based access control (RBAC), team hierarchy, and SSO-ready permissions.</li>
            <li>Real-time analytics dashboards, KPI tracking, exports, and automated reports.</li>
            <li>AI-enabled automation including LLM workflows, predictive analysis, and smart data operations.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900">Our Agile SaaS Engineering Process</h2>
          <p className="text-gray-700 font-medium">
            Discovery and Architecture {'->'} UI/UX Wireframing {'->'} Agile Sprint Coding {'->'} QA and Security Audits {'->'} Cloud Launch and Scale
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-600">
            <li>Discovery and Architecture Design</li>
            <li>UI/UX Wireframing and Prototyping</li>
            <li>Agile Sprint Coding</li>
            <li>Rigorous Quality Assurance</li>
            <li>Cloud Launch and Scalability Maintenance</li>
          </ol>

          <h2 className="text-3xl font-bold text-gray-900">Why Startups Partner with Our Indian SaaS Development Agency</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-600">
            <li>Top-tier technical expertise across SaaS, mobile, and enterprise product systems.</li>
            <li>Up to 60% cost optimization compared to fully in-house western engineering teams.</li>
            <li>Strict NDA process and full intellectual property ownership transfer.</li>
            <li>Transparent global delivery through structured sprint reporting and async collaboration.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions About SaaS Development</h2>
          <div className="space-y-6 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">What is the difference between single-tenant and multi-tenant SaaS architecture?</h3>
              <p>Single-tenant gives each customer isolated infrastructure, while multi-tenant shares app infrastructure with strict data isolation controls for efficiency and scale.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">How long does it take to build a custom SaaS MVP?</h3>
              <p>Most SaaS MVPs take 8 to 12 weeks based on scope, integrations, and workflow complexity.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">How do you secure application data?</h3>
              <p>We follow OWASP and DevSecOps standards with encryption at rest and in transit, row-level isolation, MFA, and automated vulnerability scans.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Can you migrate legacy software into a modern SaaS model?</h3>
              <p>Yes. We modernize legacy systems, migrate data to cloud platforms, rebuild frontends, and introduce subscription modules with minimal downtime.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900">Explore Our Core Engineering Verticals</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-600">
            <li><Link href="/web-app-development-services" className="text-indigo-600 font-semibold">web app development services</Link></li>
            <li><Link href="/mobile-app-development-services" className="text-indigo-600 font-semibold">mobile app development services</Link></li>
            <li><Link href="/ai-tools-for-business-growth" className="text-indigo-600 font-semibold">AI tools for business growth</Link></li>
          </ul>
        </div>
      </section>
    </PublicLayout>
  );
}

