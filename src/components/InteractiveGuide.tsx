import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, BookOpen, ArrowRight, Lightbulb, Calculator } from 'lucide-react';
import type { ChildSupportCalculationStep } from '../lib/calculator';

interface InteractiveGuideProps {
  steps: ChildSupportCalculationStep[];
  onButtonHighlight: (buttonSequence: string[]) => void;
  onGuideStepComplete: () => void;
}

interface GuideStep {
  stepNumber: number;
  title: string;
  description: string;
  buttonSequence: string[];
  inputValues: { [key: string]: string };
  explanation: string;
}

export default function InteractiveGuide({ 
  steps, 
  onButtonHighlight, 
  onGuideStepComplete 
}: InteractiveGuideProps) {
  const [isGuideActive, setIsGuideActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedButtons, setHighlightedButtons] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Define the interactive guide steps
  const guideSteps: GuideStep[] = [
    {
      stepNumber: 1,
      title: "Enter Parent A Income",
      description: "Input Parent A's Adjusted Taxable Income",
      buttonSequence: ["5", "0", "0", "0", "0"],
      inputValues: { parentA_ATI: "50000" },
      explanation: "Enter Parent A's annual income of $50,000. This will be used in the calculation."
    },
    {
      stepNumber: 2,
      title: "Enter Parent B Income", 
      description: "Input Parent B's Adjusted Taxable Income",
      buttonSequence: ["6", "0", "0", "0", "0"],
      inputValues: { parentB_ATI: "60000" },
      explanation: "Enter Parent B's annual income of $60,000. This combines with Parent A's income."
    },
    {
      stepNumber: 3,
      title: "Set Number of Children",
      description: "Enter the number of children",
      buttonSequence: ["3"],
      inputValues: { numberOfChildren: "3" },
      explanation: "This calculation is for 3 children aged 9, 7, and 5 years."
    },
    {
      stepNumber: 4,
      title: "Enter Child Ages",
      description: "Input children's ages separated by commas",
      buttonSequence: ["9", ",", "7", ",", "5"],
      inputValues: { childrenAges: "9, 7, 5" },
      explanation: "Ages help determine the Costs of the Children (COTC) for each age group."
    },
    {
      stepNumber: 5,
      title: "Enter Parent A Care Nights",
      description: "Input Parent A's annual care nights",
      buttonSequence: ["2", "9", "0"],
      inputValues: { parentA_CareNights: "290" },
      explanation: "Parent A cares for children 290 nights per year (80% care)."
    },
    {
      stepNumber: 6,
      title: "Enter Parent B Care Nights",
      description: "Input Parent B's annual care nights",
      buttonSequence: ["7", "5"],
      inputValues: { parentB_CareNights: "75" },
      explanation: "Parent B cares for children 75 nights per year (20% care)."
    },
    {
      stepNumber: 7,
      title: "Enter Current Wage",
      description: "Input current annual wage for threshold tracking",
      buttonSequence: ["9", "7", "0", "0", "0"],
      inputValues: { currentWage: "97000" },
      explanation: "Current wage of $97,000. 15% threshold alert at $82,450."
    },
    {
      stepNumber: 8,
      title: "Calculate Final Result",
      description: "Press calculate to get the final amount",
      buttonSequence: ["CALCULATE"],
      inputValues: {},
      explanation: "The calculator will process all inputs through the 8-step Australian child support formula."
    }
  ];

  const startGuide = () => {
    setIsGuideActive(true);
    setCurrentStep(0);
    setIsPlaying(true);
    setCompletedSteps(new Set());
  };

  const pauseGuide = () => {
    setIsPlaying(false);
  };

  const resumeGuide = () => {
    setIsPlaying(true);
  };

  const resetGuide = () => {
    setIsGuideActive(false);
    setCurrentStep(0);
    setIsPlaying(false);
    setHighlightedButtons([]);
    setCompletedSteps(new Set());
  };

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      const newCompleted = new Set(completedSteps);
      newCompleted.add(guideSteps[currentStep].stepNumber);
      setCompletedSteps(newCompleted);
      setCurrentStep(currentStep + 1);
      onGuideStepComplete();
    } else {
      // Guide completed
      setIsPlaying(false);
      setTimeout(() => {
        setIsGuideActive(false);
      }, 2000);
    }
  };

  // Auto-advance through steps when playing
  useEffect(() => {
    if (isPlaying && isGuideActive) {
      const timer = setTimeout(() => {
        nextStep();
      }, 3000); // 3 seconds per step

      return () => clearTimeout(timer);
    }
  }, [currentStep, isPlaying, isGuideActive]);

  // Highlight buttons for current step
  useEffect(() => {
    if (isGuideActive && currentStep < guideSteps.length) {
      const step = guideSteps[currentStep];
      setHighlightedButtons(step.buttonSequence);
      onButtonHighlight(step.buttonSequence);
    }
  }, [currentStep, isGuideActive, onButtonHighlight]);

  if (!isGuideActive) {
    return (
      <div className="glass-panel-lg border border-accent-teal bg-dark-800 bg-opacity-80">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <BookOpen className="h-8 w-8 text-accent-teal" />
            <h2 className="text-2xl font-bold text-accent-teal">
              Interactive Educational Guide
            </h2>
          </div>
          
          <p className="text-text-secondary leading-relaxed">
            Learn how to use the Express Plus Child Support Calculator with our step-by-step interactive guide. 
            Watch as each button gets highlighted to show you exactly what to press for each calculation step.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-dark-700 bg-opacity-50 rounded-lg border border-dark-600">
              <Lightbulb className="h-6 w-6 text-accent-yellow mb-2" />
              <h4 className="text-sm font-semibold text-text-primary mb-1">Learn Mode</h4>
              <p className="text-xs text-text-tertiary">
                Watch button highlights as you progress through the complete 8-step calculation process.
              </p>
            </div>
            
            <div className="p-4 bg-dark-700 bg-opacity-50 rounded-lg border border-dark-600">
              <Play className="h-6 w-6 text-accent-green mb-2" />
              <h4 className="text-sm font-semibold text-text-primary mb-1">Practice Mode</h4>
              <p className="text-xs text-text-tertiary">
                Follow along with visual feedback and step-by-step explanations.
              </p>
            </div>
          </div>

          <button
            onClick={startGuide}
            className="neumorphic-btn-accent w-full flex items-center justify-center space-x-2 text-lg"
          >
            <Play className="h-6 w-6" />
            <span>Start Interactive Guide</span>
          </button>

          <div className="pt-4 border-t border-dark-600">
            <p className="text-xs text-text-tertiary">
              Complete guided walkthrough of Australian child support calculation with visual button sequences
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentGuideStep = guideSteps[currentStep];
  const progress = ((currentStep + 1) / guideSteps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Guide Header */}
      <div className="glass-panel-sm border border-accent-teal bg-dark-800 bg-opacity-80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6 text-accent-teal" />
            <h3 className="text-lg font-semibold text-accent-teal">
              Interactive Guide - Step {currentStep + 1} of {guideSteps.length}
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={isPlaying ? pauseGuide : resumeGuide}
              className="neumorphic-btn-accent p-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            
            <button
              onClick={resetGuide}
              className="neumorphic-btn p-2"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-text-tertiary mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-dark-600 rounded-full h-2">
            <div 
              className="bg-accent-teal h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Current Step Content */}
      <div className="glass-panel-lg border border-accent-orange bg-dark-800 bg-opacity-80">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center text-white font-bold">
              {currentGuideStep.stepNumber}
            </div>
            <div>
              <h4 className="text-xl font-semibold text-text-primary">
                {currentGuideStep.title}
              </h4>
              <p className="text-text-secondary">
                {currentGuideStep.description}
              </p>
            </div>
          </div>

          {/* Button Sequence Display */}
          <div className="p-4 bg-dark-700 bg-opacity-50 rounded-lg border border-dark-600">
            <h5 className="text-sm font-semibold text-accent-orange uppercase tracking-wide mb-3">
              Button Sequence to Press
            </h5>
            <div className="flex items-center space-x-2 flex-wrap">
              {currentGuideStep.buttonSequence.map((button, index) => (
                <React.Fragment key={index}>
                  <div className={`px-3 py-2 rounded-lg border font-mono text-sm transition-all duration-300 ${
                    highlightedButtons.includes(button) 
                      ? 'bg-accent-orange text-white border-accent-orange shadow-neumorphic-operator animate-pulse' 
                      : 'bg-dark-600 text-text-tertiary border-dark-500'
                  }`}>
                    {button === 'CALCULATE' ? (
                      <Calculator className="h-4 w-4 mx-auto" />
                    ) : (
                      button
                    )}
                  </div>
                  {index < currentGuideStep.buttonSequence.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-accent-orange" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Explanation */}
          <div className="p-4 bg-dark-700 bg-opacity-30 rounded-lg border border-dark-600">
            <div className="flex items-start space-x-2">
              <Lightbulb className="h-5 w-5 text-accent-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h6 className="text-sm font-semibold text-accent-yellow mb-1">Explanation</h6>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {currentGuideStep.explanation}
                </p>
              </div>
            </div>
          </div>

          {/* Input Values */}
          {Object.keys(currentGuideStep.inputValues).length > 0 && (
            <div className="p-4 bg-dark-700 bg-opacity-30 rounded-lg border border-dark-600">
              <h6 className="text-sm font-semibold text-accent-teal mb-2">Expected Values</h6>
              <div className="space-y-1">
                {Object.entries(currentGuideStep.inputValues).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-text-tertiary capitalize">{key.replace(/_/g, ' ')}:</span>
                    <span className="text-text-primary font-mono">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Step Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="neumorphic-btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous Step
        </button>
        
        <button
          onClick={nextStep}
          disabled={currentStep === guideSteps.length - 1}
          className="neumorphic-btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentStep === guideSteps.length - 1 ? 'Complete Guide' : 'Next Step'}
        </button>
      </div>

      {/* Guide Completion */}
      {currentStep === guideSteps.length - 1 && isPlaying === false && (
        <div className="glass-panel-lg border border-accent-green bg-dark-800 bg-opacity-80 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-accent-green rounded-full flex items-center justify-center">
              <Play className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-accent-green">
              Guide Complete!
            </h3>
          </div>
          <p className="text-text-secondary mb-4">
            Congratulations! You've completed the interactive guide for the Australian Child Support Calculator.
          </p>
          <button
            onClick={resetGuide}
            className="neumorphic-btn-accent"
          >
            Start Guide Again
          </button>
        </div>
      )}
    </div>
  );
}