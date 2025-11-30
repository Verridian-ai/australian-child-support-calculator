/**
 * Australian Child Support Rates and Thresholds for 2024-2025
 * Sourced from Department of Social Services and Services Australia
 */

export interface CostTableEntry {
  lowerBound: number;
  baseCost: number;
  rate: number; // The percentage applied to income above lowerBound
}

export const RATES_2024_2025 = {
  // Self-support amount (indexed annually)
  SELF_SUPPORT_AMOUNT: 29841,

  // Costs of the Children (COTC) Thresholds and Rates
  // Note: This is a simplified representation. The actual table has multiple bands based on age/number of children.
  // We will use the standard single-band approach for the calculator MVP, but structure it for expansion.
  COTC_TABLE: {
    // Threshold for the "income above threshold" calculation
    THRESHOLD: 44762,
    
    // Base cost for incomes up to the threshold (simplified for MVP, usually derived from a matrix)
    BASE_COST: 12086,
    
    // Rate applied to income above the threshold
    ADDITIONAL_RATE: 0.26,
  },

  // Care Percentage Cost Table (Breakpoints)
  CARE_COST_TABLE: [
    { minCare: 0, maxCare: 13.99, costPercentage: 0 },        // Below 14% care
    { minCare: 14, maxCare: 34.99, costPercentage: 24 },      // 14% to less than 35%
    { minCare: 35, maxCare: 47.99, costPercentage: 25 + ((47.99 - 35) * 0.5) }, // Simplified: Ranges 35-47% usually map 25-50% linearly or step-wise. For MVP we use the lookup function in calculator.ts which handles this logic more dynamically, but we store standard breakpoints here.
    // Note: The lookup logic in calculator.ts is more robust for the linear interpolation steps (Steps 4-5).
    // We will stick to the logic in calculator.ts for now but referencing these breakpoints.
  ] as const,

  // Wage Reduction Threshold (15% rule)
  WAGE_REDUCTION_THRESHOLD_PERCENTAGE: 0.15,
} as const;

// Helper to get rates (extensible for future years)
export function getRates(year: string = '2024-2025') {
  // In a real app, this could switch on year.
  return RATES_2024_2025;
}

