import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import ReferenceModal from '../ReferenceModal';

interface MainLayoutProps {
  children: React.ReactNode;
  showInteractiveGuide: boolean;
  toggleInteractiveGuide: () => void;
}

export function MainLayout({ children, showInteractiveGuide, toggleInteractiveGuide }: MainLayoutProps) {
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-text-primary font-sans transition-colors duration-300 selection:bg-accent-teal/30 selection:text-accent-teal">
      <Header 
        showInteractiveGuide={showInteractiveGuide} 
        toggleInteractiveGuide={toggleInteractiveGuide} 
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in">
        {children}
      </main>
      
      {/* Reference Data Link */}
      <div className="flex justify-center pb-4">
        <button 
          onClick={() => setIsReferenceModalOpen(true)}
          className="text-xs text-gray-500 dark:text-text-tertiary hover:text-accent-teal underline underline-offset-2 transition-colors"
        >
          View Calculation Rates & Thresholds (2024-2025)
        </button>
      </div>

      <Footer />

      <ReferenceModal 
        isOpen={isReferenceModalOpen} 
        onClose={() => setIsReferenceModalOpen(false)} 
      />
    </div>
  );
}
