import React from 'react';
import { DollarSign, HelpCircle } from 'lucide-react';
import { ChildSupportInputs, formatCurrency } from '../../lib/calculator';
import FormulaDemo from '../FormulaDemo';

interface CurrentWageProps {
  inputs: ChildSupportInputs;
  onChange: (field: keyof ChildSupportInputs, value: any) => void;
  onShowGuide?: () => void;
}

export function CurrentWage({ inputs, onChange, onShowGuide }: CurrentWageProps) {
  const calculateWageThreshold = () => {
    if (inputs.currentWage) {
      return inputs.currentWage * 0.85; // 15% reduction threshold
    }
    return 0;
  };

  return (
    <div className="glass-panel-section animate-slide-up" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent-green/10 rounded-lg">
            <DollarSign className="h-5 w-5 text-accent-green" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
            Wage Tracking
          </h3>
        </div>
        {onShowGuide && (
          <button 
            onClick={onShowGuide}
            className="text-xs flex items-center text-accent-teal hover:text-accent-teal/80 transition-colors font-medium"
          >
            <HelpCircle className="h-3.5 w-3.5 mr-1.5" />
            Show Guide
          </button>
        )}
      </div>

      {/* Formula Demo for 15% Reduction Threshold */}
      <FormulaDemo
        title="15% Reduction Threshold Calculation"
        formula="15% Reduction Threshold = Current Annual Wage × 0.85"
        buttonSequence={["9", "7", "0", "0", "0", "×", "0", ".", "8", "5", "="]}
        exampleValues={{ "Current Annual Wage": 97000, "Multiplier": 0.85 }}
        explanation="Multiply the current annual wage ($97,000) by 0.85 (which represents 85% or 100% minus 15%). This gives you the threshold amount ($82,450). If a parent's new reported wage falls below this threshold, the 15% rule is met and reassessment can proceed."
        result={97000 * 0.85}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary">
            Current Annual Wage
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-text-tertiary font-medium">$</span>
            </div>
            <input
              type="number"
              value={inputs.currentWage || ''}
              onChange={(e) => onChange('currentWage', parseFloat(e.target.value) || 0)}
              className="input-field pl-8 w-full transition-all duration-300 focus:ring-2 focus:ring-accent-green/50"
              placeholder="97,000"
              min="0"
              step="1000"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-text-tertiary px-1">
            Used for 15% reduction alerts
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary">
            15% Reduction Threshold
          </label>
          <div className="p-3 bg-gray-100 dark:bg-dark-800/50 rounded-lg border border-gray-200 dark:border-dark-600/50 flex items-center justify-between h-[42px]">
            <span className="font-mono font-bold text-gray-900 dark:text-text-primary">
              {formatCurrency(calculateWageThreshold())}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gray-600 dark:text-text-tertiary bg-gray-200 dark:bg-dark-700 px-2 py-0.5 rounded">
              Threshold
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-text-tertiary px-1">
            Wage drop trigger point
          </p>
        </div>
      </div>
    </div>
  );
}

