'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Globe,
  Menu,
  Smartphone,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';

interface HomeHeader {
  badgeText: string;
  titleLine1: string;
  titleGradientText: string;
  description: string;
  primaryBtnLabel: string;
  secondaryBtnLabel: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

interface HeroSectionProps {
  homeHeader: HomeHeader;
  homeHeaderLoading: boolean;
  loggedIn: boolean;
  businessLogo: string | null;
  businessName: string | null;
  initials: string;
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const trustItems = ['Android Development', 'iOS Apps', 'Web Platforms', 'AI Automation', 'SaaS Products'];

const expertiseCards = [
  {
    title: 'Android Systems',
    subtitle: 'Native Kotlin pipelines with release governance',
    icon: Smartphone,
    accent: 'from-cyan-300/20 to-blue-400/5',
    border: 'border-cyan-300/30',
  },
  {
    title: 'Web Platforms',
    subtitle: 'Scalable architecture tuned for growth milestones',
    icon: Globe,
    accent: 'from-blue-300/20 to-indigo-400/5',
    border: 'border-blue-300/30',
  },
  {
    title: 'AI Automation',
    subtitle: 'Operational workflows with intelligent decisioning',
    icon: Bot,
    accent: 'from-violet-300/20 to-blue-400/5',
    border: 'border-violet-300/30',
  },
];

const deliverySteps = [
  { label: 'Discovery', value: 100 },
  { label: 'UX Blueprint', value: 88 },
  { label: 'Engineering', value: 76 },
  { label: 'Launch + Scale', value: 92 },
];

export default function HeroSection({ loggedIn }: HeroSectionProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-indigo-50 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[380px] w-[380px] rounded-full bg-purple-50 blur-3xl" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <div className="flex h-[72px] items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/app_logo.png" alt="Yantrix Labs" className="h-8 w-8 rounded-lg object-contain" />
              <span className="text-[16px] font-semibold text-gray-900 tracking-tight">Yantrix Labs</span>
            </Link>

          <nav className="hidden items-center gap-1.5 md:flex">
            {navLinks.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-600 bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-700"
            >
              Enquiry
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 text-gray-700"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2">
            {navLinks.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-2 text-sm font-medium ${
                    isActive ? 'text-indigo-600 font-semibold' : 'text-gray-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 space-y-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl border border-indigo-600 bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white transition-all hover:bg-indigo-700"
              >
                Enquiry
              </Link>
            </div>
          </div>
        )}
      </header>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-16 pt-28 md:px-10 lg:grid-cols-2 lg:gap-10 lg:px-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="text-center lg:text-left">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm"
          >
            <motion.span
              animate={{ scale: [1, 1.14, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <Sparkles className="h-4 w-4" />
            </motion.span>
            Building Next-Gen Digital Products
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="text-5xl font-extrabold leading-[1.02] tracking-tight text-gray-900 md:text-7xl"
          >
            Modern Apps, <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">AI</span> Tools &{' '}
            <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Automation</span>{' '}
            Systems for Growing Businesses
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-gray-600 lg:mx-0"
          >
            We engineer native Android and iOS apps, robust web platforms, SaaS products, custom business automation, and scalable
            software systems with modern UI/UX for ambitious teams.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.24 }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(59,130,246,0.45)]"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={loggedIn ? '/dashboard' : '/tools'}
                className="hero-secondary-cta inline-flex items-center rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
              >
                View Our Products
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {trustItems.map((item) => (
              <span key={item} className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Floating delivery-speed badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -top-4 right-6 z-10 hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-medium text-emerald-700 shadow-md sm:flex"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Avg. delivery speed improved by 31%
          </motion.div>

          {/* Main dashboard card */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Execution Command Center</span>
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700">
                Live
              </span>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                <p className="text-xs text-gray-500">Deployments / Month</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">142</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                <p className="text-xs text-gray-500">Automation Runs</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">18.9k</p>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Delivery Pipeline</p>
                <p className="text-xs font-medium text-emerald-600">On Track</p>
              </div>
              {deliverySteps.map((step) => (
                <div key={step.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-[11px] text-gray-500">{step.label}</p>
                    <p className="text-[11px] font-semibold text-gray-700">{step.value}%</p>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${step.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-3 text-xs text-gray-600">
              <Zap className="h-4 w-4 flex-shrink-0 text-violet-500" />
              Automation loop: Lead Intake &rarr; AI Qualification &rarr; CRM + Team Alert
            </div>
          </div>

          {/* Expertise cards */}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {expertiseCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm"
                >
                  <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50">
                    <Icon className="h-4 w-4 text-indigo-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{card.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-gray-500">{card.subtitle}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
