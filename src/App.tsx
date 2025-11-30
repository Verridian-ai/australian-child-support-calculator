import React from 'react';
import CalculatorInputs from './components/CalculatorInputs';
import CalculationSteps from './components/CalculationSteps';
import WageTracker from './components/WageTracker';
import CalculationHistory from './components/CalculationHistory';
import AlertBanner from './components/AlertBanner';
import NeumorphicCalculator from './components/NeumorphicCalculator';
import InteractiveGuide from './components/InteractiveGuide';
import ButtonHighlighter from './components/ButtonHighlighter';
import { useChildSupportCalculator } from './hooks/useChildSupportCalculator';
import { useInteractiveGuide } from './hooks/useInteractiveGuide';
import { MainLayout } from './components/layout/MainLayout';

function App() {
  const {
    inputs,
    result,
    calculations,
    currentWage,
    wageHistory,
    alert,
    setInputs,
    handleCalculate,
    handleWageChange,
    handleInputsChange,
    dismissAlert
  } = useChildSupportCalculator();

  const {
    showInteractiveGuide,
    activeSection,
    highlightedButtons,
    calculatorDisplay,
    handleButtonHighlight,
    handleGuideStepComplete,
    handleButtonClick,
    toggleInteractiveGuide
  } = useInteractiveGuide();

  return (
    <MainLayout 
      showInteractiveGuide={showInteractiveGuide} 
      toggleInteractiveGuide={() => toggleInteractiveGuide()}
    >
      {/* Alert Banner */}
      <AlertBanner 
        alert={alert}
        onDismiss={dismissAlert}
        onCalculate={handleCalculate}
      />

      {/* Interactive Educational Guide */}
      {showInteractiveGuide && result && (
        <div className="mb-8 animate-fade-in">
          <InteractiveGuide
            steps={result.steps}
            onButtonHighlight={handleButtonHighlight}
            onGuideStepComplete={handleGuideStepComplete}
            onCalculatorClick={(btn) => handleButtonClick(btn, handleCalculate)}
            onInputChange={handleInputsChange}
            activeSection={activeSection}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Calculator Panel */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Input Section */}
          <div className="glass-panel-lg animate-slide-up p-4 sm:p-6 md:p-8" style={{ animationDelay: '100ms' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-text-primary mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-1.5 h-6 bg-primary-500 rounded-full mr-3" />
                Calculation Inputs
              </div>
              <button 
                onClick={() => toggleInteractiveGuide()} 
                className="text-sm text-accent-teal hover:text-accent-teal/80 flex items-center"
              >
                 Full Guide
              </button>
            </h2>
            <CalculatorInputs 
              inputs={inputs}
              onChange={handleInputsChange}
              onCalculate={handleCalculate}
              result={result}
              onShowGuide={(section) => toggleInteractiveGuide(section)}
            />
          </div>

          {/* Results Section */}
          {result && (
            <div className="glass-panel-lg animate-slide-up p-4 sm:p-6 md:p-8" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-text-primary mb-6 flex items-center">
                 <div className="w-1.5 h-6 bg-accent-orange rounded-full mr-3" />
                Step-by-Step Calculation
              </h2>
              <CalculationSteps steps={result.steps} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:space-y-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
          {/* Interactive Calculator (Guide Mode) */}
          <div className="glass-panel-sm transition-transform duration-300 hover:scale-[1.01]">
            <h3 className="text-lg font-semibold text-accent-teal mb-4">
              Interactive Calculator
            </h3>
            <ButtonHighlighter
              highlightedButtons={highlightedButtons}
              onButtonClick={(btn) => handleButtonClick(btn, handleCalculate)}
              currentDisplay={calculatorDisplay}
            />
          </div>

          {/* Traditional Calculator (Manual Mode) */}
          <div className="glass-panel-sm transition-transform duration-300 hover:scale-[1.01]">
            <h3 className="text-lg font-semibold text-accent-teal mb-4">
              Manual Calculator
            </h3>
            <NeumorphicCalculator 
              onValueChange={(value) => {
                handleWageChange(value);
              }}
              currentValue={currentWage}
            />
          </div>

          {/* Wage Tracker */}
          <div className="glass-panel-sm transition-transform duration-300 hover:scale-[1.01]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary mb-4">
              Wage Tracker
            </h3>
            <WageTracker
              currentWage={currentWage}
              wageHistory={wageHistory}
              onWageChange={handleWageChange}
            />
          </div>

          {/* Calculation History */}
          <div className="glass-panel-sm transition-transform duration-300 hover:scale-[1.01]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary mb-4">
              Calculation History
            </h3>
            <CalculationHistory 
              calculations={calculations}
              onLoadCalculation={(calcInputs) => setInputs(calcInputs)}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
