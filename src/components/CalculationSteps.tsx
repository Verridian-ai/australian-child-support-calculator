import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Calculator, Info } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../lib/calculator';
import type { ChildSupportCalculationStep } from '../lib/calculator';

interface CalculationStepsProps {
  steps: ChildSupportCalculationStep[];
}

export default function CalculationSteps({ steps }: CalculationStepsProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(
    new Set([1, 2, 3, 4, 5, 6, 7, 8]) // All expanded by default
  );

  const toggleStep = (stepNumber: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepNumber)) {
      newExpanded.delete(stepNumber);
    } else {
      newExpanded.add(stepNumber);
    }
    setExpandedSteps(newExpanded);
  };

  const renderStepDetails = (step: ChildSupportCalculationStep) => {
    switch (step.stepNumber) {
      case 1:
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-dark-800 rounded-md">
                <p className="text-sm text-text-secondary">Parent A</p>
                <p className="text-lg font-mono text-text-primary">
                  ${step.details?.parentA_ATI?.toLocaleString()} - ${step.details?.selfSupportAmount?.toLocaleString()} = ${step.details?.parentA_CSI?.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-dark-800 rounded-md">
                <p className="text-sm text-text-secondary">Parent B</p>
                <p className="text-lg font-mono text-text-primary">
                  ${step.details?.parentB_ATI?.toLocaleString()} - ${step.details?.selfSupportAmount?.toLocaleString()} = ${step.details?.parentB_CSI?.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-xs text-text-tertiary">
              Self-support amount ($29,841) is deducted from each parent's ATI to determine their capacity to contribute to child support.
            </p>
          </div>
        );

      case 2:
        return (
          <div className="space-y-3">
            <div className="p-3 bg-dark-800 rounded-md">
              <p className="text-lg font-mono text-text-primary text-center">
                ${step.details?.parentA_CSI?.toLocaleString()} + ${step.details?.parentB_CSI?.toLocaleString()} = ${formatCurrency(step.value)}
              </p>
            </div>
            <p className="text-xs text-text-tertiary">
              This combined amount represents the total financial capacity of both parents to contribute to child-related costs.
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-dark-800 rounded-md text-center">
                <p className="text-sm text-text-secondary">Parent A Income Share</p>
                <p className="text-xl font-bold text-primary-500">
                  {formatPercentage(step.details?.parentA_Percentage || 0)}
                </p>
              </div>
              <div className="p-3 bg-dark-800 rounded-md text-center">
                <p className="text-sm text-text-secondary">Parent B Income Share</p>
                <p className="text-xl font-bold text-semantic-warning">
                  {formatPercentage(step.details?.parentB_Percentage || 0)}
                </p>
              </div>
            </div>
            <p className="text-xs text-text-tertiary">
              Each parent's percentage of combined income determines their capacity to fund child-related costs.
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-dark-800 rounded-md">
                <p className="text-sm text-text-secondary">Parent A Care</p>
                <p className="text-lg font-mono text-text-primary">
                  {step.details?.parentA_Nights} nights / 365 days
                </p>
                <p className="text-xl font-bold text-primary-500">
                  {formatPercentage(step.details?.parentA_Percentage || 0)}
                </p>
              </div>
              <div className="p-3 bg-dark-800 rounded-md">
                <p className="text-sm text-text-secondary">Parent B Care</p>
                <p className="text-lg font-mono text-text-primary">
                  {step.details?.parentB_Nights} nights / 365 days
                </p>
                <p className="text-xl font-bold text-semantic-warning">
                  {formatPercentage(step.details?.parentB_Percentage || 0)}
                </p>
              </div>
            </div>
            <p className="text-xs text-text-tertiary">
              Care percentage is calculated based on annual nights of care. Higher care percentage means more direct involvement in child-rearing.
            </p>
          </div>
        );

      case 5:
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-dark-800 rounded-md text-center">
                <p className="text-sm text-text-secondary">Parent A Cost Share</p>
                <p className="text-xl font-bold text-primary-500">
                  {formatPercentage(step.details?.parentA_Percentage || 0)}
                </p>
              </div>
              <div className="p-3 bg-dark-800 rounded-md text-center">
                <p className="text-sm text-text-secondary">Parent B Cost Share</p>
                <p className="text-xl font-bold text-semantic-warning">
                  {formatPercentage(step.details?.parentB_Percentage || 0)}
                </p>
              </div>
            </div>
            <p className="text-xs text-text-tertiary">
              Cost percentage translates care time into financial responsibility for child-related expenses.
            </p>
          </div>
        );

      case 6:
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-dark-800 rounded-md">
                <p className="text-sm text-text-secondary">Parent A</p>
                <p className="text-lg font-mono text-text-primary">
                  {formatPercentage(step.details?.parentA_Percentage || 0)}
                </p>
                <p className="text-xs text-text-tertiary">
                  {(step.details?.parentA_Percentage || 0) > 0 ? 'Pays' : 'Receives'}
                </p>
              </div>
              <div className="p-3 bg-dark-800 rounded-md">
                <p className="text-sm text-text-secondary">Parent B</p>
                <p className="text-lg font-mono text-text-primary">
                  {formatPercentage(step.details?.parentB_Percentage || 0)}
                </p>
                <p className="text-xs text-text-tertiary">
                  {(step.details?.parentB_Percentage || 0) > 0 ? 'Pays' : 'Receives'}
                </p>
              </div>
            </div>
            <p className="text-xs text-text-tertiary">
              Child support percentage is calculated by subtracting cost percentage from income percentage. Positive values indicate payment obligation.
            </p>
          </div>
        );

      case 7:
        return (
          <div className="space-y-3">
            <div className="p-4 bg-dark-800 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Base Cost:</span>
                <span className="font-mono text-text-primary">
                  {formatCurrency(step.details?.baseCost || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Income Above Threshold:</span>
                <span className="font-mono text-text-primary">
                  {formatCurrency(step.details?.incomeAboveThreshold || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Additional Amount (26%):</span>
                <span className="font-mono text-text-primary">
                  {formatCurrency(step.details?.additionalAmount || 0)}
                </span>
              </div>
              <div className="border-t border-dark-400 pt-2">
                <div className="flex justify-between">
                  <span className="text-text-primary font-semibold">Total COTC:</span>
                  <span className="font-mono text-lg font-bold text-primary-500">
                    {formatCurrency(step.value)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Per Child:</span>
                  <span className="font-mono text-text-primary">
                    {formatCurrency(step.details?.perChildCOTC || 0)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-text-tertiary">
              COTC (Costs of the Children) includes a base amount plus 26% of income above the $44,762 threshold.
            </p>
          </div>
        );

      case 8:
        return (
          <div className="space-y-3">
            <div className="p-4 bg-dark-800 rounded-md">
              <div className="text-center">
                <p className="text-sm text-text-secondary mb-2">Final Annual Amount</p>
                <p className="text-4xl font-bold text-primary-500 font-mono">
                  {formatCurrency(step.value)}
                </p>
                <p className="text-sm text-text-tertiary mt-1">
                  {step.details?.offsetApplied ? 'Offset applied between parents' : 'Single payment obligation'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-dark-800 rounded-md">
                <p className="text-sm text-text-secondary">Parent A Amount</p>
                <p className="text-lg font-mono text-text-primary">
                  {formatCurrency(step.details?.parentA_Amount || 0)}
                </p>
              </div>
              <div className="p-3 bg-dark-800 rounded-md">
                <p className="text-sm text-text-secondary">Parent B Amount</p>
                <p className="text-lg font-mono text-text-primary">
                  {formatCurrency(step.details?.parentB_Amount || 0)}
                </p>
              </div>
            </div>
            <p className="text-xs text-text-tertiary">
              Final amount calculated by applying child support percentage to COTC. Offset rule applies when both parents have payment obligations.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 8:
        return <Calculator className="h-4 w-4" />;
      default:
        return <div className="w-2 h-2 bg-primary-500 rounded-full" />;
    }
  };

  const getStepColor = (stepNumber: number) => {
    if (stepNumber === 8) return 'text-primary-500';
    return 'text-dark-200';
  };

  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div
          key={step.stepNumber}
          className={`step-card ${expandedSteps.has(step.stepNumber) ? 'step-card-expanded' : ''}`}
        >
          {/* Step Header */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleStep(step.stepNumber)}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.stepNumber}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className={`text-xl font-mono font-bold ${getStepColor(step.stepNumber)}`}>
                  {step.stepNumber === 8 ? formatCurrency(step.value) : formatCurrency(step.value)}
                </div>
                {step.stepNumber < 8 && (
                  <div className="text-sm text-text-tertiary">
                    {step.stepNumber === 3 || step.stepNumber === 5 || step.stepNumber === 6
                      ? formatPercentage(Math.abs(step.value))
                      : formatCurrency(step.value)
                    }
                  </div>
                )}
              </div>
              {expandedSteps.has(step.stepNumber) ? (
                <ChevronDown className="h-5 w-5 text-text-secondary" />
              ) : (
                <ChevronRight className="h-5 w-5 text-text-secondary" />
              )}
            </div>
          </div>

          {/* Step Content */}
          {expandedSteps.has(step.stepNumber) && (
            <div className="mt-6 pt-6 border-t border-dark-400 animate-fade-in">
              {/* Formula Display */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Info className="h-4 w-4 text-info-500" />
                  <span className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
                    Formula
                  </span>
                </div>
                <div className="text-formula">
                  {step.formula}
                </div>
              </div>

              {/* Detailed Breakdown */}
              {renderStepDetails(step)}

              {/* Additional Info for certain steps */}
              <div className="mt-4 p-3 bg-dark-600 bg-opacity-50 rounded-md border border-dark-500">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-info-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-text-secondary font-medium mb-1">
                      Legal Reference
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {step.stepNumber === 1 && "CSA Act s41 - Working out parent's child support income"}
                      {step.stepNumber === 2 && "CSA Act s42 - Working out parents' combined child support income"}
                      {step.stepNumber === 3 && "CSA Act s55B - Working out income percentages"}
                      {step.stepNumber === 4 && "CSA Act s48 - Outline relevant to care determination"}
                      {step.stepNumber === 5 && "CSA Act s55C - Working out cost percentages"}
                      {step.stepNumber === 6 && "CSA Act s55D - Working out child support percentages"}
                      {step.stepNumber === 7 && "CSA Act ss55G/H - Working out the costs of the children"}
                      {step.stepNumber === 8 && "CSA Act s55D × COTC; offset if both payable"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}