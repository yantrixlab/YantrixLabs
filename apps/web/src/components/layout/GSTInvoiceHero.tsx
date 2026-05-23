'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, PlayCircle, QrCode, ScanLine, Zap } from 'lucide-react';
import { isAuthenticated } from '@/lib/api';
import { enableGuestMode } from '@/lib/guestMode';

type HeroPhase =
  | 'pairing_qr_visible'
  | 'scanner_active'
  | 'product_scanned'
  | 'invoice_fields_fill'
  | 'invoice_line_added'
  | 'stock_updated'
  | 'export_ready'
  | 'reset_pause';

const PHASES: HeroPhase[] = [
  'pairing_qr_visible',
  'scanner_active',
  'product_scanned',
  'invoice_fields_fill',
  'invoice_line_added',
  'stock_updated',
  'export_ready',
  'reset_pause',
];

const PHASE_DURATION_MS: Record<HeroPhase, number> = {
  pairing_qr_visible: 1100,
  scanner_active: 1000,
  product_scanned: 900,
  invoice_fields_fill: 1100,
  invoice_line_added: 900,
  stock_updated: 900,
  export_ready: 1200,
  reset_pause: 700,
};

const PHASE_ORDER: Record<HeroPhase, number> = PHASES.reduce((acc, phase, i) => {
  acc[phase] = i;
  return acc;
}, {} as Record<HeroPhase, number>);

export default function GSTInvoiceHero() {
  const router = useRouter();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const phase = reduceMotion ? 'export_ready' : PHASES[phaseIndex];

  const reached = (target: HeroPhase) => PHASE_ORDER[phase] >= PHASE_ORDER[target];
  const active = (target: HeroPhase) => phase === target;

  const productName = reached('product_scanned') ? 'Premium Packaging Box' : 'Waiting for scan...';
  const qty = reached('invoice_fields_fill') ? 1 : 0;
  const rate = reached('invoice_fields_fill') ? 1200 : 0;
  const gstRate = reached('invoice_fields_fill') ? 18 : 0;
  const gstAmount = reached('invoice_line_added') ? 216 : 0;
  const subTotal = reached('invoice_line_added') ? 1200 : 0;
  const grandTotal = reached('invoice_line_added') ? 1416 : 0;
  const stockMovement = reached('stock_updated') ? '-1 Unit Auto Updated' : 'Awaiting stock sync';
  const exportLabel = reached('export_ready') ? 'PDF + Excel Ready' : 'Preparing export';

  const statusPill = useMemo(() => {
    if (phase === 'pairing_qr_visible') return { text: 'Pairing', cls: 'bg-cyan-500/20 text-cyan-200' };
    if (phase === 'scanner_active' || phase === 'product_scanned') return { text: 'Scanning', cls: 'bg-blue-500/20 text-blue-200' };
    if (phase === 'reset_pause') return { text: 'Resetting', cls: 'bg-slate-500/20 text-slate-200' };
    return { text: 'Connected', cls: 'bg-emerald-400/20 text-emerald-300' };
  }, [phase]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const ms = PHASE_DURATION_MS[PHASES[phaseIndex]];
    const t = window.setTimeout(() => {
      setPhaseIndex((prev) => (prev + 1) % PHASES.length);
    }, ms);
    return () => window.clearTimeout(t);
  }, [phaseIndex, reduceMotion]);

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

      <div className="container-wide relative py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Create GST invoices, manage inventory, track stock movement, export reports, and scan products live using any Android phone.
            </p>
            <p className="mt-3 text-sm font-medium text-slate-400">
              Works with barcode and QR products. Lightweight APK. Real-time invoice and stock sync.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
              <span className="text-cyan-200/60">·</span>
              <span>Sync</span>
              <span className="text-cyan-200/60">·</span>
              <span>Save</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-scan-demo rounded-3xl border border-cyan-400/20 bg-slate-950/70 p-4 shadow-2xl shadow-blue-950/40 backdrop-blur"
          >
            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/90 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-100">Live Scanner Workflow</p>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusPill.cls}`}>{statusPill.text}</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className={`rounded-xl border bg-slate-900 p-3 text-center transition-colors ${active('pairing_qr_visible') ? 'border-cyan-300/60' : 'border-slate-700'}`}>
                  <QrCode className={`mx-auto h-5 w-5 ${reached('pairing_qr_visible') ? 'text-cyan-300' : 'text-slate-500'}`} />
                  <p className="mt-2 text-xs font-semibold text-slate-200">Step 1</p>
                  <p className="text-xs text-slate-400">Scan Pair QR</p>
                </div>
                <div className={`rounded-xl border bg-slate-900 p-3 text-center transition-colors ${active('scanner_active') || active('product_scanned') ? 'border-blue-300/60' : 'border-slate-700'}`}>
                  <ScanLine className={`mx-auto h-5 w-5 ${reached('scanner_active') ? 'text-blue-300' : 'text-slate-500'}`} />
                  <p className="mt-2 text-xs font-semibold text-slate-200">Step 2</p>
                  <p className="text-xs text-slate-400">Scan Product</p>
                </div>
                <div className={`rounded-xl border bg-slate-900 p-3 text-center transition-colors ${reached('invoice_line_added') ? 'border-emerald-300/60' : 'border-slate-700'}`}>
                  <CheckCircle2 className={`mx-auto h-5 w-5 ${reached('invoice_line_added') ? 'text-emerald-300' : 'text-slate-500'}`} />
                  <p className="mt-2 text-xs font-semibold text-slate-200">Step 3</p>
                  <p className="text-xs text-slate-400">Invoice Updated</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-5">
                <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-950/80 p-3 lg:col-span-2">
                  <p className="text-xs font-semibold text-slate-400">Pairing QR</p>
                  <div className="mt-2 grid grid-cols-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => {
                      const on = i % 3 !== 0 && i % 7 !== 0;
                      return (
                        <span
                          key={i}
                          className={`h-3 w-3 rounded-[2px] ${on ? 'bg-slate-200' : 'bg-slate-700'} transition-colors ${reached('pairing_qr_visible') ? 'opacity-100' : 'opacity-40'}`}
                        />
                      );
                    })}
                  </div>
                  <AnimatePresence>
                    {(active('scanner_active') || active('product_scanned')) && (
                      <motion.div
                        initial={{ y: -70, opacity: 0 }}
                        animate={{ y: 72, opacity: 0.9 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="pointer-events-none absolute left-2 right-2 h-8 rounded-lg bg-gradient-to-b from-cyan-300/35 to-transparent"
                      />
                    )}
                  </AnimatePresence>
                  <p className="mt-2 text-[11px] text-slate-500">{reached('pairing_qr_visible') ? 'Scanner paired via QR' : 'Waiting to pair scanner'}</p>
                </div>

                <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-3 lg:col-span-3">
                  <p className="text-xs font-semibold text-slate-400">Invoice Form Demo</p>
                  <div className="mt-2 grid gap-2">
                    <div className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-slate-500">Customer</p>
                      <p className="text-xs text-slate-100">{reached('invoice_fields_fill') ? 'Acme Corp' : '—'}</p>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="col-span-2 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2">
                        <p className="text-[10px] uppercase tracking-wide text-slate-500">Item</p>
                        <p className="truncate text-xs text-slate-100">{productName}</p>
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2 text-center">
                        <p className="text-[10px] uppercase tracking-wide text-slate-500">Qty</p>
                        <AnimatePresence mode="wait">
                          <motion.p key={`qty-${qty}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-xs text-slate-100">
                            {qty}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2 text-right">
                        <p className="text-[10px] uppercase tracking-wide text-slate-500">Rate</p>
                        <AnimatePresence mode="wait">
                          <motion.p key={`rate-${rate}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-xs text-slate-100">
                            ₹{rate.toLocaleString('en-IN')}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2 text-right">
                        <p className="text-[10px] uppercase tracking-wide text-slate-500">GST</p>
                        <AnimatePresence mode="wait">
                          <motion.p key={`gst-rate-${gstRate}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-xs text-slate-100">
                            {gstRate}%
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2 text-xs">
                      <span className="text-slate-400">Subtotal ₹{subTotal.toLocaleString('en-IN')}</span>
                      <span className="text-slate-400">GST ₹{gstAmount.toLocaleString('en-IN')}</span>
                      <span className="font-semibold text-white">Total ₹{grandTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <AnimatePresence>
                      {reached('invoice_line_added') && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="rounded-lg border border-emerald-300/30 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-300"
                        >
                          Added to invoice
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-3">
                  <p className="text-xs font-semibold text-slate-500">Stock Movement</p>
                  <AnimatePresence mode="wait">
                    <motion.p key={`stock-${stockMovement}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-1 text-sm font-semibold text-slate-100">
                      {stockMovement}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-3">
                  <p className="text-xs font-semibold text-slate-500">Export</p>
                  <AnimatePresence mode="wait">
                    <motion.p key={`export-${exportLabel}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-1 text-sm font-semibold text-slate-100">
                      {exportLabel}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
