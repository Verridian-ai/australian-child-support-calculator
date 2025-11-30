import React from 'react';
import { TabContainer, type TabId } from './components/layout/TabContainer';
import { MainLayout } from './components/layout/MainLayout';
import AlertBanner from './components/AlertBanner';
import { useChildSupportCalculator } from './hooks/useChildSupportCalculator';
import { useInteractiveGuide } from './hooks/useInteractiveGuide';

// Tab Content Components
import CalculatorInputsTab from './components/tabs/CalculatorInputsTab';
import StepByStepGuideTab from './components/tabs/StepByStepGuideTab';
import FinalResultTab from './components/tabs/FinalResultTab';
import WageTrackerTab from './components/tabs/WageTrackerTab';
import HistoryAndThresholdsTab from './components/tabs/HistoryAndThresholdsTab';
import AboutAndLegalTab from './components/tabs/AboutAndLegalTab';

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

  const renderTabContent = (activeTab: TabId) => {
    switch (activeTab) {
      case 'inputs':
        return (
          <CalculatorInputsTab
            inputs={inputs}
            result={result}
            onInputsChange={handleInputsChange}
            onCalculate={handleCalculate}
            onShowGuide={(section) => toggleInteractiveGuide(section)}
          />
        );
      case 'guide':
        return (
          <StepByStepGuideTab
            steps={result?.steps || []}
            showInteractiveGuide={showInteractiveGuide}
            activeSection={activeSection}
            highlightedButtons={highlightedButtons}
            calculatorDisplay={calculatorDisplay}
            onButtonHighlight={handleButtonHighlight}
            onGuideStepComplete={handleGuideStepComplete}
            onCalculatorClick={(btn) => handleButtonClick(btn, handleCalculate)}
            onInputChange={handleInputsChange}
            onToggleGuide={() => toggleInteractiveGuide()}
          />
        );
      case 'result':
        return (
          <FinalResultTab
            result={result}
            inputs={inputs}
            onViewGuide={() => toggleInteractiveGuide()}
          />
        );
      case 'wage':
        return (
          <WageTrackerTab
            currentWage={currentWage}
            wageHistory={wageHistory}
            onWageChange={handleWageChange}
          />
        );
      case 'history':
        return (
          <HistoryAndThresholdsTab
            calculations={calculations}
            onLoadCalculation={setInputs}
          />
        );
      case 'about':
        return <AboutAndLegalTab />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      {/* Alert Banner */}
      <AlertBanner 
        alert={alert}
        onDismiss={dismissAlert}
        onCalculate={handleCalculate}
      />

      {/* Tabbed Interface */}
      <TabContainer>
        {(activeTab) => renderTabContent(activeTab)}
      </TabContainer>
    </MainLayout>
  );
}

export default App;
