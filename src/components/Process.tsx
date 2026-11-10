import React from 'react';
import { Search, Compass, Code, Rocket, CheckCircle } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'DISCOVER',
      subtitle: 'Understanding Requirements',
      description:
        'We connect directly over WhatsApp or phone to deeply understand your business niche, target audience, preferred branding, and essential website objectives.',
      icon: Search,
      deliverable: 'Project scope & transparent price agreement',
    },
    {
      step: '02',
      title: 'DESIGN',
      subtitle: 'Visual Architecture',
      description:
        'We craft a bespoke, modern aesthetic tailored to your brand identity — typography, fiery contrast accents, intuitive navigation, and high-impact hero layouts.',
      icon: Compass,
      deliverable: 'Homepage concept & layout structure',
    },
    {
      step: '03',
      title: 'DEVELOP',
      subtitle: 'Modern Engineering',
      description:
        'Clean, performant coding with modern web standards. We implement 100% mobile responsiveness, direct WhatsApp lead capture, and instant loading speeds.',
      icon: Code,
      deliverable: 'Fully functional, responsive website',
    },
    {
      step: '04',
      title: 'LAUNCH',
      subtitle: 'Testing & Going Live',
      description:
        'Comprehensive quality testing across iOS, Android, tablets, and desktop browsers. We configure your fast .vercel.app subdomain and launch your business online.',
      icon: Rocket,
      deliverable: 'Live website on .vercel.app & developer support',
    },
  ];

  return (
    <section id="process" className="relative py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#FF7A00] mb-3">
            Our Development Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit']">
            FROM AN IDEA TO A{' '}
            <span className="text-gradient-fire">DIGITAL REALITY.</span>
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            A frictionless, streamlined four-step engineering workflow designed to launch your business website in record time without headaches.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl p-7 bg-[#141414] border border-white/10 hover:border-[#FF5A1F]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#FF5A1F]/10"
              >
                <div>
                  {/* Step index & icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black font-mono text-neutral-400 group-hover:text-[#FF7A00] transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF7A00] group-hover:bg-[#FF5A1F] group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white font-['Outfit'] tracking-wide">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-[#FFC857] mb-3">
                    {item.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Deliverable footnote */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                  <CheckCircle className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                  <span className="truncate">{item.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
