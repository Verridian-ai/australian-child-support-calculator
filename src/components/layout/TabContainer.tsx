import React, { useState, useEffect } from 'react';
import { Calculator, BookOpen, FileText, DollarSign, History, Info } from 'lucide-react';

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

  return (
    <div className="w-full">
      {/* Tab Bar */}
      <div className="border-b border-gray-200 dark:border-dark-700 mb-6">
        <nav className="flex space-x-1 overflow-x-auto scrollbar-hide" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.location.hash = tab.id;
              }}
              className={`
                flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap
                transition-all duration-200 relative
                ${
                  activeTab === tab.id
                    ? 'text-accent-teal border-b-2 border-accent-teal'
                    : 'text-gray-600 dark:text-text-secondary hover:text-gray-900 dark:hover:text-text-primary border-b-2 border-transparent'
                }
              `}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
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

