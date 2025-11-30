import React from 'react';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import { ChildSupportCalculationStep, formatCurrency, formatPercentage } from '../../lib/calculator';
import { StepContent } from './StepContent';
import FormulaDemo from '../FormulaDemo';

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
          {/* Formula Demo with Integrated Calculator */}
          {getFormulaDemoProps(step) && (
            <div className="mb-6">
              <FormulaDemo {...getFormulaDemoProps(step)!} />
            </div>
          )}

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

function getFormulaDemoProps(step: ChildSupportCalculationStep): any | null {
  const { stepNumber, details, value, formula, description } = step;
  
  switch (stepNumber) {
    case 1: {
      const parentA_ATI = details?.parentA_ATI || 50000;
      const parentB_ATI = details?.parentB_ATI || 60000;
      const selfSupport = details?.selfSupportAmount || 29841;
      return {
        title: `Step ${stepNumber}: ${step.title}`,
        formula: formula,
        buttonSequence: [...parentA_ATI.toString().split(''), '-', ...selfSupport.toString().split(''), '='],
        exampleValues: { "Parent A ATI": parentA_ATI, "Self-Support Amount": selfSupport },
        explanation: `Calculate Child Support Income for each parent by subtracting the self-support amount ($29,841) from their Adjusted Taxable Income.`,
        result: parentA_ATI - selfSupport,
        calculateResult: (values: any) => (Number(values["Parent A ATI"]) || 0) - (Number(values["Self-Support Amount"]) || 0),
        generateButtonSequence: (values: any) => [...String(values["Parent A ATI"]).split(''), '-', ...String(values["Self-Support Amount"]).split(''), '='],
        generateCalculationSteps: (values: any, res: number) => [
          { step: "Enter Parent A ATI", value: Number(values["Parent A ATI"]) },
          { step: "Subtract Self-Support Amount", value: Number(values["Self-Support Amount"]) },
          { step: `${values["Parent A ATI"]} - ${values["Self-Support Amount"]}`, value: res }
        ]
      };
    }
    case 2: {
      const parentA_CSI = details?.parentA_CSI || 20159;
      const parentB_CSI = details?.parentB_CSI || 30159;
      return {
        title: `Step ${stepNumber}: ${step.title}`,
        formula: formula,
        buttonSequence: [...parentA_CSI.toString().split(''), '+', ...parentB_CSI.toString().split(''), '='],
        exampleValues: { "Parent A CSI": parentA_CSI, "Parent B CSI": parentB_CSI },
        explanation: `Add Parent A's and Parent B's Child Support Income together to get the Combined Child Support Income.`,
        result: parentA_CSI + parentB_CSI,
        calculateResult: (values: any) => (Number(values["Parent A CSI"]) || 0) + (Number(values["Parent B CSI"]) || 0),
        generateButtonSequence: (values: any) => [...String(values["Parent A CSI"]).split(''), '+', ...String(values["Parent B CSI"]).split(''), '='],
        generateCalculationSteps: (values: any, res: number) => [
          { step: "Enter Parent A CSI", value: Number(values["Parent A CSI"]) },
          { step: "Add Parent B CSI", value: Number(values["Parent B CSI"]) },
          { step: `${values["Parent A CSI"]} + ${values["Parent B CSI"]}`, value: res }
        ]
      };
    }
    case 3: {
      const parentA_CSI = details?.parentA_CSI || 20159;
      const combined = details?.combinedCSI || 50318;
      const percentage = combined > 0 ? (parentA_CSI / combined) * 100 : 0;
      return {
        title: `Step ${stepNumber}: ${step.title}`,
        formula: formula,
        buttonSequence: [...parentA_CSI.toString().split(''), '÷', ...combined.toString().split(''), '×', '1', '0', '0', '='],
        exampleValues: { "Parent A CSI": parentA_CSI, "Combined CSI": combined },
        explanation: `Divide Parent A's Child Support Income by the Combined Child Support Income, then multiply by 100 to get the Income Percentage.`,
        result: percentage,
        resultFormat: 'percentage' as const,
        calculateResult: (values: any) => {
          const a = Number(values["Parent A CSI"]) || 0;
          const combined = Number(values["Combined CSI"]) || 1;
          return (a / combined) * 100;
        },
        generateButtonSequence: (values: any) => [...String(values["Parent A CSI"]).split(''), '÷', ...String(values["Combined CSI"]).split(''), '×', '1', '0', '0', '='],
        generateCalculationSteps: (values: any, res: number) => {
          const a = Number(values["Parent A CSI"]) || 0;
          const combined = Number(values["Combined CSI"]) || 1;
          const ratio = a / combined;
          return [
            { step: "Enter Parent A CSI", value: a },
            { step: "Divide by Combined CSI", value: combined },
            { step: `${a} ÷ ${combined}`, value: ratio },
            { step: "Multiply by 100", value: 100 },
            { step: `${ratio.toFixed(4)} × 100`, value: res }
          ];
        }
      };
    }
    case 4: {
      const nights = details?.parentA_CareNights || 290;
      return {
        title: `Step ${stepNumber}: ${step.title}`,
        formula: formula,
        buttonSequence: [...nights.toString().split(''), '÷', '3', '6', '5', '×', '1', '0', '0', '='],
        exampleValues: { "Parent A Nights": nights, "Days per Year": 365 },
        explanation: `Divide care nights by 365 days, then multiply by 100 to get the Care Percentage.`,
        result: Math.round((nights / 365) * 100 * 100) / 100,
        resultFormat: 'percentage' as const,
        calculateResult: (values: any) => {
          const nights = Number(values["Parent A Nights"]) || 0;
          const days = Number(values["Days per Year"]) || 365;
          return Math.round((nights / days) * 100 * 100) / 100;
        },
        generateButtonSequence: (values: any) => [...String(values["Parent A Nights"]).split(''), '÷', '3', '6', '5', '×', '1', '0', '0', '='],
        generateCalculationSteps: (values: any, res: number) => {
          const nights = Number(values["Parent A Nights"]) || 0;
          const days = Number(values["Days per Year"]) || 365;
          const ratio = nights / days;
          return [
            { step: "Enter Care Nights", value: nights },
            { step: "Divide by Days per Year", value: days },
            { step: `${nights} ÷ ${days}`, value: ratio },
            { step: "Multiply by 100", value: 100 },
            { step: `${ratio.toFixed(4)} × 100`, value: res }
          ];
        }
      };
    }
    case 5:
    case 6:
    case 7:
    case 8:
      // These steps are more complex, return basic demo
      return {
        title: `Step ${stepNumber}: ${step.title}`,
        formula: formula,
        buttonSequence: ['1', '0', '0', '-', '5', '0', '='],
        exampleValues: { "Value": 100, "Subtract": 50 },
        explanation: description || `This step uses the values calculated in previous steps. Refer to the detailed breakdown above.`,
        result: value,
        calculateResult: () => value,
        generateButtonSequence: () => ['1', '0', '0', '-', '5', '0', '='],
        generateCalculationSteps: () => [
          { step: "Calculation Result", value: value }
        ]
      };
    default:
      return null;
  }
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

