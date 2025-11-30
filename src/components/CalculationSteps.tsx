import React, { useState } from 'react';
import type { ChildSupportCalculationStep } from '../lib/calculator';
import { StepCard } from './steps/StepCard';

interface CalculationStepsProps {
  steps: ChildSupportCalculationStep[];
}

export default function CalculationSteps({ steps }: CalculationStepsProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(
    new Set([1, 2, 3, 4, 5, 6, 7, 8]) // All expanded by default
  );

  const toggleStep = (stepNumber: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepNumber)) {
      newExpanded.delete(stepNumber);
    } else {
      newExpanded.add(stepNumber);
    }
    setExpandedSteps(newExpanded);
  };

  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <StepCard
          key={step.stepNumber}
          step={step}
          isExpanded={expandedSteps.has(step.stepNumber)}
          onToggle={() => toggleStep(step.stepNumber)}
        />
      ))}
    </div>
  );
}
