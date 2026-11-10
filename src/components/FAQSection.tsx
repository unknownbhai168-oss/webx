import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const faqs: FAQItem[] = [
    {
      question: '1. What is a static website?',
      answer:
        'A static website delivers pre-rendered HTML, CSS, and lightweight scripts directly to the visitor. It is ultra-fast, highly secure, cost-effective, and ideal for showcasing business information, portfolios, shop catalogs, and service menus without needing complex database servers.',
    },
    {
      question: '2. What is a dynamic website?',
      answer:
        'A dynamic website includes interactive client-side logic, custom state handling, dynamic filtering, calculators, form validations, and data feeds. It provides an app-like interactive feel for businesses that need more than a traditional informational brochure.',
    },
    {
      question: '3. What is the difference between static and dynamic websites?',
      answer:
        'Static websites (starting at ₹1,700) focus on pure presentation and instant loading with fixed content structures. Dynamic websites (starting at ₹2,100) introduce interactive user inputs, filterable databases/catalogs, custom calculators, and richer state-driven user journeys.',
    },
    {
      question: '4. Are the websites mobile responsive?',
      answer:
        'Yes, 100%. Every single website created by WEBX is engineered mobile-first. We test on real iOS and Android viewports as well as tablets, laptops, and ultra-wide desktop monitors to ensure seamless readability and touch targets.',
    },
    {
      question: '5. Can I request a custom design?',
      answer:
        'Absolutely. We do not force you into cookie-cutter generic templates. We can match your existing logo, preferred brand colors, typography, or custom layout ideas you have in mind.',
    },
    {
      question: '6. What domain and hosting are provided with the website?',
      answer:
        'All websites are deployed on fast, reliable cloud subdomains like yourbusiness.vercel.app (hosted on Vercel). This provides 100% free hosting with an SSL certificate (HTTPS), global edge CDN speed, and zero monthly server maintenance fees.',
    },
    {
      question: '7. Is SEO optimization included in the starting price?',
      answer:
        'No, SEO (Search Engine Optimization) is not included in the starting packages (Static ₹1,700 / Dynamic ₹2,100). The websites are built for direct sharing, social media bio links, Google My Business links, WhatsApp catalogs, QR codes, and customer referrals. If you require custom domain integration or organic search ranking campaigns, those can be discussed as separate services.',
    },
    {
      question: '8. How long does development take?',
      answer:
        'Standard static websites are typically delivered within 48 to 72 hours once content and business details are provided. Dynamic or multi-page websites usually take 3 to 5 business days.',
    },
    {
      question: '9. Can I request modifications and revisions?',
      answer:
        'Yes! Every project includes a dedicated revision window after initial delivery to adjust text, images, colors, and layout alignments until you are completely satisfied with the live result.',
    },
    {
      question: '10. How can I start my project?',
      answer:
        'Simply click the "Chat on WhatsApp" button or submit the quick inquiry form with your business name and desired website type. Mehul Roy will personally reply to review your goals and start development right away.',
    },
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24 bg-[#0c0c0c] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-[#FF7A00] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit']">
            FREQUENTLY ASKED <span className="text-gradient-fire">QUESTIONS.</span>
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            Honest, transparent guidance regarding our packages, deliverables, hosting, and timeline.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#141414] border border-white/10 hover:border-white/20 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5A1F]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-neutral-300 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#FF5A1F] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
