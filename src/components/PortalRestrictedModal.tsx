import React, { useEffect } from 'react';
import { X, ArrowRight, Lock } from 'lucide-react';

interface PortalRestrictedModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
}

export const PortalRestrictedModal: React.FC<PortalRestrictedModalProps> = ({
  isOpen,
  onClose,
  lessonTitle
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        const modal = document.getElementById('portal-restricted-modal');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleClose = () => {
    onClose();
    const modal = document.getElementById('portal-restricted-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  const handleScrollToOption = (targetId: 'mentorship' | 'standalone') => {
    handleClose();
    const el = document.getElementById(targetId) || document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayTitle = lessonTitle
    ? lessonTitle.endsWith('- Video Locked')
      ? lessonTitle
      : `${lessonTitle} - Video Locked`
    : 'Phase 1 Start - Video Locked';

  return (
    <div
      id="portal-restricted-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      className={`fixed inset-0 z-50 items-center justify-center bg-black/85 backdrop-blur-md px-4 py-8 animate-fadeIn ${
        isOpen ? 'flex' : 'hidden'
      }`}
    >
      <div
        className="w-full max-w-lg p-7 sm:p-9 rounded-3xl bg-[#0b0c10] border border-amber-500/40 text-zinc-100 shadow-[0_0_60px_rgba(245,158,11,0.22)] relative font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button "✕" */}
        <button
          onClick={handleClose}
          data-close-restricted-modal="true"
          aria-label="Close modal"
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-xl hover:bg-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badge: 🔒 ENROLLED MEMBERS ONLY */}
        <div className="flex items-center justify-center mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>🔒 ENROLLED MEMBERS ONLY</span>
          </span>
        </div>

        {/* Dynamic Title */}
        <h3
          id="portal-restricted-title"
          className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight"
        >
          {displayTitle}
        </h3>

        {/* Institutional Description */}
        <p className="text-zinc-300 text-sm sm:text-base text-center mt-4 leading-relaxed font-sans">
          Complete video breakdowns, operational rulebooks, secret single-word verification keys, and execution checklists are reserved strictly for active traders inside the private RJS Portal.
        </p>

        {/* Value Highlights */}
        <div className="my-6 p-4 rounded-2xl bg-[#050608] border border-zinc-800 space-y-2.5 text-xs text-zinc-300 font-mono">
          <div className="flex items-center gap-2.5">
            <span className="text-amber-400 font-bold">✓</span>
            <span>Immediate video stream &amp; proprietary POI formula access</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-amber-400 font-bold">✓</span>
            <span>Single-word verification passwords &amp; fillable module PDF</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Verified trader desk accreditation upon syllabus completion</span>
          </div>
        </div>

        {/* Dual CTAs */}
        <div className="space-y-3">
          {/* Option 01: Mentorship */}
          <button
            type="button"
            onClick={() => handleScrollToOption('mentorship')}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider font-mono cursor-pointer transition-all duration-200 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
          >
            <span>ENROLL IN FULL MENTORSHIP (₱10,000)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Option 02: Standalone Vault */}
          <button
            type="button"
            onClick={() => handleScrollToOption('standalone')}
            className="w-full py-3 px-4 rounded-xl bg-[#12131a] hover:bg-[#181924] border border-zinc-700 text-zinc-100 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider font-mono cursor-pointer transition-colors flex items-center justify-center gap-2"
          >
            <span>ACCESS STANDALONE VAULT (₱4,000)</span>
          </button>

          {/* Return to Curriculum link */}
          <button
            type="button"
            onClick={handleClose}
            data-close-restricted-modal="true"
            className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 font-mono transition-colors pt-2 cursor-pointer"
          >
            Return to Curriculum
          </button>
        </div>
      </div>
    </div>
  );
};
