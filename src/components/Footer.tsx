import React from 'react';
import { Instagram, Github } from 'lucide-react';

interface FooterProps {
  onAboutClick: () => void;
  onContactClick: () => void;
  onProjectsClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onAboutClick,
  onContactClick,
  onProjectsClick,
}) => {
  return (
    <footer className="relative w-full border-t border-white/5 pt-20 pb-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Giant Centered Brand Headline */}
        <h2 className="font-['Syne',sans-serif] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#FF4625] tracking-tight mb-8 select-none hover:opacity-95 transition-opacity">
          Adarsh Yadav
        </h2>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8 text-xs sm:text-sm font-medium text-neutral-300">
          <button
            onClick={onAboutClick}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About Me
          </button>
          <button
            onClick={onContactClick}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact Me
          </button>
          <button
            onClick={onProjectsClick}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={onContactClick}
            className="hover:text-white transition-colors cursor-pointer"
          >
            How to edit
          </button>
        </div>

        {/* Circular Social Buttons: Only GitHub and Instagram */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <a
            href="https://github.com/adrix-ft"
            target="_blank"
            rel="noreferrer"
            aria-label="Adarsh GitHub Profile"
            className="w-11 h-11 rounded-full bg-[#FF4625] hover:bg-[#ff5738] active:scale-90 text-white flex items-center justify-center transition-all shadow-md shadow-[#FF4625]/20 group"
            title="GitHub: adrix-ft"
          >
            <Github size={18} />
          </a>
          <a
            href="https://instagram.com/adu.ft"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Profile @adu.ft"
            className="w-11 h-11 rounded-full bg-[#FF4625] hover:bg-[#ff5738] active:scale-90 text-white flex items-center justify-center transition-all shadow-md shadow-[#FF4625]/20 group"
            title="Instagram: @adu.ft"
          >
            <Instagram size={18} />
          </a>
        </div>

        {/* Bottom Legal / Attribution Sub-row */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-normal">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span>Available for worldwide client projects</span>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-300">
            <span>Developed by</span>
            <a
              href="https://github.com/adrix-ft"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-[#FF4625] font-semibold underline underline-offset-4 decoration-white/20 hover:decoration-[#FF4625] transition-colors"
            >
              Adarsh
            </a>
            <span className="text-neutral-500">(@adrix-ft)</span>
          </div>

          <div>© 2025 Adarsh Yadav. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};
