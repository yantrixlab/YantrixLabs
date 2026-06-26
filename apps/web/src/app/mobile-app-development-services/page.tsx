import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'Mobile App Development Services in India | Cross-Platform and Native',
  description:
    'Build high-performance mobile apps that drive growth. Mobile app development services in India specializing in React Native, Android Java, and secure cross-platform architectures.',
  keywords: [
    'mobile app development services India',
    'React Native developers',
    'native Android development',
    'cross-platform app agency Kolkata',
    'custom mobile applications',
  ],
  alternates: {
    canonical: 'https://yantrixlab.com/mobile-app-development-services',
  },
  openGraph: {
    type: 'website',
    title: 'Mobile App Development Services in India | Cross-Platform and Native',
    description:
      'Transform your vision into a scalable mobile product. We engineer enterprise-grade native and cross-platform apps for startups and growing businesses.',
    images: ['/og-agency.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile App Development Services in India',
    description:
      'Expert mobile app engineering using React Native and deep native integrations. Built for speed, scale, and high user retention.',
    images: ['/og-agency.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Should I choose native or cross-platform development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most business apps, cross-platform development like React Native is faster and more cost-efficient. Native development is recommended for deep hardware access, heavy 3D, and intensive background processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a custom mobile app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most enterprise mobile apps take 3 to 6 months. MVP-focused builds can often be launched in 8 to 12 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you handle the App Store and Google Play submission process?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We handle full deployment, including compliance checks, certificates, and submission workflows for both stores.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you ensure the app remains secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We apply HTTPS API security, OAuth2 authentication, encrypted local data handling, and strict dependency standards.',
      },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Mobile App Development',
  name: 'Mobile App Development Services',
  provider: { '@type': 'Organization', name: 'Yantrix Labs', url: 'https://yantrixlab.com' },
  areaServed: 'IN',
  description: 'Native and cross-platform mobile app development using React Native and native Android/iOS, including App Store and Play Store submission.',
  url: 'https://yantrixlab.com/mobile-app-development-services',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yantrixlab.com' },
    { '@type': 'ListItem', position: 2, name: 'Mobile App Development Services', item: 'https://yantrixlab.com/mobile-app-development-services' },
  ],
};

export default function MobileAppDevelopmentServicesPage() {
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

      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container-wide max-w-5xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Mobile App Development Services in India for Business Growth
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transform your digital vision into a high-performance mobile product that drives user acquisition,
            sustains engagement, and delivers long-term customer value. From our Kolkata development hub, we
            build robust native and cross-platform apps engineered for App Store and Google Play success.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold">
              Talk to Mobile App Experts
            </Link>
            <Link href="/website-development-company-kolkata" className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700">
              Meet the Kolkata Development Team
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-wide max-w-5xl space-y-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Engineering Mobile Experiences That Scale</h2>
            <p className="text-gray-600 leading-relaxed">
              We combine clean UI/UX strategy with strong backend architecture so mobile apps stay stable under
              real-world load and remain easy to evolve over time.
            </p>
          </div>

          <div className="grid gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Cross-Platform Development with React Native CLI</h3>
              <p className="text-gray-600 leading-relaxed">
                We build iOS and Android experiences from a shared codebase while maintaining native-level performance,
                optimized builds, and custom module integration.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Deep Native Android Integration (Java and Android Studio)</h3>
              <p className="text-gray-600 leading-relaxed">
                For apps requiring hardware-level workflows, advanced camera pipelines, or offline-first systems,
                we implement robust native Android modules.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Strict UI and UX Design Philosophy</h3>
              <p className="text-gray-600 leading-relaxed">
                We prioritize clarity, minimal friction, and task-focused navigation to improve retention and reduce user drop-off.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-wide max-w-5xl space-y-10">
          <h2 className="text-3xl font-bold text-gray-900">Core Mobile Development Capabilities</h2>
          <div className="grid gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Hardware Integration and True Device Storage</h3>
              <p className="text-gray-600">We implement robust permissions, native file access, and secure device-level workflows instead of mocked shortcuts.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Real-Time Data and Offline Synchronization</h3>
              <p className="text-gray-600">We support Firebase realtime sync and offline-first local architectures for uninterrupted app behavior.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Global Localization and Multi-Language Support</h3>
              <p className="text-gray-600">We build disciplined localization pipelines for multilingual releases, including regional script support.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900">Industry-Specific Mobile Solutions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>FinTech and personal finance apps with secure transaction-aware UX.</li>
            <li>Enterprise operations tools with AI-enabled workforce workflows.</li>
            <li>Communication and utility apps with realtime and offline capabilities.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900">The Startup App Development Delivery Model</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-600">
            <li>Discovery and architecture planning</li>
            <li>Clean UX wireframes</li>
            <li>Agile build sprints</li>
            <li>API and third-party integrations</li>
            <li>QA automation and testing</li>
            <li>Launch and iteration support</li>
          </ol>

          <h2 className="text-3xl font-bold text-gray-900">Why Partner with Our Kolkata Development Team?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>A decade of engineering experience across mobile and product systems.</li>
            <li>Cost-efficient delivery without compromising software quality.</li>
            <li>Transparent IP ownership, NDA-first engagement, and clean handover.</li>
            <li>Strict quality and release standards for stability and maintainability.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions (Mobile App Development)</h2>
          <div className="space-y-6 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Should I choose native or cross-platform development?</h3>
              <p>Cross-platform is ideal for most business products; native is best for hardware-intensive and performance-critical app behavior.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">How long does it take to build a custom mobile app?</h3>
              <p>Typical delivery ranges from 3 to 6 months, while MVP-focused versions can launch in 8 to 12 weeks.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Do you handle the App Store and Google Play submission process?</h3>
              <p>Yes. We manage deployment readiness, store compliance, and release submission end-to-end.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">How do you ensure the app remains secure?</h3>
              <p>We secure app layers with encrypted communication, strict auth, safe storage practices, and vetted dependencies.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900">Explore Our Related Software Engineering Services</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-600">
            <li><Link href="/web-app-development-services" className="text-indigo-600 font-semibold">web app development services</Link></li>
            <li><Link href="/saas-development-services" className="text-indigo-600 font-semibold">SaaS development services</Link></li>
            <li><Link href="/mvp-development-company" className="text-indigo-600 font-semibold">MVP development company</Link></li>
          </ul>
        </div>
      </section>
    </PublicLayout>
  );
}
