import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, Sun, Moon } from 'lucide-react';

export function Header() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      // Default to dark mode if no preference is set (as per original design)
      // Check if we should respect system preference in future, but for now ensure consistent default
      if (!document.documentElement.classList.contains('light')) {
         document.documentElement.classList.add('dark');
         setIsDark(true);
      } else {
         setIsDark(false);
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      setIsDark(false);
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-900/95 backdrop-blur-md border-b border-gray-200 dark:border-dark-700 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Branding */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-green via-accent-teal to-accent-yellow rounded-xl flex items-center justify-center shadow-neumorphic-accent">
                <Calculator className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-md" />
              </div>
              {/* Animated accent rings */}
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-accent-orange rounded-full opacity-80 animate-pulse-slow" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 bg-accent-teal rounded-full opacity-60 animate-bounce-slow" />
            </div>
            
            <div className="flex flex-col justify-center">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-text-primary tracking-tight leading-tight">
                Child Support Assessment <span className="text-accent-teal">Training Console</span>
              </h1>
              <p className="text-[10px] sm:text-xs text-red-600 dark:text-red-400 font-medium uppercase tracking-wider hidden xs:block">
                Internal Use Only
              </p>
              <div className="flex items-center space-x-1.5 mt-1">
                <div className="w-1.5 h-1.5 bg-accent-green rounded-full" />
                <div className="w-1.5 h-1.5 bg-accent-teal rounded-full" />
                <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full" />
                <span className="text-[10px] text-gray-500 dark:text-text-tertiary ml-1 hidden sm:inline">Officer Training Tool</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600 dark:text-text-secondary">
              <div className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors">
                <div className="w-2 h-2 bg-accent-orange rounded-full animate-pulse" />
                <span className="text-accent-orange font-medium text-xs sm:text-sm">Self-contained</span>
              </div>
              <div className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors">
                <TrendingDown className="h-4 w-4 text-accent-teal" />
                <span className="text-accent-teal font-medium text-xs sm:text-sm">15% alerts</span>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-text-secondary hover:text-accent-teal dark:hover:text-accent-teal hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors border border-transparent hover:border-accent-teal/30"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}

