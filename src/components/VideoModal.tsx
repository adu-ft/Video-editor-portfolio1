import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Check } from 'lucide-react';
import { ProjectItem } from './FeaturedWork';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectItem | null;
  isShowreel?: boolean;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  project,
  isShowreel = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Simulate video playback progress
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const title = isShowreel
    ? 'Adarsh Yadav — 2025 Showreel'
    : project?.title || 'Cinematic Preview';
  const category = isShowreel ? 'Full Showreel' : project?.category || 'Showcase';
  const client = isShowreel ? 'Independent Production' : project?.client || 'Private Client';
  const description = isShowreel
    ? 'A comprehensive showcase of commercial cuts, music videos, VFX composite work, and high-retention social content edited over the past 8 years.'
    : project?.description || 'High impact cinematic edit.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0e0e0e] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4625] animate-ping" />
            <div>
              <h3 className="text-white font-semibold text-sm sm:text-base">{title}</h3>
              <p className="text-xs text-neutral-400">{category} · {client}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player Display Screen */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
          {/* Animated Video Simulation Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#1a0f0a] to-[#0a141a]">
            {/* Dynamic particle & wave graphic for video feel */}
            <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_center,#FF4625_0%,transparent_60%)]" />

            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 select-none">
              <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                {isPlaying ? (
                  <Sparkles size={36} className="text-[#FF4625] animate-pulse" />
                ) : (
                  <Play size={36} className="text-white ml-1 fill-white" />
                )}
              </div>
              <div className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-white tracking-wide mb-1">
                {isPlaying ? 'NOW PLAYING' : 'PAUSED'}
              </div>
              <div className="text-xs text-neutral-400 max-w-md font-mono">
                4K UHD · 23.976 FPS · Rec.709 · ProRes 422 HQ
              </div>
            </div>
          </div>

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Controls Bar at Bottom */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col gap-2 bg-gradient-to-t from-black via-black/90 to-transparent">
            {/* Scrubber Progress Bar */}
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-[#FF4625] transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-between pt-1 text-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 hover:text-[#FF4625] transition-colors"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 hover:text-[#FF4625] transition-colors"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <span className="text-xs font-mono text-neutral-400">
                  {Math.floor((progress * 45) / 100)}s / 45s
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-white">4K 60FPS</span>
                <button
                  onClick={() => {
                    const el = document.documentElement;
                    if (!document.fullscreenElement) {
                      el.requestFullscreen?.().catch(() => {});
                    } else {
                      document.exitFullscreen?.().catch(() => {});
                    }
                  }}
                  className="p-1.5 hover:text-white transition-colors"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Meta Information Footer */}
        <div className="p-6 bg-[#111111] border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
            {description}
          </p>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-neutral-950 font-medium text-xs hover:bg-neutral-200 transition-colors shrink-0"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
