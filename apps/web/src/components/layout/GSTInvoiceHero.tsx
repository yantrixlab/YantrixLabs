'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, QrCode, ScanLine, Smartphone, Zap } from 'lucide-react';
import { isAuthenticated } from '@/lib/api';
import { enableGuestMode } from '@/lib/guestMode';

export default function GSTInvoiceHero() {
  const router = useRouter();

  const handleTryDemo = () => {
    if (!isAuthenticated()) enableGuestMode();
    router.push(isAuthenticated() ? '/dashboard' : '/dashboard?guest=1');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8f8ff] via-[#f2f1ff] to-[#ecebff]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 12% 10%, rgba(124,58,237,0.16), transparent 32%), radial-gradient(circle at 90% 20%, rgba(14,165,233,0.14), transparent 38%)',
        }}
      />
      <div className="container-wide relative py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-700">
              <Zap className="h-3.5 w-3.5" />
              India&apos;s Smart GST Billing Scanner System
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Scan Products Directly
              <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Into GST Invoices
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Connect any Android phone instantly using QR pairing. No login. No setup. No barcode machine required.
            </p>
            <p className="mt-3 text-sm font-medium text-slate-500">
              Pair with QR, scan products, and watch invoice rows update in real time.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleTryDemo}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-300/50 transition hover:brightness-110"
              >
                Try Live Demo
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/scanner"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-white px-7 py-3.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
              >
                Download Scanner APK
                <Smartphone className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-indigo-100 bg-white p-4 shadow-2xl shadow-indigo-200/50"
          >
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">Live Scanner Workflow</p>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">Connected</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-violet-200 bg-white p-3 text-center">
                  <QrCode className="mx-auto h-5 w-5 text-violet-600" />
                  <p className="mt-2 text-xs font-semibold text-slate-700">Step 1</p>
                  <p className="text-xs text-slate-500">Scan Pair QR</p>
                </div>
                <div className="rounded-xl border border-cyan-200 bg-white p-3 text-center">
                  <ScanLine className="mx-auto h-5 w-5 text-cyan-600" />
                  <p className="mt-2 text-xs font-semibold text-slate-700">Step 2</p>
                  <p className="text-xs text-slate-500">Scan Product</p>
                </div>
                <div className="rounded-xl border border-indigo-200 bg-white p-3 text-center">
                  <CheckCircle2 className="mx-auto h-5 w-5 text-indigo-600" />
                  <p className="mt-2 text-xs font-semibold text-slate-700">Step 3</p>
                  <p className="text-xs text-slate-500">Invoice Updated</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-xs font-semibold text-slate-500">Recent Scan</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Premium Packaging Box</span>
                  <span className="font-semibold text-slate-900">Rs 1,200</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span>GST 18% • Qty 1</span>
                  <span className="text-emerald-600 font-semibold">Added to invoice</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

