import React from 'react';
import { Calculator } from 'lucide-react';
import type { ChildSupportInputs, ChildSupportResult } from '../../lib/calculator';
import { ParentIncomes } from '../inputs/ParentIncomes';
import { ChildrenDetails } from '../inputs/ChildrenDetails';
import { CareArrangements } from '../inputs/CareArrangements';
import { CurrentWage } from '../inputs/CurrentWage';
import { formatCurrency } from '../../lib/calculator';

interface CalculatorInputsTabProps {
  inputs: ChildSupportInputs;
  result: ChildSupportResult | null;
  onInputsChange: (inputs: Partial<ChildSupportInputs>) => void;
  onCalculate: () => void;
  onShowGuide: (section?: string) => void;
}

export default function CalculatorInputsTab({
  inputs,
  result,
  onInputsChange,
  onCalculate,
  onShowGuide
}: CalculatorInputsTabProps) {
  const handleInputChange = (field: keyof ChildSupportInputs, value: any) => {
    onInputsChange({ [field]: value });
  };

  // Progress badge data
  const progress = result ? 100 : 0;
  const currentStep = result ? 8 : 0;

  return (
    <div className="space-y-6">
      {/* Header with Progress Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-primary-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-text-primary">
            Calculation Inputs
          </h2>
        </div>
        
        {/* Progress Badge */}
        {result && (
          <div className="flex items-center space-x-4 text-sm">
            <div className="px-3 py-1 bg-accent-teal/10 text-accent-teal rounded-full font-medium">
              Step {currentStep}: Final Annual Amount
            </div>
            <div className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-text-secondary rounded-full font-medium">
              Progress {progress}%
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Input Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel-lg p-4 sm:p-6 md:p-8">
            <ParentIncomes 
              inputs={inputs} 
              onChange={handleInputChange}
              onShowGuide={() => onShowGuide('income')}
            />
            
            <ChildrenDetails 
              inputs={inputs} 
              onChange={handleInputChange}
              onShowGuide={() => onShowGuide('costs')}
            />
            
            <CareArrangements 
              inputs={inputs} 
              onChange={handleInputChange}
              onShowGuide={() => onShowGuide('care')}
            />
            
            <CurrentWage 
              inputs={inputs} 
              onChange={handleInputChange}
              onShowGuide={() => onShowGuide('wage')}
            />

            {/* Calculate Button */}
            <div className="pt-6 border-t border-gray-200 dark:border-dark-600 mt-6">
              <button
                onClick={onCalculate}
                className="neumorphic-btn-primary w-full flex items-center justify-center space-x-2 group py-4 active:scale-95"
              >
                <Calculator className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-semibold">Calculate & Save Estimate</span>
              </button>
              <p className="text-xs text-gray-500 dark:text-text-tertiary text-center mt-3">
                Saves calculation to history for future reference
              </p>
            </div>
          </div>
        </div>

        {/* Quick Result Preview Sidebar */}
        <div className="lg:col-span-1">
          {result && (
            <div className="glass-panel-sm border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800/60 sticky top-24">
              <h4 className="text-sm font-semibold text-accent-teal uppercase tracking-wide mb-4 flex items-center">
                <div className="w-1.5 h-1.5 bg-accent-teal rounded-full mr-2" />
                Quick Result Preview
              </h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-dark-700/50 rounded-xl border border-gray-200 dark:border-dark-600 text-center">
                  <p className="text-xs text-gray-500 dark:text-text-tertiary uppercase tracking-wider mb-1">Final Annual Amount</p>
                  <p className="text-2xl font-bold text-accent-orange font-mono">
                    {formatCurrency(result.finalAmount)}
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-dark-700/50 rounded-xl border border-gray-200 dark:border-dark-600 text-center">
                  <p className="text-xs text-gray-500 dark:text-text-tertiary uppercase tracking-wider mb-1">Per Child (Annual)</p>
                  <p className="text-xl font-semibold text-accent-teal font-mono">
                    {formatCurrency(result.finalAmount / inputs.numberOfChildren)}
                  </p>
                </div>

                {/* Per-Child Breakdown if names exist */}
                {inputs.childNames && inputs.childNames.length > 0 && (
                  <div className="pt-4 border-t border-gray-200 dark:border-dark-600">
                    <p className="text-xs text-gray-500 dark:text-text-tertiary uppercase tracking-wider mb-3">Per-Child Breakdown</p>
                    <div className="space-y-2">
                      {inputs.childNames.map((name, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-700 dark:text-text-secondary">{name}:</span>
                          <span className="font-mono text-gray-900 dark:text-text-primary">
                            {formatCurrency(result.finalAmount / inputs.numberOfChildren)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="p-4 bg-gray-50 dark:bg-dark-700/50 rounded-xl border border-gray-200 dark:border-dark-600 text-center">
                  <p className="text-xs text-gray-500 dark:text-text-tertiary uppercase tracking-wider mb-1">Offset Applied</p>
                  <p className="text-lg font-medium text-accent-green">
                    {result.offsetApplied ? 'Yes' : 'No'}
                  </p>
                </div>

                <button
                  onClick={() => window.location.hash = '#result'}
                  className="w-full neumorphic-btn-secondary text-sm py-2"
                >
                  View Full Result
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

