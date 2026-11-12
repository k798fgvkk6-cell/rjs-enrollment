import React from 'react';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { Currency } from '../types';

interface FooterProps {
  onOpenEnroll: (tier: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnroll }) => {
  return (
    <>
      {/* Final Call to Action */}
      <section className="py-24 border-t border-zinc-800/80 bg-[#050507] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_65%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">Strictly 1 Trade A Day</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 leading-tight font-sans">
            Master Mechanical Discipline.<br />Eliminate Market Anxiety.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mt-4 font-sans leading-relaxed">
            Whether you join the 1-on-1 Mentorship or begin with the Standalone Vault, your journey to rule-based trading begins today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={() => onOpenEnroll('Full Mentorship')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-bold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Enroll In Mentorship
            </button>
            <button
              onClick={() => onOpenEnroll('Standalone Vault')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-semibold tracking-wider uppercase text-zinc-300 bg-[#111217] hover:bg-[#171821] border border-zinc-700 rounded-xl transition-all cursor-pointer"
            >
              Get Standalone Access
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800/80 bg-[#050507] font-mono text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-['Cinzel'] text-lg font-bold text-white tracking-widest">RYAN JADE</span>
            <span className="text-[10px] tracking-wider text-zinc-600 mt-0.5">
              &copy; {new Date().getFullYear()} RYAN JADE TRADING DESK &bull; RJS PROTOCOL. ALL RIGHTS RESERVED.
            </span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-zinc-400">
            <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing Options</a>
            <a href="#audit" className="hover:text-white transition-colors">Student Audit</a>
            <a href="#calculator" className="hover:text-white transition-colors">Risk Calculator</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="text-[10px] text-zinc-600 text-center md:text-right max-w-xs">
            Trading foreign exchange on margin carries high risk. Strict risk budgets and discipline are mandatory.
          </div>
        </div>
      </footer>
    </>
  );
};
