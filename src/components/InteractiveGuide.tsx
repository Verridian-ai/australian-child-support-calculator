import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, BookOpen, ArrowRight, Lightbulb, Calculator, MousePointer2 } from 'lucide-react';
import type { ChildSupportCalculationStep, ChildSupportInputs } from '../lib/calculator';
import { guideSteps } from '../data/guideSteps';
import { WelcomeScreen } from './guide/WelcomeScreen';

interface InteractiveGuideProps {
  steps: ChildSupportCalculationStep[];
  onButtonHighlight: (buttonSequence: string[]) => void;
  onGuideStepComplete: () => void;
  onCalculatorClick: (button: string) => void;
  onInputChange: (inputs: Partial<ChildSupportInputs>) => void;
}

export default function InteractiveGuide({ 
  steps, 
  onButtonHighlight, 
  onGuideStepComplete,
  onCalculatorClick,
  onInputChange,
  activeSection
}: InteractiveGuideProps & { activeSection?: string }) {
  const [isGuideActive, setIsGuideActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedButtons, setHighlightedButtons] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [simulatedCursor, setSimulatedCursor] = useState<{ x: number, y: number, visible: boolean }>({ x: 0, y: 0, visible: false });
  const [typingStatus, setTypingStatus] = useState<string | null>(null);

  // Filter steps based on activeSection
  const activeSteps = activeSection 
    ? guideSteps.filter(step => step.section === activeSection)
    : guideSteps;

  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const clearTimeouts = () => {
    timeoutRefs.current.forEach(t => clearTimeout(t));
    timeoutRefs.current = [];
  };

  const startGuide = () => {
    setIsGuideActive(true);
    setCurrentStep(0);
    setIsPlaying(true);
    setCompletedSteps(new Set());
  };

  const pauseGuide = () => {
    setIsPlaying(false);
    clearTimeouts();
    setTypingStatus('Paused');
  };

  const resumeGuide = () => {
    setIsPlaying(true);
    setTypingStatus(null);
  };

  const nextStep = () => {
    if (currentStep < activeSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setTypingStatus('Guide Complete');
    }
  };

  const resetGuide = () => {
    clearTimeouts();
    setIsGuideActive(false);
    setCurrentStep(0);
    setIsPlaying(false);
    setHighlightedButtons([]);
    setCompletedSteps(new Set());
    setTypingStatus(null);
  };

  const playStepSequence = async () => {
    if (!isPlaying || !isGuideActive) return;
    
    const step = activeSteps[currentStep];
    if (!step) return;

    const STEP_DELAY = 1000;
    const TYPING_DELAY = 150;
    const BUTTON_PRESS_DELAY = 600;

    setHighlightedButtons([]);
    setTypingStatus('Starting step...');

    // 1. Simulate Form Input Typing
    if (step.inputValues && Object.keys(step.inputValues).length > 0) {
      for (const [field, value] of Object.entries(step.inputValues)) {
        setTypingStatus(`Typing ${field.replace(/_/g, ' ')}...`);
        
        // Simulate typing char by char (visually only via state update chunks to avoid too many renders)
        // For better performance, we'll update in chunks or simulate delay before setting final value
        await new Promise(resolve => {
          const t = setTimeout(resolve, STEP_DELAY);
          timeoutRefs.current.push(t);
        });

        // Set the value
        // We parse the value based on field type logic (simplified here assuming number/string)
        let parsedValue: any = value;
        if (field.includes('Ages')) {
           parsedValue = value.split(',').map(s => parseInt(s.trim()));
        } else if (!isNaN(Number(value))) {
           parsedValue = Number(value);
        }
        
        onInputChange({ [field]: parsedValue });
        
        await new Promise(resolve => {
          const t = setTimeout(resolve, TYPING_DELAY * 3); // Pause after typing
          timeoutRefs.current.push(t);
        });
      }
    }

    // 2. Simulate Calculator Interaction
    if (step.buttonSequence && step.buttonSequence.length > 0) {
      setTypingStatus('Calculating...');
      
      for (const button of step.buttonSequence) {
        // Highlight button
        setHighlightedButtons([button]);
        
        // Wait for "move to button"
        await new Promise(resolve => {
          const t = setTimeout(resolve, BUTTON_PRESS_DELAY / 2);
          timeoutRefs.current.push(t);
        });

        // Press button
        onCalculatorClick(button);

        // Wait for "press"
        await new Promise(resolve => {
          const t = setTimeout(resolve, BUTTON_PRESS_DELAY / 2);
          timeoutRefs.current.push(t);
        });
      }
      setHighlightedButtons([]);
    }

    // 3. Complete Step
    setTypingStatus('Step complete');
    const newCompleted = new Set(completedSteps);
    newCompleted.add(step.stepNumber);
    setCompletedSteps(newCompleted);
    onGuideStepComplete();

    // 4. Pause and wait for user to click Next
    setIsPlaying(false); 
    setTypingStatus('Paused - Click Next to Continue');
  };

  // Effect to trigger sequence when step/play status changes
  useEffect(() => {
    clearTimeouts();
    if (isPlaying && isGuideActive) {
      playStepSequence();
    }
    return () => clearTimeouts();
  }, [currentStep, isPlaying, isGuideActive]);

  // Auto-start guide if activeSection changes and we aren't active yet
  useEffect(() => {
    if (activeSection && !isGuideActive) {
      startGuide();
    }
  }, [activeSection]);

  if (!isGuideActive) {
    return <WelcomeScreen onStart={startGuide} />;
  }

  const currentGuideStep = activeSteps[currentStep];
  if (!currentGuideStep) return null;

  const progress = ((currentStep + 1) / activeSteps.length) * 100;

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Guide Status Overlay */}
      <div className="glass-panel-sm border border-accent-teal/50 bg-white/90 dark:bg-dark-800/90 backdrop-blur-lg sticky top-4 z-30 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-teal/10 rounded-full">
              <BookOpen className="h-5 w-5 text-accent-teal" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {activeSection ? 'Section Guide' : `Step ${currentStep + 1}`}: {currentGuideStep.title}
              </h3>
              {typingStatus && (
                <p className="text-xs text-accent-orange font-medium animate-pulse flex items-center">
                  <MousePointer2 className="h-3 w-3 mr-1" />
                  {typingStatus}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isPlaying && currentStep < activeSteps.length - 1 && (
              <button
                onClick={nextStep}
                className="neumorphic-btn-primary px-4 py-2 flex items-center text-sm"
              >
                Next Step <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            )}
            
            {isPlaying && (
              <button
                onClick={pauseGuide}
                className="neumorphic-btn-accent p-2 h-10 w-10 flex items-center justify-center rounded-full"
                title="Pause"
              >
                <Pause className="h-4 w-4 fill-current" />
              </button>
            )}
            
            <button
              onClick={resetGuide}
              className="neumorphic-btn p-2 h-10 w-10 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              title="Reset Guide"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-accent-teal h-2 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(20,184,166,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-dark-700 pt-3 mt-3">
          {currentGuideStep.explanation}
        </p>
      </div>

      {/* Completion Screen */}
      {currentStep === activeSteps.length - 1 && !isPlaying && typingStatus === 'Guide Complete' && (
        <div className="glass-panel-lg border border-accent-green bg-white/95 dark:bg-dark-800/95 text-center animate-slide-up shadow-2xl">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-accent-green/20 rounded-full flex items-center justify-center shadow-inner">
              <Play className="h-8 w-8 text-accent-green ml-1" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {activeSection ? 'Section Guide Complete!' : 'Full Guide Complete!'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            You've successfully completed the guide for this section.
          </p>
          <button
            onClick={resetGuide}
            className="neumorphic-btn-primary px-8 py-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Close Guide
          </button>
        </div>
      )}
    </div>
  );
}
