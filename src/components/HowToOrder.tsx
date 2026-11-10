import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, getGeneralEnquiryMessage } from '../utils/whatsapp';

interface HowToOrderProps {
  onOpenContactForm: () => void;
}

export const HowToOrder: React.FC<HowToOrderProps> = ({ onOpenContactForm }) => {
  const steps = [
    {
      num: '1',
      title: 'Contact WEBX',
      desc: 'Send a quick hello over WhatsApp or submit our brief contact form.',
    },
    {
      num: '2',
      title: 'Explain Requirements',
      desc: 'Tell us about your business, what you sell, and your preferred style.',
    },
    {
      num: '3',
      title: 'Select a Package',
      desc: 'Choose Static (from ₹1,700) or Dynamic (from ₹2,100) based on needs.',
    },
    {
      num: '4',
      title: 'Discuss Design & Logic',
      desc: 'Review color preferences, sections, contact routing and page flow.',
    },
    {
      num: '5',
      title: 'Finalise Quotation',
      desc: 'Lock in a transparent, fixed price quote with zero hidden surprises.',
    },
    {
      num: '6',
      title: 'Begin Development',
      desc: 'Sit back as Mehul Roy builds your custom website within 48-72 hours.',
    },
  ];

  return (
    <section id="how-to-order" className="relative py-24 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#FF7A00] mb-3">
            Simple 6-Step Onboarding
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit']">
            GET YOUR BUSINESS ONLINE IN{' '}
            <span className="text-gradient-fire">SIMPLE STEPS.</span>
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            No complicated contracts or months of waiting. Launch your professional web presence quickly with direct personal assistance.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-[#141414] border border-white/10 hover:border-[#FF5A1F]/40 transition-all flex items-start gap-4"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FF5A1F] flex items-center justify-center text-white font-mono font-bold text-sm shrink-0 shadow-md">
                {s.num}
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit'] mb-1">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Conversion CTA Strip */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-[#1c1815] via-[#141414] to-[#1a1310] border border-[#FF5A1F]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
              Ready to create your extraordinary website?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Static websites from ₹1,700 · Dynamic websites from ₹2,100 · 100% Mobile First
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href={buildWhatsAppUrl(getGeneralEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#22c55e] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              <span>START VIA WHATSAPP</span>
            </a>

            <button
              onClick={onOpenContactForm}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer w-full sm:w-auto"
            >
              <span>SUBMIT INQUIRY FORM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
