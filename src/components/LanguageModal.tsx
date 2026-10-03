import React, { useEffect, useRef } from 'react';
import { Search, X, Check, Globe, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { WORLD_LANGUAGES } from '../data/languages';

export const LanguageModal: React.FC = () => {
  const {
    currentLanguage,
    setLanguageByCode,
    isModalOpen,
    setIsModalOpen,
    searchQuery,
    setSearchQuery,
    filteredLanguages,
    isTranslating,
  } = useLanguage();

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens & handle Escape key
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsModalOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen, setIsModalOpen]);

  if (!isModalOpen) return null;

  const popularLanguages = WORLD_LANGUAGES.filter((l) => l.popular);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Select Language"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0f0f13] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FF4625]/15 border border-[#FF4625]/30 flex items-center justify-center text-[#FF4625]">
              <Globe size={18} />
            </div>
            <div>
              <h3 className="font-['Syne',sans-serif] text-lg font-bold text-white leading-tight">
                Select Your Language
              </h3>
              <p className="text-xs text-neutral-400">
                Choose from 45+ languages to translate this portfolio
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            aria-label="Close language selector"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-5 border-b border-white/5 bg-[#131318]">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language (e.g. Hindi, Spanish, Japanese, French...)"
              className="w-full bg-[#0a0a0d] border border-white/10 focus:border-[#FF4625] rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick Popular Pills (when not actively searching) */}
          {!searchQuery && (
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold mr-1 shrink-0">
                Popular:
              </span>
              {popularLanguages.slice(0, 6).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguageByCode(lang.code)}
                  className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    currentLanguage.code === lang.code
                      ? 'bg-[#FF4625] text-white shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language List Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 max-h-[50vh]">
          {filteredLanguages.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-neutral-400 text-sm mb-2">No language found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#FF4625] hover:underline font-medium"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {filteredLanguages.map((lang) => {
                const isSelected = currentLanguage.code === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setLanguageByCode(lang.code)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer group ${
                      isSelected
                        ? 'bg-[#FF4625]/15 border-[#FF4625] text-white shadow-md shadow-[#FF4625]/10'
                        : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/5 hover:border-white/15 text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xl shrink-0">{lang.flag}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate leading-tight group-hover:text-white">
                          {lang.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate leading-tight">
                          {lang.nativeName}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#FF4625] text-white flex items-center justify-center shrink-0 ml-2">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer with Translating Indicator */}
        <div className="p-4 sm:px-6 bg-[#0c0c0f] border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            {isTranslating ? (
              <>
                <Loader2 size={14} className="animate-spin text-[#FF4625]" />
                <span className="text-white font-medium">Translating website...</span>
              </>
            ) : (
              <span>
                Active: <strong className="text-white">{currentLanguage.flag} {currentLanguage.name}</strong> ({currentLanguage.nativeName})
              </span>
            )}
          </div>

          <button
            onClick={() => setLanguageByCode('en')}
            className="text-[11px] text-neutral-400 hover:text-white transition-colors underline underline-offset-2 cursor-pointer"
          >
            Reset to English
          </button>
        </div>
      </div>
    </div>
  );
};
