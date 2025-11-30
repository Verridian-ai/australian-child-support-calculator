# Architecture

This document describes the technical architecture and design decisions of the Australian Child Support Calculator.

---

## System Overview

The application is a **single-page application (SPA)** built entirely on the client side. There are no backend servers, databases, or external API dependencies.

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   React Application                     │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌───────────────┐  │ │
│  │  │  Components  │ │    Hooks     │ │  Calculator   │  │ │
│  │  │   (UI)       │ │ (State Mgmt) │ │   (Logic)     │  │ │
│  │  └──────────────┘ └──────────────┘ └───────────────┘  │ │
│  │                          │                             │ │
│  │                          ▼                             │ │
│  │              ┌─────────────────────┐                   │ │
│  │              │    localStorage     │                   │ │
│  │              │   (Persistence)     │                   │ │
│  │              └─────────────────────┘                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Component Library |
| TypeScript | 5.6.2 | Type Safety |
| Vite | 6.0.1 | Build Tool & Dev Server |

### Styling

| Technology | Purpose |
|------------|---------|
| Tailwind CSS 3.4 | Utility-first styling |
| Custom CSS | Neumorphic effects, glassmorphism |
| CSS Variables | Design tokens, theming |

### UI Components

| Library | Purpose |
|---------|---------|
| Radix UI | Accessible primitives (dialogs, tooltips, etc.) |
| Lucide React | Icon library |
| Recharts | Data visualization |
| Sonner | Toast notifications |

### Form Management

| Library | Purpose |
|---------|---------|
| React Hook Form | Form state management |
| Zod | Schema validation |

---

## Project Structure

```
src/
├── components/              # React UI components
│   ├── layout/              # Layout components (Header, Footer, MainLayout)
│   ├── inputs/              # Input field components
│   ├── steps/               # Calculation step display components
│   ├── guide/               # Interactive guide components
│   └── [feature].tsx        # Feature-specific components
├── hooks/                   # Custom React hooks
│   ├── useChildSupportCalculator.ts   # Calculator state management
│   ├── useInteractiveGuide.ts         # Guide state management
│   └── use-mobile.tsx                 # Mobile detection
├── lib/                     # Core logic
│   ├── calculator.ts        # Calculation engine
│   ├── rates/               # Annual rate configurations
│   │   └── 2024-2025.ts     # Current year rates
│   └── utils.ts             # Utility functions
├── data/                    # Static data
│   └── guideSteps.ts        # Guide step definitions
├── App.tsx                  # Main application component
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

---

## Component Architecture

### Component Hierarchy

```
App
├── MainLayout
│   ├── Header
│   │   └── Guide Toggle
│   ├── AlertBanner
│   ├── InteractiveGuide (conditional)
│   ├── Main Content Grid
│   │   ├── Calculator Panel (Left - 2 cols)
│   │   │   ├── CalculatorInputs
│   │   │   │   ├── ParentIncomes
│   │   │   │   ├── ChildrenDetails
│   │   │   │   ├── CareArrangements
│   │   │   │   └── CurrentWage
│   │   │   └── CalculationSteps (conditional)
│   │   │       └── StepCard (×8)
│   │   │           └── StepContent
│   │   └── Sidebar (Right - 1 col)
│   │       ├── ButtonHighlighter
│   │       ├── NeumorphicCalculator
│   │       ├── WageTracker
│   │       └── CalculationHistory
│   └── Footer
└── ErrorBoundary
```

### Component Patterns

**Container/Presentational Pattern:**
- Container components manage state (via hooks)
- Presentational components receive props and render UI

**Composition Pattern:**
- Complex UIs built from smaller, reusable components
- Props drilling minimized through component composition

---

## State Management

### Hook-Based Architecture

State is managed through custom React hooks:

```typescript
// Main calculator state
const {
  inputs,           // Current input values
  result,           // Calculation result
  calculations,     // History of calculations
  currentWage,      // Tracked wage
  wageHistory,      // Wage history
  alert,            // Alert state
  setInputs,        // Update inputs
  handleCalculate,  // Perform calculation
  handleWageChange, // Update wage
  dismissAlert      // Clear alert
} = useChildSupportCalculator();

// Interactive guide state
const {
  showInteractiveGuide,   // Guide visibility
  highlightedButtons,     // Current highlighted buttons
  calculatorDisplay,      // Calculator display value
  handleButtonHighlight,  // Highlight buttons
  handleGuideStepComplete // Mark step complete
} = useInteractiveGuide();
```

### State Flow

```
User Input → Hook State Update → React Re-render → UI Update
                    │
                    ▼
            localStorage (persistence)
```

---

## Data Flow

### Calculation Flow

```
1. User enters inputs
       │
       ▼
2. handleCalculate() called
       │
       ▼
3. calculateChildSupport(inputs) runs
       │
       ▼
4. 8-step calculation executes
       │
       ▼
5. Result object returned
       │
       ▼
6. State updated with result
       │
       ▼
7. UI re-renders with new data
       │
       ▼
8. Calculation saved to localStorage
```

### Data Persistence

Data is persisted to `localStorage` using these keys:

| Key | Data |
|-----|------|
| `childSupportCalculations` | Array of past calculations (max 50) |
| `currentWage` | Current tracked wage |
| `wageHistory` | Array of wage entries (max 20) |

---

## Calculator Logic

### Core Algorithm (`calculator.ts`)

The calculator implements the 8-step Australian child support formula:

```typescript
export function calculateChildSupport(inputs: ChildSupportInputs): ChildSupportResult {
  const steps: ChildSupportCalculationStep[] = [];

  // Step 1: Child Support Income
  const parentA_CSI = Math.max(0, parentA_ATI - RATES.SELF_SUPPORT_AMOUNT);
  const parentB_CSI = Math.max(0, parentB_ATI - RATES.SELF_SUPPORT_AMOUNT);

  // Step 2: Combined Income
  const combinedCSI = parentA_CSI + parentB_CSI;

  // Step 3: Income Percentage
  const parentA_IncomePercentage = (parentA_CSI / combinedCSI) * 100;

  // Step 4: Care Percentage
  const parentA_CarePercentage = calculateCarePercentage(parentA_CareNights);

  // Step 5: Cost Percentage
  const parentA_CostPercentage = calculateCostPercentage(parentA_CarePercentage);

  // Step 6: Child Support Percentage
  const parentA_CSP = parentA_IncomePercentage - parentA_CostPercentage;

  // Step 7: Costs of the Children
  const totalCOTC = calculateCOTC(combinedCSI);

  // Step 8: Final Amount
  const finalAmount = parentA_CSP * totalCOTC * numberOfChildren;

  return { steps, finalAmount, ... };
}
```

### Rate Configuration

Rates are externalized for easy updating:

```typescript
// src/lib/rates/2024-2025.ts
export const RATES_2024_2025 = {
  SELF_SUPPORT_AMOUNT: 29841,
  COTC_TABLE: {
    THRESHOLD: 44762,
    BASE_COST: 12086,
    ADDITIONAL_RATE: 0.26,
  },
  WAGE_REDUCTION_THRESHOLD_PERCENTAGE: 0.15,
};
```

---

## Styling Architecture

### Design Tokens

Design tokens are defined in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      background: {
        primary: '#0A0E14',
        secondary: '#111827',
      },
      accent: {
        orange: '#FF6B35',
        teal: '#17A2B8',
        green: '#28A745',
      },
    },
  },
}
```

### CSS Architecture

**Layers:**
1. **Base** - Reset and typography (Tailwind)
2. **Components** - Reusable component styles
3. **Utilities** - Utility classes (Tailwind)
4. **Custom** - Neumorphic and glassmorphic effects

**Custom Effects:**

```css
/* Neumorphic button (depressed) */
.neumorphic-button {
  box-shadow:
    inset 4px 4px 8px rgba(0, 0, 0, 0.3),
    inset -4px -4px 8px rgba(255, 255, 255, 0.05);
}

/* Glassmorphic panel */
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## Error Handling

### Error Boundary

The application is wrapped in an ErrorBoundary component:

```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log error
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### Calculation Safety

Calculator functions include safety checks:

```typescript
// Prevent division by zero
const percentage = combinedCSI > 0
  ? (parentA_CSI / combinedCSI) * 100
  : 0;

// Ensure non-negative results
const csi = Math.max(0, ati - selfSupportAmount);
```

---

## Performance Considerations

### Optimization Strategies

1. **Component Memoization**
   - Use `React.memo` for pure components
   - `useMemo` for expensive calculations
   - `useCallback` for stable function references

2. **Lazy Loading**
   - Large components could be code-split
   - Currently not necessary due to small bundle size

3. **Efficient Re-renders**
   - State updates are batched
   - Minimal prop drilling

### Bundle Size

The production build is optimized:
- Tree-shaking removes unused code
- CSS is purged of unused styles
- Assets are hashed for caching

---

## Security Considerations

### No Backend = No Server Vulnerabilities

Without a backend:
- No SQL injection possible
- No authentication tokens to steal
- No API keys exposed

### Data Privacy

- All data stays in browser
- localStorage is origin-restricted
- No network requests for calculation

### Input Validation

```typescript
// Validate inputs before calculation
if (numberOfChildren < 0 || numberOfChildren > 20) {
  throw new Error('Invalid number of children');
}

if (careNights < 0 || careNights > 365) {
  throw new Error('Invalid care nights');
}
```

---

## Future Architecture Considerations

### Potential Enhancements

1. **Service Worker**
   - Full offline support
   - Background sync when online

2. **Web Workers**
   - Move calculations to background thread
   - Non-blocking UI for complex calculations

3. **IndexedDB**
   - Larger storage capacity
   - Better querying for history

4. **Rate Updates**
   - External rate configuration
   - API for rate updates (optional)

---

## Testing Architecture

### Recommended Testing Strategy

| Type | Tools | Purpose |
|------|-------|---------|
| Unit | Vitest | Calculator functions |
| Component | React Testing Library | UI components |
| E2E | Playwright | User flows |

### Critical Test Cases

1. Calculator formula accuracy
2. Edge cases (zero income, 365 nights, etc.)
3. localStorage persistence
4. Responsive design

---

*For more details, see the [API Reference](API-Reference.md).*
