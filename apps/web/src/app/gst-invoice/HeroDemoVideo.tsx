'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HeroDemoVideo() {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12 w-full rounded-[1.6rem] border border-white/60 bg-white/40 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-xl"
    >
      <div className="overflow-hidden rounded-[1.1rem] border border-white/50 bg-slate-900/90">
        <video
          className="block aspect-video h-auto w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
        >
          <source src="/app_video/app_demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.div>
  );
}
