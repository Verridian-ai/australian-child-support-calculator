import React, { useState } from 'react';
import { Plus, Minus, X, Divide, Equal, Calculator, Delete } from 'lucide-react';

interface NeumorphicCalculatorProps {
  onValueChange: (value: number) => void;
  currentValue?: number;
}

export default function NeumorphicCalculator({ onValueChange, currentValue = 0 }: NeumorphicCalculatorProps) {
  const [display, setDisplay] = useState(currentValue.toString());
  const [operator, setOperator] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setPreviousValue(parseFloat(display));
    setDisplay('0');
    setOperator(op);
  };

  const handleEquals = () => {
    if (previousValue !== null && operator) {
      const current = parseFloat(display);
      let result = 0;

      switch (operator) {
        case '+':
          result = previousValue + current;
          break;
        case '-':
          result = previousValue - current;
          break;
        case '×':
          result = previousValue * current;
          break;
        case '÷':
          result = current !== 0 ? previousValue / current : 0;
          break;
        default:
          return;
      }

      setDisplay(result.toString());
      setOperator(null);
      setPreviousValue(null);
      
      // Notify parent component
      onValueChange(result);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setOperator(null);
    setPreviousValue(null);
  };

  const renderOperatorButton = (icon: React.ReactNode, label: string, onClick: () => void) => (
    <button
      onClick={onClick}
      className="neumorphic-btn-operator flex flex-col items-center justify-center aspect-square text-sm"
    >
      {icon}
      <span className="text-xs mt-1 font-semibold">{label}</span>
    </button>
  );

  const renderNumberButton = (num: string, onClick: () => void, className: string = '') => (
    <button
      onClick={onClick}
      className={`neumorphic-btn flex items-center justify-center text-xl font-mono ${className}`}
    >
      {num}
    </button>
  );

  return (
    <div className="glass-panel-sm bg-dark-800 bg-opacity-80 border border-dark-600">
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Calculator className="h-5 w-5 text-accent-teal" />
          <h3 className="text-sm font-semibold text-accent-teal uppercase tracking-wide">
            Calculator Interface
          </h3>
        </div>
        
        {/* Display */}
        <div className="neumorphic-btn bg-dark-700 h-16 flex items-center justify-end px-6 mb-4">
          <span className="text-2xl font-mono text-text-primary">
            {display}
          </span>
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        {renderOperatorButton(<Delete className="h-5 w-5" />, 'Clear', handleClear)}
        {renderOperatorButton(<Divide className="h-5 w-5" />, '÷', () => handleOperator('÷'))}
        {renderOperatorButton(<X className="h-5 w-5" />, '×', () => handleOperator('×'))}
        {renderOperatorButton(<Minus className="h-5 w-5" />, '-', () => handleOperator('-'))}

        {/* Row 2 */}
        {renderNumberButton('7', () => handleNumber('7'))}
        {renderNumberButton('8', () => handleNumber('8'))}
        {renderNumberButton('9', () => handleNumber('9'))}
        {renderOperatorButton(<Plus className="h-5 w-5" />, '+', () => handleOperator('+'))}

        {/* Row 3 */}
        {renderNumberButton('4', () => handleNumber('4'))}
        {renderNumberButton('5', () => handleNumber('5'))}
        {renderNumberButton('6', () => handleNumber('6'))}
        {renderNumberButton('.', () => handleNumber('.'), 'row-span-2')}

        {/* Row 4 */}
        {renderNumberButton('1', () => handleNumber('1'))}
        {renderNumberButton('2', () => handleNumber('2'))}
        {renderNumberButton('3', () => handleNumber('3'))}

        {/* Row 5 */}
        {renderNumberButton('0', () => handleNumber('0'), 'col-span-2')}
        {renderOperatorButton(<Equal className="h-5 w-5" />, '=', handleEquals)}
      </div>

      {/* Helper Text */}
      <div className="mt-4 p-3 bg-dark-900 bg-opacity-50 rounded-lg border border-dark-700">
        <p className="text-xs text-text-tertiary leading-relaxed">
          <span className="text-accent-teal font-medium">Neumorphic Design:</span> Buttons appear pressed into the surface with soft shadows and highlights, creating a tactile 3D experience.
        </p>
      </div>
    </div>
  );
}