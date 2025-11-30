import React from 'react';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import { ChildSupportCalculationStep, formatCurrency, formatPercentage } from '../../lib/calculator';
import { StepContent } from './StepContent';

interface StepCardProps {
  step: ChildSupportCalculationStep;
  isExpanded: boolean;
  onToggle: () => void;
}

export function StepCard({ step, isExpanded, onToggle }: StepCardProps) {
  const getStepColor = (stepNumber: number) => {
    if (stepNumber === 8) return 'text-primary-500';
    return 'text-dark-200';
  };

  return (
    <div className={`step-card ${isExpanded ? 'step-card-expanded' : ''} group`}>
      {/* Step Header */}
      <div
        className="flex items-center justify-between cursor-pointer py-2"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transition-transform duration-300
              ${step.stepNumber === 8 ? 'bg-gradient-to-br from-accent-green to-accent-teal scale-110' : 'bg-gray-600 dark:bg-dark-600 group-hover:bg-gray-500 dark:group-hover:bg-dark-500'}
            `}>
              {step.stepNumber}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary group-hover:text-accent-teal transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-text-tertiary hidden sm:block">
                {step.description}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className={`text-xl font-mono font-bold ${getStepColor(step.stepNumber)}`}>
              {formatCurrency(step.value)}
            </div>
            {step.stepNumber < 8 && (
              <div className="text-sm text-gray-500 dark:text-text-tertiary">
                {step.stepNumber === 3 || step.stepNumber === 5 || step.stepNumber === 6
                  ? formatPercentage(Math.abs(step.value))
                  : formatCurrency(step.value)
                }
              </div>
            )}
          </div>
          <div className="text-gray-400 dark:text-text-secondary transition-transform duration-300">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Description (only visible when collapsed on mobile) */}
      <div className="sm:hidden text-xs text-gray-500 dark:text-text-tertiary mt-2 pl-11">
        {!isExpanded && step.description}
      </div>

      {/* Step Content */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-600 animate-fade-in">
          {/* Formula Display */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Info className="h-4 w-4 text-info-500" />
              <span className="text-sm font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wide">
                Formula
              </span>
            </div>
            <div className="text-formula bg-gray-50 dark:bg-dark-800/80 border border-gray-200 dark:border-dark-700 p-4 rounded-lg shadow-inner">
              {step.formula}
            </div>
          </div>

          {/* Detailed Breakdown */}
          <StepContent step={step} />

          {/* Legal Reference */}
          <div className="mt-6 p-4 bg-gray-100 dark:bg-dark-800/40 rounded-lg border border-gray-200 dark:border-dark-600/50 hover:bg-gray-200 dark:hover:bg-dark-800/60 transition-colors">
            <div className="flex items-start space-x-3">
              <Info className="h-4 w-4 text-gray-500 dark:text-text-tertiary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-700 dark:text-text-secondary font-bold uppercase tracking-wider mb-1">
                  Legal Reference
                </p>
                <a 
                  href={getLegalReference(step.stepNumber).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-500 dark:text-text-tertiary hover:text-accent-teal dark:hover:text-accent-teal underline decoration-primary-500/30 dark:decoration-text-tertiary/30 underline-offset-2 transition-colors block leading-relaxed"
                >
                  {getLegalReference(step.stepNumber).text}
                  <span className="inline-block ml-1 text-gray-400 dark:text-gray-600">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getLegalReference(stepNumber: number): { text: string, url: string } {
  const baseUrl = "https://www5.austlii.edu.au/au/legis/cth/consol_act/csaa1989294";
  
  switch (stepNumber) {
    case 1: return {
      text: "CSA Act s41 - Working out parent's child support income",
      url: `${baseUrl}/s41.html`
    };
    case 2: return {
      text: "CSA Act s42 - Working out parents' combined child support income",
      url: `${baseUrl}/s42.html`
    };
    case 3: return {
      text: "CSA Act s55B - Working out income percentages",
      url: `${baseUrl}/s55b.html`
    };
    case 4: return {
      text: "CSA Act s48 - Outline relevant to care determination",
      url: `${baseUrl}/s48.html`
    };
    case 5: return {
      text: "CSA Act s55C - Working out cost percentages",
      url: `${baseUrl}/s55c.html`
    };
    case 6: return {
      text: "CSA Act s55D - Working out child support percentages",
      url: `${baseUrl}/s55d.html`
    };
    case 7: return {
      text: "CSA Act ss55G/H - Working out the costs of the children",
      url: `${baseUrl}/s55g.html`
    };
    case 8: return {
      text: "CSA Act s55D × COTC; offset if both payable",
      url: `${baseUrl}/s55d.html`
    };
    default: return {
      text: "Child Support (Assessment) Act 1989",
      url: `${baseUrl}/`
    };
  }
}

