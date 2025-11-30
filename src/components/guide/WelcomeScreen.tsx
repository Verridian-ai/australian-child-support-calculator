import React from 'react';
import { BookOpen, Lightbulb, Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="glass-panel-lg border border-accent-teal bg-white/90 dark:bg-dark-800/80 animate-fade-in">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <BookOpen className="h-8 w-8 text-accent-teal" />
          <h2 className="text-2xl font-bold text-accent-teal">
            Interactive Educational Guide
          </h2>
        </div>
        
        <p className="text-gray-600 dark:text-text-secondary leading-relaxed">
          Learn how to use the Express Plus Child Support Calculator with our step-by-step interactive guide. 
          Watch as each button gets highlighted to show you exactly what to press for each calculation step.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-100 dark:bg-dark-700 bg-opacity-50 dark:bg-opacity-50 rounded-lg border border-gray-200 dark:border-dark-600">
            <Lightbulb className="h-6 w-6 text-accent-yellow mb-2" />
            <h4 className="text-sm font-semibold text-gray-900 dark:text-text-primary mb-1">Learn Mode</h4>
            <p className="text-xs text-gray-500 dark:text-text-tertiary">
              Watch button highlights as you progress through the complete 8-step calculation process.
            </p>
          </div>
          
          <div className="p-4 bg-gray-100 dark:bg-dark-700 bg-opacity-50 dark:bg-opacity-50 rounded-lg border border-gray-200 dark:border-dark-600">
            <Play className="h-6 w-6 text-accent-green mb-2" />
            <h4 className="text-sm font-semibold text-gray-900 dark:text-text-primary mb-1">Practice Mode</h4>
            <p className="text-xs text-gray-500 dark:text-text-tertiary">
              Follow along with visual feedback and step-by-step explanations.
            </p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="neumorphic-btn-accent w-full flex items-center justify-center space-x-2 text-lg"
        >
          <Play className="h-6 w-6" />
          <span>Start Interactive Guide</span>
        </button>

        <div className="pt-4 border-t border-gray-200 dark:border-dark-600">
          <p className="text-xs text-gray-500 dark:text-text-tertiary">
            Complete guided walkthrough of Australian child support calculation with visual button sequences
          </p>
        </div>
      </div>
    </div>
  );
}

