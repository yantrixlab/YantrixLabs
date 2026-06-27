'use client';

import { motion } from 'framer-motion';
import { Rss, Search } from 'lucide-react';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
}

export function BlogHero({ search, onSearchChange }: Props) {
  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-28 px-4 overflow-hidden">
      {/* Floating background glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl animate-float pointer-events-none" />
      <div
        className="absolute -bottom-24 -right-16 w-[30rem] h-[30rem] bg-purple-200/40 rounded-full blur-3xl pointer-events-none"
        style={{ animation: 'float 8s ease-in-out 3s infinite' }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-violet-200/30 rounded-full blur-2xl pointer-events-none"
        style={{ animation: 'float 10s ease-in-out 1.5s infinite' }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 shadow-sm rounded-full px-4 py-1.5 text-sm text-indigo-700 mb-6">
            <Rss className="h-3.5 w-3.5 text-indigo-500" />
            Yantrix Labs Blog
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900"
        >
          Insights &amp; Ideas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Discover tutorials, guides, product insights, and business growth ideas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="relative max-w-lg mx-auto"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-indigo-400 text-base transition-all duration-200 shadow-md"
          />
        </motion.div>
      </div>
    </section>
  );
}
