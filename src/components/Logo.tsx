import React from 'react';

interface LogoProps {
  variant?: 'main' | 'compact' | 'icon-only';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'main', className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Geometric Fiery X Emblem */}
      <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300 hover:rotate-12"
        >
          {/* Subtle outer glow backdrop */}
          <circle cx="18" cy="18" r="16" fill="rgba(255, 90, 31, 0.1)" stroke="rgba(255, 90, 31, 0.25)" strokeWidth="1" />
          
          {/* Futuristic faceted X limbs */}
          {/* Top-left to bottom-right arm */}
          <path
            d="M9 9 L15 18 L9 27 H14 L18 21 L22 27 H27 L21 18 L27 9 H22 L18 15 L14 9 H9 Z"
            fill="url(#webx-fire-grad)"
          />
          {/* Accent center diamond */}
          <polygon points="18,15 21,18 18,21 15,18" fill="#FFC857" />

          {/* Gradients */}
          <defs>
            <linearGradient id="webx-fire-grad" x1="9" y1="9" x2="27" y2="27" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7A00" />
              <stop offset="0.5" stopColor="#FF5A1F" />
              <stop offset="1" stopColor="#C1121F" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {variant !== 'icon-only' && (
        <div className="flex flex-col">
          <div className="flex items-baseline tracking-tight font-black text-xl md:text-2xl font-['Outfit']">
            <span className="text-white tracking-wider">WEB</span>
            <span className="text-[#FF5A1F] ml-0.5 relative">
              X
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#FFC857]" />
            </span>
          </div>
          {variant === 'main' && (
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-semibold -mt-1 font-mono">
              Digital Vision
            </span>
          )}
        </div>
      )}
    </div>
  );
};
