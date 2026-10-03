import React, { useState, useEffect, useRef } from 'react';

interface ApproachStyleProps {
  onContactClick: () => void;
}

export const ApproachStyle: React.FC<ApproachStyleProps> = ({ onContactClick }) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const steps = [
    {
      title: 'Understand the Story',
      description:
        'Every great edit starts with understanding the core message. I take time to learn your story, your audience, and your goals — ensuring every cut aligns with your vision.',
    },
    {
      title: 'Craft with Precision',
      description:
        'From color grading to seamless transitions, I focus on the fine details. Each frame is carefully crafted to maintain rhythm, emotion, and flow — with zero wasted seconds.',
    },
    {
      title: 'Deliver with Impact',
      description:
        'Whether it’s for social, web, or film — the final cut is built to perform. I ensure your video leaves a lasting impression, optimized for quality, format, and audience response.',
    },
  ];

  return (
    <section ref={sectionRef} className="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
      {/* Top Header Bar with Title on left & Action Button on right */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-white/5 transition-all duration-700"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
        }}
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4625] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-white" />
          </span>
          <span className="text-neutral-300">Approach Style</span>
        </div>

        <button
          onClick={onContactClick}
          className="self-start sm:self-auto px-6 py-2 rounded-full bg-[#FF4625] hover:bg-[#ff5738] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-md shadow-[#FF4625]/20 transition-all cursor-pointer"
        >
          Get in touch
        </button>
      </div>

      {/* 3 Dark Pillar Cards with Staggered Cascading Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => {
          const delay = 150 + idx * 150;
          return (
            <div
              key={idx}
              className="group bg-[#111111] hover:bg-[#151515] rounded-2xl p-7 sm:p-8 border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 shadow-lg"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 36px, 0) scale(0.96)',
                transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, border-color 200ms ease, background-color 200ms ease`,
              }}
            >
              <div>
                {/* Three Coral Dots */}
                <div className="flex items-center gap-1.5 mb-6 text-[#FF4625]">
                  <span className="w-2 h-2 rounded-full bg-[#FF4625]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF4625]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF4625]" />
                </div>

                {/* Title with Dot */}
                <h3 className="font-['Syne',sans-serif] text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2.5 group-hover:text-[#FF4625] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4625] shrink-0" />
                  <span>{step.title}</span>
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
