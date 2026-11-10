import React, { useState } from 'react';
import { X, Sparkles, Send, Check } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { buildWhatsAppUrl, formatCustomInquiryMessage } from '../utils/whatsapp';
import confetti from 'canvas-confetti';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'static' | 'dynamic' | 'custom';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'static',
}) => {
  const [websiteType, setWebsiteType] = useState<'static' | 'dynamic' | 'custom'>(defaultType);
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !businessName.trim() || !phone.trim()) {
      setError('Please fill in your name, business name and phone number.');
      return;
    }

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF5A1F', '#FF7A00', '#FFC857'],
      });
    } catch {
      // ignore
    }

    const message = formatCustomInquiryMessage({
      clientName,
      businessName,
      phone,
      websiteType,
      projectDescription: description.trim() || 'Interested in starting this project as soon as possible.',
    });

    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#141414] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF7A00] font-semibold">
              Fast Track Onboarding
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
              START YOUR PROJECT
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Select Type */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold mb-2">
              Select Package
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setWebsiteType('static')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  websiteType === 'static'
                    ? 'bg-[#FF5A1F]/15 border-[#FF5A1F] text-white'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold">Static Website</div>
                <div className="text-sm font-mono font-bold text-[#FF7A00] mt-0.5">
                  ₹{siteConfig.pricing.staticStartingPrice.toLocaleString()}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setWebsiteType('dynamic')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  websiteType === 'dynamic'
                    ? 'bg-[#FF7A00]/15 border-[#FF7A00] text-white'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold">Dynamic Website</div>
                <div className="text-sm font-mono font-bold text-[#FFC857] mt-0.5">
                  ₹{siteConfig.pricing.dynamicStartingPrice.toLocaleString()}
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Vikram Patel"
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF5A1F]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 mb-1">
              Business / Brand Name *
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Iron & Steel Fitness Gym"
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF5A1F]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 mb-1">
              WhatsApp / Phone *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF5A1F]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 mb-1">
              Brief Project Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. We need 3 pages with price list and direct WhatsApp chat"
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF5A1F]"
            />
          </div>

          {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF7A00] to-[#FF5A1F] hover:from-[#FF8F1F] hover:to-[#FF682B] shadow-lg shadow-[#FF5A1F]/30 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Connect on WhatsApp with Mehul Roy</span>
          </button>

          <p className="text-center text-[11px] text-neutral-500 font-mono">
            Fast response · No pressure consultation
          </p>
        </form>
      </div>
    </div>
  );
};
