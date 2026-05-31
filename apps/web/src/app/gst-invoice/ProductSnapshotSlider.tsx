'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type ProductSnapshotSliderProps = {
  images: string[];
};

export default function ProductSnapshotSlider({ images }: ProductSnapshotSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (total <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(timer);
  }, [total]);

  const activeImage = useMemo(() => images[activeIndex], [activeIndex, images]);

  if (!total) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
        <div className="flex aspect-[16/10] items-center justify-center px-6 text-center">
          <p className="text-sm font-medium text-gray-500">
            Add product screenshots to <span className="font-semibold">/public/gst_invoice_screenshots</span> to show them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="relative aspect-[16/10]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage}
                alt={`GST product screenshot ${activeIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority={activeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {total > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((image, index) => {
            const isActive = image === activeImage;
            return (
              <button
                key={image}
                type="button"
                aria-label={`View screenshot ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-8 bg-blue-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
