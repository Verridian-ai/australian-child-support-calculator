import React, { useState, useRef, useEffect } from 'react';
import { Calculator, Play, RotateCcw, Keyboard } from 'lucide-react';
import NeumorphicCalculator, { CalculatorRef } from './NeumorphicCalculator';

interface FormulaDemoProps {
  title: string;
  formula: string;
  buttonSequence: string[];
  exampleValues: { [key: string]: string | number };
  explanation: string;
  result?: number;
}

export default function FormulaDemo({
  title,
  formula,
  buttonSequence,
  exampleValues,
  explanation,
  result
}: FormulaDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
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
          
          // Press button on calculator
          if (calculatorRef.current) {
            calculatorRef.current.pressButton(button);
          }
          
          if (index === buttonSequence.length - 1) {
            // Pause at the end before resetting
            const endDelay = setTimeout(() => {
              setIsPlaying(false);
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

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
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

      {/* Button Sequence Instructions */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-600 dark:text-text-secondary mb-2 uppercase tracking-wide">
          Calculator Button Sequence:
        </p>
        <div className="flex flex-wrap gap-2">
          {buttonSequence.map((button, index) => (
            <div
              key={index}
              className={`
                px-3 py-1.5 rounded-md font-mono text-sm font-semibold
                transition-all duration-300
                ${
                  index < currentStep
                    ? 'bg-accent-teal text-white shadow-md'
                    : index === currentStep && isPlaying
                    ? 'bg-accent-orange text-white shadow-lg scale-110 animate-pulse'
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300'
                }
              `}
            >
              {button}
            </div>
          ))}
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
            {typeof result === 'number' ? result.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0 }) : result}
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
          Live Calculator Demo:
        </p>
        <div className="flex justify-center">
          <div className="scale-90 origin-center">
            <NeumorphicCalculator 
              ref={calculatorRef}
              onValueChange={() => {}}
              currentValue={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

