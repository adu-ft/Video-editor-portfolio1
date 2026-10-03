import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Instagram, Laptop, ShoppingBag, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
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

  const services = [
    {
      id: 'vfx',
      title: 'VFX',
      icon: Sparkles,
      price: 'Starting $699',
      description: 'Bring your visuals to life with stunning effects, seamless compositing, and cinematic enhancements.',
    },
    {
      id: 'shorts-reels',
      title: 'Shorts & Reels',
      icon: Instagram,
      price: 'Starting $599',
      description: 'Captivating short-form content tailored for social media to boost engagement and visibility.',
    },
    {
      id: 'corporate-video',
      title: 'Corporate Video',
      icon: Laptop,
      price: 'Starting $999',
      description: 'Professional and polished videos that elevate your business communication and branding.',
    },
    {
      id: 'commercial',
      title: 'Commercial',
      icon: ShoppingBag,
      price: 'Starting $899',
      description: 'High-impact advertisements that showcase your brand with compelling storytelling and visuals.',
    },
  ];

  return (
    <section ref={sectionRef} id="services" className="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
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
          <span>Pro Services</span>
        </div>

        <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Our Best Services
        </h2>

        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          From raw clips to final video, I bring your vision to life with precision and creativity
        </p>
      </div>

      {/* 4 Cards in 2x2 Grid with Staggered Cascading Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => {
          const IconComp = service.icon;
          const delay = 150 + index * 120;
          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service.title)}
              className="group bg-[#111111] hover:bg-[#141414] rounded-2xl p-7 sm:p-8 border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 shadow-lg"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 36px, 0) scale(0.96)',
                transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, border-color 200ms ease, background-color 200ms ease`,
              }}
            >
              <div>
                {/* Header row with Title and Icon */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h3 className="font-['Syne',sans-serif] text-2xl font-bold text-white group-hover:text-[#FF4625] transition-colors">
                    {service.title}
                  </h3>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-[#FF4625]/20 group-hover:border-[#FF4625]/40 transition-colors">
                    <IconComp size={20} />
                  </div>
                </div>

                {/* Price */}
                <div className="text-sm font-semibold text-white/90 mb-3 tracking-wide">
                  {service.price}
                </div>

                {/* Description */}
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Inquiry Action */}
              <div className="flex items-center gap-2 text-xs font-medium text-[#FF4625] group-hover:text-[#ff6b50] transition-colors pt-2">
                <span>Inquire for this service</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
