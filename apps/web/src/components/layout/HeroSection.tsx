'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Apple, Smartphone, Globe } from 'lucide-react';

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

const staggerParent = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const revealItem = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cards = [
  {
    title: 'Native Android',
    subtitle: 'Kotlin-first apps engineered for speed and reliability',
    icon: Smartphone,
    gradient: 'from-emerald-400/20 to-emerald-300/5',
    border: 'border-emerald-200/25',
    glow: 'shadow-[0_24px_50px_rgba(16,185,129,0.18)]',
    floatDelay: 0,
    start: { x: 0, y: 0, rotate: -2 },
  },
  {
    title: 'Native iOS',
    subtitle: 'Swift-powered experiences with polished interaction quality',
    icon: Apple,
    gradient: 'from-sky-400/20 to-sky-300/5',
    border: 'border-sky-200/25',
    glow: 'shadow-[0_24px_50px_rgba(56,189,248,0.16)]',
    floatDelay: 0.5,
    start: { x: 26, y: -20, rotate: 4 },
  },
  {
    title: 'Enterprise Web Tools',
    subtitle: 'Scalable web systems built for operations and growth',
    icon: Globe,
    gradient: 'from-indigo-400/20 to-indigo-300/5',
    border: 'border-indigo-200/25',
    glow: 'shadow-[0_24px_50px_rgba(99,102,241,0.18)]',
    floatDelay: 1,
    start: { x: -20, y: -10, rotate: -4 },
  },
];

export default function HeroSection({ loggedIn }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.18),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(59,130,246,0.14),transparent_35%),linear-gradient(180deg,#020617_0%,#0b1730_48%,#081226_100%)]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-14 pt-28 md:px-10 lg:grid-cols-2 lg:gap-10 lg:px-12">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left"
        >
          <motion.h1
            variants={revealItem}
            className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Engineering High-Performance Mobile &amp; Web Ecosystems
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0"
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
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-[12px] transition-transform duration-200 hover:translate-y-[-2px]"
            >
              Explore Capabilities
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center py-10 lg:max-w-none lg:justify-end">
          <div className="relative h-[340px] w-full max-w-[480px] sm:h-[380px]">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20, ...card.start }}
                  animate={{
                    opacity: 1,
                    y: [card.start.y - 10, card.start.y + 10, card.start.y - 10],
                    x: card.start.x,
                    rotate: card.start.rotate,
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: 0.22 + idx * 0.1 },
                    y: {
                      repeat: Infinity,
                      duration: 4,
                      ease: 'easeInOut',
                      delay: card.floatDelay,
                    },
                    x: { duration: 0.8, delay: 0.22 + idx * 0.1 },
                    rotate: { duration: 0.8, delay: 0.22 + idx * 0.1 },
                  }}
                  className={`absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border ${card.border} bg-gradient-to-br ${card.gradient} p-5 backdrop-blur-[12px] ${card.glow}`}
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
