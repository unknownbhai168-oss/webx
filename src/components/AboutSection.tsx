import React from 'react';
import { Logo } from './Logo';
import { siteConfig } from '../config/siteConfig';
import { GraduationCap, Code2, Award, HeartHandshake, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 bg-[#080808] border-t border-white/5 overflow-hidden">
      {/* Decorative fiery aura */}
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FF5A1F]/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Brand Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-8 bg-gradient-to-br from-[#181818] via-[#121212] to-[#1a1410] border border-[#FF5A1F]/30 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-8">
                <Logo variant="main" />
                <span className="font-mono text-xs text-[#FFC857] px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  EST. 2024
                </span>
              </div>

              {/* Founder Profile Box */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FF5A1F] flex items-center justify-center text-white font-bold text-lg font-['Outfit'] shadow-md">
                    MR
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-['Outfit']">
                      Mehul Roy
                    </h4>
                    <p className="text-xs text-[#FF7A00] font-mono">
                      Student, Freelance Developer & Founder
                    </p>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                  "I started WEBX with a simple mission: every local shopkeeper, fitness coach, salon owner, and startup founder deserves a world-class website that looks like it cost ₹50,000, but at an honest starting price of ₹1,700."
                </p>
              </div>

              {/* Credential Tags */}
              <div className="space-y-2.5 text-xs text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#FFC857]" />
                  <span>Student Engineer with cutting-edge web expertise</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-4 h-4 text-[#FF7A00]" />
                  <span>Modern React, Tailwind, and High-Performance 3D</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-[#22c55e]" />
                  <span>100% Client Satisfaction & Revision Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#FF7A00]">
              About WEBX
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-['Outfit']">
              WE TURN IDEAS INTO{' '}
              <span className="text-gradient-fire">DIGITAL EXPERIENCES.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              <p>
                WEBX is a modern website development initiative focused on helping businesses establish a professional online presence through contemporary design, responsive development, and affordable digital solutions.
              </p>
              <p className="text-sm sm:text-base text-neutral-400">
                From small businesses and local shops to coaching centres, salons, restaurants, and growing brands, we aim to make international-quality website development accessible to everyone.
              </p>
              <p className="text-sm sm:text-base text-neutral-400">
                We believe you shouldn't have to choose between cheap broken templates or exorbitant agency retainers. By operating lean as an independent developer and student freelancer, Mehul Roy eliminates agency overheads and passes the savings directly to you.
              </p>
            </div>

            {/* Core Commitments */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span>Zero Corporate Jargon</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span>Clear Fixed Pricing Upfront</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span>Direct WhatsApp Availability</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span>Lightning-Fast 48h Turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
