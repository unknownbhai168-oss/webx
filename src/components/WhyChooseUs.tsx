import React from 'react';
import {
  Coins,
  Palette,
  Smartphone,
  Sparkles,
  Cpu,
  MessageSquare,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const cards = [
    {
      number: '01',
      title: 'AFFORDABLE PRICING',
      description:
        'Professional website development starting at just ₹1,700 for static and ₹2,100 for dynamic sites. Premium quality without international agency fees.',
      icon: Coins,
      accent: 'from-[#FF7A00] to-[#FF5A1F]',
    },
    {
      number: '02',
      title: 'MODERN DESIGN',
      description:
        'Beautiful, contemporary and visually engaging layouts that reflect the modern digital era and set you apart from outdated competitor templates.',
      icon: Palette,
      accent: 'from-[#FF5A1F] to-[#C1121F]',
    },
    {
      number: '03',
      title: 'MOBILE-FIRST DEVELOPMENT',
      description:
        'Over 85% of your customers browse on smartphones. Every WEBX website is engineered touch-first with pixel-perfect responsiveness across all screen sizes.',
      icon: Smartphone,
      accent: 'from-[#FFC857] to-[#FF7A00]',
    },
    {
      number: '04',
      title: 'PROFESSIONAL UI/UX',
      description:
        'Easy-to-use, accessible and conversion-oriented interfaces designed to effortlessly guide visitors toward calling, messaging, or buying.',
      icon: Sparkles,
      accent: 'from-[#FF5A1F] to-[#FF7A00]',
    },
    {
      number: '05',
      title: 'CUSTOM SOLUTIONS',
      description:
        'Website functionality built around your individual business model — whether a gym timetable, salon treatment menu, coaching syllabus, or store catalog.',
      icon: Cpu,
      accent: 'from-[#FF7A00] to-[#FFC857]',
    },
    {
      number: '06',
      title: 'DIRECT COMMUNICATION',
      description:
        'Direct 1-on-1 WhatsApp and phone contact with freelancer and student founder Mehul Roy. No call centers, ticketing delays, or junior account reps.',
      icon: MessageSquare,
      accent: 'from-[#22c55e] to-emerald-600',
    },
  ];

  return (
    <section id="why-choose-us" className="relative py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#FF7A00] mb-3">
            The WEBX Edge
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit']">
            WHY SETTLE FOR <span className="text-gradient-fire">ORDINARY?</span>
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            We bridge the gap between expensive corporate design agencies and unreliable cookie-cutter templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="relative group rounded-2xl p-7 bg-[#141414] border border-white/10 hover:border-[#FF5A1F]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF5A1F]/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-[#FF7A00] transition-colors">
                      {card.number}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.accent} flex items-center justify-center text-white shadow-md`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 font-['Outfit'] tracking-wide">
                    {card.title}
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-neutral-400 group-hover:text-white transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                  <span>Guaranteed Standards</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
