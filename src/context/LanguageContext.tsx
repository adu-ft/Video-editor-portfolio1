import React, { createContext, useContext, useState, useEffect } from 'react';
import { WORLD_LANGUAGES, LanguageOption } from '../data/languages';

interface LanguageContextType {
  currentLanguage: LanguageOption;
  setLanguageByCode: (code: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredLanguages: LanguageOption[];
  isTranslating: boolean;
  // Legacy compatibility for components using t
  language: string;
  setLanguage: (lang: any) => void;
  t: any;
}

// Built-in English base strings for fallback and structured components
const baseTranslations = {
  nav: {
    about: 'About',
    work: 'Work',
    services: 'Services',
    faq: 'FAQ',
    contact: 'Contact',
    showreel: 'Showreel',
    role: 'Video Editor',
    letsTalk: "Let's Talk",
  },
  about: {
    tag: 'Hey, Just An Intro',
    title: 'About me',
    desc: 'Transforming raw footage into high-impact cinematic edits, dynamic pacing, and visual storytelling crafted to capture attention.',
    getInTouch: 'Get in touch',
    exitVideo: 'Exit Video',
    showreelTitle: 'Adarsh Yadav — 2025 Showreel',
  },
  hero: {
    available: 'Available for Q1–Q2 Projects',
    tag: 'Adarsh Yadav — Video Editor & Visual Artist',
    title1: 'CRAFTING VISUALS',
    title2: 'THAT COMMAND ATTENTION',
    sub: 'Transforming raw cinematic footage into high-retention video content, commercial cuts, and immersive visual experiences.',
    viewWork: 'Explore Projects',
    watchReel: 'Watch Showreel',
    trusted: 'TRUSTED BY LEADING CREATORS & BRANDS',
  },
  work: {
    tag: 'Curated Portfolio',
    title: 'Featured Works',
    subtitle: 'A selection of commercial campaigns, cinematic shorts, and YouTube productions.',
    all: 'All',
    cinematic: 'Cinematic',
    commercial: 'Commercial',
    youtube: 'YouTube',
    shorts: 'Shorts & Reels',
    viewProject: 'Watch Video',
  },
  services: {
    tag: 'What I Deliver',
    title: 'Production Packages',
    subtitle: 'Turnkey post-production services calibrated for high engagement and pristine quality.',
    selectPackage: 'Choose Package',
    popular: 'Most Popular',
  },
  faq: {
    tag: 'Common Questions',
    title: 'Frequently Asked Questions',
    subtitle: 'Clear answers on timelines, revisions, source files, and workflows.',
  },
  contact: {
    tag: "Let's Connect",
    title: 'Start Your Next Project',
    subtitle: 'Tell me about your concept, timeline, and vision. Expect a reply within 24 hours.',
    name: 'Your Name',
    email: 'Your Email',
    serviceType: 'Project Category',
    message: 'Brief overview of your project goals...',
    send: 'Send Inquiry',
    successTitle: 'Inquiry Dispatched!',
    successSub: "Thanks for reaching out! I'll get back to you promptly.",
  },
  footer: {
    tagline: 'Precision video editing and visual storytelling for creators & brands worldwide.',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCode, setCurrentCode] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('portfolio_user_lang');
      if (saved && WORLD_LANGUAGES.some((l) => l.code === saved)) return saved;
    } catch {}
    return 'en';
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  // Initialize Google Translate Script
  useEffect(() => {
    // Add Google Translate container if absent
    if (!document.getElementById('google_translate_element')) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.display = 'none';
      document.body.appendChild(div);
    }

    (window as any).googleTranslateElementInit = () => {
      try {
        if ((window as any).google?.translate?.TranslateElement) {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              autoDisplay: false,
              includedLanguages: WORLD_LANGUAGES.map((l) => l.code).join(','),
            },
            'google_translate_element'
          );
        }
      } catch (err) {
        console.warn('Google Translate initialization:', err);
      }
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Trigger Google Translate engine whenever code changes
  const applyTranslation = (code: string) => {
    setIsTranslating(true);

    if (code === 'en') {
      // Clear cookie to return to native English
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
      }
      setTimeout(() => setIsTranslating(false), 500);
      return;
    }

    // Set cookie for Google Translate
    document.cookie = `googtrans=/en/${code}; path=/;`;
    document.cookie = `googtrans=/en/${code}; path=/; domain=${window.location.hostname};`;

    // Attempt to invoke the combo selector
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        select.value = code;
        select.dispatchEvent(new Event('change'));
        clearInterval(interval);
        setTimeout(() => setIsTranslating(false), 600);
      } else if (attempts > 15) {
        clearInterval(interval);
        setIsTranslating(false);
      }
    }, 200);
  };

  const setLanguageByCode = (code: string) => {
    const match = WORLD_LANGUAGES.find((l) => l.code === code) || WORLD_LANGUAGES[0];
    setCurrentCode(match.code);
    try {
      localStorage.setItem('portfolio_user_lang', match.code);
    } catch {}
    applyTranslation(match.code);
    setIsModalOpen(false);
  };

  // Re-apply translation on load if non-English was previously saved
  useEffect(() => {
    if (currentCode && currentCode !== 'en') {
      const timer = setTimeout(() => {
        applyTranslation(currentCode);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const currentLanguage =
    WORLD_LANGUAGES.find((l) => l.code === currentCode) || WORLD_LANGUAGES[0];

  const filteredLanguages = WORLD_LANGUAGES.filter((lang) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.nativeName.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q)
    );
  });

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguageByCode,
        isModalOpen,
        setIsModalOpen,
        searchQuery,
        setSearchQuery,
        filteredLanguages,
        isTranslating,
        language: currentCode,
        setLanguage: setLanguageByCode,
        t: baseTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
