import { useState } from 'react';

export function useInteractiveGuide() {
  const [showInteractiveGuide, setShowInteractiveGuide] = useState(false);
  const [activeSection, setActiveSection] = useState<string | undefined>(undefined);
  const [highlightedButtons, setHighlightedButtons] = useState<string[]>([]);
  const [calculatorDisplay, setCalculatorDisplay] = useState('0');

  const handleButtonHighlight = (buttonSequence: string[]) => {
    setHighlightedButtons(buttonSequence);
  };

  const handleGuideStepComplete = () => {
    console.log('Guide step completed');
  };

  const handleButtonClick = (button: string, onCalculate?: () => void) => {
    if (button === 'C') {
      setCalculatorDisplay('0');
    } else if (button === '=') {
      // Simple simulation for demo purposes
      const result = parseFloat(calculatorDisplay) * 1.1; 
      setCalculatorDisplay(result.toString());
    } else if (button === 'CALCULATE') {
      onCalculate?.();
    } else if (['÷', '×', '-', '+', '='].includes(button)) {
      setCalculatorDisplay(prev => prev + ' ' + button + ' ');
    } else {
      setCalculatorDisplay(prev => {
        if (prev === '0') {
          return button;
        } else {
          return prev + button;
        }
      });
    }
  };

  const toggleInteractiveGuide = (section?: string) => {
    if (section) {
      setActiveSection(section);
      setShowInteractiveGuide(true);
    } else {
      // Toggle if no section provided, or close if already open
      if (showInteractiveGuide) {
        setShowInteractiveGuide(false);
        setActiveSection(undefined);
        setHighlightedButtons([]);
        setCalculatorDisplay('0');
      } else {
        setShowInteractiveGuide(true);
      }
    }
  };

  return {
    showInteractiveGuide,
    activeSection,
    highlightedButtons,
    calculatorDisplay,
    handleButtonHighlight,
    handleGuideStepComplete,
    handleButtonClick,
    toggleInteractiveGuide
  };
}

