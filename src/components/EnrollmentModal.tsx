import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight, Lock, Sparkles } from 'lucide-react';
import { Currency } from '../types';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: string;
  initialCurrency?: Currency;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  initialTier = 'Full Mentorship',
  initialCurrency = 'PHP'
}) => {
  const [tier, setTier] = useState<string>(initialTier);
  const [currency, setCurrency] = useState<Currency>(initialCurrency);
  const [tgHandle, setTgHandle] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [experience, setExperience] = useState<string>('prop_firm');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    if (initialTier) setTier(initialTier);
    if (initialCurrency) setCurrency(initialCurrency);
  }, [initialTier, initialCurrency]);

  if (!isOpen) return null;

  const priceLabel = tier === 'Standalone Vault'
    ? (currency === 'PHP' ? '₱4,000' : '$79')
    : (currency === 'PHP' ? '₱10,000' : '$199');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 overflow-y-auto py-8">
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0b0c10] border border-zinc-700 text-zinc-100 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                APPLICATION &bull; RJS DESK
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <Lock className="w-3 h-3" /> SECURE ENROLLMENT
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Claim Your Desk Slot</h3>
            <p className="text-xs text-zinc-400 mt-1 font-sans">
              Submit your verified details below to generate your direct checkout link and unlock private Telegram onboarding.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-mono text-xs">
              
              {/* Program Option Select */}
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">SELECTED PROGRAM TIER</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTier('Full Mentorship')}
                    className={`py-2.5 px-3 rounded-xl border text-left transition-all cursor-pointer ${
                      tier === 'Full Mentorship'
                        ? 'bg-[#171821] border-white text-white font-bold'
                        : 'bg-[#111217] border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="block font-bold text-xs">Full Mentorship</span>
                    <span className="text-[10px] text-emerald-400">Includes 2 Calls ({currency === 'PHP' ? '₱10,000' : '$199'})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTier('Standalone Vault')}
                    className={`py-2.5 px-3 rounded-xl border text-left transition-all cursor-pointer ${
                      tier === 'Standalone Vault'
                        ? 'bg-[#171821] border-white text-white font-bold'
                        : 'bg-[#111217] border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="block font-bold text-xs">Standalone Vault</span>
                    <span className="text-[10px] text-zinc-400">Self-Study ({currency === 'PHP' ? '₱4,000' : '$79'})</span>
                  </button>
                </div>
              </div>

              {/* Currency Selector */}
              <div>
                <label className="block text-zinc-400 mb-1">CURRENCY BILLING</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrency('PHP')}
                    className={`py-2 rounded-xl text-center cursor-pointer ${
                      currency === 'PHP' ? 'bg-white text-black font-bold' : 'bg-[#111217] text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    Philippine Peso (PHP ₱)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`py-2 rounded-xl text-center cursor-pointer ${
                      currency === 'USD' ? 'bg-white text-black font-bold' : 'bg-[#111217] text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    US Dollar (USD $)
                  </button>
                </div>
              </div>

              {/* Telegram Handle */}
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">TELEGRAM USERNAME (@)</label>
                <input
                  type="text"
                  required
                  value={tgHandle}
                  onChange={(e) => setTgHandle(e.target.value)}
                  placeholder="@yourtelegram"
                  className="w-full px-4 py-3 rounded-xl bg-[#111217] border border-zinc-700 text-white focus:outline-none focus:border-white transition-colors"
                />
                <span className="text-[10px] text-zinc-500 mt-1 block">Ryan Jade contacts you directly here for call scheduling.</span>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="trader@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#111217] border border-zinc-700 text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Experience level */}
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">CURRENT TRADING STAGE</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#111217] border border-zinc-700 text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                >
                  <option value="prop_firm">Prop Firm Challenger (FTMO / FundedNext / 5%ers)</option>
                  <option value="overtrader">Struggling with Overtrading &amp; Revenge Entries</option>
                  <option value="personal_acc">Personal Live Account Trader</option>
                  <option value="beginner">Committed Beginner Seeking Institutional Framework</option>
                </select>
              </div>

              {/* Price Summary Banner */}
              <div className="p-3.5 rounded-xl bg-[#171821] border border-zinc-700/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 block">TOTAL INVESTMENT</span>
                  <span className="text-base font-bold text-white">{tier}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-emerald-400">{priceLabel}</span>
                  <span className="text-[10px] text-zinc-400 block font-mono">ONE-TIME FEE</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 text-xs font-bold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 rounded-xl shadow-lg transition-all mt-4 cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Securing Slot...</span>
                ) : (
                  <>
                    <span>Proceed To Whop Checkout ({priceLabel})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              Application Confirmed &bull; Priority Queued
            </span>

            <h3 className="text-2xl font-bold text-white">Welcome To The Mechanical Desk</h3>

            <p className="text-xs text-zinc-300 font-sans leading-relaxed max-w-sm mx-auto">
              An invitation receipt and access link for <strong>{tier}</strong> ({priceLabel}) has been generated for <strong>{email}</strong> and Telegram handle <strong>{tgHandle}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-[#111217] border border-zinc-800 text-left font-mono text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Program:</span>
                <span className="text-white font-bold">{tier}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Telegram Channel:</span>
                <span className="text-emerald-400 font-bold">@RyanJadeDeskOnboarding</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Diagnostic Call 1:</span>
                <span className="text-amber-300 font-bold">Unlocked after 20-Trade Log</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <a
                href={tier === 'Standalone Vault' ? 'https://www.paypal.com/ncp/payment/5J576YB7X75Q2' : 'https://www.paypal.com/ncp/payment/7CHH7A3H95SMW'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-colors"
              >
                <span>Complete Payment on PayPal ({priceLabel})</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 bg-[#171821] hover:bg-[#222330] text-zinc-300 font-semibold text-xs uppercase tracking-wider rounded-xl cursor-pointer border border-zinc-700 transition-colors"
              >
                Return To Desk Overview
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
