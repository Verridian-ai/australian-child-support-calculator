# Getting Started

This guide will help you set up the Australian Child Support Calculator for development or production use.

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18 or higher
- **pnpm** (recommended) or npm package manager
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git for version control

### Checking Your Versions

```bash
# Check Node.js version
node --version
# Should output: v18.x.x or higher

# Check pnpm version
pnpm --version
# Or npm
npm --version
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Verridian-ai/australian-child-support-calculator.git
cd australian-child-support-calculator
```

### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

### 3. Start Development Server

```bash
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Create production build in `dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Run ESLint to check code quality |
| `pnpm clean` | Clean node_modules and lock files |

---

## Project Structure Overview

```
australian-child-support-calculator/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Core logic and utilities
│   └── data/               # Static data
├── public/                 # Static assets
├── docs/                   # Documentation
└── dist/                   # Production build output
```

---

## Development Workflow

### Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Test locally with `pnpm dev`

4. Run linting:
   ```bash
   pnpm lint
   ```

5. Build to verify:
   ```bash
   pnpm build
   ```

### Code Style

- TypeScript strict mode is enabled
- ESLint configuration is in `eslint.config.js`
- Tailwind CSS for styling
- Component files use `.tsx` extension

---

## Environment Configuration

No environment variables are required for basic operation. The application is entirely client-side and uses browser localStorage for data persistence.

### Optional Vite Configuration

For custom deployments, edit `vite.config.ts`:

```typescript
export default defineConfig({
  // For subdirectory deployment (e.g., GitHub Pages)
  base: '/your-repo-name/',

  // Other configuration...
});
```

---

## Troubleshooting

### Common Issues

**Port 5173 is already in use:**
```bash
# Kill the process using the port
npx kill-port 5173
# Then restart dev server
pnpm dev
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**TypeScript errors:**
```bash
# Ensure TypeScript is properly installed
pnpm add -D typescript @types/react @types/react-dom
```

---

## Next Steps

- Read the [User Guide](User-Guide.md) to understand how to use the calculator
- Check the [Architecture](Architecture.md) to understand the codebase
- See the [Deployment Guide](Deployment-Guide.md) for production deployment

---

*Need help? [Open an issue](https://github.com/Verridian-ai/australian-child-support-calculator/issues)*
