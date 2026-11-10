import React, { useEffect, useState } from 'react';

export const InteractiveCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasFinePointer || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const newPos = { x: e.clientX, y: e.clientY };
      setPos(newPos);

      setTrail((prev) => [newPos, ...prev.slice(0, 4)]);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Outer Glow Halo */}
      <div
        className="fixed w-9 h-9 -ml-4.5 -mt-4.5 rounded-full border border-[#FF5A1F]/40 bg-[#FF5A1F]/10 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isPointer ? 1.6 : 1})`,
        }}
      />

      {/* Center Fiery Core Dot */}
      <div
        className="fixed w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#FF7A00] shadow-[0_0_8px_#FF5A1F]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      />

      {/* Subtle Fiery Trail Dots */}
      {trail.map((pt, i) => (
        <div
          key={i}
          className="fixed w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full bg-[#FFC857]"
          style={{
            transform: `translate3d(${pt.x}px, ${pt.y}px, 0)`,
            opacity: (5 - i) * 0.12,
            transition: 'opacity 0.2s',
          }}
        />
      ))}
    </div>
  );
};
