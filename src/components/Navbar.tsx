import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppUrl, getGeneralEnquiryMessage } from '../utils/whatsapp';
import { siteConfig } from '../config/siteConfig';

interface NavbarProps {
  onOpenOrderModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center group whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F] rounded-lg p-1"
          >
            <Logo variant="main" />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#FF7A00] transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF5A1F] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl(getGeneralEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Chat with Mehul on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11px]">Chat Direct</span>
            </a>

            <button
              onClick={onOpenOrderModal || (() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              })}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF7A00] to-[#FF5A1F] hover:from-[#FF8F1F] hover:to-[#FF682B] rounded-lg shadow-md shadow-[#FF5A1F]/20 hover:shadow-[#FF5A1F]/40 transition-all duration-200 whitespace-nowrap shrink-0 active:scale-95 cursor-pointer"
            >
              <span>GET A WEBSITE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0e0e0e]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-300 hover:text-[#FF7A00] py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={buildWhatsAppUrl(getGeneralEnquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-neutral-200 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#22c55e]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={siteConfig.contact.phoneTel}
                className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-neutral-200 bg-cyan-500/10 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call Us</span>
              </a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenOrderModal) onOpenOrderModal();
                else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF7A00] to-[#FF5A1F] rounded-lg shadow-md shadow-[#FF5A1F]/25"
            >
              <span>GET A WEBSITE (FROM ₹1,700)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
