'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Braces,
  Globe,
  Menu,
  Moon,
  Sun,
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
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = (localStorage.getItem('public_theme_mode') || 'system') as 'light' | 'dark' | 'system';
    const resolved = stored === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : stored;
    document.documentElement.setAttribute('data-public-theme-mode', stored);
    document.documentElement.setAttribute('data-public-theme', resolved);
    document.documentElement.style.colorScheme = resolved;
    setResolvedTheme(resolved);
  }, []);

  const onThemeToggle = () => {
    const nextMode: 'light' | 'dark' = resolvedTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('public_theme_mode', nextMode);
    document.documentElement.setAttribute('data-public-theme-mode', nextMode);
    document.documentElement.setAttribute('data-public-theme', nextMode);
    document.documentElement.style.colorScheme = nextMode;
    setResolvedTheme(nextMode);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${6 + ((i * 17) % 88)}%`,
        top: `${10 + ((i * 29) % 76)}%`,
        duration: 8 + (i % 5),
        delay: i * 0.22,
      })),
    []
  );

  return (
    <section className="home-hero-fixed relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_680px_at_12%_8%,rgba(59,130,246,0.24),transparent_60%),radial-gradient(1000px_620px_at_92%_12%,rgba(99,102,241,0.22),transparent_60%),linear-gradient(180deg,#020617_0%,#040b20_48%,#04091a_100%)]" />
        <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(125,145,180,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(125,145,180,0.10)_1px,transparent_1px)] bg-[size:62px_62px] [mask-image:radial-gradient(ellipse_at_center,black_44%,transparent_82%)]" />
      </div>

      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300"
        style={{
          backgroundColor: 'rgba(4, 22, 51, 0.30)',
          borderTop: '1px solid rgba(30, 74, 134, 0.55)',
          borderBottom: '1px solid rgba(30, 74, 134, 0.55)',
        }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <div className="flex h-[72px] items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/app_logo.png" alt="Yantrix Labs" className="h-8 w-8 rounded-lg object-contain" />
              <span className="text-[16px] font-semibold text-[#e9f1ff] tracking-tight">Yantrix Labs</span>
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
                      ? 'bg-[#0f2a57] text-[#2f8bff]'
                      : 'text-[#f1f6ff] hover:bg-[#0f2a57] hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={onThemeToggle}
              aria-label={`Toggle theme. Current ${resolvedTheme}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#2f5ea4] bg-[#0b2c5c] text-[#d6e6ff] transition-all hover:bg-[#123a74] hover:text-white"
            >
              {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#2f6fd1] bg-[#0d4aa6] px-5 py-2 text-sm font-semibold text-[#ffffff] transition-all hover:bg-[#135bc8]"
            >
              Enquiry
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 text-[#ffffff]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#1e4a86]/60 bg-[#041633] px-4 py-4 space-y-2">
            {navLinks.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-2 text-sm font-medium ${
                    isActive ? 'text-[#2f8bff] font-semibold' : 'text-[#f1f6ff]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                aria-label={`Toggle theme. Current ${resolvedTheme}`}
                onClick={onThemeToggle}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#2f5ea4] bg-[#0b2c5c] px-3 py-2 text-sm font-semibold text-[#d6e6ff] transition-all hover:bg-[#123a74] hover:text-white"
              >
                {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl border border-[#2f6fd1] bg-[#0d4aa6] px-4 py-2 text-center text-sm font-semibold text-[#ffffff] transition-all hover:bg-[#135bc8]"
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
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.25)]"
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
            className="text-5xl font-extrabold leading-[1.02] tracking-tight text-white drop-shadow-[0_8px_30px_rgba(15,23,42,0.65)] md:text-7xl"
          >
            Modern Apps, <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">AI</span> Tools &{' '}
            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">Automation</span>{' '}
            Systems for Growing Businesses
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-100 lg:mx-0"
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
                className="hero-secondary-cta inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
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
              <span key={item} className="rounded-full border border-cyan-200/25 bg-slate-900/65 px-3 py-1.5 text-xs font-medium text-cyan-100">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative h-[620px] w-full">
          <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18)_0%,rgba(37,99,235,0.1)_36%,transparent_72%)] blur-2xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="absolute right-[5%] top-[5%] z-30 rounded-2xl border border-emerald-300/35 bg-emerald-300/10 px-3.5 py-2.5 text-xs text-emerald-100 backdrop-blur-xl shadow-[0_14px_28px_rgba(1,50,32,0.35)]"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Avg. delivery speed improved by 31%
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="absolute left-1/2 top-1/2 z-20 w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/15 bg-[linear-gradient(160deg,rgba(11,26,57,0.82),rgba(5,15,35,0.72))] p-5 backdrop-blur-xl shadow-[0_24px_60px_rgba(2,10,30,0.55)]"
          >
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Execution Command Center</span>
              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/15 px-2 py-1 text-[11px] font-semibold text-cyan-100">
                Live
              </span>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-slate-950/35 p-3">
                <p className="text-xs text-slate-400">Deployments / Month</p>
                <p className="mt-1 text-lg font-semibold text-white">142</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/35 p-3">
                <p className="text-xs text-slate-400">Automation Runs</p>
                <p className="mt-1 text-lg font-semibold text-white">18.9k</p>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Delivery Pipeline</p>
                <p className="text-xs text-emerald-200">On Track</p>
              </div>
              {deliverySteps.map((step) => (
                <div key={step.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-[11px] text-slate-300">{step.label}</p>
                    <p className="text-[11px] font-semibold text-slate-200">{step.value}%</p>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800/80">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${step.value}%` }}
                      transition={{ duration: 0.9, delay: 0.35 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="absolute left-[0%] top-[44%] z-30 hidden w-[250px] -translate-y-1/2 rounded-2xl border border-white/15 bg-slate-950/65 p-4 backdrop-blur-xl lg:block"
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-slate-200">
              <Braces className="h-4 w-4 text-cyan-200" />
              Deployment Pipeline
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              `deploy --target production`
              <br />
              Android, iOS, and Web release sync
              <br />
              Status: <span className="text-emerald-300">Stable</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="absolute right-[0%] top-[66%] z-30 hidden w-[240px] -translate-y-1/2 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl lg:block"
          >
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-100">
              <Zap className="h-4 w-4 text-violet-200" />
              Automation Loop
            </div>
            <div className="space-y-1 text-[11px] text-slate-300">
              <p>Lead Intake</p>
              <p>AI Qualification</p>
              <p>CRM + Team Alert</p>
            </div>
          </motion.div>

          <div className="absolute inset-x-7 bottom-0 z-30 grid gap-3 sm:grid-cols-3">
            {expertiseCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + idx * 0.08 }}
                  className={`rounded-2xl border ${card.border} bg-gradient-to-br ${card.accent} p-3.5 backdrop-blur-xl shadow-[0_12px_24px_rgba(2,10,30,0.28)]`}
                >
                  <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-slate-900/50">
                    <Icon className="h-4 w-4 text-cyan-100" />
                  </div>
                  <p className="text-sm font-semibold text-white">{card.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-300">{card.subtitle}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[18%] top-[15%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.65)]"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute right-[18%] top-[28%] h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_20px_rgba(96,165,250,0.65)]"
          />
        </div>
      </div>

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-cyan-200/55"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [-6, 6, -6], opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </section>
  );
}
