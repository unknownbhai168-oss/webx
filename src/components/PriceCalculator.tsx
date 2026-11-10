import React, { useState } from 'react';
import {
  CALCULATOR_ADDONS,
  calculateEstimatedPrice,
  PriceCalculationInput,
} from '../utils/pricing';
import { buildWhatsAppUrl, formatCalculatorQuoteMessage } from '../utils/whatsapp';
import { Calculator, Check, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PriceCalculator: React.FC = () => {
  const [packageType, setPackageType] = useState<'static' | 'dynamic' | 'custom'>('static');
  const [pageCount, setPageCount] = useState<number>(3);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['whatsapp_integration']);

  const calculationInput: PriceCalculationInput = {
    packageType,
    pageCount,
    selectedAddonIds: selectedAddons,
  };

  const estimate = calculateEstimatedPrice(calculationInput);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleSendWhatsAppQuote = () => {
    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF5A1F', '#FF7A00', '#FFC857'],
      });
    } catch {
      // ignore
    }

    const packageNames = {
      static: 'Static Website Development (Base ₹1,700)',
      dynamic: 'Dynamic Website Development (Base ₹2,100)',
      custom: 'Custom High-End Web Experience',
    };

    const featureNames = selectedAddons
      .map((id) => CALCULATOR_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean) as string[];

    const message = formatCalculatorQuoteMessage({
      packageType: packageNames[packageType],
      pageCount,
      features: featureNames,
      estimatedTotal: estimate.total,
    });

    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="calculator" className="relative py-24 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-[#FFC857] mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Cost Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit']">
            CUSTOMIZE YOUR PROJECT &{' '}
            <span className="text-gradient-fire">GET AN INSTANT QUOTE.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400">
            No guessing or surprise hidden fees. Tailor your website scope and see an honest starting price calculation before reaching out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#141414] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-8">
            {/* 1. Package Type Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold mb-3">
                1. Select Website Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPackageType('static')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    packageType === 'static'
                      ? 'bg-[#FF5A1F]/15 border-[#FF5A1F] text-white shadow-md shadow-[#FF5A1F]/20'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="text-sm font-bold">Static</div>
                  <div className="text-xs text-[#FF7A00] font-mono mt-1">From ₹1,700</div>
                  <div className="text-[11px] text-neutral-400 mt-1">3 pages included</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPackageType('dynamic')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    packageType === 'dynamic'
                      ? 'bg-[#FF7A00]/15 border-[#FF7A00] text-white shadow-md shadow-[#FF7A00]/20'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="text-sm font-bold flex items-center justify-between">
                    <span>Dynamic</span>
                    <Sparkles className="w-3 h-3 text-[#FFC857]" />
                  </div>
                  <div className="text-xs text-[#FFC857] font-mono mt-1">From ₹2,100</div>
                  <div className="text-[11px] text-neutral-400 mt-1">4 pages included</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPackageType('custom')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    packageType === 'custom'
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="text-sm font-bold">Custom</div>
                  <div className="text-xs text-amber-400 font-mono mt-1">From ₹2,800</div>
                  <div className="text-[11px] text-neutral-400 mt-1">Tailored scope</div>
                </button>
              </div>
            </div>

            {/* 2. Number of Pages Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                  2. Total Website Pages
                </label>
                <span className="text-sm font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-md">
                  {pageCount} {pageCount === 1 ? 'Page' : 'Pages'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={pageCount}
                onChange={(e) => setPageCount(parseInt(e.target.value, 10))}
                className="w-full accent-[#FF5A1F] h-2 bg-neutral-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-2">
                <span>1 page (Landing)</span>
                <span>3-4 pages (Standard)</span>
                <span>8+ pages (Expanded)</span>
              </div>
            </div>

            {/* 3. Additional Features & Add-ons */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold mb-3">
                3. Choose Desired Features & Integrations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CALCULATOR_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'bg-[#FF5A1F]/10 border-[#FF5A1F]/60 text-white'
                          : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:text-neutral-200'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                          isChecked ? 'bg-[#FF5A1F] text-white' : 'border border-neutral-600'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{addon.name}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5 leading-tight">
                          {addon.description}
                        </div>
                        <div className="text-[11px] font-mono text-[#FF7A00] font-semibold mt-1">
                          {addon.price === 0 ? 'FREE (Included)' : `+₹${addon.price}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quotation Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#1c1815] to-[#121212] rounded-2xl border-2 border-[#FF5A1F]/30 p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-4 border-b border-white/10">
              <span className="uppercase tracking-wider">Live Quotation Preview</span>
              <span className="text-[#22c55e]">● Instant Estimate</span>
            </div>

            {/* Price Total */}
            <div className="py-6">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Estimated Starting Investment
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  ₹{estimate.total.toLocaleString()}
                </span>
                <span className="text-xs text-neutral-400 font-mono">INR</span>
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                Direct work with freelancer & student founder Mehul Roy. No agency middlemen markups.
              </p>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 py-4 border-t border-b border-white/10 text-xs">
              <div className="flex justify-between text-neutral-300">
                <span>Base Package ({packageType.toUpperCase()}):</span>
                <span className="font-mono text-white">₹{estimate.basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>
                  Pages ({pageCount} total, {estimate.includedPages} included):
                </span>
                <span className="font-mono text-white">
                  {estimate.extraPagesPrice === 0
                    ? 'Included'
                    : `+₹${estimate.extraPagesPrice.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Selected Add-ons:</span>
                <span className="font-mono text-white">
                  {estimate.addonsPrice === 0
                    ? 'None'
                    : `+₹${estimate.addonsPrice.toLocaleString()}`}
                </span>
              </div>
            </div>

            {/* Inclusions summary */}
            <div className="py-4 space-y-1.5 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>100% Mobile & Desktop Responsive</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>Hosted on .vercel.app Subdomain (Zero Server Fees)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>Direct Lead Sharing (No SEO Optimization Included)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>Direct 1-on-1 WhatsApp Communication with Mehul</span>
              </div>
            </div>

            {/* CTA: Order via WhatsApp */}
            <button
              onClick={handleSendWhatsAppQuote}
              className="mt-4 w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-sm text-white bg-gradient-to-r from-[#22c55e] to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 shadow-lg shadow-emerald-500/20 transition-all duration-200 cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-4 h-4" />
              <span>BOOK VIA WHATSAPP (₹{estimate.total.toLocaleString()})</span>
            </button>
            <p className="text-[11px] text-center text-neutral-500 mt-2 font-mono">
              Opens WhatsApp with this exact specification pre-typed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
