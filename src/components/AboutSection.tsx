import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  X,
  Film,
} from 'lucide-react';
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
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Custom Video Player States (100% Zero-Branding Experience)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isPlayerPaused, setIsPlayerPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Send YouTube API postMessage commands to controlled hidden iframe
  const sendIframeCommand = (func: string, args: (string | number | boolean)[] = []) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  // Video progress timer simulation (Total duration = 105s)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingVideo && !isPlayerPaused) {
      timer = setInterval(() => {
        setVideoProgress((prev) => (prev >= 105 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlayingVideo, isPlayerPaused]);

  // Auto-hide controls when playing
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlayingVideo && !isPlayerPaused) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const handleTogglePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isPlayerPaused) {
      sendIframeCommand('playVideo');
      setIsPlayerPaused(false);
    } else {
      sendIframeCommand('pauseVideo');
      setIsPlayerPaused(true);
    }
    resetControlsTimeout();
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isMuted) {
      sendIframeCommand('unMute');
      setIsMuted(false);
    } else {
      sendIframeCommand('mute');
      setIsMuted(true);
    }
    resetControlsTimeout();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = Math.floor(newPercent * 105);
    setVideoProgress(newTime);
    sendIframeCommand('seekTo', [newTime, true]);
    resetControlsTimeout();
  };

  const handleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoCardRef.current) return;
    if (!document.fullscreenElement) {
      videoCardRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoCardRef.current) return;
    const rect = videoCardRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    if (isPlayingVideo) {
      resetControlsTimeout();
    }
  };

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

        {/* Interactive Video Showcase Card with Custom Play Cursor & YouTube Integration */}
        <div
          ref={videoCardRef}
          onClick={() => {
            if (!isPlayingVideo) {
              setIsPlayingVideo(true);
            }
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={(e) => {
            setIsHovered(true);
            if (videoCardRef.current) {
              const rect = videoCardRef.current.getBoundingClientRect();
              setCursorPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }
          }}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-full rounded-[24px] sm:rounded-[32px] bg-[#0c0c0c] overflow-hidden aspect-[16/10] sm:aspect-[16/9] md:aspect-[2.1/1] flex items-center justify-center shadow-2xl transition-all duration-1000 mb-14 sm:mb-16 select-none ${
            !isPlayingVideo ? 'cursor-none group' : ''
          }`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 40px, 0) scale(0.96)',
            transitionDelay: '400ms',
          }}
        >
          {isPlayingVideo ? (
            /* 100% Zero-Branding Scaled Video Player (Hides all YouTube UI, titles, avatars, watermarks) */
            <div className="relative w-full h-full bg-black overflow-hidden select-none">
              {/* Scaled & Cropped Frame: Crops out top title/avatar bar & bottom watermark */}
              <div className="absolute w-[138%] h-[138%] -top-[19%] -left-[19%] pointer-events-none select-none">
                <iframe
                  ref={iframeRef}
                  src="https://www.youtube.com/embed/6kYRUsXtS4s?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1&fs=0&enablejsapi=1&loop=1&playlist=6kYRUsXtS4s"
                  title="Adarsh Yadav — Video Editor Showreel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full object-cover border-0"
                />
              </div>

              {/* Interactive Click Layer to toggle Play / Pause */}
              <div
                onClick={handleTogglePlayPause}
                className="absolute inset-0 z-10 cursor-pointer"
                title="Click to play / pause video"
              />

              {/* Pause Flash Indicator */}
              {isPlayerPaused && (
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl animate-in zoom-in-75 duration-200">
                    <Play size={30} className="ml-1 fill-white" />
                  </div>
                </div>
              )}

              {/* Top Bar with Showreel Title and Exit Button */}
              <div
                className={`absolute top-0 inset-x-0 z-30 p-4 sm:p-5 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                  showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <span className="w-2 h-2 rounded-full bg-[#FF4625] animate-ping" />
                  <span>Adarsh Yadav — 2025 Showreel</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlayingVideo(false);
                    setIsPlayerPaused(false);
                  }}
                  aria-label="Exit video player"
                  className="px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-black border border-white/20 text-white text-xs font-medium backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:scale-105"
                >
                  <X size={13} />
                  <span>Exit Video</span>
                </button>
              </div>

              {/* Sleek Cinematic Custom Controls Bar (Fade-in on hover) */}
              <div
                className={`absolute inset-x-0 bottom-0 z-30 p-4 sm:p-6 bg-gradient-to-t from-black via-black/85 to-transparent transition-opacity duration-300 flex flex-col gap-2.5 ${
                  showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Scrubber Progress Bar */}
                <div
                  onClick={handleSeek}
                  className="w-full h-1.5 hover:h-2.5 bg-white/20 rounded-full overflow-hidden cursor-pointer transition-all relative group/scrub"
                  title="Click to seek"
                >
                  <div
                    className="h-full bg-[#FF4625] rounded-full relative transition-all duration-150"
                    style={{ width: `${(videoProgress / 105) * 100}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/scrub:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-white text-xs pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleTogglePlayPause}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                      title={isPlayerPaused ? 'Play' : 'Pause'}
                    >
                      {isPlayerPaused ? (
                        <Play size={15} className="ml-0.5 fill-current" />
                      ) : (
                        <Pause size={15} />
                      )}
                    </button>

                    <button
                      onClick={handleToggleMute}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>

                    <span className="font-mono text-[11px] text-neutral-300 tracking-wider">
                      {formatTime(videoProgress)} / 01:45
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-white/10 px-2.5 py-0.5 rounded text-[10px] font-mono text-white/90">
                      4K 60FPS
                    </span>

                    <button
                      onClick={handleFullscreen}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Poster & Ambient Showcase */
            <>
              {/* Poster Thumbnail Image with smooth hover zoom */}
              <img
                src="https://img.youtube.com/vi/6kYRUsXtS4s/maxresdefault.jpg"
                alt="Adarsh Yadav Video Showreel"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://img.youtube.com/vi/6kYRUsXtS4s/hqdefault.jpg';
                }}
              />

              {/* Cinematic Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

              {/* Top Bar Indicators */}
              <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white text-[11px] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#FF4625] animate-ping" />
                  <span>4K UHD · 23.976 FPS</span>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-neutral-300 text-[11px] font-mono">
                  REC ● 01:45
                </div>
              </div>

              {/* Bottom Bar Info */}
              <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 z-20 flex items-end justify-between pointer-events-none">
                <div>
                  <span className="text-[#FF4625] text-xs font-bold tracking-widest uppercase">
                    Official Showreel
                  </span>
                  <h3 className="font-['Syne',sans-serif] text-lg sm:text-2xl font-bold text-white tracking-tight">
                    Adarsh Yadav — Cinematic Reel
                  </h3>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <Film size={12} className="text-[#FF4625]" />
                  <span>Click to Play</span>
                </div>
              </div>

              {/* Static Center Button for Mobile Touch Devices */}
              <div className="sm:hidden absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-[#FF4625] text-white flex items-center justify-center shadow-2xl shadow-[#FF4625]/60 animate-pulse">
                  <Play size={24} className="ml-1 fill-white" />
                </div>
              </div>

              {/* Custom Magnetic Follower Play Button Cursor (Desktop) */}
              {isHovered && (
                <div
                  className="pointer-events-none absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out hidden sm:flex flex-col items-center justify-center"
                  style={{
                    left: `${cursorPos.x}px`,
                    top: `${cursorPos.y}px`,
                  }}
                >
                  {/* Subtle Expanding Wave Ring */}
                  <div className="absolute w-20 h-20 rounded-full bg-[#FF4625]/30 animate-ping pointer-events-none" />

                  {/* Play Cursor Pill */}
                  <div className="relative w-16 h-16 rounded-full bg-[#FF4625] text-white flex flex-col items-center justify-center shadow-2xl shadow-[#FF4625]/60 border border-white/30 backdrop-blur-md transition-transform duration-150 group-hover:scale-105 group-active:scale-90">
                    <Play size={20} className="ml-0.5 fill-white" />
                    <span className="text-[8px] font-black tracking-widest uppercase mt-0.5">PLAY</span>
                  </div>
                </div>
              )}
            </>
          )}
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
