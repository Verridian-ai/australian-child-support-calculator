# API Reference

This document provides detailed documentation for all public functions, types, and interfaces in the Australian Child Support Calculator.

---

## Calculator Module

Location: `src/lib/calculator.ts`

### Types

#### `ChildSupportInputs`

Input parameters for child support calculation.

```typescript
interface ChildSupportInputs {
  parentA_ATI: number;        // Parent A's Adjusted Taxable Income
  parentB_ATI: number;        // Parent B's Adjusted Taxable Income
  numberOfChildren: number;   // Number of children in assessment
  childrenAges: number[];     // Array of each child's age
  parentA_CareNights: number; // Annual nights with Parent A (0-365)
  parentB_CareNights: number; // Annual nights with Parent B (0-365)
  currentWage: number;        // Current wage for tracking purposes
}
```

#### `ChildSupportCalculationStep`

Represents a single step in the calculation process.

```typescript
interface ChildSupportCalculationStep {
  stepNumber: number;         // Step number (1-8)
  title: string;              // Human-readable step title
  description: string;        // Explanation of the step
  formula: string;            // Formula used in this step
  value: number;              // Calculated value
  details?: Record<string, any>;  // Additional details
}
```

#### `ChildSupportResult`

Complete result of a child support calculation.

```typescript
interface ChildSupportResult {
  steps: ChildSupportCalculationStep[];  // All 8 calculation steps
  finalAmount: number;                    // Annual child support amount
  parentA_PerChild: number;               // Per-child amount (Parent A)
  parentB_PerChild: number;               // Per-child amount (Parent B)
  totalAmount: number;                    // Total annual amount
  offsetApplied: boolean;                 // Whether offset was applied
}
```

---

### Functions

#### `calculateChildSupport()`

Performs the complete 8-step child support calculation.

```typescript
function calculateChildSupport(inputs: ChildSupportInputs): ChildSupportResult
```

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| inputs | `ChildSupportInputs` | All required input values |

**Returns:** `ChildSupportResult` - Complete calculation result with all steps

**Example:**
```typescript
const inputs: ChildSupportInputs = {
  parentA_ATI: 90000,
  parentB_ATI: 50000,
  numberOfChildren: 2,
  childrenAges: [8, 12],
  parentA_CareNights: 110,
  parentB_CareNights: 255,
  currentWage: 90000
};

const result = calculateChildSupport(inputs);
console.log(result.finalAmount); // Annual amount
```

---

#### `calculateCarePercentage()`

Converts annual nights of care to a percentage.

```typescript
function calculateCarePercentage(nights: number): number
```

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| nights | `number` | Annual nights of care (0-365) |

**Returns:** `number` - Care percentage (0-100)

**Example:**
```typescript
calculateCarePercentage(182);  // Returns: 49.86 (approximately 50%)
calculateCarePercentage(365);  // Returns: 100
calculateCarePercentage(0);    // Returns: 0
```

---

#### `calculateCostPercentage()`

Translates care percentage to cost percentage using the care cost table.

```typescript
function calculateCostPercentage(carePercentage: number): number
```

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| carePercentage | `number` | Care percentage from `calculateCarePercentage()` |

**Returns:** `number` - Cost percentage as a decimal (0-1)

**Care Cost Table:**
| Care % | Cost % |
|--------|--------|
| 0-13% | 0.00 |
| 14-34% | 0.24 |
| 35-47% | 0.25-0.50 (sliding) |
| 48-52% | 0.50 |
| 53-65% | 0.51-0.75 (sliding) |
| 66-85% | 0.76 |
| 86-100% | 1.00 |

**Example:**
```typescript
calculateCostPercentage(30);  // Returns: 0.24
calculateCostPercentage(50);  // Returns: 0.50
calculateCostPercentage(75);  // Returns: 0.76
```

---

#### `calculateWageThreshold()`

Calculates the 15% wage reduction threshold.

```typescript
function calculateWageThreshold(currentWage: number): number
```

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| currentWage | `number` | Current annual wage |

**Returns:** `number` - 15% reduction threshold

**Example:**
```typescript
calculateWageThreshold(100000);  // Returns: 85000
calculateWageThreshold(80000);   // Returns: 68000
```

---

#### `checkWageReduction()`

Checks if a wage reduction qualifies for a new child support estimate.

```typescript
function checkWageReduction(
  newWage: number,
  previousWage: number
): {
  qualifies: boolean;
  percentage: number;
  threshold: number;
}
```

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| newWage | `number` | New/current wage |
| previousWage | `number` | Previous wage used in assessment |

**Returns:**
| Property | Type | Description |
|----------|------|-------------|
| qualifies | `boolean` | Whether 15% threshold is met |
| percentage | `number` | Actual reduction percentage |
| threshold | `number` | Calculated threshold value |

**Example:**
```typescript
const result = checkWageReduction(75000, 100000);
// result = { qualifies: true, percentage: 25, threshold: 85000 }
```

---

#### `formatCurrency()`

Formats a number as Australian currency.

```typescript
function formatCurrency(amount: number): string
```

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| amount | `number` | Amount to format |

**Returns:** `string` - Formatted currency string (e.g., "$10,858")

**Example:**
```typescript
formatCurrency(10858.45);  // Returns: "$10,858"
formatCurrency(0);         // Returns: "$0"
```

---

#### `formatPercentage()`

Formats a number as a percentage string.

```typescript
function formatPercentage(percentage: number, decimals?: number): string
```

**Parameters:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| percentage | `number` | - | Percentage value |
| decimals | `number` | 1 | Decimal places |

**Returns:** `string` - Formatted percentage (e.g., "74.9%")

**Example:**
```typescript
formatPercentage(74.9);      // Returns: "74.9%"
formatPercentage(74.9, 0);   // Returns: "75%"
formatPercentage(74.9, 2);   // Returns: "74.90%"
```

---

### Storage Functions

#### `saveCalculation()`

Saves a calculation to localStorage.

```typescript
function saveCalculation(
  inputs: ChildSupportInputs,
  result: ChildSupportResult
): void
```

**Notes:**
- Maximum 50 calculations are stored
- Oldest calculations are removed when limit is reached

---

#### `getCalculations()`

Retrieves all saved calculations.

```typescript
function getCalculations(): Array<{
  id: number;
  timestamp: string;
  inputs: ChildSupportInputs;
  result: ChildSupportResult;
}>
```

**Returns:** Array of saved calculations with timestamps

---

#### `saveCurrentWage()`

Saves the current wage to localStorage.

```typescript
function saveCurrentWage(wage: number): void
```

---

#### `getCurrentWage()`

Retrieves the current wage from localStorage.

```typescript
function getCurrentWage(): number
```

**Returns:** `number` - Current wage, or 0 if not set

---

#### `saveWageToHistory()`

Adds a wage entry to the wage history.

```typescript
function saveWageToHistory(wage: number): void
```

**Notes:**
- Maximum 20 entries are stored
- Each entry includes a timestamp

---

#### `getWageHistory()`

Retrieves the wage history.

```typescript
function getWageHistory(): Array<{
  wage: number;
  timestamp: string;
}>
```

---

#### `clearAllData()`

Clears all localStorage data for the application.

```typescript
function clearAllData(): void
```

**Warning:** This is irreversible and removes all saved calculations and wage history.

---

## Rates Module

Location: `src/lib/rates/2024-2025.ts`

### Types

#### `CostTableEntry`

Entry in the COTC (Costs of the Children) table.

```typescript
interface CostTableEntry {
  lowerBound: number;  // Lower income bound
  baseCost: number;    // Base cost at this level
  rate: number;        // Percentage rate above bound
}
```

### Constants

#### `RATES_2024_2025`

Current year rates and thresholds.

```typescript
const RATES_2024_2025 = {
  SELF_SUPPORT_AMOUNT: 29841,
  COTC_TABLE: {
    THRESHOLD: 44762,
    BASE_COST: 12086,
    ADDITIONAL_RATE: 0.26,
  },
  WAGE_REDUCTION_THRESHOLD_PERCENTAGE: 0.15,
};
```

### Functions

#### `getRates()`

Returns the rates for a specified year.

```typescript
function getRates(year?: string): typeof RATES_2024_2025
```

**Parameters:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| year | `string` | '2024-2025' | Financial year |

**Returns:** Rate configuration object

---

## Hooks

### `useChildSupportCalculator`

Location: `src/hooks/useChildSupportCalculator.ts`

Main hook for calculator state management.

```typescript
function useChildSupportCalculator(): {
  inputs: ChildSupportInputs;
  result: ChildSupportResult | null;
  calculations: SavedCalculation[];
  currentWage: number;
  wageHistory: WageEntry[];
  alert: AlertState | null;
  setInputs: (inputs: ChildSupportInputs) => void;
  handleCalculate: () => void;
  handleWageChange: (wage: number) => void;
  handleInputsChange: (partial: Partial<ChildSupportInputs>) => void;
  dismissAlert: () => void;
}
```

---

### `useInteractiveGuide`

Location: `src/hooks/useInteractiveGuide.ts`

Hook for interactive guide state management.

```typescript
function useInteractiveGuide(): {
  showInteractiveGuide: boolean;
  highlightedButtons: string[];
  calculatorDisplay: string;
  handleButtonHighlight: (buttons: string[]) => void;
  handleGuideStepComplete: () => void;
  handleButtonClick: (button: string, callback: () => void) => void;
  toggleInteractiveGuide: () => void;
}
```

---

### `useMobile`

Location: `src/hooks/use-mobile.tsx`

Hook for mobile/responsive detection.

```typescript
function useMobile(): boolean
```

**Returns:** `true` if viewport is mobile-sized (< 768px)

---

## Utility Functions

Location: `src/lib/utils.ts`

### `cn()`

Utility for merging Tailwind CSS classes.

```typescript
function cn(...inputs: ClassValue[]): string
```

**Example:**
```typescript
cn('text-white', 'bg-blue-500', isActive && 'font-bold');
// Returns merged and deduplicated class string
```

---

## Component Props

### `CalculatorInputs`

```typescript
interface CalculatorInputsProps {
  inputs: ChildSupportInputs;
  onChange: (partial: Partial<ChildSupportInputs>) => void;
  onCalculate: () => void;
  result: ChildSupportResult | null;
}
```

### `CalculationSteps`

```typescript
interface CalculationStepsProps {
  steps: ChildSupportCalculationStep[];
}
```

### `WageTracker`

```typescript
interface WageTrackerProps {
  currentWage: number;
  wageHistory: WageEntry[];
  onWageChange: (wage: number) => void;
}
```

### `CalculationHistory`

```typescript
interface CalculationHistoryProps {
  calculations: SavedCalculation[];
  onLoadCalculation: (inputs: ChildSupportInputs) => void;
}
```

### `AlertBanner`

```typescript
interface AlertBannerProps {
  alert: AlertState | null;
  onDismiss: () => void;
  onCalculate: () => void;
}
```

---

## Error Handling

All calculator functions include safety checks:

```typescript
// Division by zero protection
const percentage = combinedCSI > 0
  ? (parentA_CSI / combinedCSI) * 100
  : 0;

// Negative value protection
const csi = Math.max(0, ati - selfSupportAmount);

// NaN protection
const result = isNaN(value) ? 0 : value;
```

---

## localStorage Keys

| Key | Type | Description |
|-----|------|-------------|
| `childSupportCalculations` | `Array` | Saved calculations (max 50) |
| `currentWage` | `number` | Current tracked wage |
| `wageHistory` | `Array` | Wage history (max 20) |

---

*For architectural overview, see [Architecture](Architecture.md).*
