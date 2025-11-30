import { useState } from 'react';

export function useInteractiveGuide() {
  const [showInteractiveGuide, setShowInteractiveGuide] = useState(false);
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

  const toggleInteractiveGuide = () => {
    setShowInteractiveGuide(!showInteractiveGuide);
    if (!showInteractiveGuide) {
      // Reset state when closing
      setHighlightedButtons([]);
      setCalculatorDisplay('0');
    }
  };

  return {
    showInteractiveGuide,
    highlightedButtons,
    calculatorDisplay,
    handleButtonHighlight,
    handleGuideStepComplete,
    handleButtonClick,
    toggleInteractiveGuide
  };
}

