import React from 'react';
import { AlertTriangle, CheckCircle, X, FileText } from 'lucide-react';
import { formatCurrency } from '../lib/calculator';
import { RATES_2024_2025 } from '../lib/rates/2024-2025';

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReferenceModal({ isOpen, onClose }: ReferenceModalProps) {
  if (!isOpen) return null;

  const rates = RATES_2024_2025;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl shadow-glass-lg w-full max-w-[calc(100%-1.5rem)] sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto relative animate-slide-up">

        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-600 p-3 sm:p-4 flex justify-between items-center z-10">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-accent-teal flex-shrink-0" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-text-primary">Calculation Reference Data</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-text-tertiary hover:text-gray-900 dark:hover:text-text-primary p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="space-y-4">
            <div className="p-3 sm:p-4 bg-gray-50 dark:bg-dark-700/50 rounded-lg border border-gray-200 dark:border-dark-600">
              <h4 className="text-xs sm:text-sm font-semibold text-accent-orange uppercase tracking-wide mb-3">
                2024-2025 Financial Year Rates
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 dark:border-dark-600 pb-2 gap-1">
                  <span className="text-gray-600 dark:text-text-secondary text-xs sm:text-sm">Self-Support Amount</span>
                  <span className="font-mono text-gray-900 dark:text-text-primary font-medium text-sm sm:text-base">
                    {formatCurrency(rates.SELF_SUPPORT_AMOUNT)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 dark:border-dark-600 pb-2 gap-1">
                  <span className="text-gray-600 dark:text-text-secondary text-xs sm:text-sm">COTC Base Cost</span>
                  <span className="font-mono text-gray-900 dark:text-text-primary font-medium text-sm sm:text-base">
                    {formatCurrency(rates.COTC_TABLE.BASE_COST)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 dark:border-dark-600 pb-2 gap-1">
                  <span className="text-gray-600 dark:text-text-secondary text-xs sm:text-sm">COTC Income Threshold</span>
                  <span className="font-mono text-gray-900 dark:text-text-primary font-medium text-sm sm:text-base">
                    {formatCurrency(rates.COTC_TABLE.THRESHOLD)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-gray-600 dark:text-text-secondary text-xs sm:text-sm">Additional Rate (Above Threshold)</span>
                  <span className="font-mono text-gray-900 dark:text-text-primary font-medium text-sm sm:text-base">
                    {(rates.COTC_TABLE.ADDITIONAL_RATE * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gray-50 dark:bg-dark-700/50 rounded-lg border border-gray-200 dark:border-dark-600">
              <h4 className="text-xs sm:text-sm font-semibold text-accent-teal uppercase tracking-wide mb-3">
                Care Percentage Cost Table
              </h4>
              {/* Mobile: Stack layout, Desktop: Grid layout */}
              <div className="space-y-2 text-xs sm:text-sm">
                {/* Header - hidden on mobile, shown on sm+ */}
                <div className="hidden sm:grid grid-cols-3 text-gray-500 dark:text-text-tertiary pb-1 border-b border-gray-200 dark:border-dark-600 font-medium">
                  <span>Care % Range</span>
                  <span className="text-center">Cost %</span>
                  <span className="text-right">Description</span>
                </div>
                {/* Data rows */}
                {[
                  { range: '0 - 13%', cost: '0%', desc: 'Regular Care' },
                  { range: '14 - 34%', cost: '24%', desc: 'Shared Care 1' },
                  { range: '35 - 47%', cost: '25-50%', desc: 'Shared Care 2' },
                  { range: '48 - 52%', cost: '50%', desc: 'Equal Care' },
                  { range: '53 - 65%', cost: '51-75%', desc: 'Primary Care 1' },
                  { range: '66 - 86%', cost: '76%', desc: 'Primary Care 2' },
                  { range: '> 86%', cost: '~100%', desc: 'Sole Care' },
                ].map((row, i) => (
                  <div key={i} className="flex flex-col sm:grid sm:grid-cols-3 py-2 sm:py-1 border-b sm:border-0 border-gray-100 dark:border-dark-600 last:border-0">
                    <div className="flex justify-between sm:block">
                      <span className="text-gray-600 dark:text-text-secondary font-medium sm:font-normal">{row.range}</span>
                      <span className="sm:hidden text-gray-900 dark:text-text-primary font-mono">{row.cost}</span>
                    </div>
                    <span className="hidden sm:block text-center text-gray-900 dark:text-text-primary font-mono">{row.cost}</span>
                    <span className="text-gray-400 dark:text-text-tertiary text-xs sm:text-right mt-0.5 sm:mt-0">{row.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-500/20 rounded-lg border border-blue-200 dark:border-blue-500/40">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100 leading-relaxed">
                This calculator uses the standard formula for the 2024-2025 financial year.
                Actual assessments may vary based on complex family circumstances, multiple case groups, and specific Services Australia determinations.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-800 sticky bottom-0 rounded-b-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-gray-500 dark:text-text-tertiary">
            <a
              href="https://guides.dss.gov.au/child-support-guide/2/4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-teal underline decoration-gray-300 dark:decoration-text-tertiary/30 underline-offset-2 transition-colors"
            >
              Source: Services Australia / DSS Guide
            </a>
            <div className="flex items-center space-x-1 text-accent-green">
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

