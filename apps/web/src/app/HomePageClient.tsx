"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  FileText,
  Layers3,
  LineChart,
  Lock,
  QrCode,
  ReceiptIndianRupee,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, title: "GST Compliant", desc: "Built for Indian GST invoicing workflows" },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Create invoices on Android, iPhone, and desktop" },
  { icon: Zap, title: "Fast Generation", desc: "Generate professional invoices in seconds" },
  { icon: Lock, title: "Secure Cloud Storage", desc: "Your invoice data stays safe and synced" },
];

const featureItems = [
  { icon: FileText, title: "Free GST Invoice Creation", desc: "Create unlimited GST invoices without setup complexity." },
  { icon: ReceiptIndianRupee, title: "GST Calculation Automation", desc: "Auto-calculate CGST, SGST, and IGST with clean tax breakup." },
  { icon: WalletCards, title: "Professional Templates", desc: "Use polished invoice templates designed for Indian businesses." },
  { icon: CheckCircle2, title: "PDF Export", desc: "Download and share tax-ready GST invoices in PDF instantly." },
  { icon: Users, title: "Customer Management", desc: "Save customer details and reuse them for faster billing." },
  { icon: QrCode, title: "QR + Business Details", desc: "Attach business profile, payment details, and QR codes." },
  { icon: Layers3, title: "Invoice History", desc: "Track and retrieve all your past invoices anytime." },
  { icon: ShieldCheck, title: "Cloud-Backed Security", desc: "Reliable storage and access across your devices." },
];

const automationItems = [
  "Mobile apps for field and in-store teams",
  "Web dashboards for operations and finance",
  "Workflow automation to reduce manual work",
  "AI-ready architecture for future expansion",
  "Business-focused product engineering",
];

const ecosystemItems = [
  { name: "Yantrix Invoice", state: "Live" },
  { name: "Yantrix Inventory", state: "Coming Soon" },
  { name: "Yantrix Expense", state: "Coming Soon" },
  { name: "Yantrix Analytics", state: "Coming Soon" },
  { name: "Yantrix POS", state: "Coming Soon" },
];

const faqItems = [
  {
    q: "What is a GST invoice?",
    a: "A GST invoice is a tax-compliant bill that includes supplier and buyer details, item values, GST rates, and tax amounts required under Indian GST rules.",
  },
  {
    q: "Is this GST invoice generator free?",
    a: "Yes. Free GST Invoice is designed to let Indian businesses create professional GST invoices at no cost.",
  },
  {
    q: "Can I download GST invoices as PDF?",
    a: "Yes. You can export every GST invoice as a clean, shareable PDF in one click.",
  },
  {
    q: "Is this suitable for small businesses?",
    a: "Yes. It is built for Indian small businesses, shops, freelancers, startups, distributors, and service providers.",
  },
  {
    q: "Does it support CGST, SGST, and IGST?",
    a: "Yes. The system supports GST calculation flows including CGST, SGST, and IGST formats.",
  },
  {
    q: "Can I use it on mobile?",
    a: "Yes. The app is mobile friendly and works smoothly on Android and iPhone browsers.",
  },
];

export default function HomePageClient() {
  return (
    <main className="bg-[#f7f9fc] text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-[#0a1224] via-[#111b35] to-[#182848] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, rgba(59,130,246,0.35), transparent 35%), radial-gradient(circle at 80% 30%, rgba(16,185,129,0.24), transparent 40%)",
          }}
        />
        <div className="container-wide relative py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-1 text-xs font-semibold tracking-wide text-sky-100">
                <Sparkles className="h-3.5 w-3.5" />
                Business Automation for Modern India
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Free GST Invoice Generator for Indian Businesses
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                Create professional GST invoices in seconds. Built for growing Indian businesses.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0ea5e9] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-950/30 transition hover:bg-sky-400"
                >
                  Start Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/tools/gst-invoice"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View Demo
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur"
            >
              <div className="rounded-2xl border border-slate-200/70 bg-white p-5 text-slate-900">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">Invoice Dashboard</p>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">GST Ready</span>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl bg-slate-100 p-3">
                    <p className="text-xs text-slate-500">Invoice #</p>
                    <p className="text-sm font-semibold">YAN-2026-0042</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-100 p-3">
                      <p className="text-xs text-slate-500">Subtotal</p>
                      <p className="text-sm font-semibold">Rs 18,750</p>
                    </div>
                    <div className="rounded-xl bg-slate-100 p-3">
                      <p className="text-xs text-slate-500">GST</p>
                      <p className="text-sm font-semibold">Rs 3,375</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-sky-100 bg-sky-50 p-3">
                    <p className="text-xs text-sky-700">Total Amount</p>
                    <p className="text-lg font-bold text-sky-950">Rs 22,125</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-12">
        <div className="container-wide grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 p-5">
              <item.icon className="h-5 w-5 text-sky-600" />
              <h2 className="mt-3 text-base font-semibold">{item.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-wide">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Built for fast, accurate GST billing</h2>
            <p className="mt-3 text-slate-600">
              Free GST invoice creation with modern workflows for Indian small businesses and growing teams.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featureItems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <item.icon className="h-5 w-5 text-[#0f766e]" />
                <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f172a] py-16 text-white sm:py-20">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Why Yantrix Labs</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              We do not just build apps. We build business automation systems.
            </h2>
            <p className="mt-4 text-slate-300">
              Yantrix Labs is positioned as a scalable Indian SaaS company focused on operational software for growth-stage businesses.
            </p>
          </div>
          <div className="space-y-3">
            {automationItems.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4">
                <BadgeCheck className="mt-0.5 h-5 w-5 text-emerald-300" />
                <p className="text-sm text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-wide">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Yantrix Product Ecosystem</h2>
            <p className="mt-3 text-slate-600">From GST billing to complete business automation software.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ecosystemItems.map((item) => (
              <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                  <Building2 className="h-5 w-5 text-slate-700" />
                </div>
                <h3 className="mt-3 text-sm font-semibold">{item.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{item.state}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="container-wide">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">GST Invoice FAQ</h2>
            <p className="mt-3 text-slate-600">
              Answers for business owners searching for free GST billing software in India.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4">
            {faqItems.map((item) => (
              <details key={item.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <summary className="cursor-pointer list-none text-base font-semibold">{item.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b3b5a] to-[#0e7490] py-16 text-white sm:py-20">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Start Creating GST Invoices for Free</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-100">
            Use a fast, modern, and secure GST invoice generator built for Indian businesses.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0b3b5a] transition hover:bg-slate-100"
            >
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools/gst-invoice"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Demo
            </Link>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-cyan-100">
            <LineChart className="h-4 w-4" />
            Smart Software for Growing Businesses
          </p>
        </div>
      </section>
    </main>
  );
}
