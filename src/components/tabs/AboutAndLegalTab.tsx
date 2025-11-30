import React from 'react';
import { Info, Shield, FileText } from 'lucide-react';
import NeumorphicCalculator from '../NeumorphicCalculator';

export default function AboutAndLegalTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-1.5 h-6 bg-primary-500 rounded-full" />
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-text-primary">
          About & Legal
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* About This Tool */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel-lg p-6 md:p-8">
          <div className="flex items-center space-x-2 mb-6">
            <Info className="h-5 w-5 text-accent-teal" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
              About This Training Tool
            </h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-text-secondary leading-relaxed">
              Implements the official 8-step Australian child support formula from the Department of Social Services Child Support Guide. Provides realistic scenarios, thresholds, and calculations to help child support officers practise assessments in a training environment.
            </p>
            
            <div className="pt-4 border-t border-gray-200 dark:border-dark-600">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-text-primary mb-2">
                Interface Style
              </h4>
              <p className="text-xs text-gray-600 dark:text-text-secondary leading-relaxed">
                Professional Australian child support training console featuring a neumorphic interface and government-grade accuracy. Designed for clarity, precision, and officer training.
              </p>
            </div>
          </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="glass-panel-lg p-6 md:p-8">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-5 w-5 text-accent-orange" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
              Legal Disclaimer
            </h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-text-secondary leading-relaxed">
              This tool provides training estimates only and must not be used as an official assessment engine. Actual child support assessments are performed by Services Australia systems and may differ based on specific circumstances. For real cases, always follow official procedures and systems.
            </p>
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg border border-yellow-200 dark:border-yellow-500/30">
              <p className="text-xs text-yellow-800 dark:text-yellow-400 leading-relaxed">
                <strong>Important:</strong> This is an internal training tool for authorised officers only. All calculations are for training purposes and must not be used for actual case assessments.
              </p>
            </div>
          </div>
          </div>
        </div>

        {/* Calculator Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-panel-sm border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800/60 sticky top-24">
            <h4 className="text-sm font-semibold text-accent-teal uppercase tracking-wide mb-4 flex items-center">
              <div className="w-1.5 h-1.5 bg-accent-teal rounded-full mr-2" />
              Manual Calculator Reference
            </h4>
            <NeumorphicCalculator 
              onValueChange={() => {}}
              currentValue={0}
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="glass-panel-sm p-4 text-center">
        <p className="text-xs text-gray-500 dark:text-text-tertiary">
          © 2025 Child Support Assessment Training Console. Internal training tool for authorised officers only.
        </p>
        <p className="text-xs text-gray-500 dark:text-text-tertiary mt-2">
          For internal training and professional development. Not for public distribution.
        </p>
      </div>
    </div>
  );
}

