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

const floatCards = [
  { title: 'Android App', subtitle: 'Native Kotlin Performance', icon: Smartphone, x: -120, y: 42, delay: 0 },
  { title: 'Enterprise Web', subtitle: 'Scalable Product Systems', icon: Globe, x: 84, y: -90, delay: 0.3 },
  { title: 'AI Workflow', subtitle: 'Automated Ops Intelligence', icon: Bot, x: 102, y: 92, delay: 0.6 },
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
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_680px_at_12%_8%,rgba(59,130,246,0.24),transparent_60%),radial-gradient(1000px_620px_at_92%_12%,rgba(99,102,241,0.22),transparent_60%),linear-gradient(180deg,#020617_0%,#040b20_48%,#04091a_100%)]" />
        <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(125,145,180,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(125,145,180,0.10)_1px,transparent_1px)] bg-[size:62px_62px] [mask-image:radial-gradient(ellipse_at_center,black_44%,transparent_82%)]" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#7188a8]/60 bg-[#9ca7b8]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10 lg:px-12">
          <Link href="/" className="text-lg font-semibold tracking-tight text-white">
            Yantrix Labs
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f5ec8] text-white md:hidden"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
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
            className="text-5xl font-extrabold leading-[1.02] tracking-tight text-white md:text-7xl"
          >
            Modern Apps, <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">AI</span> Tools &{' '}
            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">Automation</span>{' '}
            Systems for Growing Businesses
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.16 }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 lg:mx-0"
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
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
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
              <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative h-[560px] w-full">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="absolute left-1/2 top-1/2 w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl shadow-[0_24px_60px_rgba(2,10,30,0.55)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Live Metrics</span>
              <span className="rounded-full border border-emerald-300/30 bg-emerald-300/15 px-2 py-1 text-[11px] font-semibold text-emerald-200">
                +24.8%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                <p className="text-xs text-slate-400">Products</p>
                <p className="mt-1 text-lg font-semibold text-white">142</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                <p className="text-xs text-slate-400">Automation Runs</p>
                <p className="mt-1 text-lg font-semibold text-white">18.9k</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                <p className="text-xs text-slate-400">AI Assist</p>
                <p className="mt-1 text-lg font-semibold text-white">Realtime</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                <p className="text-xs text-slate-400">Uptime</p>
                <p className="mt-1 text-lg font-semibold text-white">99.99%</p>
              </div>
            </div>
          </motion.div>

          {floatCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: idx === 1 ? 100 : -80, y: idx === 1 ? -80 : 80, rotate: idx === 1 ? 6 : -5 }}
                animate={{ opacity: 1, x: card.x, y: [card.y - 14, card.y + 14, card.y - 14], rotate: idx === 2 ? [-4, 2, -4] : [-2, 2, -2] }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.35 + idx * 0.14 },
                  x: { duration: 0.8, delay: 0.35 + idx * 0.14 },
                  y: { duration: 4 + idx, repeat: Infinity, ease: 'easeInOut', delay: card.delay },
                  rotate: { duration: 5 + idx, repeat: Infinity, ease: 'easeInOut', delay: card.delay },
                }}
                whileHover={{ scale: 1.04 }}
                className="absolute left-1/2 top-1/2 w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl shadow-[0_18px_40px_rgba(2,10,30,0.45)]"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                  <Icon className="h-4 w-4 text-cyan-100" />
                </div>
                <p className="text-sm font-semibold text-white">{card.title}</p>
                <p className="mt-1 text-xs text-slate-300">{card.subtitle}</p>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: [120, 104, 120] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[12%] top-1/2 w-[230px] rounded-2xl border border-white/20 bg-slate-950/55 p-4 backdrop-blur-xl"
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-slate-300">
              <Braces className="h-4 w-4 text-cyan-200" />
              Deployment Pipeline
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              $ deploy --product mobile-suite
              <br />
              Building Android, iOS, Web...
              <br />
              Status: <span className="text-emerald-300">Live</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: [-140, -154, -140] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="absolute right-[3%] top-1/2 w-[210px] rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl"
          >
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-100">
              <Zap className="h-4 w-4 text-violet-200" />
              Automation Flow
            </div>
            <div className="space-y-1 text-[11px] text-slate-300">
              <p>Lead Captured</p>
              <p>AI Qualification</p>
              <p>CRM Sync + Alert</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute right-[16%] top-[14%] rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-slate-100 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-emerald-200" />
              Live performance improved by 31%
            </div>
          </motion.div>
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
