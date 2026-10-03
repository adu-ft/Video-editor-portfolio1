import React, { useState } from 'react';
import { Plus, X, HelpCircle, Monitor } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item opened by default as in screenshot

  const faqs = [
    {
      question: 'What kind of videos do you edit?',
      answer:
        'I specialize in editing YouTube videos, social media reels, promotional content, interviews, vlogs, and short films. If you have a specific style or requirement, feel free to ask!',
    },
    {
      question: 'What software do you use for editing?',
      answer:
        'I primarily utilize DaVinci Resolve Studio for high-end color grading and finishing, Adobe Premiere Pro for agile commercial pacing, and After Effects & Blender for custom 3D animations and visual effects.',
    },
    {
      question: 'How long will it take to complete a video?',
      answer:
        'Turnaround time depends on the scope and complexity. Social media reels and shorts are typically delivered within 24 to 48 hours, while multi-camera corporate or YouTube projects take approximately 3 to 5 business days.',
    },
    {
      question: 'How do you deliver the final video?',
      answer:
        'Deliverables are provided via secure Frame.io links or private cloud drive folders in full 4K UHD Master ProRes 422 HQ and web-optimized H.264/H.265 formats, complete with subtitle SRT tracks.',
    },
    {
      question: 'Can I request revisions?',
      answer:
        'Yes, absolutely. Every project comes with 2 to 3 revision passes included to fine-tune sound design, pacing, and color balance so the final cut exceeds your expectations.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Interactive Accordions */}
        <div className="lg:col-span-6 space-y-3 order-2 lg:order-1">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-medium text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <span className="text-[#FF4625] shrink-0 font-bold">
                    {isOpen ? <X size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Heading and Desk Setup Visual */}
        <div className="lg:col-span-6 flex flex-col justify-between order-1 lg:order-2">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4625] flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-white" />
              </span>
              <span className="text-neutral-300">Frequently Asking Questions</span>
            </div>

            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
              FAQ
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Everything you need to know before we start editing magic together.
            </p>
          </div>

          {/* Desk Setup Showcase Card */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-[#141210] shadow-xl group">
            <img
              src="https://sb-wp-assets.storyblocks.com/resources/wp-content/uploads/2024/12/27102204/image1-1024x575.png"
              alt="Video Editing Desk Setup Workspace"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.5';
              }}
            />

            {/* Gradient Scrim for Contrast & Polished Look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

            {/* Bottom Label Badge: Desk Setup */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-black/75 backdrop-blur-md px-5 py-1.5 rounded-full border border-white/10 text-white text-xs font-semibold tracking-wide shadow-lg flex items-center gap-2 group-hover:border-white/25 transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Desk Setup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
