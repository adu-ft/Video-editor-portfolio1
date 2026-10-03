import React, { useState, useEffect } from 'react';
import { Mail, LayoutGrid, Play } from 'lucide-react';

interface HeroHeadlineProps {
  onContactClick: () => void;
  onViewProjectsClick: () => void;
  onPreviewReelClick?: () => void;
}

export const HeroHeadline: React.FC<HeroHeadlineProps> = ({
  onContactClick,
  onViewProjectsClick,
  onPreviewReelClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full max-w-5xl mx-auto pt-10 sm:pt-14 pb-12 px-4 sm:px-6 text-center">
      {/* Main Massive Headline with Inline Video Capsules & Typography Reveal */}
      <h1
        className="font-['Syne',sans-serif] text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-white tracking-tight leading-[1.18] sm:leading-[1.15] mb-8 select-none transition-all duration-1000 ease-out"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
          filter: isLoaded ? 'blur(0px)' : 'blur(8px)',
        }}
      >
        <span>Transform </span>

        {/* Inline Capsule 1: Raw clip image provided by user */}
        <span
          onClick={onPreviewReelClick}
          title="Click to preview video snippet"
          className="inline-flex items-center align-middle mx-1.5 sm:mx-2.5 h-[34px] sm:h-[46px] md:h-[54px] w-[68px] sm:w-[92px] md:w-[108px] rounded-full overflow-hidden border border-white/25 bg-[#1a1a1a] shadow-inner relative group cursor-pointer hover:border-white/60 transition-transform hover:scale-105"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpd7B4aCARCzupgJNLpb7F3tIR5Asmfw2RwAm0SR5CkLxZbyOKJSLHAWle&s=10"
            alt="Raw Clip"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
          />
          {/* Subtle play indicator on hover */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center transition-colors">
            <Play size={14} className="text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </span>

        <span>your raw</span>
        <br className="hidden sm:inline" />
        <span className="inline"> clips into cinematic </span>

        {/* Inline Capsule 2: Cinematic video image provided by user */}
        <span
          onClick={onPreviewReelClick}
          title="Click to preview cinematic scene"
          className="inline-flex items-center align-middle mx-1.5 sm:mx-2.5 h-[34px] sm:h-[46px] md:h-[54px] w-[68px] sm:w-[92px] md:w-[108px] rounded-full overflow-hidden border border-amber-500/40 bg-[#1e1509] shadow-inner relative group cursor-pointer hover:border-amber-400 transition-transform hover:scale-105"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2WdmZxJS-_pRCnbwfIWmK3hYN14HWmAtbegAaT_pOkWrDJrzTjkLNFQQ&s=10"
            alt="Cinematic Video"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
          />
          {/* Play indicator */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent flex items-center justify-center transition-colors">
            <Play size={14} className="text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </span>

        <span>video</span>
      </h1>

      {/* Action Buttons with Staggered Entrance */}
      <div
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16 sm:mb-20 transition-all duration-800 ease-out"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
          transitionDelay: '250ms',
        }}
      >
        <button
          onClick={onContactClick}
          className="group px-6 py-3 rounded-full bg-[#FF4625] hover:bg-[#ff5738] active:scale-95 text-white font-medium text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-[#FF4625]/25 transition-all duration-200 cursor-pointer"
        >
          <Mail size={16} />
          <span>Get in touch</span>
        </button>

        <button
          onClick={onViewProjectsClick}
          className="group px-6 py-3 rounded-full bg-white hover:bg-neutral-100 active:scale-95 text-neutral-900 font-medium text-sm sm:text-base flex items-center gap-2 shadow-md transition-all duration-200 cursor-pointer"
        >
          <LayoutGrid size={16} className="text-neutral-800" />
          <span>View Projects</span>
        </button>
      </div>

      {/* Partner Recognition Continuous Moving Marquee */}
      <div className="w-full pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-85 hover:opacity-100 transition-opacity">
        <span className="text-neutral-400 text-xs sm:text-sm font-normal shrink-0">
          Work with these international partners:
        </span>

        {/* Continuous Smooth Infinite Marquee Carousel */}
        <div className="relative w-full sm:w-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] py-1">
          <div className="animate-marquee flex items-center gap-8 sm:gap-12 text-neutral-400 select-none">
            {/* Set 1 */}
            <div className="flex items-center gap-8 sm:gap-12 shrink-0">
              {/* Film Company / Studio Logo */}
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="8" y1="4" x2="8" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                  <line x1="16" y1="4" x2="16" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                </svg>
                <span className="font-semibold text-xs tracking-wider">STUDIOS</span>
              </div>

              {/* eventbrite */}
              <div className="flex items-center hover:text-white transition-colors cursor-default">
                <span className="font-bold text-sm tracking-tight font-sans lowercase">eventbrite</span>
              </div>

              {/* Bowfby / Bowlby */}
              <div className="flex items-center gap-1 hover:text-white transition-colors cursor-default">
                <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 4h2v8H9V6zm0 10h2v2H9v-2z" />
                </svg>
                <span className="font-bold text-xs tracking-wide">Bowfby</span>
              </div>

              {/* STRIKE */}
              <div className="flex items-center hover:text-white transition-colors cursor-default">
                <span className="font-black text-sm tracking-widest uppercase">STRIKE</span>
              </div>

              {/* Altaf with infinity / eye symbol */}
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <svg viewBox="0 0 28 14" className="w-5 h-3.5 stroke-current fill-none" strokeWidth="2">
                  <circle cx="7" cy="7" r="5" />
                  <circle cx="21" cy="7" r="5" />
                  <path d="M11 5 L 17 9" />
                  <path d="M11 9 L 17 5" />
                </svg>
                <span className="font-bold text-xs tracking-wide">Altaf</span>
              </div>

              {/* Laurels / Film Award mark */}
              <div className="flex items-center gap-1 hover:text-white transition-colors cursor-default">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current opacity-80">
                  <path d="M12 2C8 6 6 10 6 15c0 3 1.5 5 3 6-2-2-3-5-3-8 0-4 3-7 6-11zm0 0c4 4 6 8 6 13 0 3-1.5 5-3 6 2-2 3-5 3-8 0-4-3-7-6-11z" />
                </svg>
              </div>
            </div>

            {/* Set 2 (Exact Duplicate for Infinite Loop) */}
            <div className="flex items-center gap-8 sm:gap-12 shrink-0" aria-hidden="true">
              {/* Film Company / Studio Logo */}
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="8" y1="4" x2="8" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                  <line x1="16" y1="4" x2="16" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                </svg>
                <span className="font-semibold text-xs tracking-wider">STUDIOS</span>
              </div>

              {/* eventbrite */}
              <div className="flex items-center hover:text-white transition-colors cursor-default">
                <span className="font-bold text-sm tracking-tight font-sans lowercase">eventbrite</span>
              </div>

              {/* Bowfby / Bowlby */}
              <div className="flex items-center gap-1 hover:text-white transition-colors cursor-default">
                <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 4h2v8H9V6zm0 10h2v2H9v-2z" />
                </svg>
                <span className="font-bold text-xs tracking-wide">Bowfby</span>
              </div>

              {/* STRIKE */}
              <div className="flex items-center hover:text-white transition-colors cursor-default">
                <span className="font-black text-sm tracking-widest uppercase">STRIKE</span>
              </div>

              {/* Altaf with infinity / eye symbol */}
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <svg viewBox="0 0 28 14" className="w-5 h-3.5 stroke-current fill-none" strokeWidth="2">
                  <circle cx="7" cy="7" r="5" />
                  <circle cx="21" cy="7" r="5" />
                  <path d="M11 5 L 17 9" />
                  <path d="M11 9 L 17 5" />
                </svg>
                <span className="font-bold text-xs tracking-wide">Altaf</span>
              </div>

              {/* Laurels / Film Award mark */}
              <div className="flex items-center gap-1 hover:text-white transition-colors cursor-default">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current opacity-80">
                  <path d="M12 2C8 6 6 10 6 15c0 3 1.5 5 3 6-2-2-3-5-3-8 0-4 3-7 6-11zm0 0c4 4 6 8 6 13 0 3-1.5 5-3 6 2-2 3-5 3-8 0-4-3-7-6-11z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
