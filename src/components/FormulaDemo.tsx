import React, { useState, useRef, useEffect } from 'react';
import { Calculator, Play, RotateCcw, Keyboard, Zap, CheckCircle, PlayCircle } from 'lucide-react';
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
  calculateResult?: (values: { [key: string]: string | number }) => number;
  generateButtonSequence?: (values: { [key: string]: string | number }) => string[];
  generateCalculationSteps?: (values: { [key: string]: string | number }, result: number) => Array<{ step: string; value: string | number }>;
  onCalculationComplete?: (result: number) => void;
}

export default function FormulaDemo({
  title,
  formula,
  buttonSequence: initialButtonSequence,
  exampleValues: initialExampleValues,
  explanation,
  result: initialResult,
  resultFormat = 'currency',
  calculationSteps: initialCalculationSteps = [],
  calculateResult,
  generateButtonSequence,
  generateCalculationSteps,
  onCalculationComplete
}: FormulaDemoProps) {
  // Make exampleValues editable
  const [exampleValues, setExampleValues] = useState<{ [key: string]: string | number }>(initialExampleValues);
  const [showCalculator, setShowCalculator] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Calculate result dynamically
  const result = calculateResult ? calculateResult(exampleValues) : initialResult;
  
  // Notify parent when result changes (for threshold updates)
  useEffect(() => {
    if (result !== undefined && onCalculationComplete) {
      onCalculationComplete(result);
    }
  }, [result, onCalculationComplete]);
  
  // Generate button sequence dynamically
  const buttonSequence = generateButtonSequence ? generateButtonSequence(exampleValues) : initialButtonSequence;
  
  // Generate calculation steps dynamically
  const calculationSteps = generateCalculationSteps && result !== undefined 
    ? generateCalculationSteps(exampleValues, result)
    : initialCalculationSteps;
  
  // Group consecutive digits for better display and step navigation
  const getGroupedSequence = () => {
    const grouped: Array<{ value: string; indices: number[]; isNumber: boolean }> = [];
    let currentGroup: string[] = [];
    let currentIndices: number[] = [];
    
    buttonSequence.forEach((button, index) => {
      const isDigit = !isNaN(Number(button)) && button !== '.';
      
      if (isDigit) {
        currentGroup.push(button);
        currentIndices.push(index);
      } else {
        if (currentGroup.length > 0) {
          grouped.push({ value: currentGroup.join(''), indices: currentIndices, isNumber: true });
          currentGroup = [];
          currentIndices = [];
        }
        grouped.push({ value: button, indices: [index], isNumber: false });
      }
    });
    
    if (currentGroup.length > 0) {
      grouped.push({ value: currentGroup.join(''), indices: currentIndices, isNumber: true });
    }
    
    return grouped;
  };
  
  const groupedSequence = getGroupedSequence();
  
  // Get the current group index based on currentStep
  const getCurrentGroupIndex = () => {
    for (let i = 0; i < groupedSequence.length; i++) {
      if (groupedSequence[i].indices.some(idx => idx >= currentStep - 1)) {
        return i;
      }
    }
    return -1;
  };
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
    setShowCalculator(true); // Show calculator when demo starts
    clearTimeouts();
    
    // Clear calculator first
    if (calculatorRef.current) {
      calculatorRef.current.clear();
      setCalculatorDisplayValue('0');
    }
    
    // Show first step explanation
    if (buttonSequence.length > 0) {
      setCurrentExplanation('Click "Next" to start the calculation step by step.');
    }
  };

  const nextStep = () => {
    if (currentStep < buttonSequence.length) {
      const currentGroupIdx = getCurrentGroupIndex();
      const nextGroupIdx = currentGroupIdx + 1;
      
      if (nextGroupIdx < groupedSequence.length) {
        const nextGroup = groupedSequence[nextGroupIdx];
        
        // If it's a number group, enter all digits at once
        if (nextGroup.isNumber) {
          // Enter each digit of the number with a small delay for visual effect
          nextGroup.value.split('').forEach((digit, digitIndex) => {
            setTimeout(() => {
              if (calculatorRef.current) {
                calculatorRef.current.pressButton(digit);
                setHighlightedButton(digit);
                
                // Update display after last digit
                if (digitIndex === nextGroup.value.length - 1) {
                  setTimeout(() => {
                    const display = calculatorRef.current?.getDisplay() || '0';
                    setCalculatorDisplayValue(display);
                    setHighlightedButton(null);
                  }, 100);
                }
              }
            }, digitIndex * 150); // Small delay between digits for visual effect
          });
          
          // Update step to the last index of this group
          setCurrentStep(nextGroup.indices[nextGroup.indices.length - 1] + 1);
          setCurrentExplanation(`Entering ${nextGroup.value}...`);
          
          // Clear explanation after number is entered
          setTimeout(() => {
            setCurrentExplanation(`Entered ${nextGroup.value}. Click "Next" to continue.`);
          }, nextGroup.value.length * 150 + 200);
        } else {
          // Single button press for operators
          const button = nextGroup.value;
          setCurrentStep(nextGroup.indices[0] + 1);
          setHighlightedButton(button);
          setCurrentExplanation(getStepExplanation(button, nextGroup.indices[0], buttonSequence));
          
          // Press button on calculator
          if (calculatorRef.current) {
            calculatorRef.current.pressButton(button);
            // Update display value after a short delay
            setTimeout(() => {
              const display = calculatorRef.current?.getDisplay() || '0';
              setCalculatorDisplayValue(display);
              setHighlightedButton(null);
            }, 300);
          }
        }
      }
      
      // If this is the last step, show completion message
      if (currentStep >= buttonSequence.length - 1) {
        setTimeout(() => {
          setCurrentExplanation('✓ Calculation complete! Result displayed.');
          if (result !== undefined) {
            setCurrentCalculationStep(calculationSteps.length);
            // Notify parent component of the result
            if (onCalculationComplete) {
              onCalculationComplete(result);
            }
          }
        }, 500);
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      
      // Reset calculator and replay up to previous step
      if (calculatorRef.current) {
        calculatorRef.current.clear();
        setCalculatorDisplayValue('0');
        
        // Replay all steps up to the previous one
        setTimeout(() => {
          for (let i = 0; i < newStep; i++) {
            setTimeout(() => {
              if (calculatorRef.current) {
                calculatorRef.current.pressButton(buttonSequence[i]);
              }
            }, i * 100);
          }
          
          // Update display and explanation after replay
          setTimeout(() => {
            if (calculatorRef.current) {
              const display = calculatorRef.current.getDisplay();
              setCalculatorDisplayValue(display);
            }
            if (newStep > 0) {
              const button = buttonSequence[newStep - 1];
              setHighlightedButton(button);
              setCurrentExplanation(getStepExplanation(button, newStep - 1, buttonSequence));
            } else {
              setHighlightedButton(null);
              setCurrentExplanation('Click "Next" to start the calculation step by step.');
            }
          }, newStep * 100 + 200);
        }, 50);
      } else {
        // If no calculator ref, just update the step
        if (newStep > 0) {
          const button = buttonSequence[newStep - 1];
          setHighlightedButton(button);
          setCurrentExplanation(getStepExplanation(button, newStep - 1, buttonSequence));
        } else {
          setHighlightedButton(null);
          setCurrentExplanation('Click "Next" to start the calculation step by step.');
        }
      }
    }
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
    setCalculatorDisplayValue('0');
    clearTimeouts();
    
    // Clear calculator
    if (calculatorRef.current) {
      calculatorRef.current.clear();
    }
  };

  const handleValueChange = (key: string, value: string) => {
    const numValue = parseFloat(value);
    setExampleValues(prev => ({
      ...prev,
      [key]: isNaN(numValue) ? value : numValue
    }));
    // Reset demo when values change
    resetDemo();
  };

  return (
    <div className="mb-6 p-3 md:p-4 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-500/10 dark:to-teal-500/10 rounded-lg border border-blue-200 dark:border-blue-500/30">
      {/* Header with Title and Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
        <div className="flex items-center space-x-2">
          <Calculator className="h-4 w-4 md:h-5 md:w-5 text-accent-teal" />
          <h4 className="text-xs md:text-sm font-semibold text-gray-900 dark:text-text-primary">
            {title}
          </h4>
        </div>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <button
            onClick={startAutoCalculate}
            className="px-2 py-1.5 md:px-3 text-xs font-medium rounded-md bg-accent-orange text-white hover:bg-accent-orange/80 transition-colors flex items-center space-x-1"
          >
            <Zap className="h-3 w-3" />
            <span className="hidden sm:inline">Auto Calculate</span>
            <span className="sm:hidden">Auto</span>
          </button>
          {!isPlaying ? (
            <button
              onClick={startDemo}
              className="px-2 py-1.5 md:px-3 text-xs font-medium rounded-md bg-accent-teal text-white hover:bg-accent-teal/80 transition-colors flex items-center space-x-1"
            >
              <Play className="h-3 w-3" />
              <span className="hidden sm:inline">Start Demo</span>
              <span className="sm:hidden">Start</span>
            </button>
          ) : (
            <>
              <button
                onClick={previousStep}
                disabled={currentStep === 0}
                className="px-2 py-1.5 md:px-3 text-xs font-medium rounded-md bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
              >
                <span>←</span>
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep >= buttonSequence.length}
                className="px-2 py-1.5 md:px-3 text-xs font-medium rounded-md bg-accent-teal text-white hover:bg-accent-teal/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <span>→</span>
              </button>
              <button
                onClick={resetDemo}
                className="px-2 py-1.5 md:px-3 text-xs font-medium rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-colors flex items-center space-x-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="hidden sm:inline">Reset</span>
                <span className="sm:hidden">Reset</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Integrated Calculator Layout - All in One Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 min-h-[400px]">
        {/* Left Column: Formula, Values, Result */}
        <div className="lg:col-span-1 space-y-3">
          {/* Formula */}
          <div className="p-2 md:p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
            <div className="flex items-center space-x-2 mb-1.5">
              <Keyboard className="h-3 w-3 text-gray-500 dark:text-text-tertiary" />
              <span className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wide">
                Formula
              </span>
            </div>
            <p className="text-[10px] md:text-xs font-mono text-gray-900 dark:text-text-primary break-words">
              {formula}
            </p>
          </div>

          {/* Editable Values */}
          <div className="p-2 md:p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
            <p className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-text-secondary mb-2 uppercase tracking-wide">
              Live Demo Values
            </p>
            <div className="space-y-1.5 text-[10px] md:text-xs">
              {Object.entries(exampleValues).map(([key, value]) => {
                const isEditable = typeof value === 'number' || !isNaN(Number(value));
                const numValue = typeof value === 'number' ? value : Number(value);
                const strValue = typeof value === 'string' ? value : String(value);
                return (
                  <div key={key} className="flex flex-col gap-0.5">
                    <label className="text-gray-600 dark:text-text-secondary text-[10px]">
                      {key.replace(/_/g, ' ')}:
                    </label>
                    {isEditable ? (
                      <input
                        type="number"
                        value={isNaN(numValue) ? 0 : numValue}
                        onChange={(e) => handleValueChange(key, e.target.value)}
                        className="font-mono font-semibold text-gray-900 dark:text-text-primary bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-accent-teal focus:outline-none px-1 py-0.5 text-[10px] md:text-xs w-full"
                        step={key.includes('Amount') || key.includes('Wage') || key.includes('ATI') ? 1000 : key.includes('Nights') ? 1 : 0.01}
                      />
                    ) : (
                      <span className="font-mono font-semibold text-gray-900 dark:text-text-primary">
                        {strValue}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Result */}
          {result !== undefined && (
            <div className="p-2 md:p-3 bg-accent-teal/10 dark:bg-accent-teal/20 rounded-lg border border-accent-teal/30">
              <p className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-text-secondary mb-1 uppercase tracking-wide">
                Calculated Result
              </p>
              <p className="text-base md:text-lg font-bold font-mono text-accent-teal">
                {result !== undefined && typeof result === 'number'
                  ? resultFormat === 'percentage'
                    ? `${result.toFixed(2)}%`
                    : resultFormat === 'currency'
                    ? result.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0 })
                    : result.toLocaleString('en-AU')
                  : result}
              </p>
            </div>
          )}
        </div>

        {/* Center Column: Calculator */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center">
          {/* Step Explanation */}
          {isPlaying && (
            <div className="mb-2 p-2 bg-accent-teal/10 dark:bg-accent-teal/20 rounded-lg border border-accent-teal/30 w-full">
              <div className="flex items-start space-x-1.5">
                <PlayCircle className="h-3 w-3 text-accent-teal flex-shrink-0 mt-0.5 animate-pulse" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-xs text-gray-900 dark:text-text-primary font-medium break-words">
                    {currentExplanation || 'Click "Next" to start the calculation step by step.'}
                  </p>
                  {currentStep > 0 && currentStep <= buttonSequence.length && (
                    <p className="text-[9px] text-gray-600 dark:text-text-secondary mt-0.5">
                      Step {currentStep} of {buttonSequence.length}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Calculator - Always visible and prominent */}
          <div className="relative w-full flex justify-center items-center min-h-[300px]">
            <div className="scale-75 md:scale-90 lg:scale-100 origin-center relative">
              <NeumorphicCalculator 
                ref={calculatorRef}
                onValueChange={(val) => {
                  setCalculatorDisplayValue(val.toString());
                }}
                currentValue={0}
                highlightedButton={highlightedButton}
              />
              {highlightedButton && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-accent-orange text-white text-[10px] px-2 py-0.5 rounded-full shadow-lg animate-pulse whitespace-nowrap z-20">
                  Pressing: {highlightedButton}
                </div>
              )}
            </div>
          </div>

          {/* Calculator Display Value */}
          <div className="mt-2 text-center w-full">
            <p className="text-[9px] text-gray-500 dark:text-text-tertiary mb-0.5">Current Display:</p>
            <p className="text-sm md:text-base font-mono font-bold text-accent-teal">{calculatorDisplayValue}</p>
          </div>

          {/* Button Sequence - Compact */}
          <div className="mt-2 w-full">
            <p className="text-[9px] md:text-[10px] font-semibold text-gray-600 dark:text-text-secondary mb-1 uppercase tracking-wide text-center">
              Button Sequence
            </p>
            <div className="flex flex-wrap gap-1 justify-center">
              {groupedSequence.map((group, groupIndex) => {
                const isCompleted = group.indices.every(idx => idx < currentStep);
                const isActive = group.indices.some(idx => idx === currentStep) && isPlaying;
                
                return (
                  <React.Fragment key={groupIndex}>
                    <div
                      className={`
                        px-1.5 py-0.5 rounded font-mono text-[9px] md:text-[10px] font-semibold
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
                      <span className="text-gray-400 dark:text-gray-600 text-[9px]">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Auto-Calculate Steps */}
        <div className="lg:col-span-1">
          {showAutoCalculate && autoCalculateSteps.length > 0 ? (
            <div className="p-2 md:p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-lg border border-green-200 dark:border-green-500/30 h-full">
              <div className="flex items-center space-x-1.5 mb-2">
                <Zap className="h-3 w-3 text-accent-green" />
                <span className="text-[10px] md:text-xs font-semibold text-gray-900 dark:text-text-primary uppercase tracking-wide">
                  Auto-Calculate
                </span>
              </div>
              <p className="text-[9px] md:text-[10px] text-gray-600 dark:text-text-secondary mb-2">
                Failsafe training mode
              </p>
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                {autoCalculateSteps.map((calcStep, index) => (
                  <div
                    key={index}
                    className={`p-1.5 rounded border transition-all ${
                      index < currentCalculationStep
                        ? 'bg-green-100 dark:bg-green-500/20 border-green-300 dark:border-green-500/40'
                        : index === currentCalculationStep
                        ? 'bg-accent-green/20 border-accent-green animate-pulse'
                        : 'bg-gray-50 dark:bg-dark-700 border-gray-200 dark:border-dark-600 opacity-50'
                    }`}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[9px] md:text-[10px] font-medium text-gray-700 dark:text-text-secondary truncate">
                        {calcStep.step}:
                      </span>
                      <span className="text-[10px] md:text-xs font-bold font-mono text-gray-900 dark:text-text-primary flex-shrink-0">
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
          ) : (
            <div className="p-2 md:p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600 h-full flex items-center justify-center">
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-text-tertiary text-center">
                Click "Auto Calculate" to see step-by-step calculation
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Explanation - Bottom */}
      <p className="text-[10px] md:text-xs text-gray-600 dark:text-text-secondary leading-relaxed italic mt-3 text-center">
        {explanation}
      </p>
    </div>
  );
}
