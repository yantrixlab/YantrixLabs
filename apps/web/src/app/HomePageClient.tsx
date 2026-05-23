"use client";

import { type CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  BarChart3,
  Shield,
  Zap,
  CheckCircle,
  Star,
  Rocket,
  ArrowRight,
  IndianRupee,
  Users,
  TrendingUp,
  LayoutDashboard,
  ShoppingCart,
  Building2,
  UtensilsCrossed,
  Car,
  MapPin,
  Briefcase,
  Settings,
  Smartphone,
  Cloud,
  Bot,
  Repeat,
  Link2,
  Headphones,
  Wrench,
} from "lucide-react";
import { useState, useEffect } from "react";
import HeroSection from "@/components/layout/HeroSection";
import ProcessSection from "@/components/layout/ProcessSection";
import {
  isAuthenticated,
  getUserData,
  apiFetch,
  isSafeImageUrl,
} from "@/lib/api";

const PRODUCTS = [
  {
    icon: FileText,
    title: "GST Invoice Tool",
    desc: "Professional GST billing, invoicing and compliance in one place.",
    href: "/services",
    color: "text-indigo-600",
    badge: "FREE",
  },
  {
    icon: Users,
    title: "Attendance System",
    desc: "Biometric and digital attendance tracking for teams.",
    href: "/services",
    color: "text-green-600",
    badge: "Coming Soon",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce Platform",
    desc: "Full-featured online store with payments and inventory.",
    href: "/services",
    color: "text-amber-600",
    badge: "Coming Soon",
  },
  {
    icon: Building2,
    title: "Hotel Booking",
    desc: "Property management and room booking for hospitality.",
    href: "/services",
    color: "text-blue-600",
    badge: "Coming Soon",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant POS",
    desc: "Order management and billing for F&B businesses.",
    href: "/services",
    color: "text-rose-600",
    badge: "Coming Soon",
  },
  {
    icon: Car,
    title: "Taxi Booking",
    desc: "Driver and ride management platform.",
    href: "/services",
    color: "text-purple-600",
    badge: "Coming Soon",
  },
  {
    icon: MapPin,
    title: "GPS Tracking",
    desc: "Real-time fleet tracking and route optimization.",
    href: "/services",
    color: "text-cyan-600",
    badge: "Coming Soon",
  },
  {
    icon: BarChart3,
    title: "CRM",
    desc: "Manage leads, customers, and sales pipelines.",
    href: "/services",
    color: "text-orange-600",
    badge: "Coming Soon",
  },
  {
    icon: Briefcase,
    title: "HRMS",
    desc: "HR, payroll, and employee lifecycle management.",
    href: "/services",
    color: "text-pink-600",
    badge: "Coming Soon",
  },
  {
    icon: Settings,
    title: "Custom ERP",
    desc: "Tailored enterprise systems built for your workflow.",
    href: "/services",
    color: "text-violet-600",
    badge: "Custom Build",
  },
];

const HOME_ANIMATED_LOGOS = [
  "chat-gpt.webp",
  "css.jpg",
  "java.jpg",
  "js.png",
  "kotlin.png",
  "next-js.png",
  "node-js.png",
  "python.png",
  "react.png",
];

const SERVICES = [
  {
    icon: Zap,
    title: "Web Apps",
    desc: "Fast, responsive web applications built to scale.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native and cross-platform apps for iOS and Android.",
  },
  {
    icon: Cloud,
    title: "SaaS Platforms",
    desc: "Multi-tenant SaaS with billing, auth, and admin built in.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboards",
    desc: "Data-rich dashboards for operations and analytics.",
  },
  {
    icon: Link2,
    title: "API Integrations",
    desc: "Connect your tools with third-party APIs and services.",
  },
  {
    icon: Bot,
    title: "AI Tools",
    desc: "Intelligent automation and AI-powered features.",
  },
  {
    icon: Repeat,
    title: "Automation Systems",
    desc: "Workflow automation to eliminate manual processes.",
  },
];

const WHY_US = [
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Ship production-ready software in weeks, not months.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: TrendingUp,
    title: "Scalable Architecture",
    desc: "Built to handle growth from 10 to 10 million users.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Star,
    title: "Clean UI/UX",
    desc: "Intuitive interfaces that users love from day one.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: IndianRupee,
    title: "SME-Friendly Pricing",
    desc: "Enterprise-quality software at startup-friendly costs.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Bank-grade security, GDPR-ready, and compliance-first.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    desc: "Dedicated support and maintenance after launch.",
    color: "bg-purple-50 text-purple-600",
  },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Sharma",
    business: "Sharma Electronics, Mumbai",
    avatar: "RS",
    quote:
      "Yantrix Labs built our invoicing system. It transformed how we operate. Incredibly fast and professional team!",
  },
  {
    name: "Priya Nair",
    business: "Priya Boutique, Bengaluru",
    avatar: "PN",
    quote:
      "The custom ecommerce platform they built grew our online revenue 3x in just 6 months. Highly recommend!",
  },
  {
    name: "Amit Patel",
    business: "AP Logistics, Ahmedabad",
    avatar: "AP",
    quote:
      "Their GPS tracking system gave us real-time visibility across our entire fleet. Absolute game changer for us.",
  },
];

const PROCESS = [
  { icon: Zap, title: "Idea", desc: "Understand your requirements" },
  { icon: LayoutDashboard, title: "Design", desc: "UI/UX wireframes and prototypes" },
  { icon: Wrench, title: "Develop", desc: "Clean, scalable code" },
  { icon: Rocket, title: "Launch", desc: "Deploy and go live" },
  { icon: Headphones, title: "Support", desc: "Ongoing maintenance" },
];

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

const CATEGORY_COLORS = [
  "bg-indigo-50 text-indigo-600",
  "bg-green-50 text-green-600",
  "bg-amber-50 text-amber-600",
  "bg-blue-50 text-blue-600",
  "bg-rose-50 text-rose-600",
  "bg-purple-50 text-purple-600",
  "bg-cyan-50 text-cyan-600",
  "bg-orange-50 text-orange-600",
  "bg-pink-50 text-pink-600",
  "bg-violet-50 text-violet-600",
];
function getColorForIndex(idx: number) {
  return CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
}
const ICON_GRADIENTS = [
  "linear-gradient(135deg,#eef2ff 0%,#c7d2fe 100%)",
  "linear-gradient(135deg,#f0fdf4 0%,#bbf7d0 100%)",
  "linear-gradient(135deg,#fffbeb 0%,#fde68a 100%)",
  "linear-gradient(135deg,#eff6ff 0%,#bfdbfe 100%)",
  "linear-gradient(135deg,#fff1f2 0%,#fecdd3 100%)",
  "linear-gradient(135deg,#faf5ff 0%,#e9d5ff 100%)",
  "linear-gradient(135deg,#ecfeff 0%,#a5f3fc 100%)",
  "linear-gradient(135deg,#fff7ed 0%,#fed7aa 100%)",
  "linear-gradient(135deg,#fdf2f8 0%,#fbcfe8 100%)",
  "linear-gradient(135deg,#f5f3ff 0%,#ddd6fe 100%)",
];
const CARD_GRADIENTS = [
  "linear-gradient(135deg,#ffffff 0%,#f8f7ff 100%)",
  "linear-gradient(135deg,#ffffff 0%,#f5f8ff 100%)",
  "linear-gradient(135deg,#ffffff 0%,#f7fff9 100%)",
  "linear-gradient(135deg,#ffffff 0%,#f5f8ff 100%)",
  "linear-gradient(135deg,#ffffff 0%,#fff7f8 100%)",
  "linear-gradient(135deg,#ffffff 0%,#faf5ff 100%)",
  "linear-gradient(135deg,#ffffff 0%,#f0fdff 100%)",
  "linear-gradient(135deg,#ffffff 0%,#fff8f0 100%)",
  "linear-gradient(135deg,#ffffff 0%,#fff5fb 100%)",
  "linear-gradient(135deg,#ffffff 0%,#f5f3ff 100%)",
];
function getIconGradient(idx: number) {
  return ICON_GRADIENTS[idx % ICON_GRADIENTS.length];
}
function getCardGradient(idx: number) {
  return CARD_GRADIENTS[idx % CARD_GRADIENTS.length];
}
function getProductBadgeClass(badge: string): string {
  if (badge === "FREE" || badge === "Free")
    return "border-emerald-200/80 text-emerald-700";
  if (badge === "Live") return "border-indigo-200/80 text-indigo-700";
  if (badge === "Custom Build") return "border-violet-200/80 text-violet-700";
  return "border-gray-200/80 text-gray-500";
}
function getProductBadgeStyle(badge: string): CSSProperties {
  if (badge === "FREE" || badge === "Free")
    return {
      background: "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    };
  if (badge === "Live")
    return {
      background: "linear-gradient(135deg,#eef2ff 0%,#e0e7ff 100%)",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    };
  if (badge === "Custom Build")
    return {
      background: "linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    };
  return { background: "#f9fafb" };
}

interface CMSTool {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  logoUrl: string | null;
  category: string | null;
  toolType: string;
  featured: boolean;
  pricingType: string;
  ctaText: string | null;
  ctaUrl: string | null;
  viewCount: number;
}

function getCmsToolHref(tool: CMSTool): string {
  if (tool.ctaUrl) return tool.ctaUrl;
  if (tool.toolType === "COMING_SOON") return "/contact";
  return `/services`;
}

const HOME_HEADER_DEFAULTS = {
  badgeText: "",
  titleLine1: "",
  titleGradientText: "",
  description: "",
  primaryBtnLabel: "",
  secondaryBtnLabel: "",
  stat1Value: "0",
  stat1Label: "",
  stat2Value: "0",
  stat2Label: "",
  stat3Value: "0",
  stat3Label: "",
};

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [initials, setInitials] = useState("");
  const [businessLogo, setBusinessLogo] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [cmsTools, setCmsTools] = useState<CMSTool[]>([]);
  const [toolsLoading, setToolsLoading] = useState(true);
  const [homeHeader, setHomeHeader] = useState(HOME_HEADER_DEFAULTS);
  const [homeHeaderLoading, setHomeHeaderLoading] = useState(true);
  const [homeAnimatedLogos, setHomeAnimatedLogos] =
    useState<string[]>(HOME_ANIMATED_LOGOS);
  const businessCount = Number.parseInt(homeHeader.stat2Value || "", 10);
  const trustedText =
    businessCount && businessCount > 0
      ? `Trusted by ${businessCount}+ businesses across India`
      : "Growing GST invoicing platform for Indian businesses";

  useEffect(() => {
    fetch(`${API_URL}/tools?limit=12`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.data) && d.data.length > 0)
          setCmsTools(d.data);
      })
      .catch(() => {})
      .finally(() => setToolsLoading(false));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/settings/home-header`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((d) => {
        if (d.success && d.data) {
          const data = d.data;
          setHomeHeader({
            badgeText: data.badgeText || "",
            titleLine1: data.titleLine1 || "",
            titleGradientText: data.titleGradientText || "",
            description: data.description || "",
            primaryBtnLabel: data.primaryBtnLabel || "",
            secondaryBtnLabel: data.secondaryBtnLabel || "",
            stat1Value: data.stat1Value || "0",
            stat1Label: data.stat1Label || "",
            stat2Value: data.stat2Value || "0",
            stat2Label: data.stat2Label || "",
            stat3Value: data.stat3Value || "0",
            stat3Label: data.stat3Label || "",
          });
        }
      })
      .catch(() => {})
      .finally(() => setHomeHeaderLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/home-logos", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.success && Array.isArray(d.data) && d.data.length > 0) {
          setHomeAnimatedLogos(d.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) return;
    setLoggedIn(true);
    const tokenData = getUserData();
    const displayName = tokenData.name || "User";
    setInitials(
      displayName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    );

    apiFetch("/auth/me")
      .then((res: any) => {
        if (res.data?.user?.name) {
          const name = res.data.user.name;
          setInitials(
            name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2),
          );
        }
        const biz = res.data?.memberships?.[0]?.business;
        if (
          biz?.logo &&
          typeof biz.logo === "string" &&
          isSafeImageUrl(biz.logo)
        ) {
          setBusinessLogo(biz.logo);
        }
        if (biz?.name) setBusinessName(biz.name);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* â”€â”€â”€ Navbar + Hero (premium dark) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <HeroSection
        homeHeader={{ ...homeHeader, badgeText: trustedText }}
        homeHeaderLoading={homeHeaderLoading}
        loggedIn={loggedIn}
        businessLogo={businessLogo}
        businessName={businessName}
        initials={initials}
      />

      {/* â”€â”€â”€ TRUST STRIP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-16 bg-[#eef2f7] border-y border-gray-200 overflow-hidden">
        <div className="container-wide text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8">
            We use these technologies to build our products and power our
            clients' businesses
          </p>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {homeAnimatedLogos.map((logo, idx) => {
              const baseFloat = 10 + (idx % 3) * 4;
              const duration = 3.4 + (idx % 4) * 0.45;
              const brand = logo
                .replace(/\.[^/.]+$/, "")
                .replace(/[-_]/g, " ")
                .toUpperCase();

              return (
                <motion.div
                  key={logo}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-200 bg-white p-3 shadow-sm"
                  style={{
                    boxShadow:
                      "0 8px 22px rgba(15,23,42,0.07), 0 2px 6px rgba(15,23,42,0.05)",
                  }}
                >
                  <motion.img
                    src={`/home_animated_logos/${logo}`}
                    alt={`${brand} logo`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    animate={{ y: [0, -baseFloat, 0] }}
                    transition={{
                      duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.08 + 0.2,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ FEATURED PRODUCT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0c0a1e 0%, #12103a 35%, #0d1b3e 70%, #0a1628 100%)",
        }}
      >
        {/* Ambient glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-32 left-1/4 h-[520px] w-[520px] rounded-full opacity-25 blur-[120px]"
            style={{
              background: "radial-gradient(circle, #0066FF, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/2 -right-16 h-[280px] w-[280px] rounded-full opacity-15 blur-[80px]"
            style={{
              background: "radial-gradient(circle, #06b6d4, transparent 70%)",
            }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.032]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.8) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            {/* â”€â”€ LEFT: Content â”€â”€ */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-7"
              >
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
                  style={{
                    background: "rgba(99,102,241,0.12)",
                    color: "#a5b4fc",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <Star className="h-3 w-3 fill-current" />
                  Featured Product
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.65 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.1] tracking-tight text-white mb-5"
              >
                GST Invoice Tool -{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #818cf8 0%, #c084fc 55%, #67e8f9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Billing Made Effortless
                </span>
              </motion.h2>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed mb-10 max-w-md"
                style={{ color: "rgba(203,213,225,0.80)" }}
              >
                Create GST-compliant invoices in seconds. Automate tax
                calculations, track payments, and manage billing with
                confidence.
              </motion.p>

              {/* Feature bullets */}
              <ul className="space-y-3.5 mb-12">
                {[
                  {
                    icon: Zap,
                    label: "Instant GST invoicing (CGST/SGST/IGST)",
                    iconColor: "#fbbf24",
                    iconBg: "rgba(251,191,36,0.10)",
                    iconBorder: "rgba(251,191,36,0.22)",
                  },
                  {
                    icon: CheckCircle,
                    label: "Auto tax calculations",
                    iconColor: "#34d399",
                    iconBg: "rgba(52,211,153,0.10)",
                    iconBorder: "rgba(52,211,153,0.22)",
                  },
                  {
                    icon: IndianRupee,
                    label: "Payment reminders & tracking",
                    iconColor: "#818cf8",
                    iconBg: "rgba(129,140,248,0.10)",
                    iconBorder: "rgba(129,140,248,0.22)",
                  },
                  {
                    icon: TrendingUp,
                    label: "Fast export & sharing",
                    iconColor: "#67e8f9",
                    iconBg: "rgba(103,232,249,0.10)",
                    iconBorder: "rgba(103,232,249,0.22)",
                  },
                  {
                    icon: Smartphone,
                    label: "QR Scanner for Android",
                    iconColor: "#38bdf8",
                    iconBg: "rgba(56,189,248,0.10)",
                    iconBorder: "rgba(56,189,248,0.22)",
                  },
                ].map((f, i) => (
                  <motion.li
                    key={f.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.38 + i * 0.09,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3.5"
                  >
                    <span
                      className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg"
                      style={{
                        background: f.iconBg,
                        border: `1px solid ${f.iconBorder}`,
                      }}
                    >
                      <f.icon
                        className="h-4 w-4"
                        style={{ color: f.iconColor }}
                      />
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: "rgba(226,232,240,0.90)" }}
                    >
                      {f.label}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/gst-invoice"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  style={{
                    background:
                      "linear-gradient(135deg, #0066FF 0%, #0052CC 50%, #003D99 100%)",
                    boxShadow:
                      "0 0 0 1px rgba(139,92,246,0.35), 0 0 36px rgba(99,102,241,0.50), 0 8px 24px rgba(99,102,241,0.28)",
                  }}
                >
                  {/* Shimmer sweep */}
                  <span
                    className="pointer-events-none absolute inset-0 animate-shimmer"
                    style={{
                      backgroundImage:
                        "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)",
                      backgroundSize: "250% 100%",
                    }}
                  />
                  <Rocket className="relative h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="relative">Launch App</span>
                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            {/* â”€â”€ RIGHT: Dashboard Mockup â”€â”€ */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Float wrapper */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Outer glow ring */}
                <div
                  className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, #0066FF 0%, #3385FF 50%, #0052CC 100%)",
                  }}
                />

                {/* Glass card */}
                <div
                  className="relative rounded-2xl border border-white/10 p-5 overflow-hidden"
                  style={{
                    background: "rgba(12, 10, 36, 0.75)",
                    backdropFilter: "blur(24px)",
                    boxShadow:
                      "0 30px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Inner top highlight line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.7) 30%, rgba(139,92,246,0.7) 70%, transparent 100%)",
                    }}
                  />

                  {/* Browser bar */}
                  <div className="flex items-center gap-1.5 mb-5">
                    <div className="h-3 w-3 rounded-full bg-red-500/70" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <div className="h-3 w-3 rounded-full bg-green-500/70" />
                    <div
                      className="ml-3 flex items-center gap-1.5 rounded-md px-3 py-1 text-xs"
                      style={{
                        background: "rgba(99,102,241,0.08)",
                        border: "1px solid rgba(99,102,241,0.18)",
                        color: "rgba(165,180,252,0.55)",
                      }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400/60" />
                      app.yantrixlab.com/dashboard
                    </div>
                  </div>

                  {/* Stat cards */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      {
                        label: "Revenue",
                        value: "Rs 4,82,500",
                        trend: "+12.4%",
                        up: true,
                        bg: "rgba(99,102,241,0.18)",
                        border: "rgba(99,102,241,0.25)",
                        trendColor: "#34d399",
                      },
                      {
                        label: "Invoices",
                        value: "247 sent",
                        trend: "+8 today",
                        up: true,
                        bg: "rgba(16,185,129,0.15)",
                        border: "rgba(16,185,129,0.22)",
                        trendColor: "#34d399",
                      },
                      {
                        label: "Customers",
                        value: "89 active",
                        trend: "+3 new",
                        up: true,
                        bg: "rgba(14,165,233,0.15)",
                        border: "rgba(14,165,233,0.22)",
                        trendColor: "#34d399",
                      },
                      {
                        label: "Pending",
                        value: "Rs 38,200",
                        trend: "3 due",
                        up: false,
                        bg: "rgba(245,158,11,0.15)",
                        border: "rgba(245,158,11,0.22)",
                        trendColor: "#fbbf24",
                      },
                    ].map((s, i) => (
                      <motion.div
                        key={s.label}
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.07, duration: 0.45 }}
                        viewport={{ once: true }}
                        className="rounded-xl p-3.5"
                        style={{
                          background: s.bg,
                          border: `1px solid ${s.border}`,
                        }}
                      >
                        <p
                          className="text-xs mb-1"
                          style={{ color: "rgba(255,255,255,0.50)" }}
                        >
                          {s.label}
                        </p>
                        <p className="text-sm font-bold text-white mb-1.5">
                          {s.value}
                        </p>
                        <span
                          className="text-[10px] font-semibold"
                          style={{ color: s.trendColor }}
                        >
                          {s.up ? "Up" : "Flat"} {s.trend}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mini bar chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.45 }}
                    viewport={{ once: true }}
                    className="rounded-xl p-3.5 mb-4"
                    style={{
                      background: "rgba(99,102,241,0.06)",
                      border: "1px solid rgba(99,102,241,0.14)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p
                        className="text-xs font-semibold"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        Revenue Trend
                      </p>
                      <span
                        className="text-[10px] font-semibold"
                        style={{ color: "#34d399" }}
                      >
                        Up Last 7 days
                      </span>
                    </div>
                    <div className="flex items-end gap-1.5 h-14">
                      {[35, 55, 45, 70, 60, 88, 78].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm animate-pulse-soft"
                          style={{
                            height: `${h}%`,
                            background:
                              i === 5
                                ? "linear-gradient(180deg, #66A3FF 0%, #0066FF 100%)"
                                : "rgba(99,102,241,0.28)",
                            animationDelay: `${i * 0.18}s`,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Recent Invoices */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.62, duration: 0.45 }}
                    viewport={{ once: true }}
                    className="rounded-xl p-3.5"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold mb-3"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      Recent Invoices
                    </p>
                    <div className="space-y-2.5">
                      {[
                        {
                          name: "Acme Corp",
                          amount: "Rs 25,900",
                          status: "Paid",
                          statusColor: "#34d399",
                          statusBg: "rgba(52,211,153,0.12)",
                          statusBorder: "rgba(52,211,153,0.25)",
                        },
                        {
                          name: "Sharma Ent.",
                          amount: "Rs 12,400",
                          status: "Sent",
                          statusColor: "#38bdf8",
                          statusBg: "rgba(56,189,248,0.12)",
                          statusBorder: "rgba(56,189,248,0.25)",
                        },
                        {
                          name: "Patel Co.",
                          amount: "Rs 8,500",
                          status: "Draft",
                          statusColor: "#94a3b8",
                          statusBg: "rgba(148,163,184,0.10)",
                          statusBorder: "rgba(148,163,184,0.20)",
                        },
                      ].map((inv, i) => (
                        <motion.div
                          key={inv.name}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.68 + i * 0.07 }}
                          viewport={{ once: true }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="h-6 w-6 rounded-md flex items-center justify-center text-[9px] font-bold"
                              style={{
                                background: "rgba(99,102,241,0.18)",
                                color: "rgba(165,180,252,0.8)",
                              }}
                            >
                              {inv.name.charAt(0)}
                            </div>
                            <span
                              className="text-xs font-medium"
                              style={{ color: "rgba(255,255,255,0.70)" }}
                            >
                              {inv.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs font-semibold text-white">
                              {inv.amount}
                            </span>
                            <span
                              className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                              style={{
                                color: inv.statusColor,
                                background: inv.statusBg,
                                border: `1px solid ${inv.statusBorder}`,
                              }}
                            >
                              {inv.status}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ PRODUCTS GRID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Products &amp; Tools
            </h2>
            <p className="text-xl text-gray-600">
              Ready-to-deploy software for every business need
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsLoading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={`tool-skeleton-${idx}`}
                    className="rounded-2xl border border-gray-100/80 p-6"
                    style={{
                      background: getCardGradient(idx),
                      boxShadow:
                        "0 1px 4px 0 rgb(0 0 0/0.06),0 1px 2px -1px rgb(0 0 0/0.04)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="h-12 w-12 skeleton rounded-xl" />
                      <div className="h-7 w-24 skeleton rounded-full" />
                    </div>
                    <div className="h-6 w-2/3 skeleton mb-3" />
                    <div className="h-4 w-full skeleton mb-2" />
                    <div className="h-4 w-5/6 skeleton mb-6" />
                    <div className="h-5 w-28 skeleton" />
                  </div>
                ))
              : cmsTools.length > 0
                ? cmsTools.map((tool, idx) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="group relative flex flex-col rounded-2xl border border-gray-100/80 p-6 overflow-hidden transition-all duration-[220ms] ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-100/80"
                      style={{
                        background: getCardGradient(idx),
                        boxShadow:
                          "0 1px 4px 0 rgb(0 0 0/0.06),0 1px 2px -1px rgb(0 0 0/0.04)",
                      }}
                    >
                      {/* Top highlight line */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent" />
                      {/* Corner radial glow */}
                      <div
                        className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-[220ms]"
                        style={{
                          background:
                            "radial-gradient(circle,rgba(99,102,241,0.10) 0%,transparent 70%)",
                        }}
                      />

                      {/* Header: icon + badge */}
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden flex-shrink-0 transition-transform duration-[220ms] group-hover:scale-105 ${getColorForIndex(idx)}`}
                          style={{
                            background: getIconGradient(idx),
                            boxShadow:
                              "inset 0 1px 2px rgba(0,0,0,0.07),0 1px 3px rgba(0,0,0,0.06)",
                          }}
                        >
                          {tool.logoUrl && isSafeImageUrl(tool.logoUrl) ? (
                            <img
                              src={tool.logoUrl}
                              alt={tool.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Wrench className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {tool.featured && (
                            <span
                              className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200/80 text-amber-600"
                              style={{
                                background:
                                  "linear-gradient(135deg,#fffbeb 0%,#fef3c7 100%)",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                              }}
                            >
                              Featured
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border ${
                              tool.toolType === "COMING_SOON"
                                ? "bg-gray-50 border-gray-200/80 text-gray-500"
                                : tool.pricingType === "FREE"
                                  ? "border-emerald-200/80 text-emerald-700"
                                  : "border-indigo-200/80 text-indigo-700"
                            }`}
                            style={
                              tool.toolType !== "COMING_SOON"
                                ? tool.pricingType === "FREE"
                                  ? {
                                      background:
                                        "linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)",
                                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    }
                                  : {
                                      background:
                                        "linear-gradient(135deg,#eef2ff 0%,#e0e7ff 100%)",
                                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    }
                                : {}
                            }
                          >
                            {tool.toolType === "COMING_SOON"
                              ? "Coming Soon"
                              : tool.pricingType}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-[18px] font-bold text-gray-900 mb-2 leading-snug tracking-tight">
                        {tool.title}
                      </h3>
                      {/* Description */}
                      <p className="text-gray-500 text-[13.5px] leading-relaxed flex-1 mb-5">
                        {tool.shortDescription || ""}
                      </p>

                      {/* CTA */}
                      <Link
                        href={getCmsToolHref(tool)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-[220ms]"
                      >
                        {tool.toolType === "COMING_SOON"
                          ? "Get Notified"
                          : tool.ctaText || "Launch Tool"}
                        <ArrowRight className="h-4 w-4 transition-transform duration-[220ms] group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  ))
                : PRODUCTS.map((product, idx) => (
                    <motion.div
                      key={product.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="group relative flex flex-col rounded-2xl border border-gray-100/80 p-6 overflow-hidden transition-all duration-[220ms] ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-100/80"
                      style={{
                        background: getCardGradient(idx),
                        boxShadow:
                          "0 1px 4px 0 rgb(0 0 0/0.06),0 1px 2px -1px rgb(0 0 0/0.04)",
                      }}
                    >
                      {/* Top highlight line */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent" />
                      {/* Corner radial glow */}
                      <div
                        className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-[220ms]"
                        style={{
                          background:
                            "radial-gradient(circle,rgba(99,102,241,0.10) 0%,transparent 70%)",
                        }}
                      />

                      {/* Header: icon + badge */}
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 transition-transform duration-[220ms] group-hover:scale-105 ${product.color}`}
                          style={{
                            background: getIconGradient(idx),
                            boxShadow:
                              "inset 0 1px 2px rgba(0,0,0,0.07),0 1px 3px rgba(0,0,0,0.06)",
                          }}
                        >
                          <product.icon className="h-5 w-5" />
                        </div>
                        <span
                          className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border ${getProductBadgeClass(product.badge)}`}
                          style={getProductBadgeStyle(product.badge)}
                        >
                          {product.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[18px] font-bold text-gray-900 mb-2 leading-snug tracking-tight">
                        {product.title}
                      </h3>
                      {/* Description */}
                      <p className="text-gray-500 text-[13.5px] leading-relaxed flex-1 mb-5">
                        {product.desc}
                      </p>

                      {/* CTA */}
                      <Link
                        href={product.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-[220ms]"
                      >
                        {product.badge === "Coming Soon"
                          ? "Get Notified"
                          : product.badge === "Custom Build"
                            ? "Build Custom"
                            : "Launch Tool"}
                        <ArrowRight className="h-4 w-4 transition-transform duration-[220ms] group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ SERVICES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-gray-50">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We Build Custom Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Have a unique requirement? We design and build from scratch.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {SERVICES.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <s.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Talk to Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ WHY CHOOSE US â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why businesses choose Yantrix Labs
            </h2>
            <p className="text-xl text-gray-600">
              We combine startup speed with enterprise quality.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.color} mb-4`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ PROCESS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <ProcessSection steps={PROCESS} />

      {/* â”€â”€â”€ TESTIMONIALS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by business owners
            </h2>
            <p className="text-xl text-gray-600">
              What our clients say about working with us
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {t.name}
                    </p>
                    <p className="text-gray-500 text-xs">{t.business}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ FINAL CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-gradient-to-br from-brand-600 to-brand-900">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-indigo-300 font-semibold uppercase tracking-widest text-sm mb-4">
              Need software for your business?
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Let&apos;s build it.
            </h2>
            <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
              We work with startups, SMEs, and enterprises to create digital
              products that drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-indigo-600 hover:bg-indigo-50 transition-all shadow-lg"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-400 px-8 py-4 text-base font-semibold text-white hover:bg-indigo-500/20 transition-all"
              >
                Explore Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€â”€ Footer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="container-wide">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <img
                  src="/app_logo.png"
                  alt="Yantrix Labs"
                  className="h-8 w-8 rounded-lg object-contain"
                />
                <span className="text-xl font-bold text-white">
                  Yantrix Labs
                </span>
              </Link>
              <p className="text-sm leading-relaxed mb-4">
                We build smart digital products and business tools for startups,
                SMEs, and enterprises.
              </p>
              <p className="text-xs">Made with care in India</p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Products</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors"
                  >
                    GST Invoice Tool
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors"
                  >
                    Custom Development
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Company</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              Copyright {new Date().getFullYear()} Yantrix Labs. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

