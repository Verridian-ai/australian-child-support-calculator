export interface GuideStep {
  stepNumber: number;
  section: string;
  title: string;
  description: string;
  buttonSequence: string[];
  inputValues: { [key: string]: string };
  explanation: string;
}

export const guideSteps: GuideStep[] = [
  {
    stepNumber: 1,
    section: "income",
    title: "Step 1: Parent A's Child Support Income",
    description: "Calculate taxable income minus self-support amount ($29,841).",
    buttonSequence: ["5", "0", "0", "0", "0", "-", "2", "9", "8", "4", "1", "="],
    inputValues: { parentA_ATI: "50000" },
    explanation: "Enter Parent A's income ($50,000) and subtract the self-support amount ($29,841). Result: $20,159."
  },
  {
    stepNumber: 2,
    section: "income",
    title: "Step 1 (cont): Parent B's Child Support Income", 
    description: "Repeat for Parent B.",
    buttonSequence: ["6", "0", "0", "0", "0", "-", "2", "9", "8", "4", "1", "="],
    inputValues: { parentB_ATI: "60000" },
    explanation: "Enter Parent B's income ($60,000) and subtract the self-support amount ($29,841). Result: $30,159."
  },
  {
    stepNumber: 3,
    section: "income",
    title: "Step 2: Combined Child Support Income",
    description: "Add both parents' results together.",
    buttonSequence: ["2", "0", "1", "5", "9", "+", "3", "0", "1", "5", "9", "="],
    inputValues: {},
    explanation: "Add Parent A's result ($20,159) to Parent B's result ($30,159). Total Combined Income: $50,318."
  },
  {
    stepNumber: 4,
    section: "income",
    title: "Step 3: Income Percentage (Parent A)",
    description: "Divide Parent A's income by the combined total.",
    buttonSequence: ["2", "0", "1", "5", "9", "÷", "5", "0", "3", "1", "8", "×", "1", "0", "0", "="],
    inputValues: {},
    explanation: "Divide Parent A's income ($20,159) by the Combined Income ($50,318) and multiply by 100. Result: ~40.06%."
  },
  {
    stepNumber: 5,
    section: "care",
    title: "Step 4: Care Percentage (Parent A)",
    description: "Calculate care percentage based on nights.",
    buttonSequence: ["2", "9", "0", "÷", "3", "6", "5", "×", "1", "0", "0", "="],
    inputValues: { parentA_CareNights: "290" },
    explanation: "Divide Parent A's care nights (290) by 365 days. Result: ~79.45% care."
  },
  {
    stepNumber: 6,
    section: "care",
    title: "Step 5: Cost Percentage",
    description: "Determine cost percentage from care percentage.",
    buttonSequence: [],
    inputValues: {},
    explanation: "Using the Care Cost Table: 79.45% care corresponds to a Cost Percentage of 76%."
  },
  {
    stepNumber: 7,
    section: "costs",
    title: "Step 6: Child Support Percentage",
    description: "Subtract Cost % from Income %.",
    buttonSequence: ["4", "0", ".", "0", "6", "-", "7", "6", "="],
    inputValues: {},
    explanation: "Subtract Parent A's Cost % (76%) from their Income % (40.06%). Result: -35.94%. (Negative means Parent A receives support)."
  },
  {
    stepNumber: 8,
    section: "costs",
    title: "Step 7: Costs of the Children (COTC)",
    description: "Calculate the total cost of raising the children.",
    buttonSequence: ["5", "0", "3", "1", "8", "-", "4", "4", "7", "6", "2", "="],
    inputValues: {},
    explanation: "Subtract the COTC Threshold ($44,762) from Combined Income ($50,318). Excess: $5,556."
  },
  {
    stepNumber: 9,
    section: "costs",
    title: "Step 7 (cont): Final COTC",
    description: "Apply the multiplier and add base cost.",
    buttonSequence: ["5", "5", "5", "6", "×", "0", ".", "2", "6", "+", "1", "2", "0", "8", "6", "="],
    inputValues: {},
    explanation: "Multiply excess ($5,556) by 26% ($1,444.56) and add Base Cost ($12,086). Total COTC: ~$13,530."
  },
  {
    stepNumber: 10,
    section: "costs",
    title: "Step 8: Final Amount",
    description: "Calculate the final payable amount.",
    buttonSequence: ["1", "3", "5", "3", "0", "×", "0", ".", "3", "5", "9", "4", "="],
    inputValues: {},
    explanation: "Multiply Total COTC ($13,530) by the Child Support Percentage (35.94%). Final Amount: ~$4,862 (payable by Parent B)."
  },
  {
    stepNumber: 11,
    section: "wage",
    title: "Step 9: Wage Tracking (15% Rule)",
    description: "Calculate the wage drop trigger point.",
    buttonSequence: ["9", "7", "0", "0", "0", "×", "0", ".", "8", "5", "="],
    inputValues: { currentWage: "97000" },
    explanation: "Enter your current wage ($97,000) and multiply by 0.85 (85%). Result: $82,450. If your income drops below this amount, you can request a new estimate."
  }
];