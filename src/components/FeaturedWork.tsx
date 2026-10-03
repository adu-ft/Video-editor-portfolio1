import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'VFX' | 'Corporate Video' | 'Commercial' | 'Shorts & Reels';
  tags: string[];
  imageUrl: string;
  description: string;
  duration: string;
  client: string;
}

interface FeaturedWorkProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'Before & After Transitions',
    category: 'VFX',
    tags: ['Editing', 'Color Grading'],
    imageUrl:
      'https://elements-resized.envatousercontent.com/elements-video-cover-images/files/616963849/Before-After-Toolkit.jpg?w=500&cf_fit=cover&q=85&format=auto&s=95e0f49fc8827265e3dde8485e720e0a67f83ca9304cfd1751ac47230118e38a',
    description: 'Dynamic split-screen color grade and multi-cam pacing for an indie cinematic feature.',
    duration: '1:24 min',
    client: 'Apex Cinema Arts',
  },
  {
    id: 'project-2',
    title: 'Color Grading Showcase',
    category: 'Commercial',
    tags: ['Shooting', 'Coloring'],
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTICCS_BCiTWlKVuGzyD5emKUY3_InbUQt1RyCD7lzHY_m3KSxJJHObnA1O&s=10',
    description: 'Full HDR Rec.2020 color pipeline and iridescent visual effects for a flagship commercial.',
    duration: '0:45 min',
    client: 'Luminary Beauty',
  },
  {
    id: 'project-3',
    title: 'Text & Title Animation',
    category: 'VFX',
    tags: ['3D', 'Motion Graphics'],
    imageUrl:
      'https://elements-resized.envatousercontent.com/elements-video-cover-images/files/642713771/Preview.jpg?w=500&cf_fit=cover&q=85&format=auto&s=f8a346d15a8451bb2c2c0e4689d4449ee48bf3e009879d3b39dff4ca1ff7e319',
    description: 'Custom typography titles, 3D tracking, and kinematic motion design elements.',
    duration: '2:10 min',
    client: 'Synthetix Dynamics',
  },
  {
    id: 'project-4',
    title: 'Cinematic Trailer',
    category: 'Shorts & Reels',
    tags: ['Editing', 'Caption'],
    imageUrl:
      'https://pub-a13b60ec7b0a4b35a33b25b7428ad1dd.r2.dev/products/1773041571685-Cinematic-Trailer-Titles-ancent.jpg',
    description: 'High-energy pacing, cinematic trailer titles, sound design hits, and kinetic typography.',
    duration: '0:58 min',
    client: 'Pulse Wave Media',
  },
];

const CATEGORIES = ['All', 'VFX', 'Corporate Video', 'Commercial', 'Shorts & Reels'] as const;

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onSelectProject }) => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const getCategoryLabel = (cat: string) => {
    if (cat === 'All') return t.work.all;
    if (cat === 'Commercial') return t.work.commercial;
    if (cat === 'Shorts & Reels') return t.work.shorts;
    if (cat === 'Corporate Video') return language === 'es' ? 'Corporativo' : 'Corporate Video';
    return cat;
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6"
    >
      {/* Header Block with smooth reveal */}
      <div
        className="text-center max-w-3xl mx-auto mb-10 transition-all duration-800"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
        }}
      >
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF4625] animate-pulse" />
          <span>{t.work.tag}</span>
        </div>

        <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          {t.work.title}
        </h2>

        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          {t.work.subtitle}
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12 transition-all duration-800"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
          transitionDelay: '150ms',
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-neutral-800 text-white border border-white/20 shadow-md'
                  : 'text-neutral-400 hover:text-white bg-transparent hover:bg-neutral-900/60'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          );
        })}
      </div>

      {/* 2x2 Projects Grid with Staggered Cascading Reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {filteredProjects.map((project, index) => {
          const delay = 200 + index * 120;
          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group relative flex flex-col bg-[#111111] rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1.5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? 'translate3d(0, 0, 0) scale(1)'
                  : 'translate3d(0, 36px, 0) scale(0.96)',
                transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, border-color 200ms ease, box-shadow 300ms ease`,
              }}
            >
              {/* Visual Preview Container */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-neutral-950 flex items-center justify-center">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '0.5';
                  }}
                />

                {/* Gradient Scrim for Contrast & Polished Look */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Hover Overlay with Play Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <Play size={20} className="ml-1 fill-current" />
                  </div>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-5 flex items-center justify-between border-t border-white/5 bg-[#141414]">
                {/* Project Title */}
                <h3 className="font-medium text-white text-base sm:text-lg group-hover:text-[#FF4625] transition-colors">
                  {project.title}
                </h3>

                {/* Category / Discipline Tags */}
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  {project.tags.map((tag, idx) => (
                    <span key={tag} className="flex items-center gap-2">
                      {idx > 0 && <span className="text-neutral-600">·</span>}
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
