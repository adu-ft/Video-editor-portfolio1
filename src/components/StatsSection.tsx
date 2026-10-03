import React, { useState, useEffect, useRef } from 'react';

export const StatsSection: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const [count, setCount] = useState({ p: 0, y: 0, r: 0, c: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true);
      setCount({ p: 13, y: 8, r: 10, c: 13 });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // Animated counter
  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount({
        p: Math.floor(eased * 13),
        y: Math.floor(eased * 8),
        r: Math.floor(eased * 10),
        c: Math.floor(eased * 13),
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount({ p: 13, y: 8, r: 10, c: 13 });
      }
    };

    requestAnimationFrame(step);
  }, [isInView]);

  const stats = [
    { value: `${count.p}+`, label: 'Projects Done' },
    { value: `${count.y}+`, label: 'Years of Experience' },
    { value: `${count.r}+`, label: 'Recognitions' },
    { value: `${count.c}%`, label: 'Happy Clints' },
  ];

  return (
    <section ref={sectionRef} className="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
      {/* Top Split Header */}
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline mb-12 pb-6 border-b border-white/5 transition-all duration-800"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
        }}
      >
        <div className="md:col-span-4 flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4625] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-white" />
          </span>
          <span className="text-neutral-300">Stats & Facts</span>
        </div>

        <div className="md:col-span-8">
          <p className="font-['Syne',sans-serif] text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 leading-snug">
            Numbers that speak for my edits. From hours of footage trimmed to satisfied clients here’s a quick look at my impact.
          </p>
        </div>
      </div>

      {/* 4 Stats Columns with Staggered Count-Up */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        {stats.map((stat, idx) => {
          const delay = 100 + idx * 100;
          return (
            <div
              key={idx}
              className="flex flex-col items-start transition-all duration-700"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 25px, 0)',
                transitionDelay: `${delay}ms`,
              }}
            >
              <span className="font-['Syne',sans-serif] text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#FF4625] tracking-tight tabular-nums mb-2">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-neutral-400 font-medium tracking-wide">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
