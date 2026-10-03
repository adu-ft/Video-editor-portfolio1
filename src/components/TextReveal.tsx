import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  staggerDelay?: number; // ms between words
  initialDelay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  tag: Tag = 'p',
  staggerDelay = 22,
  initialDelay = 100,
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (containerRef.current) observer.unobserve(containerRef.current);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const words = text.split(' ');

  return (
    <Tag ref={containerRef as any} className={`inline-block ${className}`}>
      {words.map((word, index) => {
        const delay = initialDelay + index * staggerDelay;
        return (
          <span
            key={index}
            className="inline-block overflow-hidden mr-[0.26em] last:mr-0 align-top"
          >
            <span
              className="inline-block will-change-[transform,opacity,filter]"
              style={{
                display: 'inline-block',
                opacity: isInView ? 1 : 0,
                transform: isInView
                  ? 'translate3d(0, 0, 0)'
                  : 'translate3d(0, 24px, 0)',
                filter: isInView ? 'blur(0px)' : 'blur(4px)',
                transition: `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 600ms ease-out ${delay}ms, filter 600ms ease-out ${delay}ms`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Tag>
  );
};
