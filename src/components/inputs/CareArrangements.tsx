import React from 'react';
import { Calendar } from 'lucide-react';
import { ChildSupportInputs } from '../../lib/calculator';

interface CareArrangementsProps {
  inputs: ChildSupportInputs;
  onChange: (field: keyof ChildSupportInputs, value: any) => void;
}

export function CareArrangements({ inputs, onChange }: CareArrangementsProps) {
  return (
    <div className="glass-panel-section animate-slide-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center space-x-3 mb-5">
        <div className="p-2 bg-accent-teal/10 rounded-lg">
          <Calendar className="h-5 w-5 text-accent-teal" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
          Care Arrangements
        </h3>
      </div>
      
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

