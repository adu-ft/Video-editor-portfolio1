import React, { useState, useEffect, useRef } from 'react';
import { Compass, Play, Sparkles } from 'lucide-react';
import { TextReveal } from './TextReveal';

interface AboutSectionProps {
  onContactClick: () => void;
  onPlayShowreel: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onContactClick,
  onPlayShowreel,
}) => {
  const [isHovered, setIsHovered] = useState(false);
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

  return (
    // Full-width pristine white section that cuts across the entire viewport, exactly like the reference image
    <section
      id="about"
      ref={sectionRef}
      className="w-full bg-white text-neutral-900 py-16 sm:py-24 md:py-28 px-6 sm:px-10 lg:px-16 transition-colors overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Header Block: Left Title & Right Intro Paragraph + Button */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 sm:mb-16">
          {/* Left Column: Tag and vibrant Coral-Red "About me" Title with scroll typography animation */}
          <div className="lg:col-span-4 flex flex-col items-start pt-1">
            {/* Tag with smooth sliding entrance */}
            <div
              className="flex items-center gap-2.5 text-xs font-medium text-neutral-700 tracking-normal mb-3 transition-all duration-700"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(-20px, 0, 0)',
                transitionDelay: '100ms',
              }}
            >
              {/* Coral compass/needle icon */}
              <span className="w-4 h-4 rounded-full border border-[#FF3B1D] text-[#FF3B1D] flex items-center justify-center">
                <Compass size={11} className="rotate-45" />
              </span>
              <span className="font-semibold text-neutral-800">Hey, Just An Intro</span>
            </div>

            {/* Exactly as in reference: Both words "About me" in glowing coral-red with cinematic typography reveal */}
            <h2
              className="font-['Syne',sans-serif] text-5xl sm:text-6xl font-bold tracking-tight text-[#FF3B1D] leading-none transition-all duration-800"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 28px, 0)',
                filter: isInView ? 'blur(0px)' : 'blur(6px)',
                transitionDelay: '200ms',
              }}
            >
              About me
            </h2>
          </div>

          {/* Right Column: Large editorial body copy + Get in touch CTA */}
          <div className="lg:col-span-8 flex flex-col items-start">
            <div className="mb-7">
              <TextReveal
                text="I’m a passionate video editor helping creators, brands, and businesses bring their stories to life through impactful visuals. With a keen eye for timing, transitions, and storytelling, I turn raw footage into polished content that connects with audiences."
                className="text-xl sm:text-2xl md:text-[26px] lg:text-[27px] font-normal leading-[1.38] text-neutral-900 tracking-[-0.015em]"
                initialDelay={250}
                staggerDelay={20}
              />
            </div>

            <button
              onClick={onContactClick}
              className="px-7 py-3 rounded-full bg-[#FF3B1D] hover:bg-[#e03417] active:scale-95 text-white font-medium text-sm shadow-md shadow-[#FF3B1D]/25 cursor-pointer transition-all duration-700"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 20px, 0) scale(0.95)',
                transitionDelay: '700ms',
              }}
            >
              Get in touch
            </button>
          </div>
        </div>

        {/* Video / 3D Isometric Showcase Card (Cinematic scale and perspective entrance) */}
        <div
          onClick={onPlayShowreel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full rounded-[24px] sm:rounded-[32px] bg-[#0c0c0c] overflow-hidden aspect-[16/10] sm:aspect-[16/9] md:aspect-[2.1/1] flex items-center justify-center cursor-pointer group shadow-2xl transition-all duration-1000 mb-14 sm:mb-16 select-none"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 40px, 0) scale(0.96)',
            transitionDelay: '400ms',
          }}
        >
          {/* Subtle warm olive / bronze radial ambient backlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(140,115,70,0.18)_0%,rgba(20,20,20,0)_65%)]" />

          {/* Background Repeating Outline Wireframe Typography: $100,000 */}
          <div className="absolute inset-0 flex flex-col justify-around py-4 opacity-40 pointer-events-none overflow-hidden select-none">
            {/* Top row */}
            <div className="flex justify-between items-center px-4">
              <span className="font-['Syne',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(180,150,100,0.35)]">
                $100,
              </span>
              <span className="font-['Syne',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(180,150,100,0.35)]">
                000
              </span>
            </div>

            {/* Middle row */}
            <div className="flex justify-between items-center px-4 -my-4 sm:-my-6">
              <span className="font-['Syne',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-transparent [-webkit-text-stroke:1.2px_rgba(200,165,115,0.4)]">
                $100,
              </span>
              <span className="font-['Syne',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-transparent [-webkit-text-stroke:1.2px_rgba(200,165,115,0.4)]">
                000
              </span>
            </div>

            {/* Bottom row */}
            <div className="flex justify-between items-center px-4">
              <span className="font-['Syne',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(180,150,100,0.35)]">
                $100,
              </span>
              <span className="font-['Syne',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(180,150,100,0.35)]">
                000
              </span>
            </div>
          </div>

          {/* 3D Dark Metallic Isometric Cube Representation */}
          <div className="relative z-10 w-64 sm:w-80 md:w-[420px] h-64 sm:h-80 md:h-[420px] flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1">
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Top face metallic gradient */}
                <linearGradient id="topFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#45484d" />
                  <stop offset="50%" stopColor="#2a2c2f" />
                  <stop offset="100%" stopColor="#1e2023" />
                </linearGradient>

                {/* Left face gradient */}
                <linearGradient id="leftFaceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1c1d20" />
                  <stop offset="70%" stopColor="#151618" />
                  <stop offset="100%" stopColor="#0e0f11" />
                </linearGradient>

                {/* Right face gradient */}
                <linearGradient id="rightFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#25272a" />
                  <stop offset="50%" stopColor="#1b1c1e" />
                  <stop offset="100%" stopColor="#111214" />
                </linearGradient>

                {/* Framer Logo Metallic Shading */}
                <linearGradient id="framerLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="framerMid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e5e7eb" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#6b7280" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="framerDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4b5563" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Cube Geometry */}
              {/* 1. Top Face */}
              <polygon
                points="250,70 415,165 250,260 85,165"
                fill="url(#topFaceGrad)"
                stroke="#5a5e66"
                strokeWidth="1.5"
              />
              {/* Highlight along top front apex */}
              <line x1="85" y1="165" x2="250" y2="70" stroke="#8b919a" strokeWidth="2" opacity="0.8" />
              <line x1="250" y1="70" x2="415" y2="165" stroke="#6b7280" strokeWidth="1.5" opacity="0.6" />

              {/* 2. Left Face */}
              <polygon
                points="85,165 250,260 250,435 85,340"
                fill="url(#leftFaceGrad)"
                stroke="#33373d"
                strokeWidth="1.5"
              />

              {/* Text on Left Face: "Framer Award 2024 / Best Designer" (matching screenshot) */}
              <g transform="translate(130, 270) skewY(30) scale(0.85)">
                <text fill="#ffffff" fillOpacity="0.8" fontSize="12" fontWeight="500" letterSpacing="0.5">
                  Framer Award 2024
                </text>
                <text fill="#a1a1aa" fontSize="10" fontWeight="400" y="16" letterSpacing="0.5">
                  Best Designer
                </text>
              </g>

              {/* 3. Right Face */}
              <polygon
                points="250,260 415,165 415,340 250,435"
                fill="url(#rightFaceGrad)"
                stroke="#3b3f46"
                strokeWidth="1.5"
              />

              {/* Center vertical edge shine */}
              <line x1="250" y1="260" x2="250" y2="435" stroke="#71717a" strokeWidth="2" opacity="0.5" />

              {/* 4. Framer 3D Ribbon Logo on the Right Face */}
              <g transform="translate(290, 230) skewY(-30) scale(1.45)">
                {/* Top square of Framer logo */}
                <path d="M0 0 H36 V18 H18 V36 H0 Z" fill="url(#framerLight)" />
                {/* Middle connector */}
                <path d="M0 18 H18 V36 H0 Z" fill="url(#framerMid)" />
                {/* Bottom triangle */}
                <path d="M0 36 H18 L0 54 Z" fill="url(#framerDark)" />
              </g>

              {/* Ambient bottom shadow on surface */}
              <ellipse cx="250" cy="445" rx="140" ry="25" fill="#000000" opacity="0.75" />
            </svg>
          </div>

          {/* Centered Translucent White Play Button (Exactly as in screenshot) */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur-sm text-neutral-950 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF3B1D] group-hover:text-white">
              <Play size={22} className="ml-1 fill-current" />
            </div>
          </div>
        </div>

        {/* 2-Column Feature Highlights below Video Player with staggered scroll animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-2">
          <div
            className="transition-all duration-800"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 28px, 0)',
              transitionDelay: '550ms',
            }}
          >
            <h3 className="font-['Syne',sans-serif] text-2xl sm:text-[26px] font-bold text-neutral-950 tracking-tight mb-3">
              Bringing Ideas to Life
            </h3>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              I craft engaging visuals from raw footage, turning ideas into compelling stories. Whether it’s a brand promo, vlog, or cinematic edit — every frame is designed to connect with your audience.
            </p>
          </div>

          <div
            className="transition-all duration-800"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 28px, 0)',
              transitionDelay: '700ms',
            }}
          >
            <h3 className="font-['Syne',sans-serif] text-2xl sm:text-[26px] font-bold text-neutral-950 tracking-tight mb-3">
              Collaborate with Me
            </h3>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Ready to turn your vision into a powerful video? Let’s team up! I offer creative edits, fast turnaround, and smooth communication to bring your content to life — from first cut to final export.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
