import React from 'react';
import { ShieldCheck, UserCheck, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenEnroll: (tier?: string) => void;
  onOpenPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnroll, onOpenPortal }) => {
  return (
    <>
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#0b0c10] border-b border-zinc-800/80 px-4 py-2 text-center text-xs tracking-wider uppercase font-mono text-zinc-400 flex flex-wrap items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> NY SESSION PROTOCOL
        </span>
        <span className="hidden sm:inline text-zinc-300">Live 90-Min Private Diagnostic Slots Open for Booking</span>
        <a href="#pricing" className="underline hover:text-white transition-colors duration-200 inline-flex items-center gap-0.5">
          View Program Options &rarr;
        </a>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#050507]/90 border-b border-zinc-800/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex flex-col items-start group">
            <span className="font-['Cinzel'] text-2xl font-black tracking-widest text-white group-hover:tracking-wider transition-all duration-300">
              RYAN JADE
            </span>
            <span className="font-mono text-[9px] tracking-[0.28em] text-zinc-500 uppercase -mt-1 group-hover:text-zinc-300 transition-colors">
              MECHANICAL DESK &bull; RJS
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs lg:text-sm font-medium text-zinc-400">
            <a href="#curriculum" className="hover:text-white transition-colors duration-200">Phases 1 &amp; 2</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing &amp; Options</a>
            <a href="#audit" className="hover:text-white transition-colors duration-200">Student Logs</a>
            <a href="#calculator" className="hover:text-white transition-colors duration-200">Risk Calculator</a>
            <a href="#faq" className="hover:text-white transition-colors duration-200">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenPortal}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono tracking-wider uppercase text-zinc-300 hover:text-white bg-[#111217] hover:bg-[#171821] border border-zinc-700/60 rounded-lg transition-all duration-200 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>Portal Demo</span>
            </button>
            <a
              href="https://k798fgvkk6-cell.github.io/rjs-mechanical-desk-portal/"
              className="inline-flex items-center justify-center gap-2 px-3 sm:px-3.5 py-2 text-xs font-mono font-semibold tracking-wider uppercase text-emerald-400 hover:text-emerald-300 bg-emerald-950/20 hover:bg-emerald-900/35 border border-emerald-500/40 hover:border-emerald-400/80 rounded-lg transition-all duration-200 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Enrolled Trader</span>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('pricing');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.hash = 'pricing';
                }
              }}
              className="inline-flex items-center justify-center px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 rounded-lg shadow-sm hover:shadow-white/20 transition-all duration-200 cursor-pointer"
            >
              <span>Claim Slot</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
};
