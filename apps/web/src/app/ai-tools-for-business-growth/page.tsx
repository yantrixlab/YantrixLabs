import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'AI Tools for Business Growth & Automation | Custom Solutions India',
  description:
    'Deploy custom AI tools, Computer Vision, and RPA automation to eliminate manual workflows. AI engineering and implementation services for startups and SMEs in India.',
  keywords: [
    'AI tools for business growth',
    'custom AI development India',
    'business automation tools',
    'RPA development',
    'Computer Vision automation',
    'enterprise AI solutions',
  ],
  openGraph: {
    type: 'website',
    title: 'AI Tools for Business Growth & Automation | Custom Solutions India',
    description:
      'Transform operations with custom AI, RPA, and intelligent automation workflows built for scale.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools for Business Growth and Automation',
    description:
      'Custom AI engineering for startups and SMEs using Computer Vision, NLP, and workflow automation.',
    images: ['/og-image.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are AI automation tools secure for sensitive business data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We use private and secure deployment patterns, protected API gateways, strict access controls, and privacy-first data handling so your business data remains isolated and secure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do we need a massive dataset to start using AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not always. Many practical automation systems can start with pre-trained models and limited domain data, then improve as usage data grows.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to implement a custom AI solution?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Focused automation solutions can launch in 4 to 6 weeks. More integrated AI ecosystems typically require 8 to 14 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can these AI tools integrate with our existing software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We use API-first integration patterns to connect AI workflows with CRMs, ERPs, and custom internal tools.',
      },
    },
  ],
};

export default function AIToolsForBusinessGrowthPage() {
  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container-wide max-w-5xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI Tools for Business Growth and Automation in India
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Deploy intelligent AI tools that improve process speed, remove repetitive manual work, and increase
            customer-facing productivity. We build and integrate custom AI and RPA solutions for startups, SMEs,
            and enterprise teams.
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

      <section className="py-16 bg-white">
        <div className="container-wide max-w-5xl space-y-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transform Your Operations with Custom AI and Automation</h2>
            <p className="text-gray-600 leading-relaxed">
              Off-the-shelf software often misses business-specific workflow requirements. We build custom AI systems
              that directly target bottlenecks and deliver measurable ROI through practical automation.
            </p>
          </div>

          <div className="grid gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Computer Vision and Robotic Process Automation (RPA)</h3>
              <p className="text-gray-600">We build Python and Computer Vision automation that can detect, extract, and process repetitive operational tasks accurately at scale.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Advanced Biometrics and Workforce Management</h3>
              <p className="text-gray-600">We deploy face-recognition and workforce automation flows with privacy-focused processing and reliable check-in experiences.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Intelligent Document Extraction and NLP</h3>
              <p className="text-gray-600">We automate parsing of PDFs, invoices, and email content, then route extracted data into structured systems.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Custom Support Copilots and LLM Integration</h3>
              <p className="text-gray-600">We integrate LLM copilots into private business knowledge stacks for faster support and smarter internal operations.</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The ROI of AI Implementation for Startups and SMEs</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Cost reduction by automating repetitive admin-heavy processes.</li>
              <li>High-accuracy execution for structured and rules-driven workflows.</li>
              <li>Instant scalability for high-volume processing during peak business cycles.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our AI Engineering and Implementation Process</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
              <li>Workflow audit and AI discovery</li>
              <li>Data structuring and security mapping</li>
              <li>Agile prototyping and sprint development</li>
              <li>Rigorous shadow testing</li>
              <li>Deployment and continuous optimization</li>
            </ol>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner with Our AI Engineering Hub in India?</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Strong technical depth across AI engineering, backend systems, and UI/UX delivery.</li>
              <li>High-ROI implementation model with cost-efficient delivery from India.</li>
              <li>Clean and professional product design standards for enterprise usability.</li>
              <li>Full source code and model ownership transfer on project completion.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions About Business AI Solutions</h2>
            <div className="space-y-6 text-gray-600">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Are AI automation tools secure for sensitive business data?</h3>
                <p>Yes. We deploy private infrastructure patterns with security-first controls and strict data governance.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Do we need a massive dataset to start using AI?</h3>
                <p>No. Several use cases can start with pre-trained models and workflow-specific fine-tuning.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">How long does it take to implement a custom AI solution?</h3>
                <p>Delivery can range from 4-6 weeks for focused automations to 8-14 weeks for integrated systems.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Can these AI tools integrate with our existing software?</h3>
                <p>Yes. Our API-first architecture connects with legacy and modern platforms without disrupting your operations.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Build Your Complete Internal Growth Stack</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li><Link href="/saas-development-services" className="text-indigo-600 font-semibold">SaaS product development</Link></li>
              <li><Link href="/web-app-development-services" className="text-indigo-600 font-semibold">web app development services</Link></li>
              <li><Link href="/mobile-app-development-services" className="text-indigo-600 font-semibold">mobile app development services</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}