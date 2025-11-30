# Deployment Guide

This guide covers various deployment options for the Australian Child Support Calculator.

---

## Prerequisites

Before deploying, ensure you have:

1. Node.js 18+ installed
2. pnpm or npm package manager
3. Successfully run `pnpm build` locally
4. Verified the production build with `pnpm preview`

---

## Build Process

### Creating a Production Build

```bash
# Install dependencies
pnpm install

# Create production build
pnpm build
```

The build output will be in the `dist/` directory:

```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── index.html
└── [other static assets]
```

### Verifying the Build

```bash
# Preview production build locally
pnpm preview
```

Open http://localhost:4173 to verify everything works correctly.

---

## Deployment Options

### Option 1: GitHub Pages (Free)

GitHub Pages is perfect for this static application.

#### Setup Steps

1. **Update `vite.config.ts`** for subdirectory deployment:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/australian-child-support-calculator/',  // Your repo name
});
```

2. **Create a deployment workflow** (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Enable GitHub Pages** in repository settings:
   - Go to Settings > Pages
   - Source: GitHub Actions

4. **Push to main branch** - Deployment will run automatically

Your app will be available at: `https://username.github.io/australian-child-support-calculator/`

---

### Option 2: Vercel (Recommended for Production)

Vercel offers excellent performance and easy setup.

#### Deploy via Web Interface

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`
5. Click "Deploy"

#### Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod
```

#### Configuration (`vercel.json`)

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### Option 3: Netlify

Another excellent option for static sites.

#### Deploy via Web Interface

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Connect to GitHub
4. Configure:
   - Build command: `pnpm build`
   - Publish directory: `dist`
5. Click "Deploy site"

#### Deploy via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize and deploy
netlify init

# Deploy to production
netlify deploy --prod
```

#### Configuration (`netlify.toml`)

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 4: Docker

For containerized deployments.

#### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx Configuration (`nginx.conf`)

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### Docker Commands

```bash
# Build image
docker build -t child-support-calculator .

# Run container
docker run -d -p 8080:80 --name csc child-support-calculator

# Check logs
docker logs csc

# Stop container
docker stop csc
```

---

### Option 5: AWS S3 + CloudFront

For enterprise-grade deployments.

#### S3 Bucket Setup

```bash
# Create bucket
aws s3 mb s3://child-support-calculator --region ap-southeast-2

# Configure for static website hosting
aws s3 website s3://child-support-calculator \
  --index-document index.html \
  --error-document index.html

# Upload build
aws s3 sync dist/ s3://child-support-calculator \
  --delete \
  --cache-control "max-age=31536000" \
  --exclude "index.html"

aws s3 cp dist/index.html s3://child-support-calculator/index.html \
  --cache-control "max-age=0, must-revalidate"
```

#### CloudFront Distribution

1. Create CloudFront distribution pointing to S3 bucket
2. Configure custom error pages:
   - 403 → /index.html (200)
   - 404 → /index.html (200)
3. Enable HTTPS with ACM certificate
4. Configure cache behaviors for `/assets/*`

---

### Option 6: Traditional Web Hosting

For shared hosting or VPS.

#### Steps

1. Build the project locally:
   ```bash
   pnpm build
   ```

2. Upload the `dist/` folder contents to your web server's public directory

3. Configure URL rewriting for SPA (Apache `.htaccess`):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

---

## Post-Deployment Checklist

- [ ] Application loads correctly
- [ ] All routes work (including direct URLs)
- [ ] Calculations function properly
- [ ] localStorage persistence works
- [ ] Mobile responsiveness is correct
- [ ] HTTPS is enabled
- [ ] Performance is acceptable

---

## Performance Optimization

### Caching Strategy

| Asset Type | Cache Duration |
|------------|----------------|
| HTML | No cache / must-revalidate |
| JS/CSS (hashed) | 1 year |
| Images | 1 year |
| Fonts | 1 year |

### CDN Configuration

For optimal performance:
- Use a CDN (CloudFront, Cloudflare, etc.)
- Enable HTTP/2 or HTTP/3
- Enable Brotli compression
- Configure proper cache headers

---

## Environment-Specific Builds

If needed, create environment-specific configurations:

```bash
# Development
pnpm dev

# Staging
pnpm build -- --mode staging

# Production
pnpm build:prod
```

With corresponding `.env` files:
- `.env.development`
- `.env.staging`
- `.env.production`

---

## Monitoring

Consider adding:

1. **Error Tracking** (e.g., Sentry)
2. **Performance Monitoring** (e.g., Lighthouse CI)
3. **Uptime Monitoring** (e.g., Pingdom)

---

## Rollback Strategy

For Vercel/Netlify:
- Use the dashboard to revert to previous deployments

For GitHub Pages:
- Revert the commit and push again

For Docker:
- Keep previous image tags
- Roll back with `docker run` using previous tag

---

*For development setup, see [Getting Started](Getting-Started.md).*
