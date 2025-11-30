import React, { useEffect } from 'react';
import { Baby, HelpCircle } from 'lucide-react';
import { ChildSupportInputs } from '../../lib/calculator';

interface ChildrenDetailsProps {
  inputs: ChildSupportInputs;
  onChange: (field: keyof ChildSupportInputs, value: any) => void;
  onShowGuide?: () => void;
}

const getDefaultChildName = (index: number): string => {
  const names = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  return `Child ${names[index] || (index + 1).toString()}`;
};

export function ChildrenDetails({ inputs, onChange, onShowGuide }: ChildrenDetailsProps) {
  // Sync child names array with numberOfChildren
  useEffect(() => {
    const currentNames = inputs.childNames || [];
    const numChildren = inputs.numberOfChildren || 0;
    
    if (numChildren > currentNames.length) {
      // Add default names for new children
      const newNames = [...currentNames];
      for (let i = currentNames.length; i < numChildren; i++) {
        newNames.push(getDefaultChildName(i));
      }
      onChange('childNames', newNames);
    } else if (numChildren < currentNames.length) {
      // Remove extra names
      onChange('childNames', currentNames.slice(0, numChildren));
    }
  }, [inputs.numberOfChildren]);

  const handleChildNameChange = (index: number, name: string) => {
    const currentNames = inputs.childNames || [];
    const newNames = [...currentNames];
    newNames[index] = name || getDefaultChildName(index);
    onChange('childNames', newNames);
  };

  return (
    <div className="glass-panel-section animate-slide-up" style={{ animationDelay: '100ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent-orange/10 rounded-lg">
            <Baby className="h-5 w-5 text-accent-orange" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
            Children Details
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
      
      <div className="space-y-6">
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

        {/* Child Names Section */}
        {inputs.numberOfChildren > 0 && (
          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-dark-600">
            <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary">
              Child Names (Optional)
            </label>
            <p className="text-xs text-gray-500 dark:text-text-tertiary mb-3">
              Optional. Used to personalise summaries (names are not required for the core calculation).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: inputs.numberOfChildren }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-xs font-medium text-gray-600 dark:text-text-tertiary">
                    Child {index + 1} Name
                  </label>
                  <input
                    type="text"
                    value={inputs.childNames?.[index] || getDefaultChildName(index)}
                    onChange={(e) => handleChildNameChange(index, e.target.value)}
                    className="input-field w-full transition-all duration-300 focus:ring-2 focus:ring-accent-orange/50"
                    placeholder={getDefaultChildName(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
