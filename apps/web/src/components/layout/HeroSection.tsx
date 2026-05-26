'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Apple, Globe, Menu, Moon, Smartphone, X } from 'lucide-react';

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

const revealParent = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const revealItem = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const cards = [
  {
    title: 'Native Android',
    subtitle: 'Kotlin-first apps engineered for speed and reliability',
    icon: Smartphone,
    startX: 80,
    startY: 58,
    endX: -120,
    endY: 35,
    rotateRange: [-2, 2, -2] as number[],
    duration: 4,
  },
  {
    title: 'Native iOS',
    subtitle: 'Swift-powered experiences with polished interaction quality',
    icon: Apple,
    startX: 95,
    startY: -70,
    endX: 55,
    endY: -95,
    rotateRange: [-4, 3, -4] as number[],
    duration: 5,
  },
  {
    title: 'Enterprise Web Tools',
    subtitle: 'Scalable web systems built for operations and growth',
    icon: Globe,
    startX: -90,
    startY: 80,
    endX: 105,
    endY: 88,
    rotateRange: [-3, 1.5, -3] as number[],
    duration: 6,
  },
];

export default function HeroSection({ loggedIn }: HeroSectionProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#020617_0%,#071631_48%,#081226_100%)]" />
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-8 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-10 lg:px-12">
          <Link href="/" className="text-lg font-semibold tracking-tight text-white">
            Yantrix Labs
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-200 md:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-[12px]"
              aria-label="Theme"
            >
              <Moon className="h-4 w-4" />
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Enquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mx-4 rounded-2xl border border-white/15 bg-slate-900/80 p-4 backdrop-blur-[12px] md:hidden">
            <div className="flex flex-col gap-3 text-sm font-semibold text-slate-200">
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-14 pt-28 md:px-10 lg:grid-cols-2 lg:gap-12 lg:px-12">
        <motion.div
          variants={revealParent}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left"
        >
          <motion.h1
            variants={revealItem}
            className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent md:text-7xl"
          >
            Engineering High-Performance Mobile &amp; Web Ecosystems
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 lg:mx-0"
          >
            We build native Android, iOS, and robust web tools designed for scale, speed, and flawless user experience.
          </motion.p>

          <motion.div
            variants={revealItem}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.36)] transition-transform duration-200 hover:translate-y-[-2px]"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={loggedIn ? '/dashboard' : '/tools'}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-[12px] transition-transform duration-200 hover:translate-y-[-2px] hover:bg-white/10"
            >
              Explore Capabilities
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center py-10 lg:max-w-none lg:justify-end">
          <div className="relative h-[440px] w-full max-w-[620px]">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: card.startX, y: card.startY, rotate: card.rotateRange[0] }}
                  animate={{
                    opacity: 1,
                    x: card.endX,
                    y: [card.endY - 15, card.endY + 15, card.endY - 15],
                    rotate: card.rotateRange,
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: 0.24 + idx * 0.1 },
                    x: { duration: 0.8, delay: 0.24 + idx * 0.1, ease: [0.22, 1, 0.36, 1] },
                    y: { repeat: Infinity, duration: card.duration, ease: 'easeInOut', delay: idx * 0.25 },
                    rotate: { repeat: Infinity, duration: card.duration + 1.2, ease: 'easeInOut' },
                  }}
                  className="absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-[12px] shadow-[0_24px_50px_rgba(15,23,42,0.35)]"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{card.subtitle}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
