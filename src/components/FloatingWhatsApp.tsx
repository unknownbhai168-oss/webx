import React, { useState } from 'react';
import {
  buildWhatsAppUrl,
  getStaticEnquiryMessage,
  getDynamicEnquiryMessage,
  getGeneralEnquiryMessage,
} from '../utils/whatsapp';
import { siteConfig } from '../config/siteConfig';
import { MessageCircle, X, ArrowUpRight, Zap, Check, Phone } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      title: 'Static Website Enquiry',
      price: `₹${siteConfig.pricing.staticStartingPrice.toLocaleString()}`,
      desc: 'Fast, responsive, showcase website',
      message: getStaticEnquiryMessage(),
    },
    {
      title: 'Dynamic Website Enquiry',
      price: `₹${siteConfig.pricing.dynamicStartingPrice.toLocaleString()}`,
      desc: 'Interactive filters & dynamic forms',
      message: getDynamicEnquiryMessage(),
    },
    {
      title: 'General Consultation',
      price: 'Free',
      desc: 'Ask questions & discuss requirements',
      message: getGeneralEnquiryMessage(),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Inquiry Popup Menu */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#141414] border border-white/15 p-5 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-['Outfit']">
                  Chat with WEBX
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">
                  Mehul Roy · Direct Developer
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-neutral-300 mt-3 mb-3">
            Select an enquiry type to start WhatsApp chat with a pre-formatted message:
          </p>

          <div className="space-y-2">
            {options.map((opt, i) => (
              <a
                key={i}
                href={buildWhatsAppUrl(opt.message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-xl bg-white/5 hover:bg-[#22c55e]/15 border border-white/5 hover:border-[#22c55e]/40 transition-all flex items-center justify-between group cursor-pointer block"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-[#22c55e] transition-colors">
                    {opt.title}
                  </div>
                  <div className="text-[11px] text-neutral-400">{opt.desc}</div>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#FFC857] group-hover:text-[#22c55e]">
                  <span>{opt.price}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-3 pt-2 text-[10px] font-mono text-neutral-400 flex items-center justify-between border-t border-white/10 px-1">
            <span className="text-[#22c55e] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              Direct WhatsApp
            </span>
            <a
              href={siteConfig.contact.phoneTel}
              className="flex items-center gap-1 text-neutral-300 hover:text-cyan-400 transition-colors"
              title="Call Directly"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>Call: {siteConfig.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 rounded-full bg-[#22c55e] hover:bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center justify-center"
        aria-label="Open WhatsApp Quick Chat"
        title="Chat on WhatsApp"
      >
        {/* Glow halo */}
        <span className="absolute inset-0 rounded-full bg-[#22c55e] opacity-30 animate-ping pointer-events-none" />

        {isOpen ? (
          <X className="w-6 h-6 relative z-10" />
        ) : (
          <MessageCircle className="w-6 h-6 relative z-10" />
        )}
      </button>
    </div>
  );
};
