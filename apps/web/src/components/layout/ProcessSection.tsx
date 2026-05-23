'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Zap, LayoutDashboard, Wrench, Rocket, Headphones } from 'lucide-react';

interface ProcessStep {
  iconKey: 'idea' | 'design' | 'develop' | 'launch' | 'support';
  title: string;
  desc: string;
}

interface ProcessSectionProps {
  title?: string;
  description?: string;
  steps: ProcessStep[];
}

const PROCESS_ACTIVE_ANIMATION_MS = 550;
const PROCESS_WAIT_AFTER_ANIMATION_MS = 1000;
const PROCESS_STEP_DURATION_MS =
  PROCESS_ACTIVE_ANIMATION_MS + PROCESS_WAIT_AFTER_ANIMATION_MS;

const PROCESS_ICON_MAP = {
  idea: Zap,
  design: LayoutDashboard,
  develop: Wrench,
  launch: Rocket,
  support: Headphones,
} as const;

export default function ProcessSection({
  title = 'How We Work',
  description = 'A simple, transparent process from idea to launch.',
  steps,
}: ProcessSectionProps) {
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const processSectionRef = useRef<HTMLElement | null>(null);
  const processInView = useInView(processSectionRef, {
    once: false,
    amount: 0.4,
  });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveProcessStep(Math.max(steps.length - 1, 0));
      return;
    }
    if (!processInView || steps.length === 0) return;

    let current = 0;
    let timer: number | null = null;
    let stopped = false;
    setActiveProcessStep(0);

    const scheduleNext = () => {
      if (stopped) return;
      timer = window.setTimeout(() => {
        if (stopped) return;
        current = (current + 1) % steps.length;
        setActiveProcessStep(current);
        scheduleNext();
      }, PROCESS_STEP_DURATION_MS);
    };

    scheduleNext();

    return () => {
      stopped = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [processInView, prefersReducedMotion, steps.length]);

  return (
    <section
      ref={processSectionRef}
      className="relative overflow-hidden py-24 bg-gray-50"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 15% 15%, rgba(99,102,241,0.10), transparent 40%), radial-gradient(circle at 85% 35%, rgba(6,182,212,0.12), transparent 45%)',
        }}
      />
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 relative">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="relative"
            >
              {(() => {
                const Icon = PROCESS_ICON_MAP[step.iconKey];
                return (
                  <>
              {idx < steps.length - 1 && (
                <>
                  <div
                    className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[62%] w-[76%] h-[2px] z-0"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(to right, rgba(51,133,255,0.35) 0 6px, transparent 6px 12px)',
                    }}
                  />
                  {!prefersReducedMotion && idx === activeProcessStep && (
                    <>
                      <motion.div
                        className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[62%] w-[76%] h-[3px] z-[1]"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(to right, rgba(0,102,255,0.95) 0 7px, transparent 7px 13px)',
                          backgroundSize: '20px 3px',
                        }}
                        animate={{ backgroundPositionX: ['0px', '20px'] }}
                        transition={{
                          duration: 0.45,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      <motion.div
                        className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[62%] h-[20px] w-[20px] rounded-full z-[2]"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(0,102,255,0.95) 0%, rgba(51,133,255,0.22) 55%, rgba(51,133,255,0) 78%)',
                        }}
                        initial={{ x: '0%', opacity: 0.75 }}
                        animate={{ x: '320%', opacity: [0.75, 1, 0.8] }}
                        transition={{
                          duration: 0.92,
                          ease: 'easeInOut',
                        }}
                      />
                    </>
                  )}
                  {prefersReducedMotion && idx === activeProcessStep && (
                    <div
                      className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[62%] w-[76%] h-[3px] z-[1]"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(to right, rgba(0,102,255,0.75) 0 7px, transparent 7px 13px)',
                      }}
                    />
                  )}
                </>
              )}
              {idx < steps.length - 1 && (
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 h-4 w-[2px] sm:h-5 lg:hidden z-0"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(to bottom, rgba(51,133,255,0.35) 0 4px, transparent 4px 9px)',
                  }}
                />
              )}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={
                  idx === activeProcessStep && !prefersReducedMotion
                    ? { y: [-2, -8, -2], scale: [1, 1.015, 1] }
                    : { y: 0, scale: 1 }
                }
                transition={{
                  delay: idx * 0.1,
                  duration:
                    idx === activeProcessStep
                      ? PROCESS_ACTIVE_ANIMATION_MS / 1000
                      : 0.25,
                  ease: 'easeOut',
                }}
                viewport={{ once: true }}
                className={`group relative z-10 flex h-full flex-col items-center rounded-2xl border bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 ${
                  idx === activeProcessStep
                    ? 'border-blue-300 shadow-[0_12px_30px_rgba(0,82,204,0.14)]'
                    : 'border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300 ${
                    idx === activeProcessStep
                      ? 'border-blue-300 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-700 shadow-[0_0_0_8px_rgba(51,133,255,0.10)]'
                      : 'border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-lg">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 max-w-[180px] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
                  </>
                );
              })()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
