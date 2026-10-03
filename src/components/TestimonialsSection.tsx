import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
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

  const testimonials = [
    {
      name: 'Amit K',
      role: 'Shorts & Reels',
      rating: 5,
      content:
        'The Framer template saved me hours of work! The design is sleek, responsive, and super easy to customize. I launched my portfolio in no time!',
      avatarInitials: 'AK',
      avatarBg: 'bg-neutral-800 border-neutral-700',
    },
    {
      name: 'Alia Baghdadi',
      role: 'Short Film-Reem',
      rating: 5,
      content:
        'I’m not a designer, but this template made it so easy! Framer’s no-code tools let me tweak everything without hassle. Highly recommend!',
      avatarInitials: 'AB',
      avatarBg: 'bg-[#1e1b18] border-amber-900/40',
    },
    {
      name: 'Priya S',
      role: 'Shorts & Reels',
      rating: 5,
      content:
        'As a startup founder, I needed a modern website without hiring a developer. This template was a game-changer—clean design and effortless setup!',
      avatarInitials: 'PS',
      avatarBg: 'bg-[#151c24] border-sky-900/40',
    },
  ];

  return (
    <section ref={sectionRef} className="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
      {/* Header */}
      <div
        className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 transition-all duration-800"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
        }}
      >
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF4625]" />
          <span>Voices About Me</span>
        </div>

        <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Testimonials
        </h2>

        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          I’ve helped over 500 businesses and entrepreneurs.
        </p>
      </div>

      {/* 3 Column Testimonial Cards with Staggered Cascading Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, idx) => {
          const delay = 150 + idx * 140;
          return (
            <div
              key={idx}
              className="bg-[#111111] hover:bg-[#151515] rounded-2xl p-7 sm:p-8 border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 shadow-lg"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 36px, 0) scale(0.96)',
                transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, border-color 200ms ease, background-color 200ms ease`,
              }}
            >
              <div>
                {/* Header: Stars & Avatar */}
                <div className="flex items-center justify-between mb-4">
                  {/* 5 Coral Stars */}
                  <div className="flex items-center gap-1 text-[#FF4625]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-[#FF4625]" />
                    ))}
                  </div>

                  {/* Avatar with initials / photo simulation */}
                  <div
                    className={`w-9 h-9 rounded-full ${item.avatarBg} border flex items-center justify-center text-xs font-semibold text-neutral-200`}
                  >
                    {item.avatarInitials}
                  </div>
                </div>

                {/* Author Name */}
                <h3 className="font-semibold text-white text-base mb-3">{item.name}</h3>

                {/* Quote */}
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  "{item.content}"
                </p>
              </div>

              {/* Bottom Role / Category */}
              <div className="pt-4 border-t border-white/5 text-xs text-neutral-400 font-medium">
                {item.role}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
