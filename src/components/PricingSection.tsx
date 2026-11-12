import React, { useState } from 'react';
import { Currency } from '../types';
import { Check, X, ShieldCheck, ArrowRight, Zap, Flame } from 'lucide-react';
import { TuitionModal } from './TuitionModal';

interface PricingProps {
  onOpenEnroll: (tier: string, currency: Currency) => void;
}

export const PricingSection: React.FC<PricingProps> = ({ onOpenEnroll }) => {
  const [currency, setCurrency] = useState<Currency>('PHP');
  const [isTuitionModalOpen, setIsTuitionModalOpen] = useState(false);

  const prices = {
    PHP: {
      standalone: '₱4,000',
      mentorship: '₱10,000',
      upgradeDiff: '₱6,000'
    },
    USD: {
      standalone: '$79',
      mentorship: '$199',
      upgradeDiff: '$120'
    }
  };

  const currentPrices = prices[currency];

  return (
    <section id="pricing" className="py-24 border-t border-zinc-800/80 bg-[#050507] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">Investment Options</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            One Program. Two Ways To Join.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Choose between 100% self-study in the standalone video vault or complete 1-on-1 diagnostic mentorship with Ryan Jade.
          </p>

          {/* Currency Selector */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#0b0c10] border border-zinc-800 mt-6 text-xs font-mono">
            <button
              onClick={() => setCurrency('PHP')}
              className={`px-4 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                currency === 'PHP'
                  ? 'bg-white text-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              PHP (₱)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-white text-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-4">
          
          {/* Option 02: Standalone Video Vault */}
          <div id="standalone" className="p-8 sm:p-10 rounded-3xl bg-[#0b0c10] border border-zinc-800/90 flex flex-col justify-between hover:border-zinc-700/80 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">Option 02</span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-zinc-800/80 text-zinc-400 border border-zinc-700/60">
                  SELF-STUDY VAULT
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">Standalone Video Vault</h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed font-sans">
                Direct, self-paced access to both Phase 1 and Phase 2 curriculum, fillable worksheets, and execution logs.
              </p>

              <div className="mt-6 mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">{currentPrices.standalone}</span>
                  <span className="text-zinc-400 text-xs font-mono">ONE-TIME ACCESS</span>
                </div>
                <p className="text-[12px] text-zinc-500 font-mono mt-1">Lifetime updates &bull; No recurring subscription</p>
              </div>

              {/* Feature list */}
              <div className="space-y-3.5 text-sm">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-300 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">Phase 1 &amp; Phase 2 Video Library (Self-Study Access)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-300 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">Interactive 20-Trade Fillable PDF Execution Sheet</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-300 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">Secret Single-Word Verification Checklists</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-300 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">Weekly Forex Factory Risk Mitigation Rules</span>
                </div>

                {/* Muted Capped Diagnostic Box */}
                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-3">
                  <Check className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-400 text-sm leading-relaxed font-sans">
                    <strong className="text-zinc-300 block font-mono text-xs uppercase tracking-wider mb-0.5">2x Diagnostic Portal Tickets (Capped):</strong>
                    Exactly 2 setup audits via web portal. Strictly self-paced.
                  </span>
                </div>

                {/* Razor Sharp Crossed-Out Lineup */}
                <div className="pt-2 space-y-3 border-t border-zinc-800/60">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 text-red-400" />
                    </div>
                    <span className="text-zinc-500 line-through text-sm">No Live 1-on-1 Diagnostic Calls (0 of 2)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 text-red-400" />
                    </div>
                    <span className="text-zinc-500 line-through text-sm">No Daily Chart Markups or Market Direction</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 text-red-400" />
                    </div>
                    <span className="text-zinc-500 line-through text-sm">No Open-Line GMeet or Bi-Weekly Calls</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 text-red-400" />
                    </div>
                    <span className="text-zinc-500 line-through text-sm">No Unlimited Telegram DM Access (Capped at 2 tickets)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-zinc-800">
              <div className="p-3.5 rounded-xl bg-[#111217] border border-zinc-700/60 text-xs text-zinc-300 mb-6">
                <span className="text-amber-400 font-bold">100% Credit Clause:</span> If you decide to upgrade to Full Mentorship within 30 days, 100% of this fee is deducted!
              </div>
              <a
                href="https://www.paypal.com/ncp/payment/5J576YB7X75Q2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 text-xs font-bold tracking-wider uppercase text-zinc-200 bg-[#171821] hover:bg-[#222330] border border-zinc-700 hover:border-zinc-500 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-center"
              >
                <span>INSTANT ACCESS TO VAULT ({currentPrices.standalone})</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </a>
              <p className="text-[11px] font-mono text-zinc-500 text-center mt-2 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Secure institutional checkout via PayPal</span>
              </p>
            </div>
          </div>

          {/* Option 01: Full Mentorship Experience */}
          <div id="mentorship" className="scroll-mt-24 p-8 sm:p-10 rounded-3xl bg-[#0c0d12] border-2 border-amber-400/90 flex flex-col justify-between shadow-[0_0_60px_-15px_rgba(245,158,11,0.22)] relative">
            
            {/* Subtle internal gold gradient glow safely contained */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl rounded-full"></div>
            </div>

            {/* Recommended Floating Tag */}
            <div className="absolute -top-3.5 right-6 sm:right-8 z-30 px-4 py-1.5 rounded-full bg-amber-400 text-black font-mono font-black text-[11px] tracking-wider uppercase shadow-xl shadow-amber-500/30 flex items-center gap-1.5 whitespace-nowrap">
              <Zap className="w-3.5 h-3.5 fill-black flex-shrink-0" />
              <span>RECOMMENDED &bull; FULL PROTOCOL</span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">Option 01</span>
                <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-sm">
                  LIVE GUIDANCE INCLUDED
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">Full Mentorship Experience</h3>
              <p className="text-zinc-300 text-sm mt-2 leading-relaxed font-sans">
                The complete personal immersion with live guidance, daily market context, uncapped private DM access, and continuous live accountability.
              </p>

              {/* Flexible Tuition Badge Block */}
              <div className="mt-6 mb-8 py-4 px-5 rounded-2xl bg-[#111217] border border-amber-500/30">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>FLEXIBLE TUITION ENROLLMENT</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-2 leading-relaxed">
                  Pay in full or split across Phase 1 &amp; Phase 2
                </p>
              </div>

              {/* Feature list */}
              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-zinc-100 text-sm font-medium">TWO 90-Minute 1-on-1 Diagnostic Calls with Ryan Jade (1 per phase)</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-zinc-100 text-sm font-medium">Phase 1 &amp; Phase 2 Video Library with live guide from Ryan Jade</span>
                </div>

                {/* Gold / Amber Highlight Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-emerald-500/15 border-2 border-amber-500/50 flex items-start gap-3.5 shadow-[0_0_25px_-5px_rgba(245,158,11,0.25)]">
                  <div className="w-5 h-5 rounded-full bg-amber-500/25 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-300" />
                  </div>
                  <div className="text-zinc-100 text-sm leading-relaxed font-sans">
                    <strong className="text-amber-300 uppercase tracking-wider block font-mono text-xs font-bold mb-1">
                      🔥 UNLIMITED 1-ON-1 TELEGRAM DMs
                    </strong>
                    <p className="text-zinc-200 text-sm leading-relaxed">
                      Continuous, uncapped direct feedback. Send your charts as setups develop, ask questions during the session, and get direct eyes on your execution.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-zinc-100 text-sm font-medium">Daily Tradable Chart Markups &amp; Market Bias (Every single tradable day)</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-zinc-100 text-sm font-medium">Real-Time Telegram Market Direction &amp; Session Warnings (Forex Factory news defense)</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-zinc-100 text-sm font-medium">Open-Line Google Meet (GMeet) Sessions (Live screen-share trade reviews &amp; setup audits)</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-zinc-100 text-sm font-medium">Bi-Weekly Live Group Calls (Strategy deep dives, collective chart audits, &amp; mindset calibration)</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-zinc-100 text-sm font-medium">Interactive 20-Trade Fillable PDF Execution Sheet &amp; Single-Word Verification Checklists</span>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-zinc-800 relative z-10">
              <button
                type="button"
                onClick={() => setIsTuitionModalOpen(true)}
                className="w-full py-4 text-xs font-bold tracking-wider uppercase text-zinc-200 bg-[#171821] hover:bg-[#222330] border border-amber-500/50 hover:border-amber-400 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-center shadow-lg hover:shadow-amber-500/10"
              >
                <span>START THE PROGRAM NOW AND SECURE A SLOT →</span>
              </button>
              <p className="text-[11px] font-mono text-zinc-500 text-center mt-2 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Secure institutional checkout via PayPal</span>
              </p>
            </div>
          </div>

        </div>

        {/* Upgrade Credit Calculator Visual */}
        <div className="mt-12 p-8 rounded-3xl bg-[#0b0c10] border border-zinc-800 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>THE NO-RISK UPGRADE BRIDGE</span>
          </div>
          <h3 className="text-xl font-bold text-white">How The 100% Mentorship Credit Works</h3>
          <p className="text-zinc-400 text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
            If you start with the Standalone Vault today and later want Ryan Jade to review your charts in the private 90-minute calls, you do not pay full price twice.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-left font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#111217] border border-zinc-800">
              <p className="text-zinc-500 font-bold">STEP 1</p>
              <p className="text-white font-bold text-sm mt-1">Join Standalone ({currentPrices.standalone})</p>
              <p className="text-zinc-400 mt-1 font-sans text-xs">Study the video vault and log your 20 mechanical trades.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#111217] border border-zinc-800">
              <p className="text-zinc-500 font-bold">STEP 2</p>
              <p className="text-white font-bold text-sm mt-1">Upgrade in 30 Days</p>
              <p className="text-zinc-400 mt-1 font-sans text-xs">Request an upgrade to the Full 1-on-1 Mentorship.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#111217] border border-emerald-500/30">
              <p className="text-emerald-400 font-bold">STEP 3</p>
              <p className="text-emerald-300 font-bold text-sm mt-1">Pay Only {currentPrices.upgradeDiff}</p>
              <p className="text-zinc-300 mt-1 font-sans text-xs">100% of your standalone vault payment is credited automatically.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Tuition Selection Modal */}
      <TuitionModal
        isOpen={isTuitionModalOpen}
        onClose={() => setIsTuitionModalOpen(false)}
      />
    </section>
  );
};
