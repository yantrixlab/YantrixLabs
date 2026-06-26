import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'Website Development Company in Kolkata | Web, Mobile & SaaS Experts',
  description:
    'Yantrix Labs is a website development company in Kolkata building web apps, mobile apps, SaaS products, and business automation for startups and SMEs across West Bengal and beyond.',
  keywords: [
    'website development company in Kolkata',
    'web development Kolkata',
    'mobile app development company Kolkata',
    'SaaS development Kolkata',
    'software company Kolkata',
    'app developers West Bengal',
  ],
  alternates: {
    canonical: 'https://yantrixlab.com/website-development-company-kolkata',
  },
  openGraph: {
    type: 'website',
    title: 'Website Development Company in Kolkata | Web, Mobile & SaaS Experts',
    description: 'Web, mobile, and SaaS development for startups and businesses in Kolkata and West Bengal, delivered by a team that also serves clients nationwide.',
    images: ['/og-agency.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Development Company in Kolkata',
    description: 'Web, mobile, and SaaS development for startups and businesses in Kolkata and West Bengal.',
    images: ['/og-agency.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you work with businesses outside Kolkata as well?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. While our team is based in Kolkata, we deliver web, mobile, and SaaS projects for clients across India and internationally using the same remote-friendly delivery process.',
      },
    },
    {
      '@type': 'Question',
      name: 'What kind of businesses in Kolkata do you typically work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work with early-stage startups, growing SMEs, and local service businesses across sectors like ecommerce, hospitality, logistics, and B2B SaaS who need a website, mobile app, or internal automation system.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it better to hire a local Kolkata agency over a remote team?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A locally based team can meet in person, understand regional business context, and respond in the same time zone, while still offering the same engineering quality and cost advantages as remote outsourcing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a website or app cost in Kolkata?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costs vary by scope. A simple business website can start from a few thousand rupees, while custom web apps, mobile apps, and SaaS MVPs typically range from INR 1,00,000 to 15,00,000 depending on complexity and integrations.',
      },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Web, Mobile and SaaS Development',
  name: 'Website Development Company in Kolkata',
  provider: { '@type': 'Organization', name: 'Yantrix Labs', url: 'https://yantrixlab.com' },
  areaServed: ['Kolkata', 'West Bengal', 'IN'],
  description: 'Website, mobile app, SaaS, and business automation development services delivered from Kolkata for local and nationwide clients.',
  url: 'https://yantrixlab.com/website-development-company-kolkata',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yantrixlab.com' },
    { '@type': 'ListItem', position: 2, name: 'Website Development Company in Kolkata', item: 'https://yantrixlab.com/website-development-company-kolkata' },
  ],
};

const localServices = [
  {
    title: 'Business & Marketing Websites',
    desc: 'Fast, SEO-ready websites for local businesses, professional services, and brands that need a credible online presence and lead-generation forms.',
  },
  {
    title: 'Web App Development',
    desc: 'Custom dashboards, booking systems, and internal tools built with the same API-first architecture we use for our SaaS clients nationwide.',
  },
  {
    title: 'Mobile App Development',
    desc: 'Native and React Native apps for Kolkata-based startups and service businesses, including App Store and Play Store submission support.',
  },
  {
    title: 'SaaS & MVP Development',
    desc: 'Help founders in Kolkata validate and launch subscription products with production-ready architecture from day one.',
  },
];

const whyLocal = [
  'Same time zone and in-person availability for discovery calls, demos, and reviews.',
  'Understanding of regional business context, language preferences, and local payment/compliance norms (GST, UPI, regional banking).',
  'The same engineering standards and toolchain we use for clients across India and internationally.',
  'Lower coordination overhead than hiring a distant outsourcing team, without sacrificing technical depth.',
];

export default function WebsiteDevelopmentCompanyKolkataPage() {
  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-rose-50">
        <div className="container-wide max-w-5xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Website Development Company in Kolkata for Startups and Growing Businesses
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Yantrix Labs helps founders and teams in Kolkata and across West Bengal build websites, mobile apps,
            SaaS products, and automation platforms that drive growth — with the same engineering standards we
            use for clients nationwide.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold">
              Book a Kolkata Consultation
            </Link>
            <Link href="/mobile-app-development-services" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700">
              Mobile App Development Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Local Development Services in Kolkata, West Bengal</h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            Whether you run a local business, a growing SME, or an early-stage startup, we build the digital
            products you need to compete: websites, mobile apps, SaaS platforms, and the automation systems that
            cut down manual work.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {localServices.map((item) => (
              <article key={item.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-wide max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Kolkata Businesses Choose a Local Development Partner</h2>
          <ul className="space-y-3 text-gray-700">
            {whyLocal.map((item) => (
              <li key={item} className="rounded-xl border border-gray-200 bg-white p-4">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((item) => (
              <div key={item.name} className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-wide max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Core Engineering Services</h2>
          <p className="text-gray-600 mb-4">
            Our Kolkata team delivers the same services we offer to clients across India:{' '}
            <Link href="/saas-development-services" className="text-indigo-600 font-semibold">SaaS development services</Link>,{' '}
            <Link href="/web-app-development-services" className="text-indigo-600 font-semibold">web app development services</Link>,{' '}
            <Link href="/mvp-development-company" className="text-indigo-600 font-semibold">MVP development</Link>, and{' '}
            <Link href="/ai-tools-for-business-growth" className="text-indigo-600 font-semibold">AI automation tools</Link>.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
