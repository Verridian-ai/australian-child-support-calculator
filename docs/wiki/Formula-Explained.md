# Child Support Formula Explained

This page provides a comprehensive explanation of the Australian Child Support Formula, which is implemented in this calculator according to the Department of Social Services guidelines.

---

## Overview

The Australian child support formula is an **8-step process** designed to fairly distribute the costs of raising children between separated parents based on:

- Each parent's income capacity
- The care arrangement in place
- The costs of raising children

---

## The 8 Steps

### Step 1: Child Support Income (CSI)

**Purpose:** Determine each parent's financial capacity to contribute.

**Formula:**
```
Child Support Income = Adjusted Taxable Income - Self-Support Amount
```

**Current Rates (2024-2025):**
- Self-Support Amount: **$29,841**

**Example:**
```
Parent A ATI: $90,000
Parent A CSI: $90,000 - $29,841 = $60,159

Parent B ATI: $50,000
Parent B CSI: $50,000 - $29,841 = $20,159
```

**Why Self-Support Amount?**
The self-support amount recognizes that each parent needs a minimum income to support themselves before contributing to child support.

---

### Step 2: Combined Child Support Income

**Purpose:** Determine the total income pool available for children.

**Formula:**
```
Combined CSI = Parent A CSI + Parent B CSI
```

**Example (continuing from above):**
```
Combined CSI = $60,159 + $20,159 = $80,318
```

---

### Step 3: Income Percentage

**Purpose:** Determine each parent's share of the combined income.

**Formula:**
```
Income Percentage = (Individual CSI / Combined CSI) × 100
```

**Example:**
```
Parent A: ($60,159 / $80,318) × 100 = 74.9%
Parent B: ($20,159 / $80,318) × 100 = 25.1%
```

**Interpretation:**
Parent A has a higher income share, so they have a greater capacity to contribute financially.

---

### Step 4: Care Percentage

**Purpose:** Determine how much physical care each parent provides.

**Formula:**
```
Care Percentage = (Nights of Care / 365) × 100
```

**Example:**
```
Parent A: 110 nights → (110 / 365) × 100 = 30.1%
Parent B: 255 nights → (255 / 365) × 100 = 69.9%
```

**Care Level Categories:**

| Nights per Year | Care % | Care Level |
|-----------------|--------|------------|
| 0-51 | 0-13% | Below regular care |
| 52-127 | 14-34% | Regular care |
| 128-175 | 35-47% | Shared care (lower) |
| 176-189 | 48-51% | Equal shared care |
| 190-237 | 52-65% | Shared care (higher) |
| 238-313 | 66-85% | Primary care |
| 314-365 | 86-100% | Substantial primary |

---

### Step 5: Cost Percentage

**Purpose:** Translate care into recognized contribution to costs.

**The Care Cost Table:**

| Care % Range | Cost % | Description |
|-------------|--------|-------------|
| 0-13% | 0% | Care not substantial enough for cost recognition |
| 14-34% | 24% | Regular care receives fixed cost recognition |
| 35-47% | 25-50% | Sliding scale based on actual care |
| 48-52% | 50% | Equal shared care gets equal cost recognition |
| 53-65% | 51-75% | Sliding scale for majority care |
| 66-85% | 76% | Primary carer receives higher recognition |
| 86-100% | 100% | Substantial primary care |

**Example (using 30.1% and 69.9%):**
```
Parent A: 30.1% care → 24% cost percentage
Parent B: 69.9% care → 76% cost percentage
```

**Why This Conversion?**
Having a child stay overnight involves costs (meals, utilities, activities). The cost percentage recognizes these contributions even when they're not 50/50 with income.

---

### Step 6: Child Support Percentage

**Purpose:** Determine each parent's net obligation or entitlement.

**Formula:**
```
Child Support Percentage = Income Percentage - Cost Percentage
```

**Example:**
```
Parent A: 74.9% - 24% = 50.9% (positive = payer)
Parent B: 25.1% - 76% = -50.9% (negative = receiver)
```

**Interpretation:**
- **Positive percentage** = This parent pays child support
- **Negative percentage** = This parent receives child support

---

### Step 7: Costs of the Children (COTC)

**Purpose:** Calculate the total deemed cost of raising the children.

**Formula:**
```
COTC = Base Cost + (Additional Rate × Income Above Threshold)
```

**Current Rates (2024-2025):**

| Parameter | Value |
|-----------|-------|
| Base Cost | $12,086 |
| Income Threshold | $44,762 |
| Additional Rate | 26% |

**Example:**
```
Combined CSI: $80,318
Income Above Threshold: $80,318 - $44,762 = $35,556
Additional Amount: $35,556 × 0.26 = $9,245
Total COTC: $12,086 + $9,245 = $21,331
```

**Note:** In practice, COTC varies based on:
- Number of children
- Ages of children (0-12, 13-17)
- Income bands

This calculator uses the simplified single-band approach.

---

### Step 8: Final Assessment

**Purpose:** Calculate the actual annual amount to be transferred.

**Formula:**
```
Annual Amount = Child Support Percentage × COTC per child × Number of Children
```

**Example (1 child):**
```
Annual Amount = 50.9% × $21,331 × 1 = $10,858 per year
```

**Payment Breakdown:**
| Period | Amount |
|--------|--------|
| Annual | $10,858 |
| Monthly | $905 |
| Fortnightly | $418 |
| Weekly | $209 |

---

## Special Rules

### Minimum Annual Rate

There is a minimum annual rate of child support that applies regardless of calculation:
- 2024-2025: Approximately $500/year

### Maximum Child Support

Child support is capped when parental income exceeds certain thresholds to prevent excessive assessments.

### Offset Rule

When both parents have positive child support percentages (which can happen in shared care arrangements), the amounts offset each other:

```
Net Amount = |Parent A Amount - Parent B Amount|
```

---

## The 15% Reduction Rule

If your income drops by 15% or more from the amount used in your current assessment, you may request a new estimate.

**Example:**
```
Original assessment income: $80,000
15% threshold: $68,000
If current income < $68,000 → May request new estimate
```

This rule allows for adjustments when circumstances significantly change.

---

## Adjusted Taxable Income (ATI)

ATI includes more than just taxable income:

| Component | Included? |
|-----------|-----------|
| Taxable income | Yes |
| Reportable fringe benefits | Yes |
| Reportable superannuation | Yes |
| Total net investment losses | Yes |
| Tax-free pensions | Yes |
| Foreign income | Yes |

---

## Multi-Child Assessments

When there are multiple children with different care arrangements, the formula becomes more complex:

1. Calculate care percentage for each child
2. Apply cost percentage for each child
3. Sum the results

The calculator handles this by allowing different inputs for different scenarios.

---

## Age Considerations

Child costs vary by age:

| Age Group | Cost Level |
|-----------|------------|
| 0-12 years | Standard costs |
| 13-17 years | Higher costs (typically 25% more) |

The COTC tables published by DSS provide detailed breakdowns by age group.

---

## Example Calculation Walkthrough

### Scenario:
- Parent A: $90,000 ATI, 110 nights care
- Parent B: $50,000 ATI, 255 nights care
- 1 child, age 8

### Step-by-Step:

| Step | Calculation | Result |
|------|-------------|--------|
| 1 | CSI (A): $90,000 - $29,841 | $60,159 |
| 1 | CSI (B): $50,000 - $29,841 | $20,159 |
| 2 | Combined CSI | $80,318 |
| 3 | Income % (A): $60,159 / $80,318 × 100 | 74.9% |
| 3 | Income % (B): $20,159 / $80,318 × 100 | 25.1% |
| 4 | Care % (A): 110 / 365 × 100 | 30.1% |
| 4 | Care % (B): 255 / 365 × 100 | 69.9% |
| 5 | Cost % (A): from table | 24% |
| 5 | Cost % (B): from table | 76% |
| 6 | CS % (A): 74.9% - 24% | 50.9% |
| 6 | CS % (B): 25.1% - 76% | -50.9% |
| 7 | COTC: $12,086 + (0.26 × $35,556) | $21,331 |
| 8 | Annual Amount: 50.9% × $21,331 | $10,858 |

**Result:** Parent A pays Parent B approximately **$10,858 per year** in child support.

---

## Official References

- [DSS Child Support Guide](https://guides.dss.gov.au/child-support-guide)
- [Services Australia Child Support](https://www.servicesaustralia.gov.au/child-support)
- [Child Support Estimator](https://www.servicesaustralia.gov.au/child-support-estimator)

---

*This explanation is for educational purposes. Always consult official sources for authoritative information.*
