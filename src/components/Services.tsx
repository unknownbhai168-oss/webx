import React from 'react';
import { Check, ArrowRight, Sparkles, Layers, Globe, Smartphone, MessageSquare, Search, Gauge, Code2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface ServicesProps {
  onSelectPackage: (type: 'static' | 'dynamic') => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectPackage }) => {
  const staticFeatures = [
    { text: 'Custom Modern Web Design', icon: Layers },
    { text: '100% Mobile & Tablet Responsive', icon: Smartphone },
    { text: 'Business Profile & Services Showcase', icon: Globe },
    { text: 'Direct WhatsApp Chat Integration', icon: MessageSquare },
    { text: 'Google Maps Location Embed', icon: Globe },
    { text: 'Hosted on Fast .vercel.app Subdomain', icon: Globe },
    { text: 'Zero Monthly Server / Hosting Fees', icon: Gauge },
    { text: 'Built for Direct & Social Sharing (No SEO Included)', icon: Check },
  ];

  const dynamicFeatures = [
    { text: 'Everything included in the Static Package', icon: Check, highlight: true },
    { text: 'Interactive UI Components & Filters', icon: Layers },
    { text: 'Dynamic Forms & User Inputs with Validation', icon: MessageSquare },
    { text: 'Custom Interactive Calculations / Catalogs', icon: Code2 },
    { text: 'Advanced Micro-Animations & Interactivity', icon: Sparkles },
    { text: 'Data-driven Content Sections', icon: Globe },
    { text: 'Tailored Business Logic Implementation', icon: Gauge },
  ];

  return (
    <section id="services" className="relative py-24 bg-[#0c0c0c] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#FF7A00] mb-3">
            Core Service Offerings
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            WE BUILD DIGITAL EXPERIENCES{' '}
            <span className="text-gradient-fire">FOR EVERY BUSINESS.</span>
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            Engineered specifically for small businesses, local shops, fitness clubs, salons, coaching institutes, and professionals looking to turn visitors into real customers.
          </p>
        </div>

        {/* Two Premium Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Static Website Card */}
          <div className="relative group rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#181818] to-[#121212] border border-white/10 hover:border-[#FF5A1F]/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#FF5A1F]/10 flex flex-col justify-between">
            {/* Top Badge & Title */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  01. ESSENTIAL PRESENCE
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                  Ideal for Shops & Clinics
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                STATIC WEBSITE DEVELOPMENT
              </h3>

              {/* Price display */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  ₹{siteConfig.pricing.staticStartingPrice.toLocaleString()}
                </span>
                <span className="text-sm text-neutral-400 font-medium">starting price</span>
              </div>

              <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
                Fast, elegant and responsive websites designed to establish your business online and showcase your services professionally.
              </p>

              {/* Divider */}
              <div className="my-6 border-t border-white/10" />

              {/* Features List */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#FF7A00] font-semibold mb-2">
                  What's Included:
                </div>
                {staticFeatures.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 text-sm text-neutral-200">
                      <div className="w-5 h-5 rounded-md bg-[#FF5A1F]/15 flex items-center justify-center shrink-0 mt-0.5 text-[#FF7A00]">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card Action */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => onSelectPackage('static')}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-sm text-white bg-white/10 hover:bg-[#FF5A1F] border border-white/10 hover:border-transparent transition-all duration-200 cursor-pointer group-hover:shadow-lg group-hover:shadow-[#FF5A1F]/25"
              >
                <span>GET STATIC WEBSITE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Dynamic Website Card */}
          <div className="relative group rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#1c1815] to-[#121212] border-2 border-[#FF7A00]/40 hover:border-[#FF7A00] transition-all duration-300 shadow-2xl shadow-[#FF5A1F]/15 flex flex-col justify-between">
            {/* Featured corner ribbon */}
            <div className="absolute -top-3.5 right-8 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF5A1F] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
              Most Popular & Interactive
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#FF7A00] font-semibold">
                  02. ADVANCED INTERACTIVITY
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FF5A1F]/20 text-[#FFC857] border border-[#FF5A1F]/30">
                  Full Feature Suite
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                DYNAMIC WEBSITE DEVELOPMENT
              </h3>

              {/* Price display */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  ₹{siteConfig.pricing.dynamicStartingPrice.toLocaleString()}
                </span>
                <span className="text-sm text-[#FFC857] font-medium">starting price</span>
              </div>

              <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
                Interactive websites with dynamic functionality designed for businesses that need more than a traditional static website.
              </p>

              {/* Divider */}
              <div className="my-6 border-t border-white/10" />

              {/* Features List */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#FFC857] font-semibold mb-2">
                  Dynamic Additions:
                </div>
                {dynamicFeatures.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 text-sm text-neutral-100">
                      <div className="w-5 h-5 rounded-md bg-[#FF7A00]/25 flex items-center justify-center shrink-0 mt-0.5 text-[#FFC857]">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className={feat.highlight ? 'font-semibold text-white' : ''}>
                        {feat.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card Action */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => onSelectPackage('dynamic')}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-sm text-white bg-gradient-to-r from-[#FF7A00] to-[#FF5A1F] hover:from-[#FF8F1F] hover:to-[#FF6525] shadow-lg shadow-[#FF5A1F]/30 transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>GET DYNAMIC WEBSITE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Subdomain & Transparent Pricing Notice */}
        <div className="mt-10 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center text-xs text-neutral-400 max-w-3xl mx-auto leading-relaxed">
          <span className="text-neutral-300 font-semibold">Subdomain & Hosting Terms:</span>{' '}
          All websites are deployed on fast, free cloud subdomains (such as <code className="text-[#FFC857] font-mono">yourbrand.vercel.app</code>) with zero hosting costs. Base packages are built for direct sharing, social media bios, QR codes, and WhatsApp leads; search engine optimization (SEO) is not included in these base prices.
        </div>
      </div>
    </section>
  );
};
