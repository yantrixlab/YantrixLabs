'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, PlayCircle, Zap } from 'lucide-react';
import { isAuthenticated } from '@/lib/api';
import { enableGuestMode } from '@/lib/guestMode';

export default function GSTInvoiceHero() {
  const router = useRouter();
  const [videoError, setVideoError] = useState(false);

  const handleTryDemo = () => {
    if (!isAuthenticated()) enableGuestMode();
    router.push(isAuthenticated() ? '/dashboard' : '/dashboard?guest=1');
  };

  return (
    <section className="relative overflow-hidden border-b border-cyan-500/10 bg-[#0b1020]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 14% 12%, rgba(59,130,246,0.24), transparent 34%), radial-gradient(circle at 86% 16%, rgba(59,130,246,0.18), transparent 42%), linear-gradient(180deg, #0b1020 0%, #101a33 100%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.2)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative py-20 lg:py-24">
        <div className="container-wide">
          <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-100">
              <Zap className="h-3.5 w-3.5" />
              India&apos;s Smart GST Billing Scanner System
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              GST Billing, Inventory &amp;
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Smart Mobile Scanning
              </span>
              <span className="block">In One System</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
              Create GST invoices, manage inventory, track stock movement, export reports, and scan products live using any Android phone.
            </p>
            <p className="mt-3 text-sm font-medium text-slate-400">
              Works with barcode and QR products. Lightweight APK. Real-time invoice and stock sync.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={handleTryDemo}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:brightness-110"
              >
                Start Free Billing
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/scanner"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-500/70 bg-slate-900/60 px-7 py-3.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
              >
                Watch Live Demo
                <PlayCircle className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-100">
              <span>Scan</span>
              <span className="text-cyan-200/60">&middot;</span>
              <span>Sync</span>
              <span className="text-cyan-200/60">&middot;</span>
              <span>Save</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mt-10 lg:mt-14"
          style={{ marginInline: 'clamp(12px, 3vw, 60px)' }}
        >
          <div
            className="pointer-events-none absolute inset-0 -m-5 rounded-[2.4rem]"
            style={{
              background:
                'radial-gradient(ellipse at 70% 30%, rgba(56,189,248,0.20) 0%, rgba(59,130,246,0.10) 35%, rgba(15,23,42,0) 72%)',
            }}
          />

          <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.06] p-4 shadow-[0_24px_70px_rgba(2,12,38,0.55)] backdrop-blur-xl">
            <div className="rounded-[1.35rem] border border-cyan-200/25 bg-slate-950/80 p-2.5">
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
                {!videoError ? (
                  <video
                    className="block aspect-video h-auto w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onError={() => setVideoError(true)}
                  >
                    <source src="/app_video/app_demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="flex min-h-[280px] items-center justify-center bg-slate-900/95 px-6 py-10 text-center sm:min-h-[340px]">
                    <p className="max-w-sm text-sm font-medium text-slate-300">
                      Demo video is unavailable right now. Please verify
                      <span className="mx-1 font-semibold text-cyan-200">/public/app_video/app_demo.mp4</span>
                      and refresh.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
