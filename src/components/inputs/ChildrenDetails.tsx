import React from 'react';
import { Baby } from 'lucide-react';
import { ChildSupportInputs } from '../../lib/calculator';

interface ChildrenDetailsProps {
  inputs: ChildSupportInputs;
  onChange: (field: keyof ChildSupportInputs, value: any) => void;
}

export function ChildrenDetails({ inputs, onChange }: ChildrenDetailsProps) {
  return (
    <div className="glass-panel-section animate-slide-up" style={{ animationDelay: '100ms' }}>
      <div className="flex items-center space-x-3 mb-5">
        <div className="p-2 bg-accent-orange/10 rounded-lg">
          <Baby className="h-5 w-5 text-accent-orange" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
          Children Details
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary">
            Number of Children
          </label>
          <input
            type="number"
            value={inputs.numberOfChildren || ''}
            onChange={(e) => onChange('numberOfChildren', parseInt(e.target.value) || 0)}
            className="input-field w-full transition-all duration-300 focus:ring-2 focus:ring-accent-orange/50"
            placeholder="3"
            min="1"
            max="10"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary">
            Children's Ages
          </label>
          <input
            type="text"
            value={inputs.childrenAges.join(', ')}
            onChange={(e) => {
              const ages = e.target.value
                .split(',')
                .map(age => parseInt(age.trim()))
                .filter(age => !isNaN(age) && age >= 0);
              onChange('childrenAges', ages);
            }}
            className="input-field w-full transition-all duration-300 focus:ring-2 focus:ring-accent-orange/50"
            placeholder="9, 7, 5"
          />
          <p className="text-xs text-gray-500 dark:text-text-tertiary px-1">
            Comma-separated ages (e.g. 9, 7, 5)
          </p>
        </div>
      </div>
    </div>
  );
}

