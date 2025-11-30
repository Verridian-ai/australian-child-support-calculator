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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl shadow-glass-lg w-full max-w-lg max-h-[90vh] overflow-y-auto relative animate-slide-up">
        
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-600 p-4 flex justify-between items-center z-10">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-accent-teal" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">Calculation Reference Data</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 dark:text-text-tertiary hover:text-gray-900 dark:hover:text-text-primary p-1 rounded-md hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-dark-700/50 rounded-lg border border-gray-200 dark:border-dark-600">
              <h4 className="text-sm font-semibold text-accent-orange uppercase tracking-wide mb-3">
                2024-2025 Financial Year Rates
              </h4>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-200 dark:border-dark-600 pb-2">
                  <span className="text-gray-600 dark:text-text-secondary">Self-Support Amount</span>
                  <span className="font-mono text-gray-900 dark:text-text-primary font-medium">
                    {formatCurrency(rates.SELF_SUPPORT_AMOUNT)}
                  </span>
                </div>
                
                <div className="flex justify-between border-b border-gray-200 dark:border-dark-600 pb-2">
                  <span className="text-gray-600 dark:text-text-secondary">COTC Base Cost</span>
                  <span className="font-mono text-gray-900 dark:text-text-primary font-medium">
                    {formatCurrency(rates.COTC_TABLE.BASE_COST)}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-200 dark:border-dark-600 pb-2">
                  <span className="text-gray-600 dark:text-text-secondary">COTC Income Threshold</span>
                  <span className="font-mono text-gray-900 dark:text-text-primary font-medium">
                    {formatCurrency(rates.COTC_TABLE.THRESHOLD)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-text-secondary">Additional Rate (Above Threshold)</span>
                  <span className="font-mono text-gray-900 dark:text-text-primary font-medium">
                    {(rates.COTC_TABLE.ADDITIONAL_RATE * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-dark-700/50 rounded-lg border border-gray-200 dark:border-dark-600">
              <h4 className="text-sm font-semibold text-accent-teal uppercase tracking-wide mb-3">
                Care Percentage Cost Table
              </h4>
              <div className="text-xs space-y-2">
                <div className="grid grid-cols-3 text-gray-500 dark:text-text-tertiary pb-1 border-b border-gray-200 dark:border-dark-600">
                  <span>Care % Range</span>
                  <span className="text-right">Cost %</span>
                  <span className="text-right">Description</span>
                </div>
                <div className="grid grid-cols-3 text-gray-600 dark:text-text-secondary">
                  <span>0 - 13%</span>
                  <span className="text-right">0%</span>
                  <span className="text-right text-gray-400 dark:text-text-tertiary">Regular Care</span>
                </div>
                <div className="grid grid-cols-3 text-gray-600 dark:text-text-secondary">
                  <span>14 - 34%</span>
                  <span className="text-right">24%</span>
                  <span className="text-right text-gray-400 dark:text-text-tertiary">Shared Care 1</span>
                </div>
                <div className="grid grid-cols-3 text-gray-600 dark:text-text-secondary">
                  <span>35 - 47%</span>
                  <span className="text-right">25-50%</span>
                  <span className="text-right text-gray-400 dark:text-text-tertiary">Shared Care 2</span>
                </div>
                <div className="grid grid-cols-3 text-gray-600 dark:text-text-secondary">
                  <span>48 - 52%</span>
                  <span className="text-right">50%</span>
                  <span className="text-right text-gray-400 dark:text-text-tertiary">Equal Care</span>
                </div>
                <div className="grid grid-cols-3 text-gray-600 dark:text-text-secondary">
                  <span>53 - 65%</span>
                  <span className="text-right">51-75%</span>
                  <span className="text-right text-gray-400 dark:text-text-tertiary">Primary Care 1</span>
                </div>
                <div className="grid grid-cols-3 text-gray-600 dark:text-text-secondary">
                  <span>66 - 86%</span>
                  <span className="text-right">76%</span>
                  <span className="text-right text-gray-400 dark:text-text-tertiary">Primary Care 2</span>
                </div>
                <div className="grid grid-cols-3 text-gray-600 dark:text-text-secondary">
                  <span>&gt; 86%</span>
                  <span className="text-right">~100%</span>
                  <span className="text-right text-gray-400 dark:text-text-tertiary">Sole Care</span>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-info-500/10 rounded-lg border border-blue-100 dark:border-info-500/30">
              <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-info-500 flex-shrink-0" />
              <p className="text-xs text-gray-600 dark:text-text-secondary">
                This calculator uses the standard formula for the 2024-2025 financial year. 
                Actual assessments may vary based on complex family circumstances, multiple case groups, and specific Services Australia determinations.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-800 sticky bottom-0 rounded-b-xl">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-text-tertiary">
            <a 
              href="https://guides.dss.gov.au/child-support-guide/2/4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent-teal underline decoration-gray-300 dark:decoration-text-tertiary/30 underline-offset-2 transition-colors"
            >
              Source: Services Australia / DSS Guide
            </a>
            <div className="flex items-center space-x-1 text-accent-green">
              <CheckCircle className="h-3 w-3" />
              <span>Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

