import React from 'react';
import CalculationSteps from '../CalculationSteps';
import type { ChildSupportCalculationStep } from '../../lib/calculator';
import InteractiveGuide from '../InteractiveGuide';
import NeumorphicCalculator from '../NeumorphicCalculator';
import ButtonHighlighter from '../ButtonHighlighter';

interface StepByStepGuideTabProps {
  steps: ChildSupportCalculationStep[];
  showInteractiveGuide: boolean;
  activeSection?: string;
  highlightedButtons: string[];
  calculatorDisplay: string;
  onButtonHighlight: (buttons: string[]) => void;
  onGuideStepComplete: () => void;
  onCalculatorClick: (button: string) => void;
  onInputChange: (inputs: any) => void;
  onToggleGuide: () => void;
}

export default function StepByStepGuideTab({
  steps,
  showInteractiveGuide,
  activeSection,
  highlightedButtons,
  calculatorDisplay,
  onButtonHighlight,
  onGuideStepComplete,
  onCalculatorClick,
  onInputChange,
  onToggleGuide
}: StepByStepGuideTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-accent-orange rounded-full" />
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-text-primary">
            Step-by-Step Child Support Calculation
          </h2>
        </div>
      </div>

      {/* Interactive Guide (if active) - Optional, uses guideSteps internally */}
      {showInteractiveGuide && (
        <div className="mb-8 animate-fade-in">
          <InteractiveGuide
            steps={steps}
            onButtonHighlight={onButtonHighlight}
            onGuideStepComplete={onGuideStepComplete}
            onCalculatorClick={onCalculatorClick}
            onInputChange={onInputChange}
            activeSection={activeSection}
          />
        </div>
      )}
      
      {/* Show steps only if no interactive guide or guide not active */}
      {!showInteractiveGuide && steps.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-text-secondary">
            No calculation steps available yet.
          </p>
          <p className="text-sm text-gray-500 dark:text-text-tertiary mt-2">
            Complete the calculation inputs to see step-by-step breakdown.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Steps Panel */}
        <div className="lg:col-span-3">
          <div className="glass-panel-lg p-4 sm:p-6 md:p-8">
            <CalculationSteps steps={steps} />
            
            {/* Training Note */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-600">
              <p className="text-xs text-gray-500 dark:text-text-tertiary italic">
                These steps implement the official 8-step Australian child support formula from the Child Support Guide. This interface is for officer training and internal use only.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {showInteractiveGuide ? (
            <div className="glass-panel-sm">
              <h3 className="text-lg font-semibold text-accent-teal mb-4">
                Interactive Calculator
              </h3>
              <ButtonHighlighter
                highlightedButtons={highlightedButtons}
                onButtonClick={onCalculatorClick}
                currentDisplay={calculatorDisplay}
              />
            </div>
          ) : (
            <div className="glass-panel-sm">
              <h3 className="text-lg font-semibold text-accent-teal mb-4">
                Manual Calculator Reference
              </h3>
              <NeumorphicCalculator 
                onValueChange={() => {}}
                currentValue={0}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

