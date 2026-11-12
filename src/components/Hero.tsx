import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Video, Clock } from 'lucide-react';

interface HeroProps {
  onOpenEnroll: (tier: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnroll }) => {
  // Live clock and countdown simulation to 9:30 PM PHT
  const [currentTimePHT, setCurrentTimePHT] = useState('');
  const [countdownText, setCountdownText] = useState('02h 45m 12s');
  const [sessionPhase, setSessionPhase] = useState<'PRE_MARKET' | 'ACTIVE_EXECUTION' | 'NIGHT_CUTOFF'>('PRE_MARKET');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format current UTC+8 (PHT)
      const phtString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Manila',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTimePHT(phtString);

      // Compute status relative to 21:30 and 02:00
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // 21:30 = 1290 minutes, 02:00 = 120 minutes
      if (totalMinutes >= 1290 || totalMinutes < 120) {
        setSessionPhase('ACTIVE_EXECUTION');
        setCountdownText('SESSION ACTIVE • EXECUTE 1 POSITION');
      } else if (totalMinutes >= 120 && totalMinutes < 300) {
        setSessionPhase('NIGHT_CUTOFF');
        setCountdownText('2:00 AM CUTOFF • CHARTS TERMINATED');
      } else {
        setSessionPhase('PRE_MARKET');
        // Countdown to 21:30
        const targetMin = 1290;
        const diffMin = (targetMin - totalMinutes + 1440) % 1440;
        const h = Math.floor(diffMin / 60);
        const m = diffMin % 60;
        const s = 59 - now.getSeconds();
        setCountdownText(`${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-16 pb-16 md:pt-24 md:pb-20 bg-grid-pattern overflow-hidden">
      {/* Radial Spotlight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.06),transparent_65%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badges Bar */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111217]/90 border border-zinc-700/70 text-xs font-mono text-zinc-300 mb-6 shadow-inner">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="tracking-wide text-zinc-300">1 Trade A Day &bull; Strict 9:30 PM Rule &bull; 1:3 RRR Focus</span>
        </div>

        {/* Live NY Countdown Widget */}
        <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#0b0c10]/95 border border-zinc-800 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">PHT Desk Time:</span>
            <span className="text-white font-semibold">{currentTimePHT || '09:15:00 PM'}</span>
          </div>
          <span className="text-zinc-700">|</span>
          <div className="flex items-center gap-2 text-xs font-mono">
            {sessionPhase === 'ACTIVE_EXECUTION' ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                ACTIVE EXECUTION WINDOW
              </span>
            ) : sessionPhase === 'NIGHT_CUTOFF' ? (
              <span className="inline-flex items-center gap-1.5 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-zinc-500"></span>
                2:00 AM LOCKOUT REACHED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                COUNTDOWN TO 9:30 PM: <strong className="text-white font-mono">{countdownText}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08] mb-6">
          Stop Overtrading.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-600">
            Execute The 9:30 PM RJS Strategy and Rules.
          </span>
        </h1>

        {/* RJS 1 : 1 : 1 : 1 Execution Architecture Showcase */}
        <div className="max-w-4xl mx-auto my-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-300 uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            The RJS 1 : 1 : 1 : 1 Execution Architecture
          </div>

          {/* 4-Pillar Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left font-mono">
            <div className="p-3.5 rounded-2xl bg-[#0b0c10] border border-amber-500/20 hover:border-amber-500/40 transition-colors shadow-sm">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">1 PAIR</span>
              <span className="text-sm font-bold text-white block mt-0.5">USTECH100</span>
              <span className="text-[10px] text-zinc-400 block mt-0.5 font-sans">NAS100 Pure Focus</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0b0c10] border border-amber-500/20 hover:border-amber-500/40 transition-colors shadow-sm">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">1 SESSION</span>
              <span className="text-sm font-bold text-white block mt-0.5">NY OPEN</span>
              <span className="text-[10px] text-zinc-400 block mt-0.5 font-sans">Strict Post-9:30 PM PHT</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0b0c10] border border-amber-500/20 hover:border-amber-500/40 transition-colors shadow-sm">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">1 STRATEGY</span>
              <span className="text-sm font-bold text-white block mt-0.5">RJS STRATEGY</span>
              <span className="text-[10px] text-zinc-400 block mt-0.5 font-sans">strictly 1 strategy only</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0b0c10] border border-amber-500/20 hover:border-amber-500/40 transition-colors shadow-sm">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">1 TRADE</span>
              <span className="text-sm font-bold text-white block mt-0.5">1 POSITION / DAY</span>
              <span className="text-[10px] text-zinc-400 block mt-0.5 font-sans">1 position/entry only</span>
            </div>
          </div>

          {/* Value Proposition Description */}
          <p className="max-w-2xl mx-auto text-[16px] font-[Arial,sans-serif] text-zinc-300 font-normal leading-relaxed text-center mt-6">
            Profitable trading isn’t luck—it's made possible by a great strategy that has rules aligned to you and the market. This program does not only teach you how to trade properly, but it also offers you a well-planned strategy and strict rules to eliminate overtrading and revenge trading.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 flex-wrap">
          <a
            href="#mentorship"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 rounded-xl shadow-lg hover:shadow-white/10 transition-all duration-300 cursor-pointer"
          >
            <span>Enroll In Full Mentorship</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="portal.html"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-mono font-semibold tracking-wider uppercase text-emerald-400 hover:text-emerald-300 bg-emerald-950/20 hover:bg-emerald-900/35 border border-emerald-500/40 hover:border-emerald-400 rounded-xl transition-all duration-300 shadow-md shadow-emerald-950/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Enrolled Trader</span>
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold tracking-wider uppercase text-zinc-300 bg-[#111217] hover:bg-[#171821] border border-zinc-700/70 hover:border-zinc-500 rounded-xl transition-all duration-300"
          >
            <span>Explore Standalone Vault</span>
            <Video className="w-4 h-4 text-zinc-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
