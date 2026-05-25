import { PublicLayout } from '@/components/layout/PublicLayout';
import ProcessSection from '@/components/layout/ProcessSection';
import Link from 'next/link';
import {
  Zap, Shield, Star, ArrowRight, TrendingUp,
  IndianRupee, Headphones, CheckCircle,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Development Services - Web, Mobile, SaaS | Yantrix Labs',
  description:
    'We offer web app development, mobile app development, SaaS product engineering, AI tool development, and API integrations. Serving startups and SMEs across India.',
  alternates: { canonical: 'https://yantrixlab.com/services' },
  openGraph: {
    title: 'Software Development Services | Yantrix Labs',
    url: 'https://yantrixlab.com/services',
  },
};

const SERVICES = [
  {
    emoji: 'WEB',
    title: 'Web Applications',
    description: 'Fast, responsive web applications built to scale. We use modern frameworks like Next.js and React to deliver lightning-fast web experiences.',
    features: ['Next.js / React / Vue', 'SEO optimized', 'Mobile-first design', 'API-driven architecture'],
  },
  {
    emoji: 'APP',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile apps for iOS and Android. From consumer apps to enterprise tools, we build mobile-first.',
    features: ['React Native / Flutter', 'iOS & Android', 'Offline support', 'Push notifications'],
  },
  {
    emoji: 'SAAS',
    title: 'SaaS Platforms',
    description: 'Multi-tenant SaaS with billing, auth, and admin built in. Launch your software product with a solid foundation.',
    features: ['Multi-tenancy', 'Subscription billing', 'Role-based access', 'Admin dashboard'],
  },
  {
    emoji: 'DATA',
    title: 'Admin Dashboards',
    description: 'Data-rich dashboards for operations and analytics. Give your team the visibility they need to make better decisions.',
    features: ['Real-time data', 'Custom charts', 'Export reports', 'Role-based views'],
  },
  {
    emoji: 'API',
    title: 'API Integrations',
    description: 'Connect your tools with third-party APIs and services. Stripe, Razorpay, WhatsApp, GST APIs - we handle the complexity.',
    features: ['Payment gateways', 'Government APIs', 'Webhooks & events', 'REST & GraphQL'],
  },
  {
    emoji: 'AI',
    title: 'AI & Automation',
    description: 'Intelligent automation and AI-powered features. Add AI to your existing product or build AI-first from scratch.',
    features: ['OpenAI integration', 'Workflow automation', 'Document processing', 'Chatbots & assistants'],
  },
  {
    emoji: 'ENT',
    title: 'Enterprise Systems',
    description: 'Large-scale ERP, HRM, and business management systems. Custom-built for your specific industry and workflow.',
    features: ['ERP / HRM / CRM', 'Multi-branch support', 'Advanced reporting', 'Legacy migration'],
  },
];

const WHY_US = [
  { icon: Zap, title: 'Fast Delivery', desc: 'Ship production-ready software in weeks, not months.', color: 'bg-indigo-50 text-indigo-600' },
  { icon: TrendingUp, title: 'Scalable Architecture', desc: 'Built to handle growth from 10 to 10 million users.', color: 'bg-green-50 text-green-600' },
  { icon: Star, title: 'Clean UI/UX', desc: 'Intuitive interfaces that users love from day one.', color: 'bg-amber-50 text-amber-600' },
  { icon: IndianRupee, title: 'SME-Friendly Pricing', desc: 'Enterprise-quality software at startup-friendly costs.', color: 'bg-blue-50 text-blue-600' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade security, GDPR-ready, and compliance-first.', color: 'bg-rose-50 text-rose-600' },
  { icon: Headphones, title: 'Ongoing Support', desc: 'Dedicated support and maintenance after launch.', color: 'bg-purple-50 text-purple-600' },
];

const PROCESS = [
  { iconKey: 'idea', title: 'Idea', desc: 'Understand your requirements' },
  { iconKey: 'design', title: 'Design', desc: 'UI/UX wireframes and prototypes' },
  { iconKey: 'develop', title: 'Develop', desc: 'Clean, scalable code' },
  { iconKey: 'launch', title: 'Launch', desc: 'Deploy and go live' },
  { iconKey: 'support', title: 'Support', desc: 'Ongoing maintenance' },
];

export default function ServicesPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="public-hero py-20 bg-gradient-to-br from-brand-50 via-white to-brand-200/40">
        <div className="container-wide text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6">
            <Zap className="h-3.5 w-3.5" />
            Custom Software Development
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
            We Build Software
            <span className="block gradient-text">Tailored to Your Business</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Web apps, mobile apps, SaaS platforms, and enterprise systems.
            From idea to production - we handle it all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Build</h2>
            <p className="text-xl text-gray-600">Full-stack development across every platform and industry.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(service => (
              <div
                key={service.title}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl mb-4">{service.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{service.description}</p>
                <ul className="space-y-1.5">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                      <CheckCircle className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSection steps={PROCESS} />

      {/* Why Us */}
      <section className="py-24">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why choose Yantrix Labs</h2>
            <p className="text-xl text-gray-600">Startup speed. Enterprise quality. Indian prices.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US.map(item => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.color} mb-4`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-center"
        style={{ background: 'linear-gradient(135deg, #0b3d91 0%, #062968 100%)' }}
      >
        <div className="container-wide max-w-2xl mx-auto">
          <div className="mb-8 text-sm leading-relaxed" style={{ color: '#cfe0ff' }}>
            <Link href="/saas-development-services" className="font-semibold hover:underline" style={{ color: '#ffffff' }}>SaaS development services</Link>
            {' '}|{' '}
            <Link href="/web-app-development-services" className="font-semibold hover:underline" style={{ color: '#ffffff' }}>web app development services</Link>
            {' '}|{' '}
            <Link href="/mobile-app-development-services" className="font-semibold hover:underline" style={{ color: '#ffffff' }}>mobile app development services</Link>
            {' '}|{' '}
            <Link href="/mvp-development-company" className="font-semibold hover:underline" style={{ color: '#ffffff' }}>MVP app development services</Link>
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
            Let&apos;s build your project
          </h2>
          <p className="mb-8 text-lg" style={{ color: '#8fc2ff' }}>
            Tell us about your requirements. We&apos;ll respond within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#001a4d] px-8 py-4 text-base font-semibold text-[#0b6bff] hover:bg-[#001238] transition-all shadow-lg shadow-black/30"
          >
            Book a Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
