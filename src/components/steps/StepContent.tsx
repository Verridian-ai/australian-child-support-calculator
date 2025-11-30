import React from 'react';
import { ChildSupportCalculationStep, formatCurrency, formatPercentage } from '../../lib/calculator';

interface StepContentProps {
  step: ChildSupportCalculationStep;
}

export function StepContent({ step }: StepContentProps) {
  const { stepNumber, details, value } = step;

  switch (stepNumber) {
    case 1:
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700">
              <p className="text-sm text-gray-600 dark:text-text-secondary mb-2">Parent A</p>
              <p className="text-lg font-mono text-gray-900 dark:text-text-primary break-all">
                ${details?.parentA_ATI?.toLocaleString()} - ${details?.selfSupportAmount?.toLocaleString()} = <span className="font-bold text-accent-teal">${details?.parentA_CSI?.toLocaleString()}</span>
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700">
              <p className="text-sm text-gray-600 dark:text-text-secondary mb-2">Parent B</p>
              <p className="text-lg font-mono text-gray-900 dark:text-text-primary break-all">
                ${details?.parentB_ATI?.toLocaleString()} - ${details?.selfSupportAmount?.toLocaleString()} = <span className="font-bold text-accent-orange">${details?.parentB_CSI?.toLocaleString()}</span>
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-text-tertiary italic">
            Self-support amount ($29,841) is deducted from each parent's ATI.
          </p>
        </div>
      );

    case 2:
      return (
        <div className="space-y-4">
          <div className="p-6 bg-gray-50 dark:bg-dark-800/50 rounded-xl border border-gray-200 dark:border-dark-600 text-center">
            <p className="text-lg font-mono text-gray-900 dark:text-text-primary">
              <span className="text-accent-teal">${details?.parentA_CSI?.toLocaleString()}</span> + <span className="text-accent-orange">${details?.parentB_CSI?.toLocaleString()}</span> = <span className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(value)}</span>
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-text-tertiary italic">
            Total financial capacity of both parents combined.
          </p>
        </div>
      );

    case 3:
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ShareCard 
              label="Parent A Income Share" 
              value={formatPercentage(details?.parentA_Percentage || 0)} 
              type="teal"
            />
            <ShareCard 
              label="Parent B Income Share" 
              value={formatPercentage(details?.parentB_Percentage || 0)} 
              type="orange"
            />
          </div>
        </div>
      );

    case 4:
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700">
              <p className="text-sm text-gray-600 dark:text-text-secondary mb-1">Parent A Care</p>
              <p className="text-lg font-mono text-gray-900 dark:text-text-primary mb-2">
                {details?.parentA_Nights} nights
              </p>
              <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 mb-2">
                <div className="bg-accent-teal h-2 rounded-full" style={{ width: `${details?.parentA_Percentage}%` }} />
              </div>
              <p className="text-xl font-bold text-accent-teal text-right">
                {formatPercentage(details?.parentA_Percentage || 0)}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700">
              <p className="text-sm text-gray-600 dark:text-text-secondary mb-1">Parent B Care</p>
              <p className="text-lg font-mono text-gray-900 dark:text-text-primary mb-2">
                {details?.parentB_Nights} nights
              </p>
              <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 mb-2">
                <div className="bg-accent-orange h-2 rounded-full" style={{ width: `${details?.parentB_Percentage}%` }} />
              </div>
              <p className="text-xl font-bold text-accent-orange text-right">
                {formatPercentage(details?.parentB_Percentage || 0)}
              </p>
            </div>
          </div>
        </div>
      );

    case 5:
      return (
        <div className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ShareCard 
              label="Parent A Cost Share" 
              value={formatPercentage(details?.parentA_Percentage || 0)} 
              type="teal"
            />
            <ShareCard 
              label="Parent B Cost Share" 
              value={formatPercentage(details?.parentB_Percentage || 0)} 
              type="orange"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-text-tertiary italic">
             Determined by care nights (e.g., regular care leads to specific cost %).
          </p>
        </div>
      );

    case 6:
      return (
         <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700">
                <p className="text-sm text-gray-600 dark:text-text-secondary">Parent A</p>
                <p className="text-2xl font-mono font-bold text-gray-900 dark:text-text-primary my-2">
                  {formatPercentage(details?.parentA_Percentage || 0)}
                </p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${(details?.parentA_Percentage || 0) > 0 ? 'bg-accent-orange/20 text-accent-orange' : 'bg-accent-green/20 text-accent-green'}`}>
                  {(details?.parentA_Percentage || 0) > 0 ? 'PAYS' : 'RECEIVES'}
                </span>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700">
                <p className="text-sm text-gray-600 dark:text-text-secondary">Parent B</p>
                <p className="text-2xl font-mono font-bold text-gray-900 dark:text-text-primary my-2">
                  {formatPercentage(details?.parentB_Percentage || 0)}
                </p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${(details?.parentB_Percentage || 0) > 0 ? 'bg-accent-orange/20 text-accent-orange' : 'bg-accent-green/20 text-accent-green'}`}>
                  {(details?.parentB_Percentage || 0) > 0 ? 'PAYS' : 'RECEIVES'}
                </span>
              </div>
            </div>
         </div>
      );

    case 7:
      return (
        <div className="space-y-4">
          <div className="p-6 bg-gray-50 dark:bg-dark-800/60 rounded-xl border border-gray-200 dark:border-dark-600 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-text-secondary">Base Cost</span>
              <span className="font-mono text-gray-900 dark:text-text-primary">{formatCurrency(details?.baseCost || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-text-secondary">Income Above Threshold</span>
              <span className="font-mono text-gray-900 dark:text-text-primary">{formatCurrency(details?.incomeAboveThreshold || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-text-secondary text-sm">Add-on (26%)</span>
              <span className="font-mono text-gray-900 dark:text-text-primary text-sm">{formatCurrency(details?.additionalAmount || 0)}</span>
            </div>
            <div className="h-px bg-gray-200 dark:bg-dark-600 my-2" />
            <div className="flex justify-between items-center">
              <span className="text-gray-900 dark:text-text-primary font-bold">Total Costs of Children</span>
              <span className="font-mono text-xl font-bold text-accent-yellow">
                {formatCurrency(value)}
              </span>
            </div>
          </div>
        </div>
      );

    case 8:
      return (
        <div className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-dark-800 dark:to-dark-900 rounded-2xl border border-accent-teal/30 shadow-glass-lg text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/5 rounded-full -mr-16 -mt-16 blur-xl" />
            <p className="text-sm text-accent-teal font-bold uppercase tracking-widest mb-4">Final Annual Transfer</p>
            <p className="text-4xl sm:text-5xl font-bold text-white font-mono mb-2 tracking-tight">
              {formatCurrency(value)}
            </p>
            <p className="text-sm text-gray-400 dark:text-text-tertiary">
              {details?.offsetApplied ? 'Offset applied' : 'Single payer'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <ResultCard label="Parent A Amount" value={details?.parentA_Amount || 0} />
             <ResultCard label="Parent B Amount" value={details?.parentB_Amount || 0} />
          </div>
        </div>
      );

    default:
      return null;
  }
}

function ShareCard({ label, value, type }: { label: string, value: string, type: 'teal' | 'orange' }) {
  const colorClass = type === 'teal' ? 'text-accent-teal' : 'text-accent-orange';
  return (
    <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 text-center">
      <p className="text-sm text-gray-600 dark:text-text-secondary mb-1">{label}</p>
      <p className={`text-2xl font-bold ${colorClass}`}>
        {value}
      </p>
    </div>
  );
}

function ResultCard({ label, value }: { label: string, value: number }) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 flex justify-between items-center">
      <p className="text-sm text-gray-600 dark:text-text-secondary">{label}</p>
      <p className="text-lg font-mono font-medium text-gray-900 dark:text-text-primary">
        {formatCurrency(value)}
      </p>
    </div>
  );
}

