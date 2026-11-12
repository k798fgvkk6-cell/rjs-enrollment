import React, { useState } from 'react';
import { INITIAL_AUDIT_LOGS } from '../data/protocolData';
import { TradeRecord } from '../types';
import { Check, Plus, RefreshCw, Shield, Lock, Trash2, DollarSign, TrendingUp, TrendingDown, X, ArrowRight } from 'lucide-react';

type OutcomeType = 'SL_HIT' | 'TP_1_1' | 'TP_1_2' | 'TP_1_3' | 'BE_HIT';

interface AuditSheetProps {
  onOpenEnroll?: (tier: string, currency?: 'PHP' | 'USD') => void;
}

export const AuditSheetSection: React.FC<AuditSheetProps> = ({ onOpenEnroll }) => {
  const [currency, setCurrency] = useState<'PHP' | 'USD'>('PHP');
  const [startingBalance, setStartingBalance] = useState<number>(500000);
  const [startingBalanceInput, setStartingBalanceInput] = useState<string>('500000');
  const [showCapacityModal, setShowCapacityModal] = useState<boolean>(false);
  const [trades, setTrades] = useState<TradeRecord[]>(() => {
    // Initialize sample trades with 1% risk based on default starting balance ₱500,000 (₱5,000 per R)
    return INITIAL_AUDIT_LOGS.map(t => {
      const isSL = t.status === 'SL_HIT' || t.pnlR < 0;
      const isBE = t.status === 'BE_HIT' || t.pnlR === 0;
      const calculatedCash = isBE ? 0 : isSL ? -Math.abs(t.pnlR * 5000) : Math.abs(t.pnlR * 5000);
      return {
        ...t,
        pnlDollar: t.pnlDollar !== undefined ? (isBE ? 0 : isSL ? -Math.abs(t.pnlDollar) : Math.abs(t.pnlDollar)) : calculatedCash,
        isCustomDollar: false
      };
    });
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDirection, setNewDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [newOutcome, setNewOutcome] = useState<OutcomeType>('TP_1_3');
  const [customPnlDollar, setCustomPnlDollar] = useState('');
  const [newNotes, setNewNotes] = useState('Strictly follow the account budget and RJS');

  const currSymbol = currency === 'PHP' ? '₱' : '$';
  const defaultRiskPerTrade = startingBalance * 0.01;

  // Currency Switcher handler
  const handleCurrencyChange = (newCurrency: 'PHP' | 'USD') => {
    if (newCurrency === currency) return;
    setCurrency(newCurrency);

    if (newCurrency === 'USD') {
      // Transitioning to USD
      if (Math.abs(startingBalance - 500000) < 1000) {
        setStartingBalance(10000);
        setStartingBalanceInput('10000');
      } else {
        const converted = Math.round(startingBalance / 56);
        setStartingBalance(converted);
        setStartingBalanceInput(String(converted));
      }
      setTrades(prev => prev.map(t => {
        if (t.isCustomDollar && t.pnlDollar !== undefined) {
          const isSL = t.status === 'SL_HIT' || t.pnlR < 0;
          const converted = Math.round((Math.abs(t.pnlDollar) / 56) * 100) / 100;
          return { ...t, pnlDollar: isSL ? -converted : converted };
        }
        return t;
      }));
    } else {
      // Transitioning to PHP
      if (Math.abs(startingBalance - 10000) < 100) {
        setStartingBalance(500000);
        setStartingBalanceInput('500000');
      } else {
        const converted = Math.round(startingBalance * 56);
        setStartingBalance(converted);
        setStartingBalanceInput(String(converted));
      }
      setTrades(prev => prev.map(t => {
        if (t.isCustomDollar && t.pnlDollar !== undefined) {
          const isSL = t.status === 'SL_HIT' || t.pnlR < 0;
          const converted = Math.round(Math.abs(t.pnlDollar) * 56);
          return { ...t, pnlDollar: isSL ? -converted : converted };
        }
        return t;
      }));
    }
  };

  // Compute monetary P&L for a trade with strict outcome-based sign enforcement
  const getTradeCashPnl = (t: TradeRecord): number => {
    const isSL = t.status === 'SL_HIT' || t.pnlR < 0;
    const isBE = t.status === 'BE_HIT' || t.pnlR === 0;

    if (isBE) {
      return 0;
    }

    if (t.isCustomDollar && t.pnlDollar !== undefined) {
      return isSL ? -Math.abs(t.pnlDollar) : Math.abs(t.pnlDollar);
    }

    // Default risk calculation (1% per R)
    const baseAmount = Math.abs(t.pnlR) * defaultRiskPerTrade;
    return isSL ? -baseAmount : baseAmount;
  };

  // Live statistics & balance calculations
  // Current Balance = Starting Balance + Total Gains - Total Losses
  const totalTrades = trades.length;
  const netR = trades.reduce((acc, t) => acc + t.pnlR, 0);

  const totalGains = trades.reduce((acc, t) => {
    const val = getTradeCashPnl(t);
    return val > 0 ? acc + val : acc;
  }, 0);

  const totalLosses = trades.reduce((acc, t) => {
    const val = getTradeCashPnl(t);
    return val < 0 ? acc + Math.abs(val) : acc;
  }, 0);

  const totalNetCash = totalGains - totalLosses;
  const currentBalance = startingBalance + totalGains - totalLosses;
  const totalReturnPercent = startingBalance > 0 ? (totalNetCash / startingBalance) * 100 : 0;
  const wins = trades.filter(t => t.pnlR > 0).length;
  const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0;
  const complianceRate = 100; // Mechanical discipline 1 trade per day strictly followed

  // Determine auto-calculated dollar amount and R-multiple for current form selection
  let formPnlR = -1.0;
  let formRiskRewardTarget = '1:3.0';
  if (newOutcome === 'TP_1_1') {
    formPnlR = 1.0;
    formRiskRewardTarget = '1:1.0';
  } else if (newOutcome === 'TP_1_2') {
    formPnlR = 2.0;
    formRiskRewardTarget = '1:2.0';
  } else if (newOutcome === 'TP_1_3') {
    formPnlR = 3.0;
    formRiskRewardTarget = '1:3.0';
  } else if (newOutcome === 'BE_HIT') {
    formPnlR = 0.0;
    formRiskRewardTarget = 'BE';
  } else {
    // SL_HIT
    formPnlR = -1.0;
    formRiskRewardTarget = '1:1.0';
  }

  // Automatic cash calculation based on outcome
  let autoCashEstimate = 0;
  if (newOutcome === 'SL_HIT') {
    autoCashEstimate = -Math.abs(defaultRiskPerTrade);
  } else if (newOutcome === 'BE_HIT') {
    autoCashEstimate = 0;
  } else {
    autoCashEstimate = Math.abs(formPnlR * defaultRiskPerTrade);
  }

  const handleStartingBalanceChange = (val: string) => {
    setStartingBalanceInput(val);
    const parsed = parseFloat(val.replace(/[₱$,\s]/g, ''));
    if (!isNaN(parsed) && parsed > 0) {
      setStartingBalance(parsed);
    }
  };

  const handleOpenLogTrade = () => {
    if (trades.length >= 3) {
      setShowCapacityModal(true);
      return;
    }
    setShowAddForm(prev => !prev);
  };

  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();

    // HARD 3-TRADE DEMO CAP:
    if (trades.length >= 3) {
      setShowCapacityModal(true);
      setShowAddForm(false);
      return;
    }

    let pnlDollar: number;
    let isCustom = false;

    const trimmed = customPnlDollar.trim();
    if (trimmed !== '') {
      const cleaned = trimmed.replace(/[₱$,\s]/g, '');
      const parsed = parseFloat(cleaned);
      if (!isNaN(parsed)) {
        // AUTOMATIC SIGN HANDLING BASED ON OUTCOME:
        // - If OUTCOME is "SL (-1.0R)": Always treat the P&L amount as a negative loss (subtract from Current Balance).
        //   The user can just type a positive number like "2000", and code automatically applies -Math.abs(value) to make it negative (-₱2,000.00).
        // - If OUTCOME is "TP" (TP 1:1, TP 1:2, TP 1:3): Treat the amount as positive (+Math.abs(value)).
        // - If OUTCOME is "BE (0.0R)": Treat the amount as 0.00.
        if (newOutcome === 'SL_HIT') {
          pnlDollar = -Math.abs(parsed);
        } else if (newOutcome === 'BE_HIT') {
          pnlDollar = 0;
        } else {
          pnlDollar = Math.abs(parsed);
        }
        isCustom = true;
      } else {
        pnlDollar = autoCashEstimate;
      }
    } else {
      pnlDollar = autoCashEstimate;
    }

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();

    const newRecord: TradeRecord = {
      id: `t-${Date.now()}`,
      tradeNumber: trades.length + 1,
      date: dateStr,
      pair: 'USTECH100',
      direction: newDirection,
      sessionTime: '9:30 PM PHT',
      breakoutConfirmed: true,
      fibLevel: 'CONFLUENCE',
      riskRewardTarget: formRiskRewardTarget,
      status: newOutcome,
      pnlR: formPnlR,
      pnlDollar,
      isCustomDollar: isCustom,
      notes: newNotes
    };

    setTrades([...trades, newRecord]);
    setCustomPnlDollar('');
    setNewNotes('Strictly follow the account budget and RJS');
    setShowAddForm(false);
  };

  const handleRemoveTrade = (tradeId: string) => {
    setTrades(trades.filter(t => t.id !== tradeId));
  };

  const resetTrades = () => {
    if (currency === 'PHP') {
      setStartingBalance(500000);
      setStartingBalanceInput('500000');
      setTrades(INITIAL_AUDIT_LOGS.map(t => {
        const isSL = t.status === 'SL_HIT' || t.pnlR < 0;
        const isBE = t.status === 'BE_HIT' || t.pnlR === 0;
        return {
          ...t,
          pnlDollar: isBE ? 0 : isSL ? -Math.abs(t.pnlR * 5000) : Math.abs(t.pnlR * 5000),
          isCustomDollar: false
        };
      }));
    } else {
      setStartingBalance(10000);
      setStartingBalanceInput('10000');
      setTrades(INITIAL_AUDIT_LOGS.map(t => {
        const isSL = t.status === 'SL_HIT' || t.pnlR < 0;
        const isBE = t.status === 'BE_HIT' || t.pnlR === 0;
        return {
          ...t,
          pnlDollar: isBE ? 0 : isSL ? -Math.abs(t.pnlR * 100) : Math.abs(t.pnlR * 100),
          isCustomDollar: false
        };
      }));
    }
    setCustomPnlDollar('');
    setNewNotes('Strictly follow the account budget and RJS');
  };

  return (
    <section id="audit" className="py-24 border-t border-zinc-800/80 bg-[#0b0c10]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
          
          {/* Left Column Description */}
          <div className="w-full lg:w-1/2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">Accountability System</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
              No Guesswork.<br />Every Single Trade Is Audited.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
              Students receive custom interactive fillable PDFs. You don't just "watch" lessons—you input live execution metrics, submit verification keywords, and prove mechanical obedience before unlocking higher stages.
            </p>

            <div className="mt-8 space-y-4 font-sans">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-md bg-zinc-800 text-zinc-200 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Fillable 20-Trade Execution Journal</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Interactive digital PDF tracking 100% of entries, fixed SL, TP, and RRR compliance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-md bg-zinc-800 text-zinc-200 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Secret Single-Word Verification Keying</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Each video module contains a secret keyword to confirm 100% curriculum completion.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-md bg-zinc-800 text-zinc-200 flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Weekly Forex Factory Risk Clearances</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Standardized weekly protocol PDFs telling you explicitly: Tradable, Caution, or Stand-Down.</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs">
              <button
                onClick={handleOpenLogTrade}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simulate Logging Trade</span>
              </button>
              <button
                onClick={resetTrades}
                className="px-3.5 py-2.5 rounded-xl bg-[#111217] hover:bg-[#171821] border border-zinc-700 text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Sample Data</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Sheet Mockup */}
          <div className="w-full lg:w-1/2">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#050507] border border-zinc-700/80 shadow-2xl relative font-mono text-xs">
              
              {/* Sheet Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  <span className="ml-2 text-zinc-300 font-bold text-[11px] tracking-wider">RJS_EXECUTION_AUDIT.PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Currency Toggle in Header */}
                  <div className="flex items-center bg-[#090a0f] p-0.5 rounded-lg border border-zinc-700/80 shadow-inner">
                    <button
                      type="button"
                      onClick={() => handleCurrencyChange('PHP')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-all cursor-pointer flex items-center gap-1 ${
                        currency === 'PHP'
                          ? 'bg-amber-400 text-black shadow font-extrabold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      title="Philippine Pesos (Default)"
                    >
                      <span>₱ PHP</span>
                      {currency === 'PHP' && (
                        <span className="text-[7px] bg-black/20 text-black px-1 rounded uppercase tracking-wider font-black">
                          DEFAULT
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCurrencyChange('USD')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-all cursor-pointer flex items-center gap-1 ${
                        currency === 'USD'
                          ? 'bg-amber-400 text-black shadow font-extrabold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      title="US Dollar"
                    >
                      <span>$ USD</span>
                    </button>
                  </div>

                  <span className="text-amber-400 text-[10px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 font-semibold flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> DEMO CAP: {trades.length}/3 TRADES
                  </span>
                  <span className="hidden sm:inline-flex text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                    USTECH100 ONLY
                  </span>
                </div>
              </div>

              {/* 1. TOP ACCOUNT BALANCE BAR */}
              <div className="my-4 p-3.5 sm:p-4 rounded-2xl bg-[#0c0d12] border border-zinc-800 shadow-xl space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-zinc-800/80 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-400 font-extrabold font-mono text-xs">{currSymbol}</span>
                    <span className="text-zinc-300 font-bold uppercase tracking-wider">
                      AUTOMATED BALANCE &amp; P&amp;L CALCULATOR
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Currency Selector Pill */}
                    <div className="inline-flex items-center bg-[#050608] px-1 py-0.5 rounded-md border border-zinc-700/80">
                      <span className="text-[9px] text-zinc-400 mr-1.5 font-sans font-semibold">CURRENCY:</span>
                      <button
                        type="button"
                        onClick={() => handleCurrencyChange('PHP')}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono cursor-pointer transition-colors ${
                          currency === 'PHP'
                            ? 'bg-amber-400 text-black'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        ₱ PHP
                      </button>
                      <span className="text-zinc-700 mx-0.5">/</span>
                      <button
                        type="button"
                        onClick={() => handleCurrencyChange('USD')}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono cursor-pointer transition-colors ${
                          currency === 'USD'
                            ? 'bg-amber-400 text-black'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        $ USD
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Starting Balance (Editable Input) */}
                  <div className="bg-[#050608] border border-zinc-700/80 rounded-xl p-2.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                        STARTING BALANCE ({currency})
                      </label>
                      <span className="text-[8px] font-mono text-amber-400 font-bold">{currSymbol}</span>
                    </div>
                    <div className="relative flex items-center bg-[#090a0f] border border-zinc-700/60 rounded px-2 py-1">
                      <span className="text-zinc-400 text-xs font-bold mr-1 font-mono">{currSymbol}</span>
                      <input
                        type="number"
                        min="1"
                        step={currency === 'PHP' ? '1000' : '100'}
                        value={startingBalanceInput}
                        onChange={(e) => handleStartingBalanceChange(e.target.value)}
                        className="w-full bg-transparent text-white font-mono font-bold text-sm focus:outline-none focus:text-amber-300"
                        title={`Edit starting account equity in ${currency}`}
                      />
                    </div>
                  </div>

                  {/* Current Balance (Live Read-Only with Glow) */}
                  <div className={`rounded-xl p-2.5 flex flex-col justify-between border transition-all duration-300 ${
                    totalNetCash >= 0
                      ? 'bg-emerald-950/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.18)]'
                      : 'bg-rose-950/20 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.18)]'
                  }`}>
                    <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>CURRENT BALANCE ({currency})</span>
                      <span className="text-[8px] font-mono text-zinc-500">{currency}</span>
                    </div>
                    <div className="flex items-baseline justify-between px-1">
                      <span className={`font-mono font-extrabold text-sm sm:text-base tracking-tight ${
                        totalNetCash >= 0
                          ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                          : 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                      }`}>
                        {currSymbol}{currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-[8px] font-mono text-zinc-400 uppercase">
                        LIVE
                      </span>
                    </div>
                  </div>

                  {/* Total Return Badge */}
                  <div className="bg-[#050608] border border-zinc-700/80 rounded-xl p-2.5 flex flex-col justify-between">
                    <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>TOTAL RETURN</span>
                      <span className="text-[8px] font-mono text-zinc-500">{currency}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1.5 px-1">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono font-bold text-[10px] ${
                        totalNetCash >= 0
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {totalNetCash >= 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                        {totalReturnPercent >= 0 ? `+${totalReturnPercent.toFixed(1)}%` : `${totalReturnPercent.toFixed(1)}%`}
                      </span>
                      <span className={`font-mono text-[10px] font-bold truncate ${
                        totalNetCash >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {totalNetCash >= 0
                          ? `+${currSymbol}${totalNetCash.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                          : `-${currSymbol}${Math.abs(totalNetCash).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Header for Log & Add Button */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                  AUDITED EXECUTION LOG
                </span>
                <button
                  type="button"
                  onClick={handleOpenLogTrade}
                  className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3 h-3 text-emerald-400" />
                  <span>{showAddForm ? 'Close Form' : 'Log New Trade'}</span>
                </button>
              </div>

              {/* 2. UPDATED LOG INPUT FIELDS */}
              {showAddForm && (
                <form onSubmit={handleAddTrade} className="mb-4 p-4 rounded-xl bg-[#111217] border border-zinc-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-[11px] flex items-center gap-1.5">
                      <Plus className="w-3 h-3 text-emerald-400" /> Log New Mechanical Trade
                    </span>
                    <button type="button" onClick={() => setShowAddForm(false)} className="text-zinc-500 hover:text-white">✕</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {/* Permanently Locked Pair */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] text-zinc-400 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5 text-amber-400" />
                          <span>PAIR</span>
                        </label>
                        <span className="text-[8px] font-mono text-amber-400 font-bold tracking-wider">
                          LOCKED
                        </span>
                      </div>
                      <div className="w-full bg-[#08090d] border border-amber-500/40 rounded px-2.5 py-1.5 text-white flex items-center justify-between cursor-not-allowed select-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-amber-400 text-xs flex-shrink-0">🔒</span>
                          <span className="font-bold text-amber-300 text-[11px] truncate tracking-wide">USTECH100 (NAS100)</span>
                        </div>
                      </div>
                      <p className="text-[8px] text-zinc-500 font-mono mt-1">
                        PROTOCOL LOCKED: 1 PAIR ONLY
                      </p>
                    </div>

                    {/* Direction Selection */}
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">DIRECTION</label>
                      <select
                        value={newDirection}
                        onChange={(e) => setNewDirection(e.target.value as 'BUY' | 'SELL')}
                        className="w-full bg-[#0b0c10] border border-zinc-700 rounded px-2 py-1.5 text-white text-[11px] focus:outline-none focus:border-zinc-500"
                      >
                        <option value="BUY">BUY</option>
                        <option value="SELL">SELL</option>
                      </select>
                    </div>

                    {/* Strict Outcome Options */}
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1">OUTCOME</label>
                      <select
                        value={newOutcome}
                        onChange={(e) => setNewOutcome(e.target.value as OutcomeType)}
                        className="w-full bg-[#0b0c10] border border-zinc-700 rounded px-2 py-1.5 text-white text-[11px] focus:outline-none focus:border-zinc-500"
                      >
                        <option value="SL_HIT">SL (-1.0R)</option>
                        <option value="BE_HIT">BE (0.0R)</option>
                        <option value="TP_1_1">TP 1:1 (+1.0R)</option>
                        <option value="TP_1_2">TP 1:2 (+2.0R)</option>
                        <option value="TP_1_3">TP 1:3 (+3.0R)</option>
                      </select>
                    </div>

                    {/* Profit / Loss Amount */}
                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1 truncate">P&amp;L AMOUNT ({currency})</label>
                      <input
                        type="text"
                        value={customPnlDollar}
                        onChange={(e) => setCustomPnlDollar(e.target.value)}
                        placeholder={
                          newOutcome === 'SL_HIT'
                            ? `Auto: -${currSymbol}${Math.abs(autoCashEstimate).toLocaleString('en-US', { maximumFractionDigits: 0 })} (e.g. 2000)`
                            : newOutcome === 'BE_HIT'
                            ? `Auto: ${currSymbol}0.00`
                            : `Auto: +${currSymbol}${autoCashEstimate.toLocaleString('en-US', { maximumFractionDigits: 0 })} (e.g. 5000)`
                        }
                        className="w-full bg-[#0b0c10] border border-zinc-700 rounded px-2 py-1.5 text-white text-[11px] font-mono focus:outline-none focus:border-zinc-500 placeholder:text-zinc-500"
                      />
                      <p className="text-[8px] text-zinc-500 font-mono mt-1 truncate">
                        {newOutcome === 'SL_HIT'
                          ? `Sign auto-enforced: -${currSymbol}${Math.abs(customPnlDollar.trim() ? parseFloat(customPnlDollar.replace(/[₱$,\s]/g, '')) || defaultRiskPerTrade : defaultRiskPerTrade).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
                          : newOutcome === 'BE_HIT'
                          ? 'Outcome is Breakeven (0.00)'
                          : `Sign auto-enforced: +${currSymbol}${Math.abs(customPnlDollar.trim() ? parseFloat(customPnlDollar.replace(/[₱$,\s]/g, '')) || autoCashEstimate : autoCashEstimate).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">RULE COMPLIANCE NOTE</label>
                    <input
                      type="text"
                      value={newNotes}
                      placeholder="Strictly follow the account budget and RJS"
                      onChange={(e) => setNewNotes(e.target.value)}
                      className="w-full bg-[#0b0c10] border border-zinc-700 rounded px-2 py-1.5 text-white text-[11px] focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                  <button type="submit" className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-[11px] rounded uppercase cursor-pointer transition-colors shadow-lg shadow-emerald-500/10">
                    Commit Trade To Audit Record
                  </button>
                </form>
              )}

              {/* 3. AUDIT TABLE UPDATES WITH P&L */}
              <div className="mt-2 space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                <div className="grid grid-cols-12 text-[10px] text-zinc-500 pb-2 border-b border-zinc-900 font-semibold uppercase sticky top-0 bg-[#050507] items-center">
                  <span className="col-span-3"># / DATE</span>
                  <span className="col-span-2">PAIR</span>
                  <span className="col-span-2">POS / RRR</span>
                  <span className="col-span-2">OUTCOME</span>
                  <span className="col-span-2 text-right">P&amp;L ({currSymbol})</span>
                  <span className="col-span-1 text-center">DEL</span>
                </div>

                {trades.map((item, idx) => {
                  const cashPnl = getTradeCashPnl(item);
                  let outcomeLabel = 'BE (0.0R)';
                  if (item.status === 'SL_HIT') {
                    outcomeLabel = 'SL (-1.0R)';
                  } else if (item.status === 'TP_1_1') {
                    outcomeLabel = 'TP 1:1 (+1.0R)';
                  } else if (item.status === 'TP_1_2') {
                    outcomeLabel = 'TP 1:2 (+2.0R)';
                  } else if (item.status === 'TP_1_3' || item.status === 'TP_HIT') {
                    outcomeLabel = 'TP 1:3 (+3.0R)';
                  } else if (item.status === 'BE_HIT') {
                    outcomeLabel = 'BE (0.0R)';
                  } else {
                    outcomeLabel = item.pnlR > 0 ? `+${item.pnlR.toFixed(1)}R` : `${item.pnlR.toFixed(1)}R`;
                  }

                  const isProfit = cashPnl > 0;
                  const isLoss = cashPnl < 0;

                  return (
                    <div key={item.id} className="grid grid-cols-12 text-zinc-300 py-1.5 border-b border-zinc-900/60 items-center hover:bg-white/[0.02] transition-colors text-[11px]">
                      <span className="col-span-3 text-zinc-500 font-mono text-[10px] truncate">
                        {String(idx + 1).padStart(2, '0')} / {item.date.split(',')[0]}
                      </span>
                      <span className="col-span-2 font-semibold text-white tracking-wider flex items-center gap-1 text-[10px] truncate">
                        <Lock className="w-2 h-2 text-amber-400/80 flex-shrink-0" />
                        {item.pair}
                      </span>
                      <span className="col-span-2 font-mono flex items-center gap-1 text-[10px]">
                        <strong className={item.direction === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}>
                          {item.direction}
                        </strong>
                        <span className="text-zinc-600">|</span>
                        <span className="text-zinc-400">{item.riskRewardTarget}</span>
                      </span>
                      <span className={`col-span-2 font-mono text-[10px] font-semibold ${
                        isProfit ? 'text-emerald-400' : isLoss ? 'text-rose-400' : 'text-amber-400'
                      }`}>
                        {outcomeLabel}
                      </span>
                      <span className={`col-span-2 text-right font-bold font-mono text-[11px] ${
                        isProfit ? 'text-emerald-400' : isLoss ? 'text-rose-400' : 'text-zinc-400'
                      }`}>
                        {isProfit ? `+${currSymbol}${cashPnl.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : isLoss ? `-${currSymbol}${Math.abs(cashPnl).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `${currSymbol}0.00`}
                      </span>
                      <div className="col-span-1 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveTrade(item.id)}
                          title="Delete trade entry"
                          className="text-zinc-600 hover:text-rose-400 transition-colors p-1 rounded hover:bg-rose-500/10 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {trades.length === 0 && (
                  <div className="py-6 text-center text-zinc-500 font-mono text-[11px]">
                    No logged trades yet. Click "Log New Trade" to record an audited execution.
                  </div>
                )}
              </div>

              {/* Net Performance Summary Footer */}
              <div className="mt-6 p-4 rounded-xl bg-[#0b0c10] border border-zinc-800 text-[11px] text-zinc-400 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <span>DEMO AUDIT: <strong className="text-white">{trades.length} / 3 TRADES</strong></span>
                  <span>WIN RATE: <strong className="text-white">{winRate}%</strong></span>
                </div>
                <div className="flex items-center gap-4">
                  <span>NET P&amp;L: <strong className={`font-mono ${totalNetCash >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {totalNetCash >= 0 ? `+${currSymbol}${totalNetCash.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `-${currSymbol}${Math.abs(totalNetCash).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    <span className="text-zinc-400 font-normal"> ({netR >= 0 ? `+${netR.toFixed(1)}R` : `${netR.toFixed(1)}R`})</span>
                  </strong></span>
                  <span>COMPLIANCE: <strong className="text-emerald-400">{complianceRate}%</strong></span>
                </div>
              </div>

              <div className="mt-3 text-[10px] text-zinc-500 text-center flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-zinc-400" />
                <span>Audit required prior to booking Private 1-on-1 Diagnostic Call #1</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* HIGH-CONVERSION PAYWALL MODAL (HARD 3-TRADE DEMO CAP) */}
      {showCapacityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4 py-8 animate-fadeIn">
          <div className="w-full max-w-lg p-7 sm:p-9 rounded-3xl bg-[#0b0c10] border border-amber-500/40 text-zinc-100 shadow-[0_0_60px_rgba(245,158,11,0.2)] relative font-sans">
            {/* Close Button */}
            <button
              onClick={() => setShowCapacityModal(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-xl hover:bg-zinc-800"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lock Security Badge */}
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Lock className="w-7 h-7 text-amber-400" />
            </div>

            <div className="text-center font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold mb-1">
              STUDENT VAULT PAYWALL &bull; PUBLIC DEMO LIMIT
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight">
              DEMO AUDIT CAPACITY REACHED
            </h3>

            <p className="text-zinc-300 text-sm sm:text-base text-center mt-4 leading-relaxed">
              You have completed your 3-trade public demo. The complete 20-Trade Execution Audit Journal, continuous equity curve calculation, and live daily review features are reserved exclusively for enrolled students.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-[#050608] border border-zinc-800 space-y-2.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Full 20-Trade Fillable PDF Execution Journal &amp; Continuous Equity Math</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Two 90-Min Private 1-on-1 Diagnostic Sessions with Ryan Jade</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Unrestricted Phase 1 &amp; Phase 2 Video Masterclasses &amp; Clearances</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setShowCapacityModal(false);
                  const el = document.getElementById('pricing');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  if (onOpenEnroll) onOpenEnroll('Full Mentorship', 'PHP');
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider font-mono cursor-pointer transition-all duration-200 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
              >
                <span>ENROLL IN FULL MENTORSHIP (₱10,000)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCapacityModal(false);
                  const el = document.getElementById('standalone') || document.getElementById('pricing');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  if (onOpenEnroll) onOpenEnroll('Standalone Vault', 'PHP');
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#12131a] hover:bg-[#181924] border border-zinc-700 text-zinc-100 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider font-mono cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <span>ACCESS STANDALONE VAULT (₱4,000)</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCapacityModal(false)}
                className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 font-mono transition-colors pt-2 cursor-pointer"
              >
                &larr; Return to 3-Trade Demo Table
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
