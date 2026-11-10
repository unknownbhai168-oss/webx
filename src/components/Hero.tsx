import React from 'react';
import { HeroScene } from './3d/HeroScene';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreWork }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-12 overflow-hidden bg-[#080808]">
      {/* Background fiery radial glow behind 3D elements */}
      <div
        className="pointer-events-none absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FF5A1F]/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[#FF7A00]/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Value Proposition & Headlines */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Clean unboxed kicker with separator (anti-pill rule) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-4 tracking-wide font-mono">
              <span className="text-[#FF7A00] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                PREMIUM DIGITAL AGENCY
              </span>
              <span aria-hidden="true" className="text-neutral-600">/</span>
              <span>FROM ₹1,700</span>
              <span aria-hidden="true" className="text-neutral-600">/</span>
              <span>BY MEHUL ROY</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white font-['Outfit']">
              WE DON'T JUST BUILD WEBSITES.{' '}
              <span className="text-gradient-fire block mt-1">
                WE CREATE DIGITAL EXPERIENCES.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
              {siteConfig.brand.heroSubtitle}
            </p>

            {/* Quick Price Anchors */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
                <span>Static Website:</span>
                <span className="text-white font-bold text-sm">₹{siteConfig.pricing.staticStartingPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                <span>Dynamic Website:</span>
                <span className="text-white font-bold text-sm">₹{siteConfig.pricing.dynamicStartingPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Primary & Secondary CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onStartProject}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF7A00] via-[#FF5A1F] to-[#C1121F] hover:from-[#FF8F1F] hover:to-[#FF5A1F] rounded-xl shadow-lg shadow-[#FF5A1F]/30 hover:shadow-[#FF5A1F]/50 transition-all duration-300 cursor-pointer active:scale-95 group"
              >
                <span>START YOUR PROJECT</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreWork}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-all duration-200 cursor-pointer hover:border-[#FF5A1F]/50"
              >
                <span>EXPLORE OUR WORK</span>
              </button>
            </div>

            {/* Proof Badges (Claim-to-proof adjacency) */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span>100% Mobile-First</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FFC857] shrink-0" />
                <span>Fast 48-72h Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22c55e] shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Scene Viewport */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#141414]/60 to-[#0c0c0c]/90 shadow-2xl overflow-hidden backdrop-blur-sm">
              {/* Top viewport bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/40 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-neutral-400">webx-3d-universe.engine</span>
                </div>
                <span className="text-[11px] text-[#FF7A00]">● Interactive 3D Canvas</span>
              </div>

              {/* 3D Scene Canvas */}
              <HeroScene interactive={true} />

              {/* Sub-label helper */}
              <div className="px-4 py-2 bg-black/60 border-t border-white/5 text-[11px] font-mono text-neutral-500 flex justify-between items-center">
                <span>Hold & drag or move cursor to tilt 3D objects</span>
                <span className="text-neutral-400">Three.js PBR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
