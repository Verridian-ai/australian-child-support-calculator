import React, { useState, useEffect, useRef } from 'react';
import { Calculator, BookOpen, FileText, DollarSign, History, Info, ChevronLeft, ChevronRight } from 'lucide-react';

export type TabId = 'inputs' | 'guide' | 'result' | 'wage' | 'history' | 'about';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface TabContainerProps {
  children: (activeTab: TabId) => React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'inputs', label: 'Calculator Inputs', icon: <Calculator className="h-4 w-4" /> },
  { id: 'guide', label: 'Step-by-Step Guide', icon: <BookOpen className="h-4 w-4" /> },
  { id: 'result', label: 'Final Result', icon: <FileText className="h-4 w-4" /> },
  { id: 'wage', label: 'Wage Tracker & 15% Rule', icon: <DollarSign className="h-4 w-4" /> },
  { id: 'history', label: 'History & Thresholds', icon: <History className="h-4 w-4" /> },
  { id: 'about', label: 'About & Legal', icon: <Info className="h-4 w-4" /> },
];

export function TabContainer({ children }: TabContainerProps) {
  const getInitialTab = (): TabId => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      const validTabIds: TabId[] = ['inputs', 'guide', 'result', 'wage', 'history', 'about'];
      if (validTabIds.includes(hash as TabId)) {
        return hash as TabId;
      }
    }
    return 'inputs';
  };

  const [activeTab, setActiveTab] = useState<TabId>(getInitialTab);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabIds: TabId[] = ['inputs', 'guide', 'result', 'wage', 'history', 'about'];
      if (validTabIds.includes(hash as TabId)) {
        setActiveTab(hash as TabId);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Check scroll position for arrow indicators
  const checkScrollPosition = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const nav = navRef.current;
    if (nav) {
      nav.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        nav.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (navRef.current) {
      const scrollAmount = 150;
      navRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full">
      {/* Tab Bar */}
      <div className="border-b border-gray-200 dark:border-dark-700 mb-4 sm:mb-6 relative">
        {/* Left scroll indicator */}
        {showLeftArrow && (
          <button
            onClick={() => scrollTabs('left')}
            className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-8 bg-gradient-to-r from-gray-100 dark:from-dark-900 to-transparent sm:hidden"
            aria-label="Scroll tabs left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-text-secondary" />
          </button>
        )}

        {/* Right scroll indicator */}
        {showRightArrow && (
          <button
            onClick={() => scrollTabs('right')}
            className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-8 bg-gradient-to-l from-gray-100 dark:from-dark-900 to-transparent sm:hidden"
            aria-label="Scroll tabs right"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-text-secondary" />
          </button>
        )}

        <nav
          ref={navRef}
          className="flex space-x-0.5 sm:space-x-1 overflow-x-auto scrollbar-hide scroll-smooth px-1"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.location.hash = tab.id;
              }}
              className={`
                flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap
                transition-all duration-200 relative min-h-[44px]
                ${
                  activeTab === tab.id
                    ? 'text-accent-teal border-b-2 border-accent-teal'
                    : 'text-gray-600 dark:text-text-secondary hover:text-gray-900 dark:hover:text-text-primary border-b-2 border-transparent'
                }
              `}
            >
              <span className="flex-shrink-0">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden text-[11px]">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {children(activeTab)}
      </div>
    </div>
  );
}

