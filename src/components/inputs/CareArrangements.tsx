import React from 'react';
import { Calendar, HelpCircle } from 'lucide-react';
import { ChildSupportInputs } from '../../lib/calculator';
import FormulaDemo from '../FormulaDemo';

interface CareArrangementsProps {
  inputs: ChildSupportInputs;
  onChange: (field: keyof ChildSupportInputs, value: any) => void;
  onShowGuide?: () => void;
}

export function CareArrangements({ inputs, onChange, onShowGuide }: CareArrangementsProps) {
  return (
    <div className="glass-panel-section animate-slide-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent-teal/10 rounded-lg">
            <Calendar className="h-5 w-5 text-accent-teal" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
            Care Arrangements
          </h3>
        </div>
        {onShowGuide && (
          <button 
            onClick={onShowGuide}
            className="text-xs flex items-center text-accent-teal hover:text-accent-teal/80 transition-colors font-medium"
          >
            <HelpCircle className="h-3.5 w-3.5 mr-1.5" />
            Show Guide
          </button>
        )}
      </div>

      {/* Formula Demo for Care Percentage */}
      <FormulaDemo
        title="Step 4: Care Percentage Calculation"
        formula="Care Percentage = (Nights of Care ÷ 365) × 100"
        buttonSequence={["2", "9", "0", "÷", "3", "6", "5", "×", "1", "0", "0", "="]}
        exampleValues={{ "Parent A Nights": 290, "Days per Year": 365 }}
        explanation="To calculate Parent A's care percentage: Divide care nights (290) by 365 days, then multiply by 100. Result: 79.45%. Repeat for Parent B using their care nights. The sum of both percentages should equal 100%."
        result={Math.round((290 / 365) * 100 * 100) / 100}
        resultFormat="percentage"
        calculationSteps={[
          { step: "Care Nights", value: 290 },
          { step: "Divided by Days per Year", value: 365 },
          { step: "Result", value: Math.round((290 / 365) * 100 * 100) / 100 }
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary">
            Parent A Care Nights
          </label>
          <div className="relative">
            <input
              type="number"
              value={inputs.parentA_CareNights || ''}
              onChange={(e) => onChange('parentA_CareNights', parseInt(e.target.value) || 0)}
              className="input-field w-full transition-all duration-300 focus:ring-2 focus:ring-accent-teal/50"
              placeholder="290"
              min="0"
              max="365"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-xs text-gray-500 dark:text-text-tertiary">nights/yr</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary">
            Parent B Care Nights
          </label>
          <div className="relative">
            <input
              type="number"
              value={inputs.parentB_CareNights || ''}
              onChange={(e) => onChange('parentB_CareNights', parseInt(e.target.value) || 0)}
              className="input-field w-full transition-all duration-300 focus:ring-2 focus:ring-accent-teal/50"
              placeholder="75"
              min="0"
              max="365"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-xs text-gray-500 dark:text-text-tertiary">nights/yr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

