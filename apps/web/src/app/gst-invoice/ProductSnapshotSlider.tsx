'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type ProductSnapshotSliderProps = {
  images: string[];
};

export default function ProductSnapshotSlider({ images }: ProductSnapshotSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});
  const total = images.length;

  useEffect(() => {
    if (total <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(timer);
  }, [total]);

  const activeImage = useMemo(() => images[activeIndex], [activeIndex, images]);
  const activeAspectRatio = aspectRatios[activeImage] ?? 16 / 9;

  if (!total) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-white/40 bg-white/35 backdrop-blur-md">
        <div className="aspect-[16/10]" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="relative w-full" style={{ aspectRatio: String(activeAspectRatio) }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeImage}-${activeIndex}`}
              initial={{ x: direction > 0 ? '100%' : '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: direction > 0 ? '-100%' : '100%' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage}
                alt={`GST product screenshot ${activeIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-contain"
                priority={activeIndex === 0}
                onLoadingComplete={(img) => {
                  if (!img.naturalWidth || !img.naturalHeight) return;
                  const ratio = img.naturalWidth / img.naturalHeight;
                  setAspectRatios((prev) => (prev[activeImage] ? prev : { ...prev, [activeImage]: ratio }));
                }}
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
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
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
