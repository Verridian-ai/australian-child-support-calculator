import React from 'react';
import { Users, Baby, Calendar, DollarSign, Calculator } from 'lucide-react';
import { formatCurrency } from '../lib/calculator';
import type { ChildSupportInputs, ChildSupportResult } from '../lib/calculator';

interface CalculatorInputsProps {
  inputs: ChildSupportInputs;
  onChange: (inputs: Partial<ChildSupportInputs>) => void;
  onCalculate: () => void;
  result: ChildSupportResult | null;
}

export default function CalculatorInputs({ 
  inputs, 
  onChange, 
  onCalculate, 
  result 
}: CalculatorInputsProps) {
  const handleInputChange = (field: keyof ChildSupportInputs, value: any) => {
    onChange({ [field]: value });
  };

  const calculateWageThreshold = () => {
    if (inputs.currentWage) {
      return inputs.currentWage * 0.85; // 15% reduction threshold
    }
    return 0;
  };

  return (
    <div className="space-y-8">
      {/* Parent Incomes */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-5 w-5 text-primary-500" />
          <h3 className="text-lg font-medium text-text-primary">
            Parent Incomes (Adjusted Taxable Income)
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Parent A Income
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-text-tertiary">$</span>
              </div>
              <input
                type="number"
                value={inputs.parentA_ATI || ''}
                onChange={(e) => handleInputChange('parentA_ATI', parseFloat(e.target.value) || 0)}
                className="input-field pl-7 w-full"
                placeholder="50,000"
                min="0"
                step="1000"
              />
            </div>
            <p className="text-xs text-text-tertiary mt-1">
              Annual income after deductions
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Parent B Income
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-text-tertiary">$</span>
              </div>
              <input
                type="number"
                value={inputs.parentB_ATI || ''}
                onChange={(e) => handleInputChange('parentB_ATI', parseFloat(e.target.value) || 0)}
                className="input-field pl-7 w-full"
                placeholder="60,000"
                min="0"
                step="1000"
              />
            </div>
            <p className="text-xs text-text-tertiary mt-1">
              Annual income after deductions
            </p>
          </div>
        </div>
      </div>

      {/* Children Details */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Baby className="h-5 w-5 text-primary-500" />
          <h3 className="text-lg font-medium text-text-primary">
            Children Details
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Number of Children
            </label>
            <input
              type="number"
              value={inputs.numberOfChildren || ''}
              onChange={(e) => handleInputChange('numberOfChildren', parseInt(e.target.value) || 0)}
              className="input-field w-full"
              placeholder="3"
              min="1"
              max="10"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Children's Ages
            </label>
            <input
              type="text"
              value={inputs.childrenAges.join(', ')}
              onChange={(e) => {
                const ages = e.target.value
                  .split(',')
                  .map(age => parseInt(age.trim()))
                  .filter(age => !isNaN(age) && age >= 0);
                handleInputChange('childrenAges', ages);
              }}
              className="input-field w-full"
              placeholder="9, 7, 5"
            />
            <p className="text-xs text-text-tertiary mt-1">
              Separate with commas
            </p>
          </div>
        </div>
      </div>

      {/* Care Arrangements */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5 text-primary-500" />
          <h3 className="text-lg font-medium text-text-primary">
            Annual Care Nights
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Parent A Care Nights
            </label>
            <input
              type="number"
              value={inputs.parentA_CareNights || ''}
              onChange={(e) => handleInputChange('parentA_CareNights', parseInt(e.target.value) || 0)}
              className="input-field w-full"
              placeholder="290"
              min="0"
              max="365"
            />
            <p className="text-xs text-text-tertiary mt-1">
              Out of 365 days per year
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Parent B Care Nights
            </label>
            <input
              type="number"
              value={inputs.parentB_CareNights || ''}
              onChange={(e) => handleInputChange('parentB_CareNights', parseInt(e.target.value) || 0)}
              className="input-field w-full"
              placeholder="75"
              min="0"
              max="365"
            />
            <p className="text-xs text-text-tertiary mt-1">
              Out of 365 days per year
            </p>
          </div>
        </div>
      </div>

      {/* Current Wage */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <DollarSign className="h-5 w-5 text-primary-500" />
          <h3 className="text-lg font-medium text-text-primary">
            Current Wage (for 15% threshold tracking)
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Current Annual Wage
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-text-tertiary">$</span>
              </div>
              <input
                type="number"
                value={inputs.currentWage || ''}
                onChange={(e) => handleInputChange('currentWage', parseFloat(e.target.value) || 0)}
                className="input-field pl-7 w-full"
                placeholder="97,000"
                min="0"
                step="1000"
              />
            </div>
            <p className="text-xs text-text-tertiary mt-1">
              Used for 15% reduction alerts
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              15% Reduction Threshold
            </label>
            <div className="p-3 bg-dark-800 rounded-md border border-dark-400">
              <p className="text-lg font-mono font-semibold text-text-primary">
                {formatCurrency(calculateWageThreshold())}
              </p>
              <p className="text-xs text-text-tertiary">
                Wage must drop below this for new estimate eligibility
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="pt-6 border-t border-dark-600">
        <button
          onClick={onCalculate}
          className="neumorphic-btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Calculator className="h-5 w-5" />
          <span>Calculate & Save Estimate</span>
        </button>
        <p className="text-xs text-text-tertiary text-center mt-2">
          Saves calculation to history for future reference
        </p>
      </div>

      {/* Quick Result Preview */}
      {result && (
        <div className="glass-panel-sm border border-dark-600 bg-dark-800 bg-opacity-60">
          <h4 className="text-sm font-semibold text-accent-teal uppercase tracking-wide mb-3">
            Quick Result Preview
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-dark-700 bg-opacity-50 rounded-lg border border-dark-600">
              <p className="text-xs text-text-tertiary">Final Annual Amount</p>
              <p className="text-xl font-bold text-accent-orange font-mono">
                {formatCurrency(result.finalAmount)}
              </p>
            </div>
            <div className="p-3 bg-dark-700 bg-opacity-50 rounded-lg border border-dark-600">
              <p className="text-xs text-text-tertiary">Per Child (Annual)</p>
              <p className="text-lg font-semibold text-accent-teal font-mono">
                {formatCurrency(result.finalAmount / inputs.numberOfChildren)}
              </p>
            </div>
            <div className="p-3 bg-dark-700 bg-opacity-50 rounded-lg border border-dark-600">
              <p className="text-xs text-text-tertiary">Offset Applied</p>
              <p className="text-sm font-medium text-accent-green">
                {result.offsetApplied ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}