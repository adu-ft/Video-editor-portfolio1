import React, { useState, useEffect } from 'react';

// Hero portrait options:
// New requested portrait:
const HERO_IMAGE_NEW = 'https://img.magnific.com/premium-photo/elegant-young-man-sleek-suit-smiling-against-modern-urban-backdrop-professional-fashionrelated-content_894067-53661.jpg?semt=ais_hybrid&w=740&q=80';
// Previous portrait (kept for easy rollback):
const HERO_IMAGE_PREVIOUS = 'https://img.magnific.com/free-photo/medium-shot-young-man-posing-outdoors_23-2151038555.jpg?semt=ais_hybrid&w=740&q=80';

// Active hero portrait in use:
const ACTIVE_HERO_IMAGE = HERO_IMAGE_NEW;

interface HeaderBannerProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
  onOpenShowreel?: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = () => {
  const [frame, setFrame] = useState(14);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger smooth cinematic entrance on load
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  // Smooth live timecode ticker for cinema monitor HUD
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 24);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const timecode = `00:04:18:${frame < 10 ? '0' + frame : frame}`;

  const firstName = 'Adarsh';
  const lastName = 'Yadav';

  return (
    <header className="relative w-full max-w-6xl mx-auto pt-6 px-4 sm:px-6">
      {/* Cinematic Top Hero Banner Container */}
      <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e0e] shadow-2xl">
        {/* Cinematic Editorial Portrait Artwork Container */}
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] flex items-center justify-center overflow-hidden bg-[#0a0a0c]">
          {/* Hero Photography Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={ACTIVE_HERO_IMAGE}
              alt="Adarsh Yadav — Video Editor Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_20%] grayscale contrast-[1.15] brightness-90 transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                // Fallback to previous portrait if needed
                if (e.currentTarget.src !== HERO_IMAGE_PREVIOUS) {
                  e.currentTarget.src = HERO_IMAGE_PREVIOUS;
                }
              }}
            />

            {/* Cinematic lighting & contrast overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
          </div>

          {/* Viewfinder Corner Brackets with subtle zoom & fade in */}
          <div
            className={`absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-white/25 pointer-events-none hidden sm:block transition-all duration-700 ease-out ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          />
          <div
            className={`absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-white/25 pointer-events-none hidden sm:block transition-all duration-700 delay-150 ease-out ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          />

          {/* LEFT SIDE CINEMA CAMERA HUD & CINEMATIC TEXT */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[54%] md:w-[50%] z-20 flex flex-col justify-between p-4 sm:p-6 md:p-8 pointer-events-none">
            {/* Top-Left: Cinema Camera Record HUD with slide-down & live pulse */}
            <div
              className={`flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-wider text-white/90 transition-all duration-700 delay-100 ease-out ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <div className="flex items-center gap-2 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-lg group/rec hover:border-red-500/40 transition-colors">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="animate-hud-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]"></span>
                </span>
                <span className="font-bold text-red-400 tracking-wider">REC</span>
                <span className="text-white/30">|</span>
                <span className="text-neutral-200">4K UHD 60P</span>
              </div>
              <div className="hidden sm:inline-flex bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-neutral-300 font-mono shadow-md hover:border-white/20 transition-colors">
                <span className="text-[#FF4625] font-semibold mr-1">TC</span>
                <span>{timecode}</span>
              </div>
            </div>

            {/* Mid-Left: Cinematic Staggered Kinetic Text Reveal */}
            <div className="pointer-events-auto my-auto max-w-[290px] sm:max-w-md py-2">
              {/* Name: Staggered Letter-by-Letter Masked Slide-Up Reveal */}
              <h1
                aria-label="Adarsh Yadav"
                className="font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-2.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] cursor-default select-none group"
              >
                {/* First Name letters */}
                <span className="inline-block whitespace-nowrap">
                  {firstName.split('').map((char, index) => (
                    <span
                      key={`first-${index}`}
                      className="inline-block overflow-hidden py-0.5"
                    >
                      <span
                        style={{
                          transitionDelay: `${150 + index * 40}ms`,
                          transitionDuration: '700ms',
                          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        className={`inline-block transition-all group-hover:text-white group-hover:scale-105 duration-300 ${
                          mounted
                            ? 'translate-y-0 opacity-100 rotate-0'
                            : 'translate-y-[115%] opacity-0 rotate-3'
                        }`}
                      >
                        {char}
                      </span>
                    </span>
                  ))}
                </span>

                {/* Natural Space */}
                <span className="inline-block w-2.5 sm:w-3.5" />

                {/* Last Name letters */}
                <span className="inline-block whitespace-nowrap">
                  {lastName.split('').map((char, index) => (
                    <span
                      key={`last-${index}`}
                      className="inline-block overflow-hidden py-0.5"
                    >
                      <span
                        style={{
                          transitionDelay: `${150 + (firstName.length + index) * 40}ms`,
                          transitionDuration: '700ms',
                          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        className={`inline-block transition-all group-hover:text-white group-hover:scale-105 duration-300 ${
                          mounted
                            ? 'translate-y-0 opacity-100 rotate-0'
                            : 'translate-y-[115%] opacity-0 rotate-3'
                        }`}
                      >
                        {char}
                      </span>
                    </span>
                  ))}
                </span>
              </h1>

              {/* Profession: Cinema Line Reveal + Kinetic Tracking */}
              <div
                style={{
                  transitionDelay: '600ms',
                  transitionDuration: '800ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={`flex items-center gap-2.5 transition-all ${
                  mounted
                    ? 'opacity-100 translate-y-0 tracking-[0.18em]'
                    : 'opacity-0 translate-y-3 tracking-[0.05em]'
                }`}
              >
                {/* Glowing Laser Accent Line */}
                <span
                  style={{
                    transitionDelay: '700ms',
                    transitionDuration: '600ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className={`h-[2px] bg-gradient-to-r from-[#FF4625] to-orange-400 rounded-full transition-all shadow-[0_0_8px_rgba(255,70,37,0.7)] ${
                    mounted ? 'w-5 sm:w-7 opacity-100' : 'w-0 opacity-0'
                  }`}
                />

                <span className="font-['Syne',sans-serif] text-xs sm:text-sm md:text-base font-bold text-[#FF4625] uppercase drop-shadow-[0_2px_12px_rgba(255,70,37,0.4)] select-none">
                  Video Editor
                </span>

                {/* Timeline Editing Cursor Blink */}
                <span className="inline-block w-1.5 h-3.5 bg-[#FF4625] rounded-xs animate-cursor-blink shadow-[0_0_8px_rgba(255,70,37,0.8)]" />
              </div>
            </div>

            {/* Bottom-Left: Camera Rig & Sensor Specs with staggered slide-up & hover lift */}
            <div
              className={`hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-400 tracking-wider transition-all duration-700 delay-500 ease-out ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 hover:border-[#FF4625]/60 hover:text-white hover:scale-105 transition-all duration-200 cursor-default shadow-sm">
                LOG3G10
              </span>
              <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 hover:border-[#FF4625]/60 hover:text-white hover:scale-105 transition-all duration-200 cursor-default shadow-sm">
                PRORES 422 HQ
              </span>
              <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 hover:border-[#FF4625]/60 hover:text-white hover:scale-105 transition-all duration-200 cursor-default shadow-sm">
                24.00 FPS
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
