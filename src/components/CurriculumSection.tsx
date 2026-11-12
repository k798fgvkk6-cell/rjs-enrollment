import React, { useState, useEffect } from 'react';
import { PHASE_1_MODULES, PHASE_2_MODULES } from '../data/protocolData';
import { PhoneCall, Award, Lock } from 'lucide-react';
import { ModuleItem } from '../types';
import { PortalRestrictedModal } from './PortalRestrictedModal';

interface CurriculumProps {
  onOpenPortal?: (module?: ModuleItem) => void;
}

export const CurriculumSection: React.FC<CurriculumProps> = () => {
  const [isRestrictedModalOpen, setIsRestrictedModalOpen] = useState(false);
  const [selectedLessonTitle, setSelectedLessonTitle] = useState('');

  const handleLessonRowClick = (title: string) => {
    setSelectedLessonTitle(title);
    setIsRestrictedModalOpen(true);
  };

  // Vanilla JS event delegation for any clicks on .lesson-card or .module-item
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const lessonCard = target.closest('.lesson-card, .module-item') as HTMLElement | null;
      if (lessonCard && lessonCard.dataset.title) {
        // Intercept and prevent any unintended video player launch
        e.preventDefault();
        const title = lessonCard.dataset.title;
        setSelectedLessonTitle(title);
        setIsRestrictedModalOpen(true);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <section id="curriculum" className="py-24 border-t border-zinc-800/80 bg-[#050507]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">Curriculum Syllabus</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Two Phase
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
            2 Phases. 1 Phase per month. Study as you go, trade risk-free on a demo with zero fear of losing capital, master every rule, and apply everything you’ve learned live after graduation.
          </p>
        </div>

        {/* Two-Column Side-by-Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Phase 1 Card */}
          <div className="p-8 rounded-3xl bg-[#0b0c10] border border-zinc-800 flex flex-col justify-between relative overflow-hidden hover:border-zinc-700 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-5 font-['Cinzel'] text-8xl font-black select-none pointer-events-none">
              P1
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Phase 01
                </span>
                <span className="text-xs font-mono text-zinc-500">Foundation &bull; 7 Modules</span>
              </div>

              <h3 className="text-2xl font-bold text-white">Discipline Building &amp; Mechanical Execution</h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                Transforming discretionary gambling habits into mechanical, repeatable trading data through 1 trade/day discipline.
              </p>

              {/* Module List */}
              <div className="mt-8 space-y-3 font-mono text-xs">
                {PHASE_1_MODULES.map((mod) => (
                  <div
                    key={mod.number}
                    data-title={mod.title}
                    onClick={() => handleLessonRowClick(mod.title)}
                    className="lesson-card module-item p-4 rounded-2xl bg-[#111217] border border-zinc-800/80 hover:border-amber-500/50 hover:bg-[#151622] transition-all duration-200 cursor-pointer group shadow-sm select-none"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold bg-amber-500/10 text-amber-400 group-hover:text-amber-300 group-hover:bg-amber-500/20 transition-colors">
                          {mod.number}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{mod.duration}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        <Lock className="w-2.5 h-2.5 text-amber-400" />
                        <span>🔒 Unlocked inside Student Portal</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                      {mod.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-sans">
                      {mod.summary}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Note for Phase 1 */}
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/5 border border-dashed border-amber-500/30 text-center font-mono text-xs font-bold text-amber-300 tracking-wider">
                + And More Inside Student Portal
              </div>
            </div>

            {/* Call 1 Inclusion Note */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <p className="text-xs text-zinc-300">
                <strong className="text-white block font-sans text-sm">Includes 1st 90-Min Private Call (Full Program):</strong>
                <span>Diagnostic review of your 20-trade journal &amp; mechanical audit with Ryan Jade.</span>
              </p>
            </div>
          </div>

          {/* Phase 2 Card */}
          <div className="p-8 rounded-3xl bg-[#0b0c10] border border-zinc-800 flex flex-col justify-between relative overflow-hidden hover:border-zinc-700 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-5 font-['Cinzel'] text-8xl font-black select-none pointer-events-none">
              P2
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Phase 02
                </span>
                <span className="text-xs font-mono text-zinc-500">Advanced Swing &bull; 8 Modules</span>
              </div>

              <h3 className="text-2xl font-bold text-white">Swing Execution &amp; Scale Systems</h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                Expanding your mechanical edge into swing POIs, structural liquidity, and maximizing 1:4 and 1:5 asymmetrical setups.
              </p>

              {/* Module List */}
              <div className="mt-8 space-y-3 font-mono text-xs">
                {PHASE_2_MODULES.map((mod) => (
                  <div
                    key={mod.number}
                    data-title={mod.title}
                    onClick={() => handleLessonRowClick(mod.title)}
                    className="lesson-card module-item p-4 rounded-2xl bg-[#111217] border border-zinc-800/80 hover:border-amber-500/50 hover:bg-[#151622] transition-all duration-200 cursor-pointer group shadow-sm select-none"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold bg-amber-500/10 text-amber-400 group-hover:text-amber-300 group-hover:bg-amber-500/20 transition-colors">
                          {mod.number}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{mod.duration}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        <Lock className="w-2.5 h-2.5 text-amber-400" />
                        <span>🔒 Unlocked inside Student Portal</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                      {mod.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-sans">
                      {mod.summary}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Note for Phase 2 */}
              <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/5 border border-dashed border-amber-500/30 text-center font-mono text-xs font-bold text-amber-300 tracking-wider">
                + And More Inside Student Portal
              </div>
            </div>

            {/* Call 2 Inclusion Note */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xs text-zinc-300">
                <strong className="text-white block font-sans text-sm">Includes 2nd 90-Min Private Call (Full Program):</strong>
                <span>Advanced capital scale roadmap, prop firm audit prep, and long-term trajectory.</span>
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Sleek, High-Conversion Portal Restricted Modal */}
      <PortalRestrictedModal
        isOpen={isRestrictedModalOpen}
        onClose={() => setIsRestrictedModalOpen(false)}
        lessonTitle={selectedLessonTitle}
      />
    </section>
  );
};
