# Australian Child Support Calculator

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A professional, privacy-focused child support calculator implementing the official Australian Child Support Formula**

[Features](#-features) | [Quick Start](#-quick-start) | [Documentation](#-documentation) | [API Reference](#-api-reference) | [Contributing](#-contributing)

---

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-blue?style=for-the-badge)](https://4usw7ly4n1eh.space.minimax.io)

</div>

---

## Overview

The Australian Child Support Calculator is a comprehensive web application designed to help Australian parents understand and calculate child support obligations according to the official Department of Social Services (DSS) guidelines. Built with modern web technologies, this calculator provides accurate, step-by-step calculations while maintaining complete user privacy.

### Why This Calculator?

| Benefit | Description |
|---------|-------------|
| **100% Client-Side** | All calculations happen in your browser - no data is ever sent to external servers |
| **Official Formula** | Implements the complete 8-step Australian child support formula |
| **Educational Focus** | Interactive guides help users understand each calculation step |
| **Modern Design** | Professional neumorphic interface with government-compliant accessibility |
| **Offline Capable** | Works without an internet connection after initial load |

---

## Features

### Core Calculator

- **8-Step Australian Child Support Formula** - Complete implementation based on official DSS guidelines
- **Dual Parent Support** - Calculate obligations for both Parent A and Parent B
- **Care Arrangements** - Flexible night-based care percentage calculations (0-365 nights)
- **Multiple Children** - Support for calculating costs across multiple children
- **Wage Tracking** - Monitor income changes with automatic 15% threshold alerts
- **Calculation History** - Save and review past calculations locally

### Interactive Educational Guide

- **Step-by-Step Walkthrough** - Visual demonstration of the entire calculation process
- **Button Highlighting** - Interactive tutorial showing exactly which buttons to press
- **Real-time Calculations** - Instant updates as you modify inputs
- **Educational Context** - Detailed explanations for each calculation step
- **Progress Tracking** - Visual indicators showing your position in the guide

### Professional Design

- **Express Plus Branding** - Government app styling consistent with Services Australia
- **Dark Theme** - Professional appearance suitable for legal and financial contexts
- **Neumorphic Buttons** - 3D pressed/depressed button effects for tactile feedback
- **Glassmorphic Panels** - Modern frosted glass containers with elegant shadows
- **High Contrast** - Government accessibility standards (WCAG 2.1 compliant)

### Privacy & Security

- **No Data Collection** - Zero user data is transmitted or stored externally
- **Local Storage Only** - All data persists only in your browser's localStorage
- **No External APIs** - Completely self-contained application
- **Open Source** - Complete transparency - review the code yourself

---

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/Verridian-ai/australian-child-support-calculator.git

# Navigate to project directory
cd australian-child-support-calculator

# Install dependencies
pnpm install
# or
npm install

# Start development server
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
# Create optimized production build
pnpm build
# or
npm run build

# Preview production build locally
pnpm preview
# or
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment.

---

## Documentation

### The 8-Step Child Support Formula

The calculator implements the official Australian child support assessment formula as published by the Department of Social Services:

#### Step 1: Child Support Income (CSI)

Calculate each parent's Child Support Income by subtracting the self-support amount from their Adjusted Taxable Income (ATI).

```
CSI = ATI - Self-Support Amount ($29,841 for 2024-2025)
```

> The self-support amount represents the minimum income a parent needs to support themselves.

#### Step 2: Combined Child Support Income

Add both parents' Child Support Incomes together to determine the combined family resources.

```
Combined CSI = Parent A CSI + Parent B CSI
```

#### Step 3: Income Percentage

Calculate each parent's share of the combined income.

```
Income % = (Individual CSI / Combined CSI) x 100
```

#### Step 4: Care Percentage

Determine care percentage based on annual nights of care (365 nights total).

```
Care % = (Nights of Care / 365) x 100
```

#### Step 5: Cost Percentage

Translate care percentage into a recognized cost share using the care cost table:

| Care % Range | Cost % | Description |
|-------------|--------|-------------|
| 0-13% | 0% | Below regular care |
| 14-34% | 24% | Regular care |
| 35-47% | 25-50% | Shared care (sliding scale) |
| 48-52% | 50% | Equal shared care |
| 53-65% | 51-75% | Majority care (sliding scale) |
| 66-85% | 76% | Primary care |
| 86-100% | 100% | Substantial primary care |

#### Step 6: Child Support Percentage

Subtract cost percentage from income percentage to determine each parent's contribution obligation.

```
CS % = Income % - Cost %
```

> A positive percentage means the parent is a payer; negative means they are a receiver.

#### Step 7: Costs of the Children (COTC)

Calculate the total cost of raising children based on combined income using the COTC table.

```
COTC = Base Cost + (Additional Rate x Income Above Threshold)
```

**2024-2025 Rates:**
| Parameter | Value |
|-----------|-------|
| Base Cost | $12,086 |
| Threshold | $44,762 |
| Additional Rate | 26% |

#### Step 8: Final Assessment

Apply child support percentage to the costs of the children to determine the annual payment.

```
Annual Amount = CS % x COTC x Number of Children
```

---

### Key Thresholds (2024-2025)

| Threshold | Amount | Purpose |
|-----------|--------|---------|
| Self-Support Amount | $29,841 | Minimum income for self-support |
| Income Threshold | $44,762 | Base threshold for COTC calculation |
| Support Rate | 26% | Rate applied above threshold |
| Wage Reduction Rule | 15% | Triggers eligibility for new estimate |

---

## Project Structure

```
australian-child-support-calculator/
├── src/
│   ├── components/               # React UI components
│   │   ├── CalculatorInputs.tsx      # Main input form
│   │   ├── CalculationSteps.tsx      # Step-by-step results display
│   │   ├── WageTracker.tsx           # Wage monitoring component
│   │   ├── CalculationHistory.tsx    # Past calculations viewer
│   │   ├── AlertBanner.tsx           # Notification system
│   │   ├── NeumorphicCalculator.tsx  # Visual calculator widget
│   │   ├── InteractiveGuide.tsx      # Educational guide system
│   │   ├── ButtonHighlighter.tsx     # Tutorial highlighting
│   │   ├── ReferenceModal.tsx        # Reference information modal
│   │   ├── ErrorBoundary.tsx         # Error handling wrapper
│   │   ├── guide/                    # Guide-specific components
│   │   │   └── WelcomeScreen.tsx
│   │   ├── inputs/                   # Input field components
│   │   │   ├── ParentIncomes.tsx
│   │   │   ├── ChildrenDetails.tsx
│   │   │   ├── CareArrangements.tsx
│   │   │   └── CurrentWage.tsx
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MainLayout.tsx
│   │   └── steps/                    # Calculation step components
│   │       ├── StepCard.tsx
│   │       └── StepContent.tsx
│   ├── hooks/                    # Custom React hooks
│   │   ├── useChildSupportCalculator.ts  # Main calculator logic
│   │   ├── useInteractiveGuide.ts        # Guide state management
│   │   └── use-mobile.tsx                # Responsive detection
│   ├── lib/                      # Core logic
│   │   ├── calculator.ts             # Calculation engine
│   │   ├── rates/                    # Annual rate configurations
│   │   │   └── 2024-2025.ts
│   │   └── utils.ts                  # Utility functions
│   ├── data/                     # Static data
│   │   └── guideSteps.ts             # Guide step definitions
│   ├── App.tsx                   # Main application component
│   ├── App.css                   # Application styles
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global styles (Tailwind)
├── public/                       # Static assets
├── docs/                         # Documentation
├── package.json                  # Dependencies and scripts
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

---

## Technology Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | React | 18.3.1 | UI component library |
| **Language** | TypeScript | 5.6.2 | Type-safe development |
| **Build Tool** | Vite | 6.0.1 | Fast development & bundling |
| **Styling** | Tailwind CSS | 3.4.16 | Utility-first CSS framework |
| **UI Components** | Radix UI | Various | Accessible component primitives |
| **Icons** | Lucide React | 0.364.0 | Modern icon library |
| **Forms** | React Hook Form | 7.54.2 | Form management |
| **Validation** | Zod | 3.24.1 | Schema validation |
| **Charts** | Recharts | 2.12.4 | Data visualization |
| **Notifications** | Sonner | 1.7.2 | Toast notifications |
| **Storage** | localStorage | Native | Client-side data persistence |

---

## API Reference

### Calculator Functions

#### `calculateChildSupport(inputs)`

Performs the complete 8-step child support calculation.

```typescript
interface ChildSupportInputs {
  parentA_ATI: number;        // Parent A's Adjusted Taxable Income
  parentB_ATI: number;        // Parent B's Adjusted Taxable Income
  numberOfChildren: number;   // Number of children
  childrenAges: number[];     // Array of children's ages
  parentA_CareNights: number; // Annual nights of care for Parent A
  parentB_CareNights: number; // Annual nights of care for Parent B
  currentWage: number;        // Current wage for tracking
}

interface ChildSupportResult {
  steps: ChildSupportCalculationStep[];  // Detailed step breakdown
  finalAmount: number;                    // Annual child support amount
  parentA_PerChild: number;               // Per-child amount (Parent A)
  parentB_PerChild: number;               // Per-child amount (Parent B)
  totalAmount: number;                    // Total annual amount
  offsetApplied: boolean;                 // Whether offset rules applied
}
```

#### `checkWageReduction(newWage, previousWage)`

Checks if a wage reduction qualifies for a new child support estimate.

```typescript
interface WageReductionResult {
  qualifies: boolean;    // Whether the 15% threshold is met
  percentage: number;    // Actual reduction percentage
  threshold: number;     // Calculated threshold value
}
```

#### `calculateCarePercentage(nights)`

Converts annual nights of care to a percentage.

```typescript
// Returns: (nights / 365) * 100
calculateCarePercentage(182);  // Returns: 49.86
```

#### `calculateCostPercentage(carePercentage)`

Converts care percentage to cost percentage using the care cost table.

```typescript
calculateCostPercentage(50);  // Returns: 0.50 (50%)
```

---

## Usage Guide

### Basic Calculator

1. **Enter Parent Incomes** - Input the Adjusted Taxable Income for both parents
2. **Add Child Information** - Specify the number of children and their ages
3. **Set Care Arrangements** - Enter the annual nights each parent has the children
4. **View Results** - See the step-by-step calculation breakdown
5. **Save Calculation** - Optionally save for future reference

### Interactive Guide

1. Click the **"Start Guide"** button in the header
2. Watch as buttons highlight with instructions
3. Follow along with each of the 8 steps
4. Learn the Australian child support formula interactively

### Wage Tracking

1. Enter your current wage in the Wage Tracker panel
2. The calculator monitors against the 15% reduction threshold
3. Receive alerts when income changes may allow a new estimate
4. Track wage history over time

---

## Deployment

### GitHub Pages

1. Update `vite.config.ts` with your repository base path:
   ```typescript
   export default defineConfig({
     base: '/australian-child-support-calculator/',
     // ...
   });
   ```

2. Build and deploy:
   ```bash
   pnpm build
   # Deploy contents of dist/ folder to gh-pages branch
   ```

### Vercel

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `pnpm build`
   - Output Directory: `dist`
3. Deploy automatically on push

### Netlify

1. Connect your GitHub repository
2. Build settings:
   - Build Command: `pnpm build`
   - Publish Directory: `dist`
3. Deploy automatically

### Docker

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t child-support-calculator .
docker run -p 8080:80 child-support-calculator
```

---

## Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

## Contributing

Contributions are welcome! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes following the code standards
4. Run linting: `pnpm lint`
5. Build to verify: `pnpm build`
6. Commit with clear messages
7. Push and create a Pull Request

### Code Standards

- Use TypeScript strict mode
- Follow existing code patterns and naming conventions
- Add JSDoc comments for public functions
- Ensure accessibility compliance (WCAG 2.1)
- Test on multiple browsers before submitting

### Commit Message Format

```
type(scope): description

[optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## Legal Disclaimer

This calculator is provided for **informational and educational purposes only**. While it implements the official Australian child support formula as published by the Department of Social Services, it should not be considered legal or financial advice.

**Important Notes:**
- Official assessments are conducted by Services Australia
- Individual circumstances may affect actual obligations
- Tax advice should come from qualified professionals
- This tool does not replace official government calculators

For official information, visit:
- [Services Australia - Child Support](https://www.servicesaustralia.gov.au/child-support)
- [Department of Social Services](https://www.dss.gov.au/)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Acknowledgments

- Australian Department of Social Services for publishing the child support formula
- Services Australia for providing calculation guidelines
- Express Plus Child Support app for design inspiration
- The React, TypeScript, and Vite communities for excellent tools

---

## Support

For technical issues with this application, please [open an issue](https://github.com/Verridian-ai/australian-child-support-calculator/issues).

For questions about the Australian child support calculation itself, refer to:
- [Services Australia - Child Support](https://www.servicesaustralia.gov.au/child-support)
- [DSS - Child Support Guide](https://guides.dss.gov.au/child-support-guide)

---

<div align="center">

**Built with care for Australian families**

[Report Bug](https://github.com/Verridian-ai/australian-child-support-calculator/issues) | [Request Feature](https://github.com/Verridian-ai/australian-child-support-calculator/issues) | [View Demo](https://4usw7ly4n1eh.space.minimax.io)

</div>
