import React, { useState } from 'react';
import {
  ProjectInquiryData,
  formatCustomInquiryMessage,
  buildWhatsAppUrl,
} from '../utils/whatsapp';
import { siteConfig } from '../config/siteConfig';
import { Send, MessageCircle, AlertCircle, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  initialType?: 'static' | 'dynamic' | 'custom';
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialType = 'static',
}) => {
  const [formData, setFormData] = useState<ProjectInquiryData>({
    clientName: '',
    businessName: '',
    phone: '',
    email: '',
    websiteType: initialType,
    preferredBudget: '₹1,700 - ₹3,000',
    projectDescription: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProjectInquiryData, string>>>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const validate = () => {
    const errs: Partial<Record<keyof ProjectInquiryData, string>> = {};
    if (!formData.clientName.trim()) {
      errs.clientName = 'Your name is required';
    }
    if (!formData.businessName.trim()) {
      errs.businessName = 'Business or shop name is required';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = 'Valid phone or WhatsApp number is required';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 10) {
      errs.projectDescription = 'Please provide at least a short 1-2 sentence description of your project';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#FF5A1F', '#FF7A00', '#FFC857'],
      });
    } catch {
      // ignore
    }

    const formatted = formatCustomInquiryMessage(formData);
    setSubmittedMessage(formatted);

    // Open WhatsApp directly with formatted message
    const waUrl = buildWhatsAppUrl(formatted);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#FF7A00] mb-3">
            Direct Developer Communication
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit']">
            LET'S BUILD SOMETHING{' '}
            <span className="text-gradient-fire">EXTRAORDINARY.</span>
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            Tell us about your business. Submitting this form prepares your complete project brief and connects you directly with Mehul Roy on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Agency Contact Information Card */}
          <div className="lg:col-span-5 bg-[#141414] rounded-2xl border border-white/10 p-8 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#FFC857] font-semibold">
                Agency Contact Hub
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 font-['Outfit']">
                WEBX Studio
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                Direct client collaboration spearheaded by freelancer & student developer Mehul Roy. No automated call routing; you speak directly with the builder.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
              <div className="flex items-center gap-3.5 text-neutral-300">
                <div className="w-10 h-10 rounded-xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 font-mono">WhatsApp (Fastest Response)</div>
                  <a
                    href={buildWhatsAppUrl('Hello Mehul! I would like to enquire about WEBX website development.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-semibold hover:text-[#22c55e] transition-colors"
                  >
                    {siteConfig.contact.whatsappDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-neutral-300">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 font-mono">Direct Phone Call</div>
                  <a
                    href={siteConfig.contact.phoneTel}
                    className="font-mono font-semibold hover:text-cyan-400 transition-colors"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-neutral-300">
                <div className="w-10 h-10 rounded-xl bg-[#FF5A1F]/15 text-[#FF5A1F] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 font-mono">Email Inquiries</div>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-mono hover:text-[#FF7A00] transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-neutral-300">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 font-mono">Location & Remote Availability</div>
                  <div className="font-mono text-xs">{siteConfig.contact.location}</div>
                </div>
              </div>
            </div>

            {/* Quick Pricing reminder */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-neutral-400">Static Website:</span>
                <span className="text-white font-bold">From ₹1,700</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-neutral-400">Dynamic Website:</span>
                <span className="text-white font-bold">From ₹2,100</span>
              </div>
              <div className="text-[11px] text-neutral-500 pt-1 border-t border-white/5">
                48-72 Hour Delivery · 100% Mobile Responsive
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#141414] rounded-2xl border border-white/10 p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Row 1: Client Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Client / Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none transition-colors ${
                      errors.clientName ? 'border-red-500 focus:border-red-500' : 'border-white/15 focus:border-[#FF5A1F]'
                    }`}
                  />
                  {errors.clientName && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.clientName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Business / Shop Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Sharma Dental Clinic"
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none transition-colors ${
                      errors.businessName ? 'border-red-500 focus:border-red-500' : 'border-white/15 focus:border-[#FF5A1F]'
                    }`}
                  />
                  {errors.businessName && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.businessName}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone Number & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-white/15 focus:border-[#FF5A1F]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. contact@business.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/15 focus:border-[#FF5A1F]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Website Type & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Website Type *
                  </label>
                  <select
                    value={formData.websiteType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        websiteType: e.target.value as 'static' | 'dynamic' | 'custom',
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF5A1F]"
                  >
                    <option value="static">Static Website (From ₹1,700)</option>
                    <option value="dynamic">Dynamic Website (From ₹2,100)</option>
                    <option value="custom">Custom Web Application</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Preferred Budget
                  </label>
                  <select
                    value={formData.preferredBudget}
                    onChange={(e) => setFormData({ ...formData, preferredBudget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF5A1F]"
                  >
                    <option value="₹1,700 - ₹2,500">₹1,700 - ₹2,500 (Standard)</option>
                    <option value="₹2,500 - ₹4,000">₹2,500 - ₹4,000 (Dynamic + Addons)</option>
                    <option value="₹4,000+">₹4,000+ (Custom Scope)</option>
                  </select>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Project Description / Key Goals *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.projectDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, projectDescription: e.target.value })
                  }
                  placeholder="Tell us what sections or features you need (e.g. Services list, Gallery, WhatsApp chat, Clinic location map)..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none transition-colors ${
                    errors.projectDescription
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-white/15 focus:border-[#FF5A1F]'
                  }`}
                />
                {errors.projectDescription && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.projectDescription}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-sm text-white bg-gradient-to-r from-[#FF7A00] via-[#FF5A1F] to-[#C1121F] hover:from-[#FF8F1F] hover:to-[#FF5A1F] shadow-lg shadow-[#FF5A1F]/25 hover:shadow-[#FF5A1F]/45 transition-all cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>GENERATE BRIEF & OPEN WHATSAPP CHAT</span>
              </button>
            </form>

            {/* Genuine submission feedback (Per Section 13: "Do not display a false success message") */}
            {submittedMessage && (
              <div className="mt-6 p-4 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30 text-xs text-neutral-200 animate-in fade-in">
                <div className="flex items-center gap-2 text-[#22c55e] font-bold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Brief Prepared Successfully!</span>
                </div>
                <p className="text-neutral-300 mb-3">
                  WhatsApp was launched with your personalized brief. If WhatsApp didn't open automatically, click below:
                </p>
                <a
                  href={buildWhatsAppUrl(submittedMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22c55e] text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Directly</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
