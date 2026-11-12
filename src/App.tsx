import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CurriculumSection } from './components/CurriculumSection';
import { AuditSheetSection } from './components/AuditSheetSection';
import { RiskCalculatorSection } from './components/RiskCalculatorSection';
import { ForexCalendarSection } from './components/ForexCalendarSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { EnrollmentModal } from './components/EnrollmentModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { Currency, ModuleItem } from './types';

export default function App() {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>('Full Mentorship');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('PHP');

  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [selectedPortalModule, setSelectedPortalModule] = useState<ModuleItem | null>(null);

  const handleOpenEnroll = (tier: string = 'Full Mentorship', currency: Currency = 'PHP') => {
    setSelectedTier(tier);
    setSelectedCurrency(currency);
    setIsEnrollModalOpen(true);
  };

  const handleOpenPortal = (module?: ModuleItem) => {
    setSelectedPortalModule(module || null);
    setIsPortalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white antialiased overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar
        onOpenEnroll={() => handleOpenEnroll('Full Mentorship')}
        onOpenPortal={() => handleOpenPortal()}
      />

      <main>
        {/* Hero Section with Live Countdown & Metrics */}
        <Hero onOpenEnroll={handleOpenEnroll} />

        {/* Phase 1 & Phase 2 Curriculum */}
        <CurriculumSection onOpenPortal={handleOpenPortal} />

        {/* Pricing & Program Options (Standalone vs Full Mentorship) */}
        <PricingSection onOpenEnroll={handleOpenEnroll} />

        {/* Interactive Student Audit Sheet */}
        <AuditSheetSection onOpenEnroll={handleOpenEnroll} />

        {/* Mechanical Position Sizing & 1:3 RRR Calculator */}
        <RiskCalculatorSection />

        {/* Weekly Forex Factory Clearance Schedule */}
        <ForexCalendarSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer & Final Call to Action */}
      <Footer onOpenEnroll={handleOpenEnroll} />

      {/* Modals */}
      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        initialTier={selectedTier}
        initialCurrency={selectedCurrency}
      />

      <ClientPortalModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
        initialModule={selectedPortalModule}
      />
    </div>
  );
}
