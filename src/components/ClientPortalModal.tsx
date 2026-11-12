import React, { useState, useEffect } from 'react';
import { X, Key, CheckCircle, Lock, Play, ShieldCheck, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import { PHASE_1_MODULES, PHASE_2_MODULES } from '../data/protocolData';
import { ModuleItem } from '../types';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialModule?: ModuleItem | null;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  initialModule
}) => {
  const [selectedPhase, setSelectedPhase] = useState<'P1' | 'P2'>('P1');
  const [keywordInput, setKeywordInput] = useState('');
  const [activeModuleNumber, setActiveModuleNumber] = useState(initialModule ? initialModule.number : '01');
  const [validationMessage, setValidationMessage] = useState<{ type: 'warning' | 'error' | 'success' | null; text: string }>({
    type: null,
    text: ''
  });

  // Lock Overlay State
  const [isLockOverlayOpen, setIsLockOverlayOpen] = useState(false);
  const [lockedLessonTitle, setLockedLessonTitle] = useState('');

  useEffect(() => {
    if (initialModule) {
      setActiveModuleNumber(initialModule.number);
    }
  }, [initialModule]);

  if (!isOpen) return null;

  const currentModules = selectedPhase === 'P1' ? PHASE_1_MODULES : PHASE_2_MODULES;
  const currentModule = currentModules.find(m => m.number === activeModuleNumber) || currentModules[0];

  // Trigger high-conversion lock overlay when attempting to play or access any lesson
  const handleTriggerLockOverlay = (lessonTitle: string) => {
    setLockedLessonTitle(lessonTitle);
    setIsLockOverlayOpen(true);
  };

  // Aliases for explicit interaction requirements
  const openEnrollmentModal = (title?: string) => {
    handleTriggerLockOverlay(title || currentModule.title);
  };

  const setActiveLesson = (lessonId: string) => {
    setActiveModuleNumber(lessonId);
    setValidationMessage({ type: null, text: '' });
  };

  // Intercept keyword validation: show notice and trigger enrollment gate
  const handleValidateKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationMessage({
      type: 'warning',
      text: '⚠️ Secret verification keys are issued exclusively inside the enrolled student video lectures. Please enroll to access the verified vault.'
    });
    openEnrollmentModal(currentModule.title);
  };

  // Close modal and smooth-scroll to selected pricing option
  const handleScrollToPricingOption = (targetId: 'mentorship' | 'standalone') => {
    setIsLockOverlayOpen(false);
    onClose();
    setTimeout(() => {
      const el = document.getElementById(targetId) || document.getElementById('pricing');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4 overflow-y-auto py-8">
        <div className="w-full max-w-4xl p-6 sm:p-8 rounded-3xl bg-[#0b0c10] border border-zinc-700 text-zinc-100 shadow-2xl relative font-sans">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close portal simulator"
            className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-xl hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  CLIENT PORTAL SIMULATOR
                </span>
                <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> DEMO AUDIT PREVIEW
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-2">Ryan Jade Student Vault &amp; Keyword Check</h3>
            </div>

            {/* Phase Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#111217] border border-zinc-800 font-mono text-xs">
              <button
                onClick={() => { setSelectedPhase('P1'); setActiveModuleNumber('01'); setValidationMessage({ type: null, text: '' }); }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedPhase === 'P1' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                PHASE 1
              </button>
              <button
                onClick={() => { setSelectedPhase('P2'); setActiveModuleNumber('01'); setValidationMessage({ type: null, text: '' }); }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedPhase === 'P2' ? 'bg-amber-400 text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                PHASE 2
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            
            {/* Module Selector Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-2 font-mono text-xs max-h-[380px] overflow-y-auto pr-1">
              <span className="text-zinc-500 uppercase text-[11px] block mb-2 font-bold">Curriculum Modules</span>
              {currentModules.map((m) => {
                const isSelected = activeModuleNumber === m.number;

                return (
                  <button
                    key={m.number}
                    onClick={() => setActiveLesson(m.number)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-[#171821] border-amber-400/80 text-white'
                        : 'bg-[#111217] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-amber-400">{m.number}.</span>
                      <span className="font-sans font-medium text-xs truncate max-w-[150px]">{m.title}</span>
                    </div>
                    <div>
                      <Lock className="w-3.5 h-3.5 text-amber-400/80 group-hover:text-amber-300" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Module Details & Keyword Validator (8 cols) */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-[#111217] border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                    {currentModule.tag} &bull; {currentModule.duration}
                  </span>
                  <span className="text-xs font-mono text-amber-400/90 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-400" /> Proprietary Masterclass Gated
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white mt-3">{currentModule.title}</h4>
                <p className="text-sm text-zinc-300 mt-2 font-sans leading-relaxed">
                  {currentModule.summary}
                </p>

                {/* Hard-Gated Video Placeholder Card with Play Button */}
                <div
                  id="portal-play-btn"
                  onClick={() => openEnrollmentModal(currentModule.title)}
                  className="mt-5 p-6 rounded-2xl bg-[#0b0c10] border border-zinc-800 hover:border-amber-500/50 flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer transition-all duration-200 shadow-md"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openEnrollmentModal(currentModule.title);
                    }
                  }}
                >
                  {/* Play Button with Subtle Lock Icon Overlay */}
                  <div className="relative mb-2 pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform border border-zinc-700">
                      <Play className="w-6 h-6 fill-white ml-0.5 opacity-80" />
                    </div>
                    {/* Subtle lock icon (🔒) over the center Play triangle */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg border border-black/50">
                      <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>

                  <span className="text-xs font-mono text-zinc-200 group-hover:text-white transition-colors font-semibold">
                    STREAM LESSON {currentModule.number}: {currentModule.title.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-mono text-amber-400/90 mt-1 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-400" /> Click to view enrollment clearance &bull; Verification key inside video
                  </span>
                </div>

                {/* Gated Secret Keyword Validation Tool */}
                <div className="mt-6 p-4 rounded-xl bg-[#050507] border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-zinc-300 font-bold flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-amber-400" />
                      ENTER SECRET VERIFICATION KEYWORD
                    </span>
                    <span className="text-[10px] font-mono text-amber-400/90 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Guarded inside Student Portal
                    </span>
                  </div>

                  <form onSubmit={handleValidateKeyword} className="flex gap-2">
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="Enter secret verification keyword"
                      className="flex-1 bg-[#111217] border border-zinc-700 rounded-xl px-3.5 py-2.5 font-mono text-xs text-white focus:outline-none focus:border-amber-400 uppercase tracking-wider"
                    />
                    <button
                      id="portal-validate-btn"
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase font-mono tracking-wider cursor-pointer transition-colors shadow-sm"
                    >
                      Validate
                    </button>
                  </form>

                  {/* Clean Inline Warning Notice */}
                  {validationMessage.text && (
                    <div className="mt-3 p-3.5 rounded-xl text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-200 leading-relaxed flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p>{validationMessage.text}</p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleScrollToPricingOption('mentorship')}
                            className="px-2.5 py-1 rounded bg-amber-400 text-black font-bold text-[10px] uppercase font-mono tracking-wider hover:bg-amber-300 cursor-pointer transition-colors"
                          >
                            Enroll in Mentorship →
                          </button>
                          <button
                            type="button"
                            onClick={() => handleScrollToPricingOption('standalone')}
                            className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-200 font-bold text-[10px] uppercase font-mono tracking-wider hover:bg-zinc-700 cursor-pointer transition-colors"
                          >
                            Get Vault (₱4,000)
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Visual Status Indicator: Demo Preview / Locked */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-zinc-500 gap-2">
                <span>Interactive Fillable PDF Worksheet Attached</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Status: Demo Preview / Locked</span>
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Proprietary Masterclass Locked Modal / Overlay */}
      {isLockOverlayOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsLockOverlayOpen(false);
            }
          }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-md px-4 py-8 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg p-7 sm:p-9 rounded-3xl bg-[#0b0c10] border border-amber-500/40 text-zinc-100 shadow-[0_0_60px_rgba(245,158,11,0.25)] relative font-sans"
          >
            {/* Close Button "✕" */}
            <button
              onClick={() => setIsLockOverlayOpen(false)}
              aria-label="Close locked modal"
              className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-xl hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header: 🔒 PROPRIETARY MASTERCLASS LOCKED */}
            <div className="flex items-center justify-center mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-sm">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>🔒 PROPRIETARY MASTERCLASS LOCKED</span>
              </span>
            </div>

            {/* Dynamic Title: [Lesson Name] - Enrolled Access Only */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight">
              {lockedLessonTitle ? `${lockedLessonTitle} - Enrolled Access Only` : 'Enrolled Access Only'}
            </h3>

            {/* Body */}
            <p className="text-zinc-300 text-sm sm:text-base text-center mt-4 leading-relaxed font-sans">
              Full video walkthroughs, trade executions, execution checklists, and Ryan Jade's proprietary single-word verification keys are reserved exclusively for enrolled students.
            </p>

            {/* Value checklist */}
            <div className="my-6 p-4 rounded-2xl bg-[#050608] border border-zinc-800 space-y-2.5 text-xs text-zinc-300 font-mono">
              <div className="flex items-center gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Complete 1080p lesson walkthroughs &amp; step-by-step executions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Secret single-word verification passwords for portal audit sheets</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Direct daily desk markups &amp; 1-on-1 diagnostic review options</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Action Button 1: START FULL MENTORSHIP (₱10,000) */}
              <button
                type="button"
                onClick={() => handleScrollToPricingOption('mentorship')}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider font-mono cursor-pointer transition-all duration-200 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
              >
                <span>START FULL MENTORSHIP (₱10,000)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Action Button 2: GET STANDALONE VAULT (₱4,000) */}
              <button
                type="button"
                onClick={() => handleScrollToPricingOption('standalone')}
                className="w-full py-3 px-4 rounded-xl bg-[#12131a] hover:bg-[#181924] border border-zinc-700 text-zinc-100 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider font-mono cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <span>GET STANDALONE VAULT (₱4,000)</span>
              </button>

              {/* Return to Portal Simulator */}
              <button
                type="button"
                onClick={() => setIsLockOverlayOpen(false)}
                className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 font-mono transition-colors pt-2 cursor-pointer"
              >
                Return to Portal Simulator
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
