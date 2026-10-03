import React, { useState, useEffect } from 'react';
import { Mail, Menu, X, ArrowUpRight, Github, Instagram, Play } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
  onOpenShowreel?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onContactClick,
  onProjectsClick,
  onOpenShowreel,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Detect active section based on scroll offset
      const sections = ['about', 'projects', 'services', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Work', id: 'projects' },
    { label: 'Services', id: 'services' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none py-3 sm:py-4 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Floating Capsule Bar */}
        <div
          className={`pointer-events-auto w-full flex items-center justify-between px-3.5 sm:px-5 py-2.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0b0b0e]/90 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80'
              : 'bg-[#111114]/75 backdrop-blur-lg border border-white/10 shadow-lg'
          }`}
        >
          {/* Left Brand / Identity */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('');
            }}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
            aria-label="Scroll to top"
          >
            {/* Monogram Badge */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF4625] to-[#cc2b0e] flex items-center justify-center text-white font-['Syne',sans-serif] font-black text-xs shadow-md group-hover:scale-105 transition-transform">
              AY
            </div>

            <div className="flex flex-col">
              <span className="font-['Syne',sans-serif] text-sm font-bold text-white tracking-tight group-hover:text-[#FF4625] transition-colors leading-none">
                Adarsh Yadav
              </span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-wide flex items-center gap-1.5 pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Video Editor
              </span>
            </div>
          </button>

          {/* Center Horizontal Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-black/40 border border-white/5 px-2 py-1 rounded-full">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white/15 text-white shadow-sm font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Showreel quick button */}
            {onOpenShowreel && (
              <button
                onClick={onOpenShowreel}
                title="Watch Showreel"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-medium transition-colors cursor-pointer"
              >
                <Play size={12} className="text-[#FF4625] fill-[#FF4625]" />
                <span>Showreel</span>
              </button>
            )}

            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-1.5 border-l border-white/10 pl-2">
              <a
                href="https://github.com/adrix-ft"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                title="GitHub: adrix-ft"
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Github size={13} />
              </a>
              <a
                href="https://instagram.com/adu.ft"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Profile"
                title="Instagram: @adu.ft"
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram size={13} />
              </a>
            </div>

            {/* Direct Contact Button */}
            <button
              onClick={onContactClick}
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#FF4625] hover:bg-[#ff5738] active:scale-95 text-white text-xs font-medium flex items-center gap-1.5 shadow-md shadow-[#FF4625]/25 transition-all cursor-pointer"
            >
              <Mail size={13} />
              <span>Let's Talk</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer ml-1"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto absolute top-full left-4 right-4 mt-2 bg-[#121216]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200 md:hidden">
            <div className="flex flex-col gap-1 pb-3 mb-3 border-b border-white/10">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4625]" />}
                  </button>
                );
              })}
            </div>

            {/* Showreel & Socials inside Mobile Menu */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/adrix-ft"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-300 flex items-center gap-1.5 transition-colors"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://instagram.com/adu.ft"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-300 flex items-center gap-1.5 transition-colors"
                >
                  <Instagram size={14} />
                  <span>Instagram</span>
                </a>
              </div>

              {onOpenShowreel && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenShowreel();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-200 flex items-center gap-1.5 transition-colors"
                >
                  <Play size={12} className="text-[#FF4625] fill-[#FF4625]" />
                  <span>Reel</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
