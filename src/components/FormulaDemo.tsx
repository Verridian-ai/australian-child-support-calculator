import React, { useState, useRef, useEffect } from 'react';
import { Calculator, Play, RotateCcw, Keyboard, Zap, Info } from 'lucide-react';
import NeumorphicCalculator, { CalculatorRef } from './NeumorphicCalculator';

interface FormulaDemoProps {
  title: string;
  formula: string;
  buttonSequence: string[];
  exampleValues: { [key: string]: string | number };
  explanation: string;
  result?: number;
  resultFormat?: 'currency' | 'percentage' | 'number';
  calculationSteps?: Array<{ step: string; value: string | number }>;
}

export default function FormulaDemo({
  title,
  formula,
  buttonSequence,
  exampleValues,
  explanation,
  result,
  resultFormat = 'currency',
  calculationSteps = []
}: FormulaDemoProps) {
  
  // Group consecutive digits for better display
  const getGroupedSequence = () => {
    const grouped: Array<{ value: string; indices: number[] }> = [];
    let currentGroup: string[] = [];
    let currentIndices: number[] = [];
    
    buttonSequence.forEach((button, index) => {
      const isDigit = !isNaN(Number(button)) && button !== '.';
      
      if (isDigit) {
        currentGroup.push(button);
        currentIndices.push(index);
      } else {
        if (currentGroup.length > 0) {
          grouped.push({ value: currentGroup.join(''), indices: currentIndices });
          currentGroup = [];
          currentIndices = [];
        }
        grouped.push({ value: button, indices: [index] });
      }
    });
    
    if (currentGroup.length > 0) {
      grouped.push({ value: currentGroup.join(''), indices: currentIndices });
    }
    
    return grouped;
  };
  
  const groupedSequence = getGroupedSequence();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentExplanation, setCurrentExplanation] = useState<string | null>(null);
  const [highlightedButton, setHighlightedButton] = useState<string | null>(null);
  const [showAutoCalculate, setShowAutoCalculate] = useState(false);
  const [currentCalculationStep, setCurrentCalculationStep] = useState(0);
  const [autoCalculateSteps, setAutoCalculateSteps] = useState<Array<{ step: string; value: string | number }>>([]);
  const [calculatorDisplayValue, setCalculatorDisplayValue] = useState<string>('0');
  const calculatorRef = useRef<CalculatorRef>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(t => clearTimeout(t));
    };
  }, []);

  const clearTimeouts = () => {
    timeoutRefs.current.forEach(t => clearTimeout(t));
    timeoutRefs.current = [];
  };

  // Generate explanations for each step
  const getStepExplanation = (button: string, index: number, allButtons: string[]): string => {
    const prevButton = index > 0 ? allButtons[index - 1] : null;
    
    if (button === '=') {
      return 'Press equals to calculate the result.';
    } else if (['+', '-', '×', '÷'].includes(button)) {
      return `Press ${button} operator to continue the calculation.`;
    } else if (!isNaN(Number(button))) {
      if (prevButton && ['+', '-', '×', '÷', '='].includes(prevButton)) {
        return `Enter the next number: ${button}`;
      }
      return `Enter digit: ${button}`;
    }
    return `Press ${button}`;
  };

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setCurrentExplanation(null);
    setHighlightedButton(null);
    setCurrentCalculationStep(0);
    clearTimeouts();
    
    // Clear calculator first
    if (calculatorRef.current) {
      calculatorRef.current.clear();
    }

    // Wait a moment, then start pressing buttons
    const initialDelay = setTimeout(() => {
      let timeout = 0;
      
      buttonSequence.forEach((button, index) => {
        const t = setTimeout(() => {
          setCurrentStep(index + 1);
          setHighlightedButton(button);
          setCurrentExplanation(getStepExplanation(button, index, buttonSequence));
          
          // Press button on calculator
          if (calculatorRef.current) {
            calculatorRef.current.pressButton(button);
            // Update display value after a short delay
            setTimeout(() => {
              const display = calculatorRef.current?.getDisplay() || '0';
              setCalculatorDisplayValue(display);
            }, 100);
          }
          
          // Clear highlight after a moment
          setTimeout(() => {
            setHighlightedButton(null);
            setCurrentExplanation(null);
          }, 600);
          
          if (index === buttonSequence.length - 1) {
            // Pause at the end before resetting
            const endDelay = setTimeout(() => {
              setIsPlaying(false);
              setCurrentExplanation('Calculation complete!');
              if (result !== undefined) {
                setCurrentCalculationStep(calculationSteps.length);
              }
            }, 1000);
            timeoutRefs.current.push(endDelay);
          }
        }, timeout);
        timeoutRefs.current.push(t);
        
        timeout += 800; // Delay between button presses
      });
    }, 300);
    timeoutRefs.current.push(initialDelay);
  };

  const startAutoCalculate = () => {
    clearTimeouts();
    setCurrentCalculationStep(0);
    
    // Use provided calculationSteps or generate from button sequence
    let stepsToShow: Array<{ step: string; value: string | number }> = [];
    
    if (calculationSteps.length > 0) {
      // Use provided steps
      stepsToShow = [...calculationSteps];
    } else {
      // Generate calculation steps from button sequence
      let currentNumber = '';
      let firstNumber: string | null = null;
      let operator: string | null = null;
      let numbers: Array<{ num: number; op: string | null }> = [];
      
      // Parse button sequence
      buttonSequence.forEach((button) => {
        if (!isNaN(Number(button)) || button === '.') {
          currentNumber += button;
        } else if (['+', '-', '×', '÷'].includes(button)) {
          if (currentNumber) {
            numbers.push({ num: parseFloat(currentNumber), op: operator });
            operator = button;
            if (!firstNumber) firstNumber = currentNumber;
            currentNumber = '';
          }
        } else if (button === '=' && currentNumber) {
          numbers.push({ num: parseFloat(currentNumber), op: operator });
        }
      });
      
      // Build calculation steps
      if (numbers.length >= 2) {
        let runningTotal = numbers[0].num;
        stepsToShow.push({ step: 'Starting Value', value: numbers[0].num });
        
        for (let i = 1; i < numbers.length; i++) {
          const { num, op } = numbers[i];
          if (op) {
            let calcResult = runningTotal;
            switch (op) {
              case '+': calcResult = runningTotal + num; break;
              case '-': calcResult = runningTotal - num; break;
              case '×': calcResult = runningTotal * num; break;
              case '÷': calcResult = num !== 0 ? runningTotal / num : 0; break;
            }
            stepsToShow.push({ step: `${runningTotal} ${op} ${num}`, value: calcResult });
            runningTotal = calcResult;
          }
        }
        
        if (result !== undefined) {
          stepsToShow.push({ step: 'Final Result', value: result });
        }
      } else if (result !== undefined) {
        stepsToShow.push({ step: 'Result', value: result });
      }
    }
    
    // Store steps in state
    setAutoCalculateSteps(stepsToShow);
    setShowAutoCalculate(true);
    
    // Animate through calculation steps
    let stepIndex = 0;
    const animateSteps = () => {
      if (stepIndex < stepsToShow.length) {
        setCurrentCalculationStep(stepIndex + 1);
        stepIndex++;
        if (stepIndex < stepsToShow.length) {
          const timeout = setTimeout(animateSteps, 1500);
          timeoutRefs.current.push(timeout);
        }
      }
    };
    
    const initialTimeout = setTimeout(() => {
      animateSteps();
    }, 500);
    timeoutRefs.current.push(initialTimeout);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCurrentExplanation(null);
    setHighlightedButton(null);
    setCurrentCalculationStep(0);
    setShowAutoCalculate(false);
    setAutoCalculateSteps([]);
    clearTimeouts();
    
    // Clear calculator
    if (calculatorRef.current) {
      calculatorRef.current.clear();
    }
  };

  return (
    <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-500/10 dark:to-teal-500/10 rounded-lg border border-blue-200 dark:border-blue-500/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-accent-teal" />
          <h4 className="text-sm font-semibold text-gray-900 dark:text-text-primary">
            {title} - Calculator Demo
          </h4>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={startAutoCalculate}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-accent-orange text-white hover:bg-accent-orange/80 transition-colors flex items-center space-x-1"
          >
            <Zap className="h-3 w-3" />
            <span>Auto Calculate</span>
          </button>
          <button
            onClick={isPlaying ? resetDemo : startDemo}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-accent-teal text-white hover:bg-accent-teal/80 transition-colors flex items-center space-x-1"
          >
            {isPlaying ? (
              <>
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                <span>Play Demo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Formula Display */}
      <div className="mb-4 p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
        <div className="flex items-center space-x-2 mb-2">
          <Keyboard className="h-4 w-4 text-gray-500 dark:text-text-tertiary" />
          <span className="text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wide">
            Formula
          </span>
        </div>
        <p className="text-sm font-mono text-gray-900 dark:text-text-primary">
          {formula}
        </p>
      </div>

      {/* Current Step Explanation */}
      {currentExplanation && (
        <div className="mb-4 p-3 bg-accent-orange/10 dark:bg-accent-orange/20 rounded-lg border border-accent-orange/30 animate-fade-in">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-accent-orange flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-900 dark:text-text-primary font-medium">
              {currentExplanation}
            </p>
          </div>
        </div>
      )}

      {/* Auto-Calculate Section */}
      {showAutoCalculate && autoCalculateSteps.length > 0 && (
        <div className="mb-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-lg border border-green-200 dark:border-green-500/30">
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="h-4 w-4 text-accent-green" />
            <span className="text-xs font-semibold text-gray-900 dark:text-text-primary uppercase tracking-wide">
              Auto-Calculate (Failsafe Training Mode)
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-text-secondary mb-3">
            This shows the calculation steps automatically. Use this if the system is down or for quick verification.
          </p>
          <div className="space-y-2">
            {autoCalculateSteps.map((calcStep, index) => (
              <div
                key={index}
                className={`p-2 rounded border transition-all ${
                  index < currentCalculationStep
                    ? 'bg-green-100 dark:bg-green-500/20 border-green-300 dark:border-green-500/40'
                    : index === currentCalculationStep
                    ? 'bg-accent-green/20 border-accent-green animate-pulse'
                    : 'bg-gray-50 dark:bg-dark-700 border-gray-200 dark:border-dark-600 opacity-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-700 dark:text-text-secondary">
                    {calcStep.step}:
                  </span>
                  <span className="text-sm font-bold font-mono text-gray-900 dark:text-text-primary">
                    {typeof calcStep.value === 'number'
                      ? resultFormat === 'percentage'
                        ? `${calcStep.value.toFixed(2)}%`
                        : resultFormat === 'currency'
                        ? calcStep.value.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0 })
                        : calcStep.value.toLocaleString('en-AU')
                      : calcStep.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Button Sequence Instructions */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-600 dark:text-text-secondary mb-2 uppercase tracking-wide">
          Calculator Button Sequence:
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          {groupedSequence.map((group, groupIndex) => {
            const isCompleted = group.indices.every(idx => idx < currentStep);
            const isActive = group.indices.some(idx => idx === currentStep) && isPlaying;
            
            return (
              <React.Fragment key={groupIndex}>
                <div
                  className={`
                    px-3 py-1.5 rounded-md font-mono text-sm font-semibold
                    transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-accent-teal text-white shadow-md'
                        : isActive
                        ? 'bg-accent-orange text-white shadow-lg scale-110 animate-pulse'
                        : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  {group.value}
                </div>
                {groupIndex < groupedSequence.length - 1 && (
                  <span className="text-gray-400 dark:text-gray-600">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Example Values */}
      <div className="mb-4 p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
        <p className="text-xs font-semibold text-gray-600 dark:text-text-secondary mb-2 uppercase tracking-wide">
          Example Values:
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(exampleValues).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600 dark:text-text-secondary">{key.replace(/_/g, ' ')}:</span>
              <span className="font-mono font-semibold text-gray-900 dark:text-text-primary">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Result Display */}
      {result !== undefined && (
        <div className="mt-4 p-3 bg-accent-teal/10 dark:bg-accent-teal/20 rounded-lg border border-accent-teal/30">
          <p className="text-xs font-semibold text-gray-600 dark:text-text-secondary mb-1 uppercase tracking-wide">
            Expected Result:
          </p>
          <p className="text-lg font-bold font-mono text-accent-teal">
            {typeof result === 'number' 
              ? resultFormat === 'percentage'
                ? `${result.toFixed(2)}%`
                : resultFormat === 'currency'
                ? result.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0 })
                : result.toLocaleString('en-AU')
              : result}
          </p>
        </div>
      )}

      {/* Explanation */}
      <p className="text-xs text-gray-600 dark:text-text-secondary leading-relaxed italic mt-4">
        {explanation}
      </p>

      {/* Live Calculator */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-600">
        <p className="text-xs font-semibold text-gray-600 dark:text-text-secondary mb-4 uppercase tracking-wide">
          Live Calculator Demo (Keys will light up as pressed):
        </p>
        <div className="flex justify-center">
          <div className="scale-90 origin-center relative">
            <NeumorphicCalculator 
              ref={calculatorRef}
              onValueChange={(val) => {
                setCalculatorDisplayValue(val.toString());
              }}
              currentValue={0}
              highlightedButton={highlightedButton}
            />
            {highlightedButton && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-accent-orange text-white text-xs px-3 py-1 rounded-full shadow-lg animate-bounce whitespace-nowrap">
                Pressing: {highlightedButton}
              </div>
            )}
          </div>
        </div>
        {/* Calculator Display Value */}
        {calculatorDisplayValue !== '0' && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-text-tertiary mb-1">Current Display:</p>
            <p className="text-lg font-mono font-bold text-accent-teal">{calculatorDisplayValue}</p>
          </div>
        )}
      </div>
    </div>
  );
}
