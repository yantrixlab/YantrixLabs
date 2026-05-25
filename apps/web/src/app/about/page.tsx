'use client';

import { PublicLayout } from '@/components/layout/PublicLayout';
import { Users, Target, Heart, Award, TrendingUp, Globe, LayoutDashboard, ShoppingCart, CalendarCheck, UtensilsCrossed, MapPin, Car, ScanFace, UserCog, Receipt, Workflow, BrainCircuit, Smartphone, Wrench, CheckCircle2 } from 'lucide-react';
const ABOUT_STATS = [
  { value: '6+', label: 'Years of Product Building' },
  { value: '40+', label: 'Business Solutions Delivered' },
  { value: '15+', label: 'Industries Served' },
  { value: '100%', label: 'Custom Build Focus' },
];

const TEAM: Array<{ id: string; name: string; role: string; bio: string; imageUrl: string | null }> = [
  { id: 'team-1', name: 'Yantrix Labs Team', role: 'Product & Engineering', bio: 'A focused team building practical, scalable software systems for Indian businesses.', imageUrl: null },
  { id: 'team-2', name: 'UI/UX Unit', role: 'Design & Experience', bio: 'Designing clear interfaces that reduce manual work and speed up operations.', imageUrl: null },
  { id: 'team-3', name: 'Backend Unit', role: 'Systems & Automation', bio: 'Building secure APIs, automation pipelines, and reliable business logic.', imageUrl: null },
  { id: 'team-4', name: 'Support Unit', role: 'Delivery & Care', bio: 'Ensuring smooth launches and responsive support for every implementation.', imageUrl: null },
];

const AVATAR_COLORS = [
  'from-indigo-500 to-purple-600',
  'from-pink-500 to-rose-600',
  'from-amber-500 to-orange-600',
  'from-green-500 to-teal-600',
  'from-blue-500 to-cyan-600',
  'from-violet-500 to-purple-600',
];

const VALUES = [
  {
    icon: Target,
    title: 'Simplicity First',
    description: 'We believe accounting software shouldn\'t require an accountant to operate. Every feature is designed for a non-expert.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Heart,
    title: 'Built for India',
    description: 'Not a Western product retrofitted for India. Yantrix was built ground-up for Indian GST, Indian businesses, and Indian challenges.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Award,
    title: 'Quality Without Compromise',
    description: 'We obsess over code quality, performance, and UX. Every product we ship is something we are proud to put our name on.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Users,
    title: 'Customer Obsessed',
    description: 'We answer support queries in under 2 hours. Your success is our success — especially during GST filing season.',
    color: 'bg-green-50 text-green-600',
  },
];

const MILESTONES = [
  { year: '2019', event: 'Started the development journey with Android Studio, building native Android applications using Java/XML and learning real-world app architecture.' },
  { year: '2020', event: 'Expanded into React Native CLI and cross-platform mobile app development. Began delivering custom apps for businesses and internal operations.' },
  { year: '2021', event: 'Moved into full-stack web development, backend systems, databases, admin panels, and scalable web applications for growing businesses.' },
  { year: '2022', event: 'Built multiple business solutions including ecommerce platforms, booking systems, billing tools, and custom management software.' },
  { year: '2023', event: 'Focused on SaaS product development, dashboards, automation systems, CRM tools, and operational software for SMEs and startups.' },
  { year: '2024', event: 'Launched advanced solutions including GPS tracking systems, taxi booking apps, restaurant platforms, hotel booking systems, and workforce tools.' },
  { year: '2025', event: 'Expanded into AI-powered products including face recognition attendance systems, smart automation workflows, productivity tools, and modern scalable business platforms.' },
  { year: 'Today', event: 'Yantrix Labs continues building custom software, SaaS products, mobile apps, AI systems, and digital tools that help businesses automate operations and grow faster.' },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="public-hero py-20 bg-gradient-to-br from-brand-50 via-white to-brand-200/40">
        <div className="container-wide text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6">
            <Globe className="h-3.5 w-3.5" />
            Our Story
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            We build software that
            <span className="block gradient-text">powers modern businesses</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Yantrix Labs was built to help Indian businesses grow faster with smart software.
            From GST tools to full-scale enterprise systems — we create products that work.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-indigo-600">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {ABOUT_STATS.map((stat, i) => (
              <div key={`stat-${i}`}>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-indigo-200 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Story */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-wide max-w-5xl mx-auto px-4">

          {/* Section header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block h-1 w-10 rounded-full bg-indigo-500" />
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Our Story</span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-10 leading-tight">
            How it started
          </h2>

          {/* Intro paragraphs */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <div className="rounded-2xl border border-[rgb(var(--public-border))] bg-[rgb(var(--public-surface-card))] p-6 shadow-sm">
              <p className="text-[rgb(var(--public-text-muted))] leading-relaxed">
                Yantrix Labs was built on one clear idea: businesses need <strong className="text-[rgb(var(--public-primary-700))]">reliable, scalable, and affordable software</strong> that solves real operational problems.
              </p>
            </div>
            <div className="rounded-2xl border border-[rgb(var(--public-border))] bg-[rgb(var(--public-surface-card))] p-6 shadow-sm">
              <p className="text-[rgb(var(--public-text-muted))] leading-relaxed">
                Founded by a solo developer since <strong className="text-[rgb(var(--public-primary-700))]">2019</strong>, the journey began with native Android development, then expanded into React Native, full-stack web, backend systems, and SaaS product engineering.
              </p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-10 max-w-3xl">
            Over the years, multiple production-grade solutions have been designed across different industries —
            combining strong UI/UX, business logic, automation, and scalable architecture. What started as
            independent development evolved into a <span className="font-semibold text-gray-800">technology studio</span> focused on building modern business systems.
          </p>

          {/* Built & Developed heading */}
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-block h-1 w-8 rounded-full bg-indigo-400" />
            <h3 className="text-xl font-bold text-gray-900">Yantrix Labs has worked on and developed:</h3>
          </div>

          {/* Bullet grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {[
              { icon: LayoutDashboard, label: 'SaaS platforms and admin dashboards', color: 'text-indigo-600 bg-indigo-50' },
              { icon: ShoppingCart,    label: 'Ecommerce websites and custom stores', color: 'text-pink-600 bg-pink-50' },
              { icon: CalendarCheck,  label: 'Booking systems for hotels, services, and appointments', color: 'text-blue-600 bg-blue-50' },
              { icon: UtensilsCrossed,label: 'Restaurant ordering and management systems', color: 'text-orange-600 bg-orange-50' },
              { icon: MapPin,         label: 'GPS vehicle and fleet tracking platforms', color: 'text-green-600 bg-green-50' },
              { icon: Car,            label: 'Taxi booking and dispatch systems', color: 'text-yellow-600 bg-yellow-50' },
              { icon: ScanFace,       label: 'Attendance systems with AI face recognition', color: 'text-violet-600 bg-violet-50' },
              { icon: UserCog,        label: 'Employee management and HR tools', color: 'text-teal-600 bg-teal-50' },
              { icon: Receipt,        label: 'Billing, GST invoicing, and business utility tools', color: 'text-rose-600 bg-rose-50' },
              { icon: Workflow,       label: 'Workflow automation systems', color: 'text-cyan-600 bg-cyan-50' },
              { icon: BrainCircuit,   label: 'AI-powered business solutions', color: 'text-purple-600 bg-purple-50' },
              { icon: Smartphone,     label: 'Custom Android, iOS, and Web applications', color: 'text-sky-600 bg-sky-50' },
              { icon: Wrench,         label: 'Internal tools for operations and productivity', color: 'text-amber-600 bg-amber-50' },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${color}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-gray-700 leading-snug">{label}</span>
              </div>
            ))}
          </div>

          {/* Today + Mission callout */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-6 overflow-hidden">
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-indigo-100 opacity-40" />
              <CheckCircle2 className="h-6 w-6 text-indigo-500 mb-3" />
              <p className="text-gray-700 leading-relaxed text-sm">
                Today, Yantrix Labs builds <strong className="text-gray-900">practical, secure, and scalable</strong> digital products for startups, SMEs, and growing businesses — with a focus on performance, automation, and real business outcomes.
              </p>
            </div>
            <div className="relative rounded-2xl bg-gradient-to-br from-brand-600 to-brand-900 p-6 overflow-hidden text-white">
              <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-white opacity-10" />
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-2">Our Mission</p>
              <p className="text-white font-semibold text-base leading-relaxed">
                Engineer smart software systems that help businesses save time, reduce manual work, and scale faster.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What we believe in</h2>
            <p className="text-gray-600">Our values shape every decision we make — from product features to support responses.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map(v => (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${v.color} mb-4`}>
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container-wide max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our journey so far</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-indigo-100" />
            <div className="space-y-8">
              {MILESTONES.map(m => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-sm">
                    {m.year}
                  </div>
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the team</h2>
            <p className="text-gray-600">A small, passionate group obsessed with making Indian businesses thrive.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, i) => {
              const initials = member.name.split(' ').filter((n: string) => n).map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
              const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
              return (
                <div key={member.id} className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="h-16 w-16 rounded-full object-cover mx-auto mb-4"
                    />
                  ) : (
                    <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg`}>
                      {initials}
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-xs text-indigo-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-center"
        style={{ background: 'linear-gradient(135deg, #0b3d91 0%, #062968 100%)' }}
      >
        <div className="container-wide max-w-2xl mx-auto">
          <TrendingUp className="h-12 w-12 mx-auto mb-6" style={{ color: '#8fc2ff' }} />
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>Let&apos;s build something together</h2>
          <p className="mb-8" style={{ color: '#8fc2ff' }}>We work with startups, SMEs, and enterprises to create software that drives growth.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#001a4d] px-8 py-4 text-base font-semibold text-[#0b6bff] hover:bg-[#001238] transition-all shadow-lg shadow-black/30"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </PublicLayout>
  );
}
