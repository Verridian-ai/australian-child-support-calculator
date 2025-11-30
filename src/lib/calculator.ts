// Australian Child Support Calculator Logic

// Constants from the research data
export const CONSTANTS = {
  SELF_SUPPORT_AMOUNT: 29841, // $29,841
  COTC_BASE_COST: 12086, // $12,086 base cost
  COTC_THRESHOLD: 44762, // $44,762 income threshold
  COTC_ADDITIONAL_RATE: 0.26, // 26% additional rate above threshold
  THRESHOLD_REDUCTION_PERCENTAGE: 0.15, // 15% reduction rule for wage changes
} as const;

export interface ChildSupportInputs {
  parentA_ATI: number;
  parentB_ATI: number;
  numberOfChildren: number;
  childrenAges: number[];
  parentA_CareNights: number;
  parentB_CareNights: number;
  currentWage: number;
}

export interface ChildSupportCalculationStep {
  stepNumber: number;
  title: string;
  description: string;
  formula: string;
  value: number;
  details?: Record<string, any>;
}

export interface ChildSupportResult {
  steps: ChildSupportCalculationStep[];
  finalAmount: number;
  parentA_PerChild: number;
  parentB_PerChild: number;
  totalAmount: number;
  offsetApplied: boolean;
}

/**
 * Calculate care percentage from nights of care
 */
export function calculateCarePercentage(nights: number): number {
  const totalNights = 365;
  return (nights / totalNights) * 100;
}

/**
 * Calculate cost percentage from care percentage
 * This is a simplified calculation - in reality, there are specific lookup tables
 */
export function calculateCostPercentage(carePercentage: number): number {
  // Simplified cost percentage calculation based on care percentage
  // In reality, this uses specific table lookups from the DSS guide
  if (carePercentage <= 14) return 0;
  if (carePercentage <= 34) return 0.24;
  if (carePercentage <= 47) return 0.5;
  if (carePercentage <= 65) return 0.65;
  if (carePercentage <= 85) return 0.76;
  return 0.82;
}

/**
 * Calculate the 8-step Australian child support formula
 */
export function calculateChildSupport(inputs: ChildSupportInputs): ChildSupportResult {
  const steps: ChildSupportCalculationStep[] = [];
  const { parentA_ATI, parentB_ATI, numberOfChildren, childrenAges, parentA_CareNights, parentB_CareNights } = inputs;

  // Step 1: Calculate Child Support Income (each parent's ATI minus self-support)
  const parentA_CSI = Math.max(0, parentA_ATI - CONSTANTS.SELF_SUPPORT_AMOUNT);
  const parentB_CSI = Math.max(0, parentB_ATI - CONSTANTS.SELF_SUPPORT_AMOUNT);
  
  steps.push({
    stepNumber: 1,
    title: "Child Support Income",
    description: "Calculate each parent's child support income (ATI minus self-support)",
    formula: "Parent A: $50,000 - $29,841 = $20,159",
    value: parentA_CSI + parentB_CSI,
    details: {
      parentA_ATI,
      parentB_ATI,
      parentA_CSI,
      parentB_CSI,
      selfSupportAmount: CONSTANTS.SELF_SUPPORT_AMOUNT,
    },
  });

  // Step 2: Combined Child Support Income
  const combinedCSI = parentA_CSI + parentB_CSI;
  steps.push({
    stepNumber: 2,
    title: "Combined Child Support Income",
    description: "Add both parents' child support incomes",
    formula: `$${parentA_CSI.toLocaleString()} + $${parentB_CSI.toLocaleString()}`,
    value: combinedCSI,
    details: {
      parentA_CSI,
      parentB_CSI,
    },
  });

  // Step 3: Income Percentage
  const parentA_IncomePercentage = (parentA_CSI / combinedCSI) * 100;
  const parentB_IncomePercentage = (parentB_CSI / combinedCSI) * 100;
  
  steps.push({
    stepNumber: 3,
    title: "Income Percentage",
    description: "Calculate each parent's share of combined income",
    formula: `Parent A: ($${parentA_CSI.toLocaleString()} / $${combinedCSI.toLocaleString()}) × 100`,
    value: parentA_IncomePercentage,
    details: {
      parentA_Percentage: parentA_IncomePercentage,
      parentB_Percentage: parentB_IncomePercentage,
    },
  });

  // Step 4: Care Percentage
  const parentA_CarePercentage = calculateCarePercentage(parentA_CareNights);
  const parentB_CarePercentage = calculateCarePercentage(parentB_CareNights);
  
  steps.push({
    stepNumber: 4,
    title: "Care Percentage",
    description: "Calculate care percentage from annual nights of care",
    formula: `Parent A: (${parentA_CareNights} nights / 365 days) × 100`,
    value: parentA_CarePercentage,
    details: {
      parentA_Nights: parentA_CareNights,
      parentB_Nights: parentB_CareNights,
      parentA_Percentage: parentA_CarePercentage,
      parentB_Percentage: parentB_CarePercentage,
    },
  });

  // Step 5: Cost Percentage
  const parentA_CostPercentage = calculateCostPercentage(parentA_CarePercentage);
  const parentB_CostPercentage = calculateCostPercentage(parentB_CarePercentage);
  
  steps.push({
    stepNumber: 5,
    title: "Cost Percentage",
    description: "Translate care into a share of child-related costs",
    formula: `Parent A: ${parentA_CostPercentage.toFixed(2)} (76% for 80% care)`,
    value: parentA_CostPercentage * 100,
    details: {
      parentA_Percentage: parentA_CostPercentage * 100,
      parentB_Percentage: parentB_CostPercentage * 100,
    },
  });

  // Step 6: Child Support Percentage
  const parentA_CSP = parentA_IncomePercentage / 100 - parentA_CostPercentage;
  const parentB_CSP = parentB_IncomePercentage / 100 - parentB_CostPercentage;
  
  steps.push({
    stepNumber: 6,
    title: "Child Support Percentage",
    description: "Income percentage minus cost percentage",
    formula: `Parent A: ${(parentA_IncomePercentage / 100).toFixed(4)} - ${parentA_CostPercentage.toFixed(4)}`,
    value: parentA_CSP * 100,
    details: {
      parentA_Percentage: parentA_CSP * 100,
      parentB_Percentage: parentB_CSP * 100,
    },
  });

  // Step 7: Costs of the Children (COTC)
  const incomeAboveThreshold = Math.max(0, combinedCSI - CONSTANTS.COTC_THRESHOLD);
  const additionalAmount = incomeAboveThreshold * CONSTANTS.COTC_ADDITIONAL_RATE;
  const totalCOTC = CONSTANTS.COTC_BASE_COST + additionalAmount;
  const perChildCOTC = totalCOTC / numberOfChildren;
  
  steps.push({
    stepNumber: 7,
    title: "Costs of the Children (COTC)",
    description: "Calculate total cost of raising children based on income and age",
    formula: `$${CONSTANTS.COTC_BASE_COST.toLocaleString()} + (26% × $${incomeAboveThreshold.toLocaleString()})`,
    value: totalCOTC,
    details: {
      baseCost: CONSTANTS.COTC_BASE_COST,
      threshold: CONSTANTS.COTC_THRESHOLD,
      additionalRate: CONSTANTS.COTC_ADDITIONAL_RATE,
      incomeAboveThreshold,
      additionalAmount,
      perChildCOTC,
    },
  });

  // Step 8: Final Amount
  const parentA_Amount = parentA_CSP * perChildCOTC * numberOfChildren;
  const parentB_Amount = parentB_CSP * perChildCOTC * numberOfChildren;
  
  // Apply offset rule - if both parents have positive amounts, they offset
  let finalAmount: number;
  let offsetApplied = false;
  
  if (parentA_Amount > 0 && parentB_Amount > 0) {
    // Offset the amounts
    finalAmount = Math.abs(parentA_Amount - parentB_Amount);
    offsetApplied = true;
  } else {
    finalAmount = Math.max(parentA_Amount, parentB_Amount);
  }
  
  steps.push({
    stepNumber: 8,
    title: "Final Annual Amount",
    description: "Child support percentage × COTC (with offset if applicable)",
    formula: `${(parentA_CSP * 100).toFixed(2)}% × $${perChildCOTC.toFixed(0)} × ${numberOfChildren} children`,
    value: finalAmount,
    details: {
      parentA_Amount,
      parentB_Amount,
      offsetApplied,
      finalAmount,
    },
  });

  return {
    steps,
    finalAmount,
    parentA_PerChild: Math.max(0, parentA_Amount / numberOfChildren),
    parentB_PerChild: Math.max(0, parentB_Amount / numberOfChildren),
    totalAmount: finalAmount * numberOfChildren,
    offsetApplied,
  };
}

/**
 * Calculate 15% wage reduction threshold
 */
export function calculateWageThreshold(currentWage: number): number {
  return currentWage * (1 - CONSTANTS.THRESHOLD_REDUCTION_PERCENTAGE);
}

/**
 * Check if wage reduction qualifies for new estimate (15% rule)
 */
export function checkWageReduction(newWage: number, previousWage: number): {
  qualifies: boolean;
  percentage: number;
  threshold: number;
} {
  const threshold = calculateWageThreshold(previousWage);
  const percentage = ((previousWage - newWage) / previousWage) * 100;
  const qualifies = percentage >= 15;

  return {
    qualifies,
    percentage,
    threshold,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercentage(percentage: number, decimals: number = 1): string {
  return `${percentage.toFixed(decimals)}%`;
}

/**
 * Save calculation to localStorage
 */
export function saveCalculation(inputs: ChildSupportInputs, result: ChildSupportResult): void {
  const calculations = getCalculations();
  const newCalculation = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    inputs,
    result,
  };
  calculations.push(newCalculation);
  
  // Keep only last 50 calculations
  if (calculations.length > 50) {
    calculations.splice(0, calculations.length - 50);
  }
  
  localStorage.setItem('childSupportCalculations', JSON.stringify(calculations));
}

/**
 * Get calculations from localStorage
 */
export function getCalculations(): Array<{
  id: number;
  timestamp: string;
  inputs: ChildSupportInputs;
  result: ChildSupportResult;
}> {
  const stored = localStorage.getItem('childSupportCalculations');
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save current wage to localStorage
 */
export function saveCurrentWage(wage: number): void {
  localStorage.setItem('currentWage', wage.toString());
}

/**
 * Get current wage from localStorage
 */
export function getCurrentWage(): number {
  const stored = localStorage.getItem('currentWage');
  return stored ? parseFloat(stored) : 0;
}

/**
 * Get wage history from localStorage
 */
export function getWageHistory(): Array<{
  wage: number;
  timestamp: string;
}> {
  const stored = localStorage.getItem('wageHistory');
  return stored ? JSON.parse(stored) : [];
}

/**
 * Save wage to history
 */
export function saveWageToHistory(wage: number): void {
  const history = getWageHistory();
  const newEntry = {
    wage,
    timestamp: new Date().toISOString(),
  };
  history.push(newEntry);
  
  // Keep only last 20 wage entries
  if (history.length > 20) {
    history.splice(0, history.length - 20);
  }
  
  localStorage.setItem('wageHistory', JSON.stringify(history));
}

/**
 * Clear all localStorage data
 */
export function clearAllData(): void {
  localStorage.removeItem('childSupportCalculations');
  localStorage.removeItem('currentWage');
  localStorage.removeItem('wageHistory');
}