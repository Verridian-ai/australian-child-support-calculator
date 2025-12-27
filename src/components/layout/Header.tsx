import { useState, useEffect } from 'react';
import { TrendingDown, Sun, Moon } from 'lucide-react';

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
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            {/* Calculator Logo */}
            <div className="relative flex-shrink-0">
              <img
                src="/calculator-logo.svg"
                alt="CS Calculator"
                className="h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 object-contain"
              />
            </div>

            <div className="flex flex-col justify-center min-w-0">
              {/* Mobile: Short title */}
              <h1 className="sm:hidden text-base font-bold text-gray-900 dark:text-text-primary tracking-tight leading-tight">
                <span className="text-accent-teal">CS</span> Calculator
              </h1>
              {/* Desktop: Full title */}
              <h1 className="hidden sm:block text-lg md:text-xl font-bold text-gray-900 dark:text-text-primary tracking-tight leading-tight">
                Child Support <span className="text-accent-teal">Calculator</span>
              </h1>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-accent-green rounded-full" />
                <div className="w-1.5 h-1.5 bg-accent-teal rounded-full" />
                <div className="w-1.5 h-1.5 bg-accent-yellow rounded-full" />
                <span className="text-[10px] text-gray-500 dark:text-text-tertiary ml-1 hidden md:inline">Training Tool</span>
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

