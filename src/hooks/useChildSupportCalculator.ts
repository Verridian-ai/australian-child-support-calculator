import { useState, useEffect } from 'react';
import { 
  calculateChildSupport, 
  checkWageReduction, 
  getCalculations, 
  getCurrentWage, 
  getWageHistory,
  saveCurrentWage,
  saveWageToHistory,
  saveCalculation,
  type ChildSupportInputs,
  type ChildSupportResult
} from '../lib/calculator';

export function useChildSupportCalculator() {
  const [inputs, setInputs] = useState<ChildSupportInputs>({
    parentA_ATI: 50000,
    parentB_ATI: 60000,
    numberOfChildren: 3,
    childrenAges: [9, 7, 5],
    parentA_CareNights: 290,
    parentB_CareNights: 75,
    currentWage: 97000,
  });

  const [result, setResult] = useState<ChildSupportResult | null>(null);
  const [calculations, setCalculations] = useState(getCalculations());
  const [currentWage, setCurrentWage] = useState(getCurrentWage());
  const [wageHistory, setWageHistory] = useState(getWageHistory());
  const [alert, setAlert] = useState<{
    type: 'warning' | 'info' | 'success';
    title: string;
    message: string;
    show: boolean;
  }>({ type: 'warning', title: '', message: '', show: false });

  // Calculate child support when inputs change
  useEffect(() => {
    if (inputs.parentA_ATI && inputs.parentB_ATI && inputs.numberOfChildren > 0) {
      const newResult = calculateChildSupport(inputs);
      setResult(newResult);
    }
  }, [inputs]);

  // Check for 15% wage reduction alert
  useEffect(() => {
    if (currentWage && currentWage !== inputs.currentWage) {
      const wageCheck = checkWageReduction(currentWage, inputs.currentWage);
      
      if (wageCheck.qualifies) {
        setAlert({
          type: 'warning',
          title: 'New Estimate Available',
          message: `Your wage has decreased by ${wageCheck.percentage.toFixed(1)}% (to $${currentWage.toLocaleString()}). You may be eligible for a new child support estimate.`,
          show: true,
        });
      } else {
        setAlert({
          type: 'info',
          title: 'Wage Change Detected',
          message: `Wage decreased by ${wageCheck.percentage.toFixed(1)}%. Reduction must be at least 15% for a new estimate.`,
          show: true,
        });
      }
    }
  }, [currentWage, inputs.currentWage]);

  const handleCalculate = () => {
    if (result) {
      saveCalculation(inputs, result);
      setCalculations(getCalculations());
      
      setAlert({
        type: 'success',
        title: 'Calculation Saved',
        message: 'Your child support calculation has been saved to history.',
        show: true,
      });
    }
  };

  const handleWageChange = (newWage: number) => {
    setCurrentWage(newWage);
    saveCurrentWage(newWage);
    setInputs(prev => ({ ...prev, currentWage: newWage }));
    saveWageToHistory(newWage);
    setWageHistory(getWageHistory());
  };

  const handleInputsChange = (newInputs: Partial<ChildSupportInputs>) => {
    setInputs(prev => ({ ...prev, ...newInputs }));
  };

  const dismissAlert = () => {
    setAlert(prev => ({ ...prev, show: false }));
  };

  return {
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
  };
}

