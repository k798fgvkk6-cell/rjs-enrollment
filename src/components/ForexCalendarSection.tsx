import React from 'react';
import { WEEKLY_FOREX_CALENDAR } from '../data/protocolData';
import { Calendar, AlertCircle, ShieldAlert, CheckCircle2, ShieldOff } from 'lucide-react';

export const ForexCalendarSection: React.FC = () => {
  return (
    <section className="py-20 border-t border-zinc-800/80 bg-[#0b0c10]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">Forex Factory Clearance Protocol</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Weekly Red-Folder Risk Schedule
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Every Sunday evening, the desk issues standard directives. Traders never guess whether a session is tradable or protected by a Stand Down order.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> Tradable (1:3 RRR)
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <AlertCircle className="w-3.5 h-3.5" /> 1:1 BE Lock
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
              <ShieldOff className="w-3.5 h-3.5" /> Stand Down
            </span>
          </div>
        </div>

        {/* Calendar Rows */}
        <div className="space-y-3 font-mono text-xs">
          {WEEKLY_FOREX_CALENDAR.map((item, idx) => {
            const isStandDown = item.deskStatus === 'STAND_DOWN';
            const isCaution = item.deskStatus === 'CAUTION_1_1';
            
            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isStandDown
                    ? 'bg-[#150a0a] border-red-900/40'
                    : isCaution
                    ? 'bg-[#161208] border-amber-800/40'
                    : 'bg-[#0b0c10] border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 text-center">
                    <span className="block text-white font-bold text-sm">{item.day}</span>
                    <span className="block text-[10px] text-zinc-500">{item.date}</span>
                  </div>
                  
                  <div className="h-8 w-px bg-zinc-800 hidden sm:block"></div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-zinc-400">{item.time}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        item.impact === 'HIGH' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {item.impact} IMPACT
                      </span>
                    </div>
                    <h4 className="text-sm font-sans font-bold text-white mt-0.5">{item.event}</h4>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end w-full sm:w-auto">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-1 ${
                    isStandDown
                      ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                      : isCaution
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {isStandDown ? 'STAND DOWN / NO TRADE' : isCaution ? 'CAUTION: 1:1 TP / BE LOCK' : 'DESK TRADABLE (1:3 RRR)'}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-sans">{item.directive}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
