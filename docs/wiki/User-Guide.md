# User Guide

This guide explains how to use the Australian Child Support Calculator to estimate child support obligations.

---

## Overview

The calculator helps Australian parents estimate child support payments based on the official Department of Social Services formula. It provides:

- Step-by-step calculation breakdowns
- Interactive educational guides
- Wage tracking with threshold alerts
- Calculation history storage

---

## Getting Started

### Accessing the Calculator

Visit the live demo at: [https://4usw7ly4n1eh.space.minimax.io](https://4usw7ly4n1eh.space.minimax.io)

Or run locally following the [Getting Started](Getting-Started.md) guide.

---

## Main Features

### 1. Calculator Inputs

The main input section on the left side of the screen requires:

#### Parent Incomes
| Field | Description |
|-------|-------------|
| Parent A Income | Adjusted Taxable Income (ATI) for Parent A |
| Parent B Income | Adjusted Taxable Income (ATI) for Parent B |

> **Tip:** ATI typically includes your taxable income plus fringe benefits, reportable superannuation, and other amounts.

#### Child Information
| Field | Description |
|-------|-------------|
| Number of Children | Total children included in the assessment |
| Children Ages | Ages of each child (affects cost calculations) |

#### Care Arrangements
| Field | Description |
|-------|-------------|
| Parent A Care Nights | Annual nights child(ren) spend with Parent A (0-365) |
| Parent B Care Nights | Annual nights child(ren) spend with Parent B (0-365) |

> **Note:** The two fields should total 365 nights.

---

### 2. Calculation Results

After entering all inputs, click **"Calculate"** to see results:

#### Step-by-Step Breakdown
The calculator displays each of the 8 steps:

1. **Child Support Income** - ATI minus self-support amount
2. **Combined Income** - Both parents' incomes added
3. **Income Percentage** - Each parent's share of combined income
4. **Care Percentage** - Percentage based on nights of care
5. **Cost Percentage** - Translated from care using the cost table
6. **Child Support Percentage** - Income percentage minus cost percentage
7. **Costs of the Children** - Total child-raising costs
8. **Final Amount** - Annual child support assessment

Each step shows:
- The calculation formula
- Actual values used
- Resulting amount

---

### 3. Interactive Guide

The Interactive Guide provides a tutorial experience:

#### Starting the Guide
1. Click the **"Start Guide"** button in the header
2. The guide panel will appear at the top of the page

#### Following Along
- Watch as buttons highlight to show which to press
- Read explanations for each step
- Progress through all 8 calculation steps
- See educational context for each formula

#### Guide Features
- **Button Highlighting** - Visual cues showing next actions
- **Progress Indicator** - Track your position in the guide
- **Educational Content** - Learn why each step matters

---

### 4. Wage Tracker

Monitor income changes that may affect child support:

#### Entering Your Wage
1. Use the **Wage Tracker** panel on the right sidebar
2. Enter your current annual wage
3. The system calculates the 15% reduction threshold

#### Understanding the 15% Rule
If your income drops by 15% or more from the amount used in your current assessment, you may be eligible to request a new child support estimate.

| Current Wage | 15% Threshold |
|-------------|---------------|
| $100,000 | $85,000 |
| $80,000 | $68,000 |
| $60,000 | $51,000 |

#### Wage History
- The tracker stores your wage entries
- Review changes over time
- Identify when thresholds are crossed

---

### 5. Calculation History

Save and review past calculations:

#### Automatic Saving
- Calculations are automatically saved to your browser
- Up to 50 most recent calculations are kept

#### Loading Previous Calculations
1. View the **Calculation History** panel
2. Click on any previous calculation
3. Inputs will be restored for review

#### Privacy Note
- All data is stored locally in your browser
- Nothing is sent to external servers
- Clear browser data to remove all saved calculations

---

### 6. Interactive Calculator Widget

The neumorphic calculator widget provides:

- Visual number entry interface
- Clear/reset functionality
- Direct value input to wage tracker

---

## Understanding Results

### What the Annual Amount Means

The final amount shown is the **annual** child support payment from one parent to another. To convert:

| Period | Calculation |
|--------|-------------|
| Annual | As shown |
| Monthly | Annual ÷ 12 |
| Fortnightly | Annual ÷ 26 |
| Weekly | Annual ÷ 52 |

### Positive vs Negative Results

- **Positive Amount**: The parent pays this amount in child support
- **Offset Applied**: When both parents have obligations, they offset to produce a net amount

---

## Tips for Accurate Calculations

### 1. Use Correct Income Figures
- Use your **Adjusted Taxable Income** (ATI)
- Include: taxable income, fringe benefits, reportable super
- Check your tax return or Services Australia for accurate figures

### 2. Count Care Nights Accurately
- Count actual nights, not days
- Consider regular arrangements plus holidays
- School holiday care often differs from term time

### 3. Review All 8 Steps
- Don't just look at the final number
- Understanding each step helps verify accuracy
- Compare with official assessments

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Submit current input / Calculate |
| `Tab` | Move to next input field |
| `Escape` | Close modals or cancel actions |

---

## Accessibility

The calculator is designed to be accessible:

- High contrast colors meeting WCAG 2.1 standards
- Keyboard navigation support
- Screen reader compatible labels
- Responsive design for all devices

---

## Mobile Usage

The calculator is fully responsive:

- Works on phones and tablets
- Touch-friendly button sizes
- Collapsible panels for smaller screens
- Portrait and landscape orientation support

---

## Privacy Guarantee

Your data stays private:

- **No servers** - All processing happens in your browser
- **No tracking** - No analytics or user tracking
- **Local storage only** - Data persists only on your device
- **Easy to clear** - Browser data clearing removes all stored information

---

## Next Steps

- Learn more about the [Formula Explained](Formula-Explained.md)
- See [FAQ](FAQ.md) for common questions
- Check official sources for authoritative information

---

*Questions? [Open an issue](https://github.com/Verridian-ai/australian-child-support-calculator/issues)*
