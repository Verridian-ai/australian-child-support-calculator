import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-850 border-t border-gray-200 dark:border-dark-700 mt-12 sm:mt-20 pb-8 sm:pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-accent-teal uppercase tracking-wider">
              Child Support Assessment Training Console
            </h4>
            <p className="text-sm text-gray-600 dark:text-text-tertiary leading-relaxed">
              Professional Australian child support training console featuring a neumorphic interface and government-grade accuracy. 
              Designed for clarity, precision, and officer training.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {[
                'bg-accent-green', 
                'bg-accent-teal', 
                'bg-accent-yellow', 
                'bg-accent-orange'
              ].map((color, i) => (
                <div key={i} className={`w-2.5 h-2.5 ${color} rounded-full opacity-80`} />
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-text-secondary uppercase tracking-wider">
              About This Training Tool
            </h4>
            <p className="text-sm text-gray-600 dark:text-text-tertiary leading-relaxed">
              Implements the official 8-step Australian child support formula from the Department of Social Services Child Support Guide. 
              Provides realistic scenarios, thresholds, and calculations to help child support officers practise assessments in a training environment.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-text-secondary uppercase tracking-wider">
              Legal Disclaimer
            </h4>
            <p className="text-sm text-gray-600 dark:text-text-tertiary leading-relaxed">
              This tool provides training estimates only and must not be used as an official assessment engine. 
              Actual child support assessments are performed by Services Australia systems and may differ based on specific circumstances. 
              For real cases, always follow official procedures and systems.
            </p>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12 pt-8 border-t border-gray-200 dark:border-dark-600/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <p className="text-xs text-gray-500 dark:text-text-muted text-center sm:text-left">
              © 2025 Child Support Assessment Training Console. Internal training tool for authorised officers only.
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Internal Use Only</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-gray-500 dark:text-text-muted group cursor-help">
                <AlertTriangle className="h-3.5 w-3.5 group-hover:text-accent-yellow transition-colors" />
                <span className="group-hover:text-gray-700 dark:group-hover:text-text-secondary transition-colors">For internal training and professional development. Not for public distribution.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

