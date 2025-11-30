import React, { useState } from 'react';
import { DollarSign, TrendingDown, AlertTriangle, Info } from 'lucide-react';
import { formatCurrency, checkWageReduction, calculateWageThreshold } from '../../lib/calculator';
import NeumorphicCalculator from '../NeumorphicCalculator';
import FormulaDemo from '../FormulaDemo';

interface WageTrackerTabProps {
  currentWage: number;
  wageHistory: Array<{
    wage: number;
    timestamp: string;
  }>;
  onWageChange: (newWage: number) => void;
}

export default function WageTrackerTab({ currentWage, wageHistory, onWageChange }: WageTrackerTabProps) {
  const [newReportedWage, setNewReportedWage] = useState<string>('');
  const [showReassessmentCheck, setShowReassessmentCheck] = useState(false);

  const threshold = calculateWageThreshold(currentWage);
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReassessmentCheck = () => {
    const reportedWage = parseFloat(newReportedWage);
    if (reportedWage && reportedWage > 0) {
      setShowReassessmentCheck(true);
    }
  };

  const reassessmentResult = showReassessmentCheck && newReportedWage
    ? checkWageReduction(parseFloat(newReportedWage), currentWage)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-1.5 h-6 bg-accent-green rounded-full" />
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-text-primary">
          Wage Tracker & 15% Rule
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section A: Wage Tracking (System Baseline) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel-lg p-6 md:p-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary mb-6 flex items-center">
            <DollarSign className="h-5 w-5 text-accent-green mr-2" />
            Recorded Wage in System
          </h3>

          {/* Formula Demo for 15% Reduction Threshold */}
          <FormulaDemo
            title="15% Reduction Threshold Calculation"
            formula="15% Reduction Threshold = Current Annual Wage × 0.85"
            buttonSequence={["9", "7", "0", "0", "0", "×", "0", ".", "8", "5", "="]}
            exampleValues={{ "Current Annual Wage": 97000, "Multiplier": 0.85 }}
            explanation="Multiply the current annual wage ($97,000) by 0.85 (which represents 85% or 100% minus 15%). This gives you the threshold amount ($82,450). If a parent's new reported wage falls below this threshold, the 15% rule is met and reassessment can proceed."
            result={97000 * 0.85}
            calculationSteps={[
              { step: "Enter Current Annual Wage", value: 97000 },
              { step: "Multiply by 0.85 (85%)", value: 0.85 },
              { step: "97000 × 0.85", value: 82450 },
              { step: "15% Reduction Threshold Result", value: 82450 }
            ]}
          />

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                Current Annual Wage
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-text-tertiary font-medium">$</span>
                </div>
                <input
                  type="number"
                  value={currentWage || ''}
                  onChange={(e) => onWageChange(parseFloat(e.target.value) || 0)}
                  className="input-field pl-8 w-full"
                  placeholder="97,000"
                  min="0"
                  step="1000"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-text-tertiary mt-1">
                Used as the baseline wage recorded in the assessment system.
              </p>
              {wageHistory.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-text-tertiary mt-1">
                  Last updated: {formatDate(wageHistory[wageHistory.length - 1]?.timestamp || new Date().toISOString())}
                </p>
              )}
            </div>

            {/* 15% Reduction Threshold */}
            <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-text-secondary">
                  15% Reduction Threshold
                </span>
                <AlertTriangle className="h-4 w-4 text-semantic-warning" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-text-primary font-mono mb-1">
                {formatCurrency(threshold)}
              </p>
              <p className="text-xs text-gray-500 dark:text-text-tertiary">
                Minimum wage level required to trigger a reassessment.
              </p>
            </div>
          </div>
          </div>

          {/* Section B: 15% Rule Calculator */}
          <div className="glass-panel-lg p-6 md:p-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary mb-6 flex items-center">
            <TrendingDown className="h-5 w-5 text-accent-orange mr-2" />
            15% Reassessment Check
          </h3>

          {/* Formula Demo for Percentage Drop Calculation */}
          <FormulaDemo
            title="15% Percentage Drop Calculation"
            formula="Percentage Drop = ((Current Wage - New Reported Wage) ÷ Current Wage) × 100"
            buttonSequence={["9", "7", "0", "0", "0", "-", "8", "2", "0", "0", "0", "=", "÷", "9", "7", "0", "0", "0", "=", "×", "1", "0", "0", "="]}
            exampleValues={{ "Current Wage": 97000, "New Reported Wage": 82000 }}
            explanation="Calculate the percentage drop: Subtract new reported wage ($82,000) from current wage ($97,000) = $15,000. Divide by current wage ($97,000) = 0.1546. Multiply by 100 = 15.46%. If result is 15% or greater, reassessment can proceed."
            result={((97000 - 82000) / 97000) * 100}
            resultFormat="percentage"
            calculationSteps={[
              { step: "Enter Current Wage", value: 97000 },
              { step: "Enter New Reported Wage", value: 82000 },
              { step: "Calculate Difference: 97000 - 82000", value: 15000 },
              { step: "Divide by Current Wage: 15000 ÷ 97000", value: 0.1546 },
              { step: "Multiply by 100: 0.1546 × 100", value: 15.46 },
              { step: "Percentage Drop Result", value: 15.46 }
            ]}
          />

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-2">
                New Reported Annual Wage
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-text-tertiary font-medium">$</span>
                </div>
                <input
                  type="number"
                  value={newReportedWage}
                  onChange={(e) => {
                    setNewReportedWage(e.target.value);
                    setShowReassessmentCheck(false);
                  }}
                  className="input-field pl-8 w-full"
                  placeholder="82,000"
                  min="0"
                  step="1000"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-text-tertiary mt-1">
                Wage the parent is reporting now.
              </p>
            </div>

            <button
              onClick={handleReassessmentCheck}
              className="w-full neumorphic-btn-primary py-2"
            >
              Check 15% Rule
            </button>

            {/* Results */}
            {reassessmentResult && (
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-dark-600">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-text-tertiary mb-1">Percentage Income Drop</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-text-primary">
                      {reassessmentResult.percentage.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-dark-800 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-text-tertiary mb-1">Is 15% Rule Met?</p>
                    <p className={`text-lg font-bold ${reassessmentResult.qualifies ? 'text-green-600 dark:text-accent-green' : 'text-red-600 dark:text-semantic-error'}`}>
                      {reassessmentResult.qualifies ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>

                {/* Outcome */}
                <div className={`p-4 rounded-lg border ${
                  reassessmentResult.qualifies
                    ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'
                    : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
                }`}>
                  <p className="text-sm font-semibold text-gray-900 dark:text-text-primary mb-1">
                    Outcome:
                  </p>
                  <p className={`text-sm ${reassessmentResult.qualifies ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
                    {reassessmentResult.qualifies
                      ? 'Reassessment can proceed. The wage drop meets or exceeds the 15% threshold.'
                      : `Reassessment must be denied. The wage drop is less than 15%. The parent must wait until the next financial year reporting period.`
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>

        {/* Calculator Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-panel-sm border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800/60 sticky top-24">
            <h4 className="text-sm font-semibold text-accent-teal uppercase tracking-wide mb-4 flex items-center">
              <div className="w-1.5 h-1.5 bg-accent-teal rounded-full mr-2" />
              Manual Calculator Reference
            </h4>
            <NeumorphicCalculator 
              onValueChange={() => {}}
              currentValue={0}
            />
          </div>
        </div>
      </div>

      {/* Training Note */}
      <div className="glass-panel-sm p-4 border border-blue-200 dark:border-info-500/30 bg-blue-50 dark:bg-info-500/10">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-info-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-info-500 mb-1">
              Training Rule: 15% Threshold
            </p>
            <p className="text-xs text-blue-800 dark:text-info-400 leading-relaxed">
              A parent cannot trigger a reassessment unless their income has dropped by more than 15% relative to the wage currently recorded in the system. If the drop is below 15%, the reassessment request must be declined and the parent must wait until the next financial year reporting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

