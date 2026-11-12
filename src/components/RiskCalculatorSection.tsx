import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Target, Lock, ArrowRight, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';

export const RiskCalculatorSection: React.FC = () => {
  // Input 1: STARTING BALANCE (₱) - default 10,000
  const [startingBalance, setStartingBalance] = useState<number>(10000);
  // Input 2: CURRENT BALANCE (₱) - default 10,000
  const [currentBalance, setCurrentBalance] = useState<number>(10000);

  // Safe numerical fallbacks
  const safeStarting = Math.max(0, isNaN(startingBalance) ? 0 : startingBalance);
  const safeCurrent = Math.max(0, isNaN(currentBalance) ? 0 : currentBalance);

  // Math Calculations (Fixed 10% Risk Protocol per Trade)
  // Max Loss = 10% of Starting Balance
  const maxLoss = safeStarting * 0.10;
  // Target 1:3 Profit = 3x Max Loss
  const targetProfit = maxLoss * 3;

  // Projected Account Balances
  const projectedSL = safeCurrent - maxLoss;
  const projectedTP = safeCurrent + targetProfit;

  // Currency Formatter strictly for PHP (₱)
  const formatPHP = (val: number): string => {
    return '₱' + Math.abs(val).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleStartingChange = (valStr: string) => {
    const parsed = parseFloat(valStr.replace(/[^0-9.]/g, ''));
    setStartingBalance(isNaN(parsed) ? 0 : parsed);
  };

  const handleCurrentChange = (valStr: string) => {
    const parsed = parseFloat(valStr.replace(/[^0-9.]/g, ''));
    setCurrentBalance(isNaN(parsed) ? 0 : parsed);
  };

  const syncCurrentToStarting = () => {
    setCurrentBalance(startingBalance);
  };

  return (
    <section id="calculator" className="py-24 border-t border-zinc-800/80 bg-[#050507]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Purpose */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>MANDATORY PRE-SESSION DEFENSE PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pre-Trade Capital Defense &amp; 1:3 Target Clearance
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
            Mandatory pre-session risk check. Verify your exact risk threshold and profit target before taking any position at 9:30 PM.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* LEFT SIDE: Input Parameters */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#0b0c10] border border-zinc-800 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <span className="font-mono text-xs uppercase text-zinc-300 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Pre-Flight Clearance Inputs
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  PHP (₱) ONLY
                </span>
              </div>

              {/* Fixed Protocol Note */}
              <div className="p-3.5 rounded-2xl bg-[#11131a] border border-cyan-500/30 text-xs font-mono text-cyan-200/90 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold text-white block mb-0.5 text-[11px] tracking-wider uppercase">Protocol Enforced</span>
                  Asset: <strong className="text-white">USTECH100 (NAS100)</strong> | Session: <strong className="text-white">9:30 PM NY Open</strong> | Risk Model: <strong className="text-white">Fixed 10% MAX Protocol Per Trade</strong>
                </div>
              </div>

              {/* Input 1: STARTING BALANCE (₱) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label htmlFor="starting-balance" className="text-zinc-300 font-semibold tracking-wide">
                    STARTING BALANCE (₱)
                  </label>
                  <span className="text-zinc-500 text-[11px]">Base Capital</span>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 font-mono text-base font-bold">
                    ₱
                  </div>
                  <input
                    id="starting-balance"
                    type="number"
                    min="100"
                    step="100"
                    value={startingBalance === 0 ? '' : startingBalance}
                    onChange={(e) => handleStartingChange(e.target.value)}
                    placeholder="10000"
                    className="w-full bg-[#15161e] border border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl pl-9 pr-4 py-3 text-white font-mono text-base font-bold placeholder-zinc-600 outline-none transition-all"
                  />
                </div>

                {/* Quick Starting Presets */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {[5000, 10000, 25000, 50000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setStartingBalance(preset);
                        if (currentBalance === startingBalance) setCurrentBalance(preset);
                      }}
                      className={`py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                        startingBalance === preset
                          ? 'bg-zinc-200 text-black font-bold'
                          : 'bg-[#15161e] text-zinc-400 hover:text-white border border-zinc-800'
                      }`}
                    >
                      ₱{(preset / 1000).toFixed(0)}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Input 2: CURRENT BALANCE (₱) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label htmlFor="current-balance" className="text-zinc-300 font-semibold tracking-wide">
                    CURRENT BALANCE (₱)
                  </label>
                  <button
                    type="button"
                    onClick={syncCurrentToStarting}
                    className="text-[11px] text-zinc-400 hover:text-emerald-400 inline-flex items-center gap-1 transition-colors cursor-pointer"
                    title="Set Current Balance equal to Starting Balance"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> Sync with Starting
                  </button>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 font-mono text-base font-bold">
                    ₱
                  </div>
                  <input
                    id="current-balance"
                    type="number"
                    min="0"
                    step="100"
                    value={currentBalance === 0 ? '' : currentBalance}
                    onChange={(e) => handleCurrentChange(e.target.value)}
                    placeholder="10000"
                    className="w-full bg-[#15161e] border border-zinc-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-9 pr-4 py-3 text-white font-mono text-base font-bold placeholder-zinc-600 outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] font-mono text-zinc-500">
                  Enter where your account equity currently sits before entering the 9:30 PM trade.
                </p>
              </div>
            </div>

            {/* Discipline Mandate Callout */}
            <div className="p-3.5 rounded-2xl bg-[#14120a] border border-amber-500/20 text-xs font-sans text-amber-200/90 leading-relaxed flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Discipline Rule:</strong> Strictly follow the account budget and RJS. Max 1 trade per session. Risk a Maximum of 10% of Starting Capital.
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Execution Clearance Output */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0b0c10] border-2 border-zinc-700/80 shadow-2xl flex flex-col justify-between space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="font-mono text-xs uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Execution Clearance Output
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold tracking-wider">
                1:3 RRR ASYMMETRIC BIAS
              </span>
            </div>

            {/* Two Primary Targets: SL Ceiling vs 1:3 TP Target */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* MAX ALLOWED LOSS (SL / -1R) */}
              <div className="p-5 rounded-2xl bg-[#140d10] border border-rose-500/40 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-300 font-semibold flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> MAX ALLOWED LOSS
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      SL (-1.0R)
                    </span>
                  </div>
                  
                  <div className="text-3xl sm:text-4xl font-black font-mono text-rose-400 tracking-tight my-2">
                    -{formatPHP(maxLoss)}
                  </div>
                  
                  <div className="text-xs font-mono font-bold text-rose-200 uppercase tracking-wide">
                    MANDATORY STOP LOSS CEILING
                  </div>
                </div>

                <p className="text-[11px] text-rose-200/70 mt-3 pt-3 border-t border-rose-500/20 leading-relaxed font-sans">
                  Strict loss cutoff. If this trade hits -{formatPHP(maxLoss)}, terminal closes immediately. Zero revenge trading.
                </p>
              </div>

              {/* TARGET 1:3 PROFIT (TP / +3R) */}
              <div className="p-5 rounded-2xl bg-[#091510] border border-emerald-500/40 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-semibold flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> TARGET 1:3 PROFIT
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      TP (+3.0R)
                    </span>
                  </div>
                  
                  <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 tracking-tight my-2">
                    +{formatPHP(targetProfit)}
                  </div>
                  
                  <div className="text-xs font-mono font-bold text-emerald-200 uppercase tracking-wide">
                    1:3 RRR TAKE PROFIT TARGET
                  </div>
                </div>

                <p className="text-[11px] text-emerald-200/70 mt-3 pt-3 border-t border-emerald-500/20 leading-relaxed font-sans">
                  Exact profit objective to lock in before logging off.
                </p>
              </div>

            </div>

            {/* PROJECTED ACCOUNT BALANCES (Interactive Visual Row) */}
            <div className="p-5 rounded-2xl bg-[#111218] border border-zinc-700/90 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold">
                  PROJECTED ACCOUNT BALANCES (INTERACTIVE SIMULATION)
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  Current: {formatPHP(safeCurrent)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* If SL Hits */}
                <div className="p-3.5 rounded-xl bg-[#191113] border border-rose-900/60 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block">If SL Hits:</span>
                    <div className="text-lg font-bold font-mono text-rose-400 mt-0.5">
                      {projectedSL < 0 ? '-' : ''}{formatPHP(projectedSL)}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    -{formatPHP(maxLoss)} (-10%)
                  </span>
                </div>

                {/* If 1:3 TP Hits */}
                <div className="p-3.5 rounded-xl bg-[#0e1a14] border border-emerald-900/60 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block">If 1:3 TP Hits:</span>
                    <div className="text-xl font-black font-mono text-emerald-400 mt-0.5">
                      {formatPHP(projectedTP)}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    +{formatPHP(targetProfit)} (+30%)
                  </span>
                </div>
              </div>

              {/* Clearance Status Summary */}
              <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-zinc-400 border-t border-zinc-800">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Risk Engine: 10% Risk to gain 30% Return
                </span>
                <span className="text-zinc-500">
                  Benchmark (₱10k): -₱1k SL / +₱3k TP
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
