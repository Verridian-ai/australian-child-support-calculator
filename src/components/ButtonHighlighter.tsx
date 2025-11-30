import React from 'react';
import { Plus, Minus, X, Divide, Equal, Calculator, Delete } from 'lucide-react';

interface ButtonHighlighterProps {
  highlightedButtons: string[];
  onButtonClick: (button: string) => void;
  currentDisplay: string;
}

export default function ButtonHighlighter({ 
  highlightedButtons, 
  onButtonClick, 
  currentDisplay 
}: ButtonHighlighterProps) {
  
  const isHighlighted = (button: string) => {
    return highlightedButtons.includes(button);
  };

  const renderButton = (
    content: React.ReactNode, 
    buttonValue: string, 
    className: string = '',
    isOperator: boolean = false
  ) => (
    <button
      onClick={() => onButtonClick(buttonValue)}
      className={`
        ${isOperator ? 'neumorphic-btn-operator' : 'neumorphic-btn'}
        transition-all duration-300
        ${isHighlighted(buttonValue) 
          ? isOperator 
            ? 'bg-accent-orange text-white shadow-neumorphic-operator animate-pulse border-2 border-accent-orange' 
            : 'bg-accent-teal text-white shadow-neumorphic-accent animate-pulse border-2 border-accent-teal'
          : ''
        }
        ${className}
      `}
    >
      {content}
    </button>
  );

  return (
    <div className="glass-panel-sm bg-dark-800 bg-opacity-80 border border-dark-600">
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Calculator className="h-5 w-5 text-accent-teal" />
          <h3 className="text-sm font-semibold text-accent-teal uppercase tracking-wide">
            Enhanced Calculator
          </h3>
        </div>
        
        {/* Display */}
        <div className={`neumorphic-btn h-16 flex items-center justify-end px-6 mb-4 transition-all duration-300 ${
          isHighlighted('DISPLAY') ? 'bg-accent-orange text-white shadow-neumorphic-operator animate-pulse' : ''
        }`}>
          <span className="text-2xl font-mono text-text-primary">
            {currentDisplay}
          </span>
        </div>
        
        {/* Highlighted Buttons Info */}
        {highlightedButtons.length > 0 && (
          <div className="p-3 bg-accent-teal bg-opacity-10 rounded-lg border border-accent-teal border-opacity-30 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent-orange rounded-full animate-pulse" />
              <span className="text-sm font-medium text-accent-teal">
                Currently Highlighting: {highlightedButtons.join(' → ')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        {renderButton(
          <>
            <Delete className="h-5 w-5" />
            <span className="text-xs mt-1 font-semibold">Clear</span>
          </>, 
          'C', 
          '', 
          true
        )}
        {renderButton(
          <>
            <Divide className="h-5 w-5" />
            <span className="text-xs mt-1 font-semibold">÷</span>
          </>, 
          '÷', 
          '', 
          true
        )}
        {renderButton(
          <>
            <X className="h-5 w-5" />
            <span className="text-xs mt-1 font-semibold">×</span>
          </>, 
          '×', 
          '', 
          true
        )}
        {renderButton(
          <>
            <Minus className="h-5 w-5" />
            <span className="text-xs mt-1 font-semibold">-</span>
          </>, 
          '-', 
          '', 
          true
        )}

        {/* Row 2 */}
        {renderButton('7', '7')}
        {renderButton('8', '8')}
        {renderButton('9', '9')}
        {renderButton(
          <>
            <Plus className="h-5 w-5" />
            <span className="text-xs mt-1 font-semibold">+</span>
          </>, 
          '+', 
          '', 
          true
        )}

        {/* Row 3 */}
        {renderButton('4', '4')}
        {renderButton('5', '5')}
        {renderButton('6', '6')}
        {renderButton('.', '.', 'row-span-2')}

        {/* Row 4 */}
        {renderButton('1', '1')}
        {renderButton('2', '2')}
        {renderButton('3', '3')}

        {/* Row 5 */}
        {renderButton('0', '0', 'col-span-2')}
        {renderButton(
          <>
            <Equal className="h-5 w-5" />
            <span className="text-xs mt-1 font-semibold">=</span>
          </>, 
          '=', 
          '', 
          true
        )}
      </div>

      {/* Button Interaction Info */}
      <div className="mt-4 p-3 bg-dark-900 bg-opacity-50 rounded-lg border border-dark-700">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent-orange rounded-full animate-pulse" />
            <span className="text-xs text-accent-orange font-medium">
              Orange highlights: Current step buttons
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent-teal rounded-full animate-pulse" />
            <span className="text-xs text-accent-teal font-medium">
              Teal highlights: Input field buttons
            </span>
          </div>
          <p className="text-xs text-text-tertiary mt-2">
            Click the highlighted buttons to follow the guided calculation sequence.
          </p>
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={() => onButtonClick('CALCULATE')}
        className={`
          w-full mt-4 neumorphic-btn-accent flex items-center justify-center space-x-2
          transition-all duration-300
          ${isHighlighted('CALCULATE') 
            ? 'bg-accent-orange text-white shadow-neumorphic-operator animate-pulse border-2 border-accent-orange' 
            : ''
          }
        `}
      >
        <Calculator className="h-5 w-5" />
        <span>Calculate Final Result</span>
      </button>
    </div>
  );
}