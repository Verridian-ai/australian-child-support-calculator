import React, { useState } from 'react';
import { History, FileText, Clock } from 'lucide-react';
import CalculationHistory from '../CalculationHistory';
import ReferenceModal from '../ReferenceModal';
import NeumorphicCalculator from '../NeumorphicCalculator';
import { formatCurrency } from '../../lib/calculator';
import type { ChildSupportInputs } from '../../lib/calculator';

interface HistoryAndThresholdsTabProps {
  calculations: Array<{
    id: number;
    timestamp: string;
    inputs: ChildSupportInputs;
    result: any;
  }>;
  onLoadCalculation: (inputs: ChildSupportInputs) => void;
}

export default function HistoryAndThresholdsTab({ calculations, onLoadCalculation }: HistoryAndThresholdsTabProps) {
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-1.5 h-6 bg-accent-teal rounded-full" />
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-text-primary">
          History & Thresholds
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section A: Calculation History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel-lg p-6 md:p-8">
            <div className="flex items-center space-x-2 mb-6">
              <History className="h-5 w-5 text-accent-teal" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
                Calculation History
              </h3>
            </div>

            {calculations.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-text-secondary text-sm mb-1">
                  No calculations saved yet
                </p>
                <p className="text-xs text-gray-500 dark:text-text-tertiary">
                  Use the 'Calculate & Save Estimate' button on the Calculator Inputs tab to save your calculations.
                </p>
              </div>
            ) : (
              <CalculationHistory 
                calculations={calculations}
                onLoadCalculation={onLoadCalculation}
              />
            )}
          </div>

          {/* Section B: Rates & Thresholds */}
          <div className="glass-panel-lg p-6 md:p-8">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-5 w-5 text-accent-orange" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
                Rates & Thresholds
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-text-secondary">
                View the current calculation rates and thresholds used in the assessment formula.
              </p>
              
              <button
                onClick={() => setIsReferenceModalOpen(true)}
                className="w-full neumorphic-btn-primary py-3 flex items-center justify-center space-x-2"
              >
                <FileText className="h-5 w-5" />
                <span>View Current Rates & Thresholds (2024–2025)</span>
              </button>

              <div className="pt-4 border-t border-gray-200 dark:border-dark-600">
                <p className="text-xs text-gray-500 dark:text-text-tertiary">
                  These rates are updated annually and reflect the official Department of Social Services Child Support Guide thresholds for the 2024-2025 financial year.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-panel-sm border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800/60 sticky top-24">
            <h4 className="text-sm font-semibold text-accent-teal uppercase tracking-wide mb-4 flex items-center">
              <div className="w-1.5 h-1.5 bg-accent-teal rounded-full mr-2" />
              Manual Calculator Reference
            </h4>
            <NeumorphicCalculator 
              onValueChange={() => {}}
              currentValue={0}
            />
          </div>
        </div>
      </div>

      <ReferenceModal 
        isOpen={isReferenceModalOpen} 
        onClose={() => setIsReferenceModalOpen(false)} 
      />
    </div>
  );
}

