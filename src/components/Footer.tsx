import React from 'react';
import { Logo } from './Logo';
import { siteConfig } from '../config/siteConfig';
import { ArrowUp, Heart, MessageCircle, Mail, Phone } from 'lucide-react';
import { buildWhatsAppUrl, getGeneralEnquiryMessage } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-neutral-400 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column (2 cols wide) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="main" />
            <p className="text-xs font-mono tracking-widest text-[#FF7A00] uppercase font-semibold">
              {siteConfig.brand.tagline}
            </p>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Transforming small businesses, shops, salons, gyms, and startups into high-converting digital realities at honest starting prices.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={buildWhatsAppUrl(getGeneralEnquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-200 border border-white/10 transition-colors"
                title="WhatsApp Chat"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#22c55e]" />
                <span className="font-mono">WA: {siteConfig.contact.whatsappDisplay}</span>
              </a>
              <a
                href={siteConfig.contact.phoneTel}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-200 border border-white/10 transition-colors"
                title="Direct Phone Call"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono">Call: {siteConfig.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Instant Quote Calculator
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  Portfolio Blueprints
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Development Lifecycle
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Mehul Roy
                </a>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Packages
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Static Website</span>
                  <span className="font-mono text-xs text-[#FF7A00]">₹1,700</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Dynamic Website</span>
                  <span className="font-mono text-xs text-[#FFC857]">₹2,100</span>
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Custom Web App</span>
                  <span className="font-mono text-xs text-neutral-400">Custom</span>
                </a>
              </li>
              <li>
                <span className="text-xs text-neutral-400">WhatsApp Lead Bot Included</span>
              </li>
              <li>
                <span className="text-xs text-neutral-400">Google Maps Embed Ready</span>
              </li>
            </ul>
          </div>

          {/* Contact & Developer Credit */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Developer Direct
            </h4>
            <div className="text-xs space-y-2 text-neutral-400">
              <p>
                <strong className="text-white block font-['Outfit'] text-sm">Mehul Roy</strong>
                Student & Freelance Web Developer
              </p>
              <p className="flex items-center gap-1.5 pt-1">
                <Mail className="w-3.5 h-3.5 text-[#FF5A1F]" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white truncate">
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <a href={siteConfig.contact.phoneTel} className="hover:text-cyan-400 font-mono">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-[#22c55e]" />
                <a
                  href={buildWhatsAppUrl(getGeneralEnquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#22c55e] font-mono"
                >
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </p>
              <p className="text-[11px] text-neutral-400">
                Operating remotely across India & worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} WEBX. All rights reserved. Crafted by Mehul Roy.
          </div>

          <div className="flex items-center gap-6">
            <span>Static from ₹1,700 · Dynamic from ₹2,100</span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#FF5A1F]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
