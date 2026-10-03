import React, { useState } from 'react';
import { SlidersHorizontal, X, ArrowUpRight, Film, Sparkles, Mail } from 'lucide-react';

interface HeaderBannerProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({ onContactClick, onProjectsClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative w-full max-w-6xl mx-auto pt-6 px-4 sm:px-6">
      {/* Cinematic Top Hero Banner Container */}
      <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-[#0e0e0e] shadow-2xl">
        {/* Top Floating Navigation in the Hero Banner */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex items-center gap-3">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
            <span className="text-white text-xs sm:text-sm font-semibold tracking-tight">editors</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              <SlidersHorizontal size={12} className="rotate-90" />
            </button>
          </div>
        </div>

        {/* Dropdown Menu when clicked */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-4 sm:right-6 z-40 w-52 bg-[#141414]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-2 mb-2 border-b border-white/10 px-2">
              <span className="text-xs font-semibold text-neutral-400">Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 text-xs">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                About Me
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onProjectsClick();
                }}
                className="text-left px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Featured Work
              </button>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Services & Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                FAQ
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="text-left px-3 py-2 rounded-lg bg-[#FF4625] text-white font-medium hover:bg-[#ff5738] transition-colors mt-1"
              >
                Get in touch
              </button>
            </nav>
          </div>
        )}

        {/* Cinematic Editorial Portrait Artwork (faithfully matching the reference banner) */}
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[440px] flex items-center justify-center overflow-hidden bg-[#0c0c0c]">
          {/* Hero Photography Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://img.magnific.com/free-photo/medium-shot-young-man-posing-outdoors_23-2151038555.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Mateo Diaz — Video Editor Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_28%] grayscale contrast-[1.18] brightness-90 transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                // If external network fails, show fallback container
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />

            {/* Cinematic lighting & contrast overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
          </div>

          {/* Centered Green Status Pill "🟢 I'm Mateo Diaz" (anchored at bottom of banner) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-[#121212]/85 hover:bg-[#181818] transition-all border border-white/15 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2.5 shadow-xl cursor-default group">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-white text-xs font-medium tracking-wide">I'm Mateo Diaz</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
