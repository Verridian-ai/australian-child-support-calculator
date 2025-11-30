import React, { useState } from 'react';
import { TrendingDown, DollarSign, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatCurrency, checkWageReduction, calculateWageThreshold } from '../lib/calculator';

interface WageTrackerProps {
  currentWage: number;
  wageHistory: Array<{
    wage: number;
    timestamp: string;
  }>;
  onWageChange: (newWage: number) => void;
}

export default function WageTracker({ currentWage, wageHistory, onWageChange }: WageTrackerProps) {
  const [newWage, setNewWage] = useState<string>('');
  const [showInput, setShowInput] = useState(false);

  const handleWageUpdate = () => {
    const wageValue = parseFloat(newWage);
    if (wageValue && wageValue > 0) {
      onWageChange(wageValue);
      setNewWage('');
      setShowInput(false);
    }
  };

  const latestWage = wageHistory[wageHistory.length - 1]?.wage || currentWage;
  const threshold = calculateWageThreshold(latestWage);
  const wageCheck = wageHistory.length > 1 
    ? checkWageReduction(currentWage, wageHistory[wageHistory.length - 1].wage)
    : null;

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressPercentage = () => {
    if (wageCheck) {
      return Math.min(100, Math.max(0, wageCheck.percentage / 15 * 100));
    }
    return 0;
  };

  const getProgressColor = () => {
    if (!wageCheck) return 'bg-dark-400';
    if (wageCheck.qualifies) return 'bg-semantic-warning';
    if (wageCheck.percentage > 10) return 'bg-semantic-info';
    return 'bg-semantic-success';
  };

  return (
    <div className="space-y-6">
      {/* Current Wage Display */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <DollarSign className="h-5 w-5 text-primary-500" />
          <span className="text-sm font-medium text-gray-600 dark:text-text-secondary">Current Wage</span>
        </div>
        <p className="text-2xl font-bold text-primary-500 font-mono">
          {formatCurrency(currentWage)}
        </p>
        <p className="text-xs text-gray-500 dark:text-text-tertiary mt-1">
          Last updated: {formatDate(wageHistory[wageHistory.length - 1]?.timestamp || new Date().toISOString())}
        </p>
      </div>

      {/* 15% Threshold Alert */}
      <div className="p-4 bg-white dark:bg-dark-800 bg-opacity-50 rounded-lg border border-gray-200 dark:border-dark-400">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-semantic-warning" />
            <span className="text-sm font-semibold text-gray-700 dark:text-text-secondary">15% Reduction Threshold</span>
          </div>
          <AlertTriangle className="h-4 w-4 text-semantic-warning" />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-text-secondary">Threshold Amount:</span>
            <span className="text-sm font-mono text-gray-900 dark:text-text-primary">
              {formatCurrency(threshold)}
            </span>
          </div>
          
          {wageCheck && (
            <>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-text-secondary">Current Reduction:</span>
                <span className={`text-sm font-mono font-semibold ${
                  wageCheck.qualifies ? 'text-semantic-warning' : 'text-gray-900 dark:text-text-primary'
                }`}>
                  {wageCheck.percentage.toFixed(1)}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-text-tertiary">Progress to 15%</span>
                  <span className="text-gray-500 dark:text-text-tertiary">{getProgressPercentage().toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                    style={{ width: `${getProgressPercentage()}%` }}
                  />
                </div>
              </div>
              
              {/* Status */}
              <div className="flex items-center space-x-2 pt-2 border-t border-gray-200 dark:border-dark-600">
                {wageCheck.qualifies ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-semantic-warning" />
                    <span className="text-sm font-semibold text-semantic-warning">
                      Eligible for new estimate
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 rounded-full bg-gray-400 dark:bg-dark-500" />
                    <span className="text-sm text-gray-500 dark:text-text-tertiary">
                      Not yet eligible (need {Math.max(0, 15 - wageCheck.percentage).toFixed(1)}% more reduction)
                    </span>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Update Wage Button */}
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="w-full neumorphic-btn-secondary text-sm"
        >
          Update Current Wage
        </button>
      ) : (
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-text-tertiary">$</span>
            </div>
            <input
              type="number"
              value={newWage}
              onChange={(e) => setNewWage(e.target.value)}
              className="input-field pl-7 w-full"
              placeholder={currentWage.toString()}
              min="0"
              step="1000"
              autoFocus
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleWageUpdate}
              className="flex-1 neumorphic-btn-primary text-sm py-2"
            >
              Update
            </button>
            <button
              onClick={() => {
                setShowInput(false);
                setNewWage('');
              }}
              className="flex-1 neumorphic-btn-secondary text-sm py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Wage History */}
      {wageHistory.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wide mb-3">
            Wage History
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {wageHistory.slice().reverse().map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white dark:bg-dark-800 bg-opacity-30 rounded-md border border-gray-200 dark:border-dark-600"
              >
                <div>
                  <p className="text-sm font-mono text-gray-900 dark:text-text-primary">
                    {formatCurrency(entry.wage)}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Calendar className="h-3 w-3 text-gray-500 dark:text-text-tertiary" />
                    <span className="text-xs text-gray-500 dark:text-text-tertiary">
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                </div>
                {index === 0 && (
                  <div className="w-2 h-2 bg-semantic-success rounded-full" />
                )}
              </div>
            ))}
          </div>
          {wageHistory.length > 5 && (
            <p className="text-xs text-gray-500 dark:text-text-tertiary mt-2">
              Showing recent {Math.min(5, wageHistory.length)} entries
            </p>
          )}
        </div>
      )}

      {/* Help Text */}
      <div className="p-3 bg-blue-50 dark:bg-info-500 dark:bg-opacity-10 rounded-lg border border-blue-100 dark:border-info-500 dark:border-opacity-30">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-blue-500 dark:text-info-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-blue-600 dark:text-info-500 mb-1">15% Rule</p>
            <p className="text-xs text-gray-600 dark:text-text-secondary leading-relaxed">
              You can request a new child support estimate when your income decreases by at least 15%. 
              This threshold applies to the last year of income used in your assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}