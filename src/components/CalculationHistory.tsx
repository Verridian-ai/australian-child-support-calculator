import React, { useState } from 'react';
import { Clock, User, Baby, TrendingDown, Eye, Trash2 } from 'lucide-react';
import { formatCurrency, type ChildSupportInputs, type ChildSupportResult } from '../lib/calculator';

interface CalculationHistoryProps {
  calculations: Array<{
    id: number;
    timestamp: string;
    inputs: ChildSupportInputs;
    result: ChildSupportResult;
  }>;
  onLoadCalculation: (inputs: ChildSupportInputs) => void;
}

export default function CalculationHistory({ calculations, onLoadCalculation }: CalculationHistoryProps) {
  const [selectedCalculation, setSelectedCalculation] = useState<number | null>(null);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearCalculationHistory = () => {
    if (window.confirm('Are you sure you want to clear all calculation history? This action cannot be undone.')) {
      localStorage.removeItem('childSupportCalculations');
      window.location.reload();
    }
  };

  if (calculations.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-text-tertiary mx-auto mb-3" />
        <p className="text-text-tertiary text-sm">
          No calculations saved yet
        </p>
        <p className="text-text-muted text-xs mt-1">
          Use the "Calculate & Save Estimate" button to save your calculations
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Clear History Button */}
      <div className="flex justify-end">
        <button
          onClick={clearCalculationHistory}
          className="text-xs text-text-muted hover:text-semantic-error transition-colors duration-base"
        >
          Clear History
        </button>
      </div>

      {/* Calculations List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {calculations.slice().reverse().map((calculation) => (
          <div
            key={calculation.id}
            className="glass-panel-sm cursor-pointer hover:bg-glass-hover transition-colors duration-base"
            onClick={() => setSelectedCalculation(
              selectedCalculation === calculation.id ? null : calculation.id
            )}
          >
            {/* Summary */}
            <div className="space-y-3">
              {/* Date */}
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-text-tertiary">
                <Clock className="h-3 w-3" />
                <span>{formatDate(calculation.timestamp)}</span>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <User className="h-3 w-3 text-gray-600 dark:text-text-secondary" />
                    <span className="text-xs text-gray-600 dark:text-text-secondary">Combined Income</span>
                  </div>
                  <p className="text-sm font-mono text-gray-900 dark:text-text-primary">
                    {formatCurrency(calculation.inputs.parentA_ATI + calculation.inputs.parentB_ATI)}
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <Baby className="h-3 w-3 text-gray-600 dark:text-text-secondary" />
                    <span className="text-xs text-gray-600 dark:text-text-secondary">Children</span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-text-primary">
                    {calculation.inputs.numberOfChildren} child{calculation.inputs.numberOfChildren !== 1 ? 'ren' : ''}
                  </p>
                </div>
              </div>

              {/* Result */}
              <div className="p-3 bg-white dark:bg-dark-800 bg-opacity-50 dark:bg-opacity-50 rounded-md border border-gray-200 dark:border-dark-600">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-text-secondary">Annual Amount</span>
                  <span className="text-lg font-bold text-primary-500 font-mono">
                    {formatCurrency(calculation.result.finalAmount)}
                  </span>
                </div>
              </div>

              {/* Expand/Collapse Button */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-dark-600">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-gray-500 dark:text-text-tertiary" />
                  <span className="text-sm text-gray-500 dark:text-text-tertiary">
                    {selectedCalculation === calculation.id ? 'Hide' : 'View'} Details
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLoadCalculation(calculation.inputs);
                  }}
                  className="text-xs text-primary-500 hover:text-primary-300 transition-colors duration-base"
                >
                  Load in Calculator
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedCalculation === calculation.id && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-400 animate-fade-in space-y-4">
                {/* Inputs Summary */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wide mb-2">
                    Calculation Inputs
                  </h5>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-text-tertiary">Parent A Income:</span>
                      <span className="text-gray-900 dark:text-text-primary font-mono">
                        {formatCurrency(calculation.inputs.parentA_ATI)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-text-tertiary">Parent B Income:</span>
                      <span className="text-gray-900 dark:text-text-primary font-mono">
                        {formatCurrency(calculation.inputs.parentB_ATI)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-text-tertiary">Care Nights (A/B):</span>
                      <span className="text-gray-900 dark:text-text-primary">
                        {calculation.inputs.parentA_CareNights} / {calculation.inputs.parentB_CareNights}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-text-tertiary">Children Ages:</span>
                      <span className="text-gray-900 dark:text-text-primary">
                        {calculation.inputs.childrenAges.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Results Breakdown */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wide mb-2">
                    Results Breakdown
                  </h5>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-text-tertiary">Combined Income:</span>
                      <span className="text-gray-900 dark:text-text-primary font-mono">
                        {formatCurrency(calculation.inputs.parentA_ATI + calculation.inputs.parentB_ATI)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-text-tertiary">Total COTC:</span>
                      <span className="text-gray-900 dark:text-text-primary font-mono">
                        {formatCurrency(calculation.result.steps[6].value)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-text-tertiary">Per Child (Annual):</span>
                      <span className="text-gray-900 dark:text-text-primary font-mono">
                        {formatCurrency(calculation.result.finalAmount / calculation.inputs.numberOfChildren)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-text-tertiary">Offset Applied:</span>
                      <span className="text-gray-900 dark:text-text-primary">
                        {calculation.result.offsetApplied ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Calculation Steps */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wide mb-2">
                    Key Steps
                  </h5>
                  <div className="space-y-2">
                    {calculation.result.steps.slice(0, 3).map((step) => (
                      <div key={step.stepNumber} className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-text-tertiary">{step.title}:</span>
                        <span className="text-gray-900 dark:text-text-primary font-mono">
                          {step.stepNumber === 3 
                            ? `${step.value.toFixed(1)}%`
                            : formatCurrency(step.value)
                          }
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-text-tertiary">Final Amount:</span>
                      <span className="text-primary-500 font-bold">
                        {formatCurrency(calculation.result.finalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* History Stats */}
      {calculations.length > 0 && (
        <div className="pt-4 border-t border-gray-200 dark:border-dark-600">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 dark:text-text-tertiary">Total Saved</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-text-primary">
                {calculations.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-text-tertiary">Latest Amount</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-text-primary">
                {formatCurrency(calculations[calculations.length - 1]?.result.finalAmount || 0)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-text-tertiary">Average Amount</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-text-primary">
                {formatCurrency(
                  calculations.reduce((sum, calc) => sum + calc.result.finalAmount, 0) / calculations.length
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}