# Frequently Asked Questions (FAQ)

Common questions about the Australian Child Support Calculator.

---

## General Questions

### What is this calculator?

The Australian Child Support Calculator is a web application that helps Australian parents estimate child support obligations based on the official Department of Social Services (DSS) formula.

### Is this an official government calculator?

**No.** This is an independent, open-source educational tool. For official assessments, use [Services Australia's Child Support Estimator](https://www.servicesaustralia.gov.au/child-support-estimator).

### Is my data safe?

**Yes.** All calculations happen entirely in your browser. No data is ever sent to any server. Your information stays on your device in localStorage.

### Does this work offline?

After the initial page load, the calculator works without an internet connection. However, you need internet to first load the application.

---

## Calculator Questions

### What is Adjusted Taxable Income (ATI)?

ATI is your income for child support purposes. It typically includes:
- Taxable income
- Reportable fringe benefits
- Reportable superannuation contributions
- Total net investment losses
- Tax-free pensions and benefits
- Foreign income

### What is the Self-Support Amount?

The self-support amount ($29,841 for 2024-2025) is the income the government considers necessary for a parent to support themselves. This amount is subtracted from your ATI before calculating child support obligations.

### How do I count nights of care?

Count the actual nights the child sleeps at each parent's home over a 12-month period. Consider:
- Regular weekly arrangements
- School holiday arrangements
- Public holidays
- Special occasions

**Note:** The two parents' nights should total 365.

### What is the 15% rule?

If your income decreases by 15% or more from the amount used in your current child support assessment, you may be eligible to apply for a new estimate. This is useful if you've experienced job loss, reduced hours, or other income changes.

### Why do the care nights need to total 365?

The formula assumes children are with one parent or the other for every night of the year. If your situation is more complex (e.g., children sometimes with grandparents), allocate those nights to whichever parent is responsible during that time.

---

## Technical Questions

### Which browsers are supported?

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### Why isn't the calculator working?

Try these troubleshooting steps:

1. **Clear browser cache** and reload the page
2. **Disable browser extensions** that might interfere
3. **Enable JavaScript** if disabled
4. **Try a different browser**
5. **Check console** for errors (F12 → Console)

### Where is my data stored?

Data is stored in your browser's localStorage under these keys:
- `childSupportCalculations` - Saved calculations
- `currentWage` - Tracked wage
- `wageHistory` - Wage history

### How do I clear my data?

**Option 1:** Use the browser's developer tools
1. Press F12 to open Developer Tools
2. Go to Application → Local Storage
3. Delete the relevant entries

**Option 2:** Clear browser data
- Chrome: Settings → Privacy → Clear browsing data → Cookies and other site data

### Can I export my calculations?

Currently, the calculator doesn't have built-in export functionality. You can:
1. Screenshot the results
2. Copy the values manually
3. Use browser developer tools to access localStorage data

---

## Formula Questions

### How is the Cost of the Children (COTC) calculated?

The COTC is calculated using:
```
COTC = Base Cost + (Additional Rate × Income Above Threshold)
```

For 2024-2025:
- Base Cost: $12,086
- Threshold: $44,762
- Additional Rate: 26%

### Why doesn't my calculation match Services Australia?

Possible reasons:
1. **Different income figures** - Ensure you're using ATI, not gross income
2. **Rate differences** - The official calculator may use more detailed rate tables
3. **Age factors** - Official calculations consider children's exact ages more precisely
4. **Multiple case factors** - If either parent has other child support cases
5. **Special circumstances** - This calculator uses simplified assumptions

### What is the difference between care percentage and cost percentage?

- **Care percentage** = The proportion of nights the child spends with each parent
- **Cost percentage** = The recognized contribution to costs based on care level

These differ because the government uses a table that translates care into cost recognition, with certain thresholds and bands.

### What happens in shared care arrangements?

When both parents have significant care (35-65% each), the child support percentage calculation may result in both parents having some obligation. The amounts then offset each other to produce a net payment.

---

## Usage Questions

### How do I use the Interactive Guide?

1. Click the "Start Guide" button in the header
2. The guide will highlight buttons and show instructions
3. Follow along step-by-step
4. The guide explains each part of the calculation

### Can I save calculations for later?

Yes! Calculations are automatically saved to your browser's localStorage. View them in the "Calculation History" panel. Up to 50 calculations are kept.

### How do I load a previous calculation?

1. Scroll to the "Calculation History" panel
2. Click on any previous calculation
3. The inputs will be restored to the calculator

### Can multiple people use this on the same computer?

Yes, but be aware:
- All users share the same localStorage
- Previous calculations will be visible to all users
- For privacy, clear browser data between users

---

## Legal Questions

### Can I use this for my court case?

**We do not recommend using this calculator as evidence.** While it implements the official formula, it's an educational tool and may not reflect all circumstances considered in official assessments.

For legal proceedings:
- Obtain an official assessment from Services Australia
- Consult a family lawyer
- Use the government's official estimator

### Is the calculation legally binding?

**No.** Only official assessments by Services Australia are legally binding. This calculator provides estimates for educational and planning purposes only.

### What if my situation is complex?

This calculator handles standard scenarios. For complex situations involving:
- Multiple child support cases
- International income
- Special circumstances
- Departure applications

Consult Services Australia or a family lawyer.

---

## Updates and Maintenance

### How often are rates updated?

We aim to update rates annually when new DSS guidelines are published (typically July 1 each year).

### How do I know if rates are current?

Check the rates displayed in the calculator or the `src/lib/rates/` folder. Current rates are for 2024-2025.

### Is this project actively maintained?

Yes! Check the [GitHub repository](https://github.com/Verridian-ai/australian-child-support-calculator) for recent activity and updates.

---

## Contributing Questions

### Can I contribute to this project?

We welcome contributions. See the [Contributing Guide](Contributing.md) for details.

### I found a bug, what should I do?

1. Check if it's already reported in [GitHub Issues](https://github.com/Verridian-ai/australian-child-support-calculator/issues)
2. If not, create a new issue with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and version
   - Screenshots if helpful

### Can I use this code for my own project?

Yes! This project is open source under the MIT License. You can use, modify, and distribute it. See the LICENSE file for details.

---

## Still Have Questions?

- Check the [full documentation](Home.md)
- Search [existing issues](https://github.com/Verridian-ai/australian-child-support-calculator/issues)
- [Open a new issue](https://github.com/Verridian-ai/australian-child-support-calculator/issues/new) if needed

For official child support questions, contact [Services Australia](https://www.servicesaustralia.gov.au/child-support).

---

*Last updated: November 2024*
