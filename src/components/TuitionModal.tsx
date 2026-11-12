import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface TuitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TuitionModal: React.FC<TuitionModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="tuitionModal"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4 py-8 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-[#0b0c10]/95 backdrop-blur-xl border border-zinc-800 text-zinc-100 shadow-[0_0_60px_rgba(0,0,0,0.8)] relative font-sans"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1.5 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Subtitle */}
        <div className="text-center pr-6 pl-2">
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide text-white">
            SELECT YOUR TUITION SCHEDULE
          </h3>
          <p className="text-xs sm:text-sm font-mono text-emerald-400 font-semibold mt-2 leading-relaxed">
            10k is 3 wins of 1:3 + 1 win of 1:1 = 4 trades in total
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {/* Column 1: PAY IN FULL */}
          <div className="p-5 rounded-2xl bg-[#111217] border border-zinc-800 flex flex-col justify-between">
            <div>
              <span className="text-xs sm:text-sm font-mono text-slate-300 font-bold uppercase tracking-wider block">
                PAY IN FULL
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white my-3">
                ₱10,000
              </div>
            </div>
            <a
              href="https://www.paypal.com/ncp/payment/7CHH7A3H95SMW"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold font-mono text-xs py-3 rounded-lg w-full transition-all flex items-center justify-center text-center cursor-pointer shadow-md mt-2"
            >
              <span>PROCEED WITH ₱10,000 →</span>
            </a>
          </div>

          {/* Column 2: SPLIT PAYMENT BY PHASE */}
          <div className="p-5 rounded-2xl bg-[#111217] border border-zinc-800 flex flex-col justify-between">
            <div>
              <span className="text-xs sm:text-sm font-mono text-slate-300 font-bold uppercase tracking-wider block">
                SPLIT PAYMENT BY PHASE
              </span>
              <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400 my-3">
                ₱5,000 per phase
              </div>
            </div>
            <a
              href="https://www.paypal.com/ncp/payment/BH55CGVN3Y54S"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/50 text-emerald-300 hover:text-white font-bold font-mono text-xs py-3 rounded-lg w-full transition-all flex items-center justify-center text-center cursor-pointer mt-2"
            >
              <span>START PHASE 1 FOR ₱5,000 →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
