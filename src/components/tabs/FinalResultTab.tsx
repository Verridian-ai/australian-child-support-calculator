import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import type { ChildSupportInputs, ChildSupportResult } from '../../lib/calculator';
import { formatCurrency } from '../../lib/calculator';

interface FinalResultTabProps {
  result: ChildSupportResult | null;
  inputs: ChildSupportInputs;
  onViewGuide: () => void;
}

export default function FinalResultTab({ result, inputs, onViewGuide }: FinalResultTabProps) {
  if (!result) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-text-secondary">
          No calculation result available yet.
        </p>
        <p className="text-sm text-gray-500 dark:text-text-tertiary mt-2">
          Complete the calculation inputs and click "Calculate & Save Estimate" to see results.
        </p>
      </div>
    );
  }

  const perChildAmount = result.finalAmount / inputs.numberOfChildren;
  const payer = result.finalAmount > 0 ? (result.parentA_PerChild > result.parentB_PerChild ? 'A' : 'B') : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-accent-orange rounded-full" />
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-text-primary">
            Final Annual Amount
          </h2>
        </div>
        <button
          onClick={() => {
            window.location.hash = '#guide';
            onViewGuide();
          }}
          className="text-sm text-accent-teal hover:text-accent-teal/80 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          View Step-by-Step Breakdown
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Summary Panel */}
        <div className="lg:col-span-2 glass-panel-lg p-6 md:p-8">
          <div className="space-y-6">
            {/* Final Transfer */}
            <div className="text-center p-6 bg-gradient-to-br from-accent-orange/10 to-accent-teal/10 rounded-xl border border-accent-orange/20">
              <p className="text-sm text-gray-600 dark:text-text-secondary uppercase tracking-wider mb-2">
                Final Annual Transfer
              </p>
              <p className="text-4xl font-bold text-accent-orange font-mono mb-2">
                {formatCurrency(result.finalAmount)}
              </p>
              <p className="text-sm text-gray-600 dark:text-text-secondary">
                {payer ? `Single payer: Parent ${payer}` : 'No transfer required'}
              </p>
            </div>

            {/* Parent Amounts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
                <p className="text-xs text-gray-500 dark:text-text-tertiary mb-1">Parent A Amount</p>
                <p className={`text-xl font-bold font-mono ${result.parentA_PerChild < 0 ? 'text-accent-teal' : 'text-gray-900 dark:text-text-primary'}`}>
                  {formatCurrency(result.parentA_PerChild * inputs.numberOfChildren)}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
                <p className="text-xs text-gray-500 dark:text-text-tertiary mb-1">Parent B Amount</p>
                <p className={`text-xl font-bold font-mono ${result.parentB_PerChild > 0 ? 'text-accent-orange' : 'text-gray-900 dark:text-text-primary'}`}>
                  {formatCurrency(result.parentB_PerChild * inputs.numberOfChildren)}
                </p>
              </div>
            </div>

            {/* Offset Status */}
            <div className="p-4 bg-blue-50 dark:bg-info-500/10 rounded-lg border border-blue-100 dark:border-info-500/30">
              <p className="text-sm font-medium text-blue-600 dark:text-info-500 mb-1">
                Offset Applied: {result.offsetApplied ? 'Yes' : 'No'}
              </p>
              <p className="text-xs text-gray-600 dark:text-text-secondary">
                Based on Child Support Percentage and Total COTC (with offset if applicable).
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar with Per-Child Breakdown */}
        <div className="lg:col-span-1 space-y-6">
          {/* Per-Child Breakdown */}
          <div className="glass-panel-lg p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary mb-4">
              Per-Child Breakdown
            </h3>
          
          <div className="mb-4 p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-text-secondary mb-1">Per Child (Annual)</p>
            <p className="text-2xl font-bold text-accent-teal font-mono">
              {formatCurrency(perChildAmount)}
            </p>
          </div>

          {/* Child List */}
          <div className="space-y-3">
            {inputs.childNames && inputs.childNames.length > 0 ? (
              inputs.childNames.map((name, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
                  <span className="text-gray-900 dark:text-text-primary font-medium">{name}</span>
                  <span className="text-lg font-bold text-accent-teal font-mono">
                    {formatCurrency(perChildAmount)} per year
                  </span>
                </div>
              ))
            ) : (
              Array.from({ length: inputs.numberOfChildren }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
                  <span className="text-gray-900 dark:text-text-primary font-medium">Child {index + 1}</span>
                  <span className="text-lg font-bold text-accent-teal font-mono">
                    {formatCurrency(perChildAmount)} per year
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Covers Label */}
          {inputs.childNames && inputs.childNames.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-text-tertiary mt-4 italic">
              Covers: {inputs.childNames.join(', ')}
            </p>
          )}
          </div>
        </div>
      </div>

      {/* Completion Message */}
      <div className="glass-panel-lg p-6 md:p-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-accent-green" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Guide Complete!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          You've successfully walked through the entire Australian Child Support calculation process. You can now use the calculator with your own figures.
        </p>
        <button
          onClick={() => window.location.hash = '#inputs'}
          className="neumorphic-btn-primary px-8 py-3 text-lg"
        >
          Start Again
        </button>
      </div>
    </div>
  );
}

