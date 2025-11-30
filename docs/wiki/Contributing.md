# Contributing

Thank you for your interest in contributing to the Australian Child Support Calculator! This document provides guidelines and information for contributors.

---

## Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the project's goals
- Accept and provide feedback gracefully

---

## How to Contribute

### Reporting Bugs

1. **Check existing issues** first to avoid duplicates
2. **Create a new issue** with:
   - Clear title describing the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and version
   - Screenshots if applicable

**Bug Report Template:**
```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. Go to...
2. Click on...
3. Enter...
4. See error

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Screen size: [e.g., 1920x1080]

## Screenshots
[If applicable]
```

---

### Suggesting Features

1. **Check existing issues** for similar suggestions
2. **Create a feature request** with:
   - Clear description of the feature
   - Use case / problem it solves
   - Proposed solution
   - Alternative approaches considered

**Feature Request Template:**
```markdown
## Feature Description
[Clear description of the feature]

## Use Case
[Why is this feature needed?]

## Proposed Solution
[How should it work?]

## Alternatives Considered
[Other approaches you've thought about]

## Additional Context
[Any other relevant information]
```

---

### Submitting Code Changes

#### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/australian-child-support-calculator.git
cd australian-child-support-calculator
git remote add upstream https://github.com/Verridian-ai/australian-child-support-calculator.git
```

#### 2. Create a Branch

```bash
# Get latest changes
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

**Branch Naming Convention:**
| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/add-pdf-export` |
| Bug Fix | `fix/description` | `fix/calculation-rounding` |
| Docs | `docs/description` | `docs/update-readme` |
| Refactor | `refactor/description` | `refactor/simplify-hooks` |

#### 3. Make Changes

Follow these guidelines:

- **TypeScript:** Use strict mode, add proper types
- **Components:** Keep them focused and reusable
- **Styling:** Use Tailwind utilities, follow existing patterns
- **Testing:** Add tests for new functionality
- **Documentation:** Update docs if needed

#### 4. Commit Changes

**Commit Message Format:**
```
type(scope): short description

[optional body]

[optional footer]
```

**Types:**
| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code restructuring |
| `test` | Adding/updating tests |
| `chore` | Build, tooling, etc. |

**Examples:**
```
feat(calculator): add support for multiple age groups

fix(inputs): correct validation for care nights

docs(readme): update deployment instructions
```

#### 5. Push and Create PR

```bash
# Push your branch
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

**PR Template:**
```markdown
## Description
[What does this PR do?]

## Related Issue
Fixes #[issue number]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
[How has this been tested?]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed the code
- [ ] Added/updated documentation
- [ ] No new warnings
- [ ] Tests pass locally
```

---

## Development Guidelines

### Code Style

#### TypeScript

```typescript
// Use explicit types
function calculateAmount(income: number, rate: number): number {
  return income * rate;
}

// Use interfaces for objects
interface CalculationResult {
  amount: number;
  steps: Step[];
}

// Use const for immutable values
const SELF_SUPPORT_AMOUNT = 29841;

// Use descriptive names
const calculateChildSupportIncome = (ati: number): number => {
  return Math.max(0, ati - SELF_SUPPORT_AMOUNT);
};
```

#### React Components

```typescript
// Use functional components
const MyComponent: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="container">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

// Use hooks for state
const [value, setValue] = useState<number>(0);

// Use proper event handlers
const handleClick = useCallback(() => {
  setValue(prev => prev + 1);
}, []);
```

#### Styling

```tsx
// Use Tailwind utilities
<div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">

// Use cn() for conditional classes
<button className={cn(
  "px-4 py-2 rounded",
  isActive && "bg-blue-500",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>

// Keep class order consistent: layout, spacing, colors, effects
```

---

### Project Structure

When adding new features:

```
src/
├── components/
│   └── [feature]/           # Feature-specific components
│       ├── FeatureMain.tsx
│       └── FeatureHelper.tsx
├── hooks/
│   └── use[Feature].ts      # Feature-specific hooks
├── lib/
│   └── [feature].ts         # Feature-specific logic
└── data/
    └── [feature]Data.ts     # Feature-specific static data
```

---

### Testing

#### Running Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run specific test file
pnpm test calculator.test.ts
```

#### Writing Tests

```typescript
import { describe, it, expect } from 'vitest';
import { calculateChildSupport } from './calculator';

describe('calculateChildSupport', () => {
  it('should calculate correctly with equal incomes', () => {
    const result = calculateChildSupport({
      parentA_ATI: 60000,
      parentB_ATI: 60000,
      numberOfChildren: 1,
      childrenAges: [10],
      parentA_CareNights: 182,
      parentB_CareNights: 183,
      currentWage: 60000,
    });

    expect(result.finalAmount).toBe(0);
  });

  // More test cases...
});
```

---

### Documentation

When changing functionality:

1. Update inline JSDoc comments
2. Update relevant wiki pages
3. Update README if needed
4. Add examples for new features

---

## Review Process

### What Reviewers Look For

1. **Correctness** - Does it solve the problem?
2. **Code Quality** - Is it clean and maintainable?
3. **Testing** - Is it adequately tested?
4. **Documentation** - Is it documented?
5. **Performance** - Any performance concerns?
6. **Security** - Any security issues?

### Responding to Review Feedback

- Address all comments
- Ask for clarification if needed
- Push additional commits (don't force push during review)
- Mark conversations as resolved

---

## Getting Help

- **Questions:** Open a discussion on GitHub
- **Issues:** Check existing issues or create new one
- **Chat:** [If applicable, add community chat link]

---

## Recognition

Contributors are recognized in:
- The CONTRIBUTORS file
- Release notes
- README acknowledgments

---

## License

By contributing, you agree that your contributions will be licensed under the same [MIT License](../LICENSE) that covers the project.

---

*Thank you for contributing!*
