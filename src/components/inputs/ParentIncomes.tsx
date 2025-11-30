import React from 'react';
import { Users, HelpCircle } from 'lucide-react';
import { ChildSupportInputs } from '../../lib/calculator';
import FormulaDemo from '../FormulaDemo';

interface ParentIncomesProps {
  inputs: ChildSupportInputs;
  onChange: (field: keyof ChildSupportInputs, value: any) => void;
  onShowGuide?: () => void;
}

export function ParentIncomes({ inputs, onChange, onShowGuide }: ParentIncomesProps) {
  return (
    <div className="glass-panel-section animate-slide-up" style={{ animationDelay: '0ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-500/10 rounded-lg">
            <Users className="h-5 w-5 text-primary-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
            Parent Incomes
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

      {/* Formula Demo for Child Support Income */}
      <FormulaDemo
        title="Step 1: Child Support Income (Parent A)"
        formula="Child Support Income = Adjusted Taxable Income - Self-Support Amount ($29,841)"
        buttonSequence={["5", "0", "0", "0", "0", "-", "2", "9", "8", "4", "1", "="]}
        exampleValues={{ "Parent A ATI": 50000, "Self-Support Amount": 29841 }}
        explanation="Enter Parent A's income ($50,000) and subtract the self-support amount ($29,841) to get Child Support Income. Result: $20,159. Repeat the same calculation for Parent B with their income amount."
        result={50000 - 29841}
        calculationSteps={[
          { step: "Enter Parent A ATI", value: 50000 },
          { step: "Subtract Self-Support Amount ($29,841)", value: 29841 },
          { step: "50000 - 29841", value: 20159 },
          { step: "Child Support Income Result", value: 20159 }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary">
            Parent A Income (ATI)
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-text-tertiary font-medium">$</span>
            </div>
            <input
              type="number"
              value={inputs.parentA_ATI || ''}
              onChange={(e) => onChange('parentA_ATI', parseFloat(e.target.value) || 0)}
              className="input-field pl-8 w-full transition-all duration-300 focus:ring-2 focus:ring-accent-teal/50"
              placeholder="50,000"
              min="0"
              step="1000"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-text-tertiary px-1">
            Annual adjusted taxable income
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary">
            Parent B Income (ATI)
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-text-tertiary font-medium">$</span>
            </div>
            <input
              type="number"
              value={inputs.parentB_ATI || ''}
              onChange={(e) => onChange('parentB_ATI', parseFloat(e.target.value) || 0)}
              className="input-field pl-8 w-full transition-all duration-300 focus:ring-2 focus:ring-accent-teal/50"
              placeholder="60,000"
              min="0"
              step="1000"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-text-tertiary px-1">
            Annual adjusted taxable income
          </p>
        </div>
      </div>
    </div>
  );
}

