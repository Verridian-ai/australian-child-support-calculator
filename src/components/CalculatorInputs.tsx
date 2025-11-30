import React from 'react';
import { Calculator } from 'lucide-react';
import { ChildSupportInputs, ChildSupportResult, formatCurrency } from '../lib/calculator';
import { ParentIncomes } from './inputs/ParentIncomes';
import { ChildrenDetails } from './inputs/ChildrenDetails';
import { CareArrangements } from './inputs/CareArrangements';
import { CurrentWage } from './inputs/CurrentWage';

interface CalculatorInputsProps {
  inputs: ChildSupportInputs;
  onChange: (inputs: Partial<ChildSupportInputs>) => void;
  onCalculate: () => void;
  result: ChildSupportResult | null;
  onShowGuide?: (section: string) => void;
}

export default function CalculatorInputs({ 
  inputs, 
  onChange, 
  onCalculate, 
  result,
  onShowGuide
}: CalculatorInputsProps) {
  const handleInputChange = (field: keyof ChildSupportInputs, value: any) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <ParentIncomes inputs={inputs} onChange={handleInputChange} onShowGuide={() => onShowGuide?.('income')} />
      <ChildrenDetails inputs={inputs} onChange={handleInputChange} onShowGuide={() => onShowGuide?.('costs')} />
      <CareArrangements inputs={inputs} onChange={handleInputChange} onShowGuide={() => onShowGuide?.('care')} />
      <CurrentWage inputs={inputs} onChange={handleInputChange} onShowGuide={() => onShowGuide?.('wage')} />

      {/* Calculate Button */}
      <div className="pt-4 md:pt-6 border-t border-gray-200 dark:border-dark-600 animate-fade-in" style={{ animationDelay: '400ms' }}>
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

      {/* Quick Result Preview */}
      {result && (
        <div className="glass-panel-sm border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800/60 animate-fade-in mt-6">
          <h4 className="text-sm font-semibold text-accent-teal uppercase tracking-wide mb-4 flex items-center">
            <div className="w-1.5 h-1.5 bg-accent-teal rounded-full mr-2" />
            Quick Result Preview
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 dark:bg-dark-700/50 rounded-xl border border-gray-200 dark:border-dark-600 hover:border-accent-orange/30 transition-colors">
              <p className="text-xs text-gray-500 dark:text-text-tertiary uppercase tracking-wider mb-1">Final Annual Amount</p>
              <p className="text-2xl font-bold text-accent-orange font-mono">
                {formatCurrency(result.finalAmount)}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-dark-700/50 rounded-xl border border-gray-200 dark:border-dark-600 hover:border-accent-teal/30 transition-colors">
              <p className="text-xs text-gray-500 dark:text-text-tertiary uppercase tracking-wider mb-1">Per Child (Annual)</p>
              <p className="text-xl font-semibold text-accent-teal font-mono">
                {formatCurrency(result.finalAmount / inputs.numberOfChildren)}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-dark-700/50 rounded-xl border border-gray-200 dark:border-dark-600 hover:border-accent-green/30 transition-colors">
              <p className="text-xs text-gray-500 dark:text-text-tertiary uppercase tracking-wider mb-1">Offset Applied</p>
              <p className="text-lg font-medium text-accent-green">
                {result.offsetApplied ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
